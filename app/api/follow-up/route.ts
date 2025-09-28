import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Types
type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
type TicketType = 'STUDENTS' | 'INDIVIDUAL' | 'CORPORATE';

interface FailedTicketPurchase {
  id: string;
  ticketType: TicketType;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentStatus: PaymentStatus;
  transactionReference: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EmailResult {
  ticketId: string;
  email: string;
  success: boolean;
  error?: string;
}

interface FollowUpRequestBody {
  ticketIds?: string[];
  days?: number;
  sendToAll?: boolean;
  retryPaymentLink?: string;
}

// Constants
const FAILED_STATUSES: PaymentStatus[] = ['FAILED', 'CANCELLED', 'PENDING'];
const DEFAULT_RETRY_LINK = "https://pyconsenegambia.org/tickets";
const EMAIL_DELAY_MS = 500; // Delay between emails to avoid rate limiting
const DEFAULT_DAYS_LOOKBACK = 7;

// Email template configuration
const EMAIL_CONFIG = {
  logoUrl: 'https://www.pyconsenegambia.org/images/logo.png',
  fromEmail: 'PyCon Senegambia <noreply@pyconsenegambia.org>',
  supportEmail: 'info@pyconsenegambia.org',
  ticketTypeEmoji: {
    STUDENTS: '🎓',
    INDIVIDUAL: '👤',
    CORPORATE: '🏢',
  } as Record<TicketType, string>,
  ticketTypeColor: {
    STUDENTS: '#10B981', 
    INDIVIDUAL: '#3B82F6', 
    CORPORATE: '#8B5CF6',
  } as Record<TicketType, string>,
};

/**
 * Generates HTML email template for follow-up emails
 */
async function generateFollowUpEmailHTML(
  ticket: FailedTicketPurchase, 
  retryPaymentLink: string
): Promise<string> {
  const { ticketTypeEmoji, ticketTypeColor, logoUrl, supportEmail } = EMAIL_CONFIG;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Complete Your PyCon Senegambia 2025 Ticket Purchase</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
                <img src="${logoUrl}" alt="PyCon Senegambia Logo" style="max-width: 120px; height: auto; display: block; margin: 0 auto 10px;" />
                <h1 style="margin: 0; font-size: 24px;">⚠️ Complete Your Ticket Purchase</h1>
                <p style="margin: 10px 0 0 0;">Don't miss out on PyCon Senegambia 2025!</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 20px;">
                <h2 style="margin: 0 0 10px;">Hello ${ticket.customerName},</h2>
                <p>We noticed that your ticket purchase for PyCon Senegambia 2025 wasn't completed successfully. Don't worry - it happens to the best of us!</p>
                
                <!-- Status Alert -->
                <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px; color: #dc2626;">❌ Payment Status: ${ticket.paymentStatus}</h3>
                    <p style="margin: 0; color: #991b1b;">
                        Your ${ticket.ticketType} ticket purchase was not completed due to a payment issue.
                    </p>
                </div>

                <!-- Ticket Info -->
                <div style="background: ${ticketTypeColor[ticket.ticketType]}; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">
                        ${ticketTypeEmoji[ticket.ticketType]} ${ticket.ticketType} TICKET
                    </div>
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">
                        ${ticket.currency} ${ticket.amount.toFixed(2)}
                    </div>
                    <div style="font-size: 12px; opacity: 0.9;">
                        Original Transaction: ${ticket.transactionReference}
                    </div>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 30px 0;">
                    <h3 style="color: #1e293b; margin-bottom: 15px;">🚀 Complete Your Purchase Now</h3>
                    <a href="${retryPaymentLink}" style="display: inline-block; background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        Complete Payment Now 💳
                    </a>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">
                        Click the button above to retry your payment securely
                    </p>
                </div>

                <!-- Benefits Section -->
                <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 3px solid #0ea5e9; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px; color: #0c4a6e;">💡 Why Complete Your Purchase?</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #0c4a6e; font-size: 14px;">
                        <li><strong>Limited Spots:</strong> Secure your seat before tickets sell out</li>
                        <li><strong>Early Access:</strong> Get conference materials and schedule updates</li>
                        <li><strong>Networking:</strong> Connect with Python developers across West Africa</li>
                        <li><strong>Learning:</strong> Access to workshops, talks, and expert sessions</li>
                        <li><strong>Community:</strong> Be part of the growing Python community in Senegambia</li>
                    </ul>
                </div>

                <!-- Purchase Details -->
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px; color: #1e293b;">📋 Purchase Details</h3>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Ticket Type:</span>
                        <span style="float: right;">${ticket.ticketType}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Amount:</span>
                        <span style="float: right;">${ticket.currency} ${ticket.amount.toFixed(2)}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Previous Payment Method:</span>
                        <span style="float: right;">${ticket.paymentMethod}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Status:</span>
                        <span style="float: right; background: #dc2626; color: white; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold;">${ticket.paymentStatus}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0;">
                        <span style="font-weight: bold; color: #475569;">Original Attempt:</span>
                        <span style="float: right;">${new Date(ticket.createdAt).toLocaleString()}</span>
                    </div>
                </div>

                <!-- Security Info -->
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px; color: #92400e;">🔒 Secure Payment Options</h4>
                    <p style="margin: 0; color: #92400e; font-size: 14px;">
                        We accept multiple payment methods including QMoney, Orange Money, Card Payments, and Bank Transfers. 
                        All transactions are secured with industry-standard encryption.
                    </p>
                </div>

                <!-- Support Contact -->
                <div style="text-align: center; margin: 30px 0;">
                    <p style="color: #6b7280; font-size: 14px; margin-bottom: 15px;">
                        Need help with your payment? Contact our support team
                    </p>
                    <a href="mailto:${supportEmail}" style="color: #3b82f6; text-decoration: none; font-weight: bold;">
                        📧 ${supportEmail}
                    </a>
                </div>

                <!-- Footer Notice -->
                <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                        This follow-up is regarding transaction ${ticket.transactionReference}.<br/>
                        If you've already completed your purchase, please ignore this email.
                    </p>
                </div>
            </div>

            <!-- Email Footer -->
            <div style="background: #1e293b; color: white; padding: 15px; text-align: center; font-size: 12px;">
                <p style="margin: 0 0 5px;">
                    <strong>PyCon Senegambia 2025</strong><br/>
                    Building the Future of Python in West Africa
                </p>
                <p style="margin: 0; opacity: 0.8;">
                    Questions? Reply to this email or contact us at ${supportEmail}
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Sends follow-up email to a single ticket holder
 */
async function sendFollowUpEmail(
  ticket: FailedTicketPurchase, 
  retryPaymentLink: string
): Promise<void> {
  console.log('📧 Sending follow-up email:', {
    customerEmail: ticket.customerEmail,
    ticketType: ticket.ticketType,
    transactionReference: ticket.transactionReference,
    status: ticket.paymentStatus
  });

  if (!ticket.customerEmail) {
    throw new Error('Customer email is missing');
  }

  const emailHTML = await generateFollowUpEmailHTML(ticket, retryPaymentLink);
  const textContent = `Dear ${ticket.customerName},

Your ${ticket.ticketType} ticket purchase for PyCon Senegambia 2025 was not completed due to a payment issue.

Ticket Type: ${ticket.ticketType}
Amount: ${ticket.currency} ${ticket.amount.toFixed(2)}
Status: ${ticket.paymentStatus}
Transaction ID: ${ticket.transactionReference}

Please complete your purchase by visiting: ${retryPaymentLink}

Don't miss out on this amazing conference! For questions, contact ${EMAIL_CONFIG.supportEmail}.

PyCon Senegambia 2025`;

  const { data, error } = await resend.emails.send({
    from: EMAIL_CONFIG.fromEmail,
    to: [ticket.customerEmail],
    subject: `⚠️ Complete Your PyCon Senegambia 2025 Ticket Purchase - ${ticket.ticketType}`,
    html: emailHTML,
    text: textContent,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
  }

  console.log('✅ Follow-up email sent successfully:', data);
}

/**
 * Fetches failed tickets based on criteria
 */
async function getFailedTickets(
  ticketIds?: string[], 
  days: number = DEFAULT_DAYS_LOOKBACK
): Promise<FailedTicketPurchase[]> {
  if (ticketIds && ticketIds.length > 0) {
    // Fetch specific ticket IDs
    return await db.ticketPurchase.findMany({
      where: {
        id: { in: ticketIds },
        paymentStatus: { in: FAILED_STATUSES }
      }
    }) as FailedTicketPurchase[];
  } else {
    // Fetch all failed tickets within date range
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return await db.ticketPurchase.findMany({
      where: {
        paymentStatus: { in: FAILED_STATUSES },
        createdAt: { gte: cutoffDate }
      },
      orderBy: { createdAt: 'desc' }
    }) as FailedTicketPurchase[];
  }
}

/**
 * Processes multiple follow-up emails with error handling
 */
async function processFollowUpEmails(
  tickets: FailedTicketPurchase[], 
  retryPaymentLink: string
): Promise<{ emailsSent: number; errors: EmailResult[] }> {
  const results = {
    emailsSent: 0,
    errors: [] as EmailResult[]
  };

  for (const ticket of tickets) {
    try {
      await sendFollowUpEmail(ticket, retryPaymentLink);
      results.emailsSent++;
      
      // Update database to track the follow-up
      await db.ticketPurchase.update({
        where: { id: ticket.id },
        data: { updatedAt: new Date() }
      });
      
    } catch (emailError) {
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
      results.errors.push({
        ticketId: ticket.id,
        email: ticket.customerEmail,
        success: false,
        error: errorMessage
      });
      console.error(`❌ Failed to send email to ${ticket.customerEmail}:`, errorMessage);
    }
    
    // Add delay between emails to avoid rate limiting
    if (tickets.indexOf(ticket) < tickets.length - 1) {
      await new Promise(resolve => setTimeout(resolve, EMAIL_DELAY_MS));
    }
  }

  return results;
}

/**
 * GET endpoint - Fetch failed tickets for review
 */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    console.log('📊 Fetching failed ticket purchases...');
    
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get('days') || DEFAULT_DAYS_LOOKBACK.toString());
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    const failedTickets = await getFailedTickets(undefined, days);
    const limitedTickets = failedTickets.slice(0, limit);

    console.log(`📋 Found ${failedTickets.length} failed tickets in the last ${days} days (showing ${limitedTickets.length})`);

    return NextResponse.json({
      success: true,
      data: {
        tickets: limitedTickets,
        count: limitedTickets.length,
        totalCount: failedTickets.length,
        filters: { days, limit }
      }
    });

  } catch (error) {
    console.error('💥 Error fetching failed tickets:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to fetch tickets: ${errorMessage}` 
      },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint - Send follow-up emails
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    console.log('🚀 Processing follow-up email request...');
    
    const body: FollowUpRequestBody = await req.json();
    const { 
      ticketIds, 
      days = DEFAULT_DAYS_LOOKBACK, 
      sendToAll = false,
      retryPaymentLink = DEFAULT_RETRY_LINK
    } = body;

    // Validate request
    if (!sendToAll && (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Either provide ticketIds array or set sendToAll to true' 
        },
        { status: 400 }
      );
    }

    // Get failed tickets
    const failedTickets = await getFailedTickets(
      sendToAll ? undefined : ticketIds, 
      days
    );

    if (failedTickets.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No failed tickets found to send emails to',
        data: {
          emailsSent: 0,
          errors: [],
          ticketsProcessed: 0
        }
      });
    }

    console.log(`📤 Processing ${failedTickets.length} failed tickets for follow-up emails`);

    // Process follow-up emails
    const results = await processFollowUpEmails(failedTickets, retryPaymentLink);

    const successRate = (results.emailsSent / failedTickets.length * 100).toFixed(1);
    console.log(`✅ Follow-up campaign completed: ${results.emailsSent}/${failedTickets.length} emails sent (${successRate}% success rate)`);

    return NextResponse.json({
      success: true,
      message: `Follow-up emails processed: ${results.emailsSent} sent, ${results.errors.length} failed`,
      data: {
        emailsSent: results.emailsSent,
        errors: results.errors,
        ticketsProcessed: failedTickets.length,
        successRate: parseFloat(successRate)
      }
    });

  } catch (error) {
    console.error('💥 Error processing follow-up emails:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        success: false, 
        error: `Follow-up email error: ${errorMessage}` 
      },
      { status: 500 }
    );
  }
}