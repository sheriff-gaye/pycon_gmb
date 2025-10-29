import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { QRCodeData, VerificationResponse } from "../verify/route";

export async function PUT(req: NextRequest): Promise<NextResponse<VerificationResponse>> {
  try {
    const body = await req.json();
    const { qrData, checkedInBy } = body;

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

    // Check payment status
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

    // Check if already checked in
    if (ticket.isCheckedIn) {
      return NextResponse.json(
        {
          success: false,
          message: `Ticket already checked in on ${ticket.checkedInAt?.toLocaleString()}`,
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

    // Perform check-in
    const updatedTicket = await db.ticketPurchase.update({
      where: {
        transactionReference: ticketData.ticketId
      },
      data: {
        isCheckedIn: true,
        checkedInAt: new Date(),
        checkedInBy: checkedInBy || 'Staff'
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
