import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Types
export interface QRCodeData {
  ticketId: string;
  type: string;
  name: string;
  email: string;
  conference: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  ticket?: {
    id: string;
    ticketType: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    amount: number;
    currency: string;
    transactionReference: string;
    isCheckedIn: boolean;
    checkedInAt: string | null;
    checkedInBy: string | null;
    paymentStatus: string;
    createdAt: string;
  };
  error?: string;
}

// ============================================
// 1. VERIFY TICKET (Check if valid without checking in)
// POST /api/tickets/verify
// ============================================
export async function POST(req: NextRequest): Promise<NextResponse<VerificationResponse>> {
  try {
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

    // Find ticket by transaction reference
    const ticket = await db.ticketPurchase.findUnique({
      where: {
        transactionReference: ticketData.ticketId
      }
    });

    if (!ticket) {
      return NextResponse.json(
        {
          success: false,
          message: "Ticket not found. This ticket may be invalid.",
          error: "TICKET_NOT_FOUND"
        },
        { status: 404 }
      );
    }

    // Check if payment is completed
    if (ticket.paymentStatus !== 'COMPLETED') {
      return NextResponse.json(
        {
          success: false,
          message: `Ticket payment is ${ticket.paymentStatus.toLowerCase()}. Only completed payments are valid.`,
          error: "PAYMENT_NOT_COMPLETED",
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

    // Check if already checked in
    if (ticket.isCheckedIn) {
      return NextResponse.json(
        {
          success: true,
          message: `⚠️ This ticket has already been checked in on ${ticket.checkedInAt?.toLocaleString()}`,
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
        { status: 200 }
      );
    }

    // Valid ticket, ready for check-in
    return NextResponse.json(
      {
        success: true,
        message: "✅ Valid ticket - Ready for check-in",
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
      { status: 200 }
    );

  } catch (error) {
    console.error('Error verifying ticket:', error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while verifying the ticket",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}
