import { authenticateRequest } from "@/lib/auth-check";
import { NextRequest, NextResponse } from "next/server";
import { QRCodeData, VerificationResponse } from "../verify/route";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest): Promise<NextResponse<VerificationResponse>> {
  try {
    // Authenticate request
    const auth = await authenticateRequest(req);
    
    if (!auth.authenticated) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
          error: auth.error || "UNAUTHORIZED"
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { qrData } = body;

    if (!qrData) {
      return NextResponse.json(
        {
          success: false,
          message: "QR code data is required",
          error: "MISSING_QR_DATA"
        },
        { status: 400 }
      );
    }

    // Parse QR code data
    let ticketData: QRCodeData;
    try {
      ticketData = typeof qrData === 'string' ? JSON.parse(qrData) : qrData;
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid QR code format",
          error: "INVALID_QR_FORMAT"
        },
        { status: 400 }
      );
    }

    // Find ticket
    const ticket = await db.ticketPurchase.findUnique({
      where: {
        transactionReference: ticketData.ticketId
      }
    });

    if (!ticket) {
      return NextResponse.json(
        {
          success: false,
          message: "Ticket not found",
          error: "TICKET_NOT_FOUND"
        },
        { status: 404 }
      );
    }

    if (ticket.paymentStatus !== 'COMPLETED') {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot check in ticket with incomplete payment",
          error: "PAYMENT_NOT_COMPLETED"
        },
        { status: 400 }
      );
    }

    if (ticket.isCheckedIn) {
      return NextResponse.json(
        {
          success: false,
          message: `Ticket already checked in on ${ticket.checkedInAt?.toLocaleString()} by ${ticket.checkedInBy}`,
          error: "ALREADY_CHECKED_IN",
          ticket: {
            id: ticket.id,
            ticketType: ticket.ticketType,
            customerName: ticket.customerName,
            customerEmail: ticket.customerEmail,
            customerPhone: ticket.customerPhone,
            amount: ticket.amount,
            currency: ticket.currency,
            transactionReference: ticket.transactionReference,
            isCheckedIn: ticket.isCheckedIn,
            checkedInAt: ticket.checkedInAt?.toISOString() || null,
            checkedInBy: ticket.checkedInBy,
            paymentStatus: ticket.paymentStatus,
            createdAt: ticket.createdAt.toISOString()
          }
        },
        { status: 400 }
      );
    }

    // Perform check-in with staff info
    const checkedInByName = `${auth.staff!.firstName} ${auth.staff!.lastName}`;
    
    const updatedTicket = await db.ticketPurchase.update({
      where: {
        transactionReference: ticketData.ticketId
      },
      data: {
        isCheckedIn: true,
        checkedInAt: new Date(),
        checkedInBy: checkedInByName,
        staffId: auth.staff!.staffId
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: `🎉 Successfully checked in ${updatedTicket.customerName}!`,
        ticket: {
          id: updatedTicket.id,
          ticketType: updatedTicket.ticketType,
          customerName: updatedTicket.customerName,
          customerEmail: updatedTicket.customerEmail,
          customerPhone: updatedTicket.customerPhone,
          amount: updatedTicket.amount,
          currency: updatedTicket.currency,
          transactionReference: updatedTicket.transactionReference,
          isCheckedIn: updatedTicket.isCheckedIn,
          checkedInAt: updatedTicket.checkedInAt?.toISOString() || null,
          checkedInBy: updatedTicket.checkedInBy,
          paymentStatus: updatedTicket.paymentStatus,
          createdAt: updatedTicket.createdAt.toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error checking in ticket:', error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while checking in the ticket",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}