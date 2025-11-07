// app/api/tickets/scholarship/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type TicketType = 'STUDENTS' | 'INDIVIDUAL' | 'CORPORATE';

interface ScholarshipTicketRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  ticketType: TicketType;
  notes?: string; // Optional notes about the scholarship recipient
}

interface TicketPurchase {
  id: string;
  ticketType: TicketType;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentStatus: 'COMPLETED';
  transactionReference: string;
  paymentIntentId: string;
  modemPayChargeId: string;
  paymentMethod: string;
  testMode: boolean;
  paymentMetadata: any;
  customFields: any;
  createdAt: Date;
  updatedAt: Date;
}

async function generateQRCodeDataURL(data: string): Promise<string> {
  try {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
    return qrCodeUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  }
}

async function getEmbeddedLogo(): Promise<string> {
  return 'https://www.pyconsenegambia.org/images/logo.png';
}

async function generateScholarshipTicketEmailHTML(ticketPurchase: TicketPurchase): Promise<string> {
  const ticketTypeEmoji: Record<TicketType, string> = {
    STUDENTS: '🎓',
    INDIVIDUAL: '👤',
    CORPORATE: '🏢',
  };

  const ticketTypeColor: Record<TicketType, string> = {
    STUDENTS: '#10B981', 
    INDIVIDUAL: '#3B82F6', 
    CORPORATE: '#8B5CF6',
  };

  const qrData = JSON.stringify({
    ticketId: ticketPurchase.transactionReference,
    type: ticketPurchase.ticketType,
    name: ticketPurchase.customerName,
    email: ticketPurchase.customerEmail,
    conference: 'PyCon Senegambia 2025',
    scholarship: true,
  });

  const qrCodeUrl = await generateQRCodeDataURL(qrData);
  const logoUrl = await getEmbeddedLogo();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PyCon Senegambia 2025 - Scholarship Ticket</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
                <img src="${logoUrl}" alt="PyCon Senegambia Logo" style="max-width: 120px; height: auto; display: block; margin: 0 auto 10px;" />
                <h1 style="margin: 0; font-size: 24px;">🎉 Scholarship Ticket Awarded!</h1>
                <p style="margin: 10px 0 0 0;">Welcome to PyCon Senegambia 2025</p>
            </div>
            
            <div style="padding: 20px;">
                <h2 style="margin: 0 0 10px;">Congratulations ${ticketPurchase.customerName}!</h2>
                <p>You have been awarded a <strong>scholarship ticket</strong> to PyCon Senegambia 2025! We're thrilled to have you join us at this exciting event.</p>
                
                <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-bottom: 10px;">
                        <span style="font-size: 14px; font-weight: bold;">🎓 SCHOLARSHIP TICKET</span>
                    </div>
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">
                        ${ticketTypeEmoji[ticketPurchase.ticketType]} ${ticketPurchase.ticketType} ACCESS
                    </div>
                    <div style="font-size: 14px; font-family: monospace; background: rgba(255,255,255,0.2); padding: 8px; border-radius: 4px; display: inline-block;">
                        ID: ${ticketPurchase.transactionReference}
                    </div>
                </div>

                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px dashed ${ticketTypeColor[ticketPurchase.ticketType]};">
                    <h3 style="margin: 0 0 10px; color: #1e293b;">📱 Your Digital Ticket</h3>
                    <img src="${qrCodeUrl}" alt="Ticket QR Code" style="max-width: 150px; height: auto; margin: 10px auto; display: block; border: 1px solid #e2e8f0;" />
                    <p style="color: #475569; font-size: 12px; margin: 10px 0;">
                        Show this QR code at the conference entrance.<br/>
                        Save this email or screenshot the QR code for easy access.
                    </p>
                </div>

                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981;">
                    <h4 style="margin: 0 0 10px; color: #166534;">💚 About Your Scholarship</h4>
                    <p style="margin: 0; color: #166534; font-size: 14px;">
                        This scholarship covers your full conference attendance. We're committed to making 
                        PyCon Senegambia accessible to everyone in our community. Your presence enriches 
                        our conference!
                    </p>
                </div>

                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px; color: #1e293b;">📋 Ticket Details</h3>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Ticket Type:</span>
                        <span style="float: right;">${ticketPurchase.ticketType} (Scholarship)</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Amount Paid:</span>
                        <span style="float: right; color: #10B981; font-weight: bold;">FREE (Scholarship)</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Ticket ID:</span>
                        <span style="float: right; font-family: monospace; font-size: 12px;">${ticketPurchase.transactionReference}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Status:</span>
                        <span style="float: right; background: #10B981; color: white; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold;">Confirmed</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0;">
                        <span style="font-weight: bold; color: #475569;">Issue Date:</span>
                        <span style="float: right;">${new Date(ticketPurchase.createdAt).toLocaleString()}</span>
                    </div>
                </div>

                <div style="text-align: center; margin: 20px 0;">
                    <a href="https://pyconsenegambia.org/schedule" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 5px;">View Schedule 📅</a>
                    <a href="https://pyconsenegambia.org/speakers" style="display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 5px;">Meet Speakers 🎤</a>
                </div>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px; color: #92400e;">📝 Important Information</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 12px;">
                        <li>Please bring a valid ID to the conference</li>
                        <li>Show the QR code above for quick entry at the venue</li>
                        <li>This email serves as your official ticket confirmation</li>
                        <li>Conference details will be sent closer to the event date</li>
                        <li>For questions, contact us at info@pyconsenegambia.org</li>
                    </ul>
                </div>

                <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <p style="margin: 0; color: #1e40af; font-size: 14px;">
                        🌟 <strong>We're excited to see you at PyCon Senegambia 2025!</strong><br/>
                        Share your excitement on social media with <strong>#PyConSenegambia2025</strong>
                    </p>
                </div>
            </div>

            <div style="background: #1e293b; color: white; padding: 15px; text-align: center; font-size: 12px;">
                <p style="margin: 0 0 5px;">
                    <strong>PyCon Senegambia 2025</strong><br/>
                    Building the Future of Python in West Africa
                </p>
                <p style="margin: 0; opacity: 0.8;">
                    This is an automated confirmation email. Please do not reply.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

async function sendScholarshipTicketEmail(ticketPurchase: TicketPurchase): Promise<void> {
  try {
    console.log('📧 Sending scholarship ticket email:', {
      customerEmail: ticketPurchase.customerEmail,
      ticketType: ticketPurchase.ticketType,
      transactionReference: ticketPurchase.transactionReference,
    });

    if (!ticketPurchase.customerEmail) {
      throw new Error('Customer email is missing');
    }

    const emailHTML = await generateScholarshipTicketEmailHTML(ticketPurchase);

    const { data, error } = await resend.emails.send({
      from: 'PyCon Senegambia <info@pyconsenegambia.org>',
      to: [ticketPurchase.customerEmail],
      subject: `🎉 Your PyCon Senegambia 2025 Scholarship Ticket - ${ticketPurchase.ticketType}`,
      html: emailHTML,
      text: `Dear ${ticketPurchase.customerName},\n\nCongratulations! You have been awarded a scholarship ticket for PyCon Senegambia 2025!\n\nTicket Type: ${ticketPurchase.ticketType} (Scholarship)\nTicket ID: ${ticketPurchase.transactionReference}\nStatus: Confirmed\nIssue Date: ${new Date(ticketPurchase.createdAt).toLocaleString()}\n\nThis scholarship covers your full conference attendance. Please bring a valid ID and this ticket ID to the conference.\n\nFor questions, contact info@pyconsenegambia.org.\n\nWe're excited to see you at PyCon Senegambia 2025!\n\n#PyConSenegambia2025`,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
    }

    console.log('✅ Scholarship ticket email sent successfully:', data);
  } catch (error) {
    console.error('💥 Error sending scholarship ticket email:', error);
    throw error;
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    console.log('🎓 Scholarship ticket request received');
    
    const body: ScholarshipTicketRequest = await req.json();
    
    // Validate required fields
    if (!body.customerName || !body.customerEmail || !body.customerPhone || !body.ticketType) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: customerName, customerEmail, customerPhone, ticketType' 
        },
        { status: 400 }
      );
    }

    // Validate ticket type
    if (!['STUDENTS', 'INDIVIDUAL', 'CORPORATE'].includes(body.ticketType)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid ticket type. Must be STUDENTS, INDIVIDUAL, or CORPORATE' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.customerEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate unique transaction reference for scholarship ticket
    const transactionReference = `SCHOLARSHIP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const modemPayChargeId = `scholarship_${Date.now()}`;

    // Check if email already has a scholarship ticket
    const existingTicket = await db.ticketPurchase.findFirst({
      where: {
        customerEmail: body.customerEmail,
        paymentMethod: 'Scholarship'
      }
    });

    if (existingTicket) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A scholarship ticket has already been issued to this email address',
          existingTicket: {
            id: existingTicket.id,
            ticketType: existingTicket.ticketType,
            transactionReference: existingTicket.transactionReference
          }
        },
        { status: 409 }
      );
    }

    // Create scholarship ticket in database
    const ticketPurchase = await db.ticketPurchase.create({
      data: {
        ticketType: body.ticketType,
        amount: 0, // Scholarship tickets are free
        currency: 'GMD',
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        paymentStatus: 'COMPLETED',
        transactionReference: transactionReference,
        paymentIntentId: `scholarship_intent_${Date.now()}`,
        modemPayChargeId: modemPayChargeId,
        paymentMethod: 'Scholarship',
        testMode: false,
        paymentMetadata: {
          type: 'scholarship',
          notes: body.notes || 'Scholarship recipient',
          issuedAt: new Date().toISOString(),
        },
        customFields: {},
      }
    });

    console.log(`🎉 Scholarship ticket created: ${ticketPurchase.id}`);

    // Send confirmation email
    try {
      await sendScholarshipTicketEmail(ticketPurchase as TicketPurchase);
      console.log('📧 Scholarship confirmation email sent successfully');
    } catch (emailError) {
      console.error('⚠️ Failed to send scholarship email:', emailError);
      // Don't fail the request - ticket is created
      return NextResponse.json(
        {
          success: true,
          message: 'Scholarship ticket created but email failed to send',
          ticket: {
            id: ticketPurchase.id,
            ticketType: ticketPurchase.ticketType,
            transactionReference: ticketPurchase.transactionReference,
            customerName: ticketPurchase.customerName,
            customerEmail: ticketPurchase.customerEmail,
          },
          emailError: emailError instanceof Error ? emailError.message : 'Unknown error'
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Scholarship ticket created and email sent successfully',
        ticket: {
          id: ticketPurchase.id,
          ticketType: ticketPurchase.ticketType,
          transactionReference: ticketPurchase.transactionReference,
          customerName: ticketPurchase.customerName,
          customerEmail: ticketPurchase.customerEmail,
          createdAt: ticketPurchase.createdAt,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('💥 Error creating scholarship ticket:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Failed to create scholarship ticket: ${errorMessage}` },
      { status: 500 }
    );
  }
}