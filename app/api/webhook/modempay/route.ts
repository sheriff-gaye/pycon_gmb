import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define proper types
type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
type TicketType = 'STUDENTS' | 'INDIVIDUAL' | 'CORPORATE';

interface PaymentMetadata {
  os?: string;
  browser?: string;
  ipAddress?: string;
  timestamp?: string;
  deviceType?: string;
  urlIPAddress?: string;
  screenResolution?: string;
}

interface ModemPayWebhookPayload {
  id: string;
  type: string;
  amount: number;
  currency: string;
  payment_method: string;
  customer: string;
  metadata: Record<string, unknown> | null;
  status: string;
  payment_link_id?: string;
  custom_fields_values: Record<string, unknown> | null;
  business_id: string;
  account_id: string;
  test_mode: boolean;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  createdAt: string;
  updatedAt: string;
  payment_account: string;
  payment_metadata: PaymentMetadata | null;
  payment_intent_id: string;
  transaction_reference: string;
  payment_method_id: string;
}

interface ModemPayWebhookEvent {
  event: string;
  payload: ModemPayWebhookPayload;
}

interface TicketPurchase {
  id: string;
  ticketType: TicketType;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentStatus: PaymentStatus;
  transactionReference: string;
  paymentIntentId: string;
  modemPayChargeId: string;
  paymentMethod: string;
  testMode: boolean;
  paymentMetadata: PaymentMetadata | null;
  customFields: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

// Map payment method to readable format
function mapPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    'qmoney': 'QMoney',
    'orange_money': 'Orange Money',
    'card': 'Card Payment',
    'bank_transfer': 'Bank Transfer',
  };
  return methodMap[method] || method;
}

// Enhanced ticket type determination with better logging
function determineTicketType(
  metadata: Record<string, unknown> | null, 
  customFields: Record<string, unknown> | null,
  amount: number,
  paymentLinkId?: string
): TicketType {
  
  console.log('🎫 Determining ticket type with data:', {
    metadata,
    customFields,
    amount,
    paymentLinkId
  });

  // Check metadata first (most reliable)
  if (metadata && typeof metadata === 'object') {
    // Check various possible metadata keys
    const possibleKeys = ['ticketType', 'ticket_type', 'type', 'category'];
    
    for (const key of possibleKeys) {
      if (metadata[key] && typeof metadata[key] === 'string') {
        const ticketType = metadata[key].toString().toUpperCase();
        console.log(`📝 Found ticket type in metadata.${key}:`, ticketType);
        if (['STUDENTS', 'INDIVIDUAL', 'CORPORATE'].includes(ticketType)) {
          return ticketType as TicketType;
        }
      }
    }
  }
  
  // Check custom fields
  if (customFields && typeof customFields === 'object') {
    const possibleKeys = ['ticket_type', 'ticketType', 'type', 'category'];
    
    for (const key of possibleKeys) {
      if (customFields[key] && typeof customFields[key] === 'string') {
        const ticketType = customFields[key].toString().toUpperCase();
        console.log(`📝 Found ticket type in customFields.${key}:`, ticketType);
        if (['STUDENTS', 'INDIVIDUAL', 'CORPORATE'].includes(ticketType)) {
          return ticketType as TicketType;
        }
      }
    }
  }

  // Fallback: Determine by amount (you'll need to adjust these amounts)
  // This is a backup method - you should configure your payment links with proper metadata
  const amountInMainCurrency = amount / 100; // Convert from cents
  
  if (amountInMainCurrency <= 1000) { // Assuming student tickets are cheapest
    console.log('💡 Determined STUDENTS ticket by amount:', amountInMainCurrency);
    return 'STUDENTS';
  } else if (amountInMainCurrency >= 5000) { // Assuming corporate tickets are most expensive
    console.log('💡 Determined CORPORATE ticket by amount:', amountInMainCurrency);
    return 'CORPORATE';
  }
  
  console.log('💡 Defaulting to INDIVIDUAL ticket');
  return 'INDIVIDUAL';
}

// Email template function
function generateTicketEmailHTML(ticketPurchase: TicketPurchase, logoPath: string): string {
  const ticketTypeEmoji: Record<TicketType, string> = {
    'STUDENTS': '🎓',
    'INDIVIDUAL': '👤',
    'CORPORATE': '🏢'
  };

  const ticketTypeColor: Record<TicketType, string> = {
    'STUDENTS': '#10B981', // green
    'INDIVIDUAL': '#3B82F6', // blue
    'CORPORATE': '#8B5CF6'  // purple
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PyCon Senegambia 2024 - Ticket Confirmation</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0; 
                padding: 0; 
                background-color: #f8fafc; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
            }
            .logo {
                max-width: 120px;
                height: auto;
                margin-bottom: 20px;
            }
            .content { 
                padding: 40px 30px; 
            }
            .ticket-card {
                background: linear-gradient(135deg, ${ticketTypeColor[ticketPurchase.ticketType]} 0%, ${ticketTypeColor[ticketPurchase.ticketType]}CC 100%);
                color: white;
                padding: 25px;
                border-radius: 12px;
                margin: 25px 0;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            .ticket-card::before {
                content: '';
                position: absolute;
                top: -50%;
                right: -50%;
                width: 200%;
                height: 200%;
                background: repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(255,255,255,0.1) 10px,
                    rgba(255,255,255,0.1) 20px
                );
                animation: shimmer 3s linear infinite;
            }
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            .ticket-type {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .ticket-id {
                font-size: 16px;
                opacity: 0.9;
                font-family: 'Courier New', monospace;
            }
            .details {
                background: #f8fafc;
                padding: 25px;
                border-radius: 8px;
                margin: 25px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin: 12px 0;
                padding: 8px 0;
                border-bottom: 1px solid #e2e8f0;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .label {
                font-weight: 600;
                color: #475569;
            }
            .value {
                color: #1e293b;
                font-weight: 500;
            }
            .footer {
                background: #1e293b;
                color: white;
                padding: 30px;
                text-align: center;
                font-size: 14px;
            }
            .cta-button {
                display: inline-block;
                background: #10B981;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                margin: 20px 0;
                transition: background-color 0.3s;
            }
            .cta-button:hover {
                background: #059669;
            }
            .status-badge {
                display: inline-block;
                background: #10B981;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="${logoPath}" alt="PyCon Senegambia Logo" class="logo" />
                <h1 style="margin: 0; font-size: 28px;">🎉 Ticket Confirmed!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Welcome to PyCon Senegambia 2024</p>
            </div>
            
            <div class="content">
                <h2>Hello ${ticketPurchase.customerName}! 👋</h2>
                <p>Congratulations! Your ticket purchase has been confirmed. We're excited to have you join us at PyCon Senegambia 2024!</p>
                
                <div class="ticket-card">
                    <div class="ticket-type">
                        ${ticketTypeEmoji[ticketPurchase.ticketType]} ${ticketPurchase.ticketType} TICKET
                    </div>
                    <div class="ticket-id">
                        ID: ${ticketPurchase.transactionReference}
                    </div>
                </div>

                <div class="details">
                    <h3 style="margin-top: 0; color: #1e293b;">📋 Purchase Details</h3>
                    <div class="detail-row">
                        <span class="label">Ticket Type:</span>
                        <span class="value">${ticketPurchase.ticketType}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Amount Paid:</span>
                        <span class="value">${ticketPurchase.currency} ${ticketPurchase.amount.toFixed(2)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Payment Method:</span>
                        <span class="value">${ticketPurchase.paymentMethod}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Transaction ID:</span>
                        <span class="value">${ticketPurchase.transactionReference}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Status:</span>
                        <span class="value"><span class="status-badge">Confirmed</span></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Purchase Date:</span>
                        <span class="value">${new Date(ticketPurchase.createdAt).toLocaleString()}</span>
                    </div>
                </div>

                <div style="text-align: center;">
                    <a href="#" class="cta-button">View Conference Schedule 📅</a>
                </div>

                <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
                    <h4 style="margin-top: 0; color: #92400e;">📝 Important Information</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #92400e;">
                        <li>Please bring a valid ID to the conference</li>
                        <li>This email serves as your ticket confirmation</li>
                        <li>Conference details will be sent closer to the event date</li>
                        <li>For questions, contact us at support@pyconsenegambia.org</li>
                    </ul>
                </div>
            </div>

            <div class="footer">
                <p style="margin: 0 0 10px 0;">
                    <strong>PyCon Senegambia 2024</strong><br/>
                    Building the Future of Python in West Africa
                </p>
                <p style="margin: 0; opacity: 0.8; font-size: 12px;">
                    This is an automated confirmation email. Please do not reply to this email.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// Send confirmation email
async function sendTicketConfirmationEmail(
  ticketPurchase: TicketPurchase, 
  logoPath: string = "/logo.png"
): Promise<void> {
  try {
    console.log('📧 Sending confirmation email to:', ticketPurchase.customerEmail);

    const emailHTML = generateTicketEmailHTML(ticketPurchase, logoPath);

    const { data, error } = await resend.emails.send({
      from: 'PyCon Senegambia <noreply@pyconsenegambia.org>', // Update with your domain
      to: [ticketPurchase.customerEmail],
      subject: `🎉 Your PyCon Senegambia 2024 Ticket is Confirmed! - ${ticketPurchase.ticketType}`,
      html: emailHTML,
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
    }

    console.log('✅ Email sent successfully:', data);

  } catch (error) {
    console.error('💥 Failed to send confirmation email:', error);
    throw error;
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    console.log('🚀 Webhook received');
    
    const body = await req.text();
    console.log('📄 Raw body length:', body.length);

    // Parse the event
    let event: ModemPayWebhookEvent;
    try {
      event = JSON.parse(body) as ModemPayWebhookEvent;
      console.log('✅ Parsed event type:', event.event);
      console.log('💰 Amount:', event.payload?.amount);
      console.log('📋 Metadata:', event.payload?.metadata);
      console.log('📝 Custom fields:', event.payload?.custom_fields_values);
    } catch (error) {
      console.error('❌ Invalid JSON payload:', error);
      return new NextResponse('Invalid JSON payload', { status: 400 });
    }

    console.log(`🎯 Processing event: ${event.event}`);

    // Handle different event types
    switch (event.event) {
      case 'charge.succeeded':
        await handleSuccessfulPayment(event.payload);
        console.log('✅ Successfully processed charge.succeeded');
        break;
        
      case 'charge.failed':
        await handleFailedPayment(event.payload);
        console.log('⚠️ Successfully processed charge.failed');
        break;
        
      case 'charge.cancelled':
        await handleCancelledPayment(event.payload);
        console.log('⚠️ Successfully processed charge.cancelled');
        break;
        
      case 'charge.created':
        await handlePendingPayment(event.payload);
        console.log('⏳ Successfully processed charge.created');
        break;
        
      case 'charge.updated':
        await handleUpdatedPayment(event.payload);
        console.log('🔄 Successfully processed charge.updated');
        break;
        
      case 'payment_intent.created':
        console.log('💡 Payment intent created - no action needed');
        break;
        
      default:
        console.log(`❓ Unhandled event type: ${event.event}`);
        break;
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });

  } catch (error) {
    console.error('💥 Webhook processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 500 });
  }
}

async function handleSuccessfulPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('💰 Handling successful payment:', payload.id);

    // Check if this transaction already exists
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: {
        modemPayChargeId: payload.id
      }
    });

    if (existingPurchase) {
      console.log(`🔄 Transaction ${payload.id} already exists, updating status`);
      
      if (existingPurchase.paymentStatus !== 'COMPLETED') {
        const updatedPurchase = await db.ticketPurchase.update({
          where: {
            modemPayChargeId: payload.id
          },
          data: {
            paymentStatus: 'COMPLETED',
            updatedAt: new Date()
          }
        });
        console.log(`✅ Updated transaction ${payload.id} to COMPLETED`);
        
        // Send email for newly completed payments
        try {
          await sendTicketConfirmationEmail(updatedPurchase as TicketPurchase, process.env.LOGO_PATH || "/logo.png");
        } catch (emailError) {
          console.error('⚠️ Failed to send email, but payment processed:', emailError);
        }
      }
      return;
    }

    // Determine ticket type with enhanced detection
    const ticketType = determineTicketType(
      payload.metadata, 
      payload.custom_fields_values, 
      payload.amount,
      payload.payment_link_id
    );
    console.log('🎫 Determined ticket type:', ticketType);

    // Create new ticket purchase record
    const ticketPurchase = await db.ticketPurchase.create({
      data: {
        ticketType: ticketType,
        amount: payload.amount / 100, // Convert from cents
        currency: payload.currency,
        customerName: payload.customer_name,
        customerEmail: payload.customer_email,
        customerPhone: payload.customer_phone,
        paymentStatus: 'COMPLETED',
        transactionReference: payload.transaction_reference,
        paymentIntentId: payload.payment_intent_id,
        modemPayChargeId: payload.id,
        paymentMethod: mapPaymentMethod(payload.payment_method),
        testMode: payload.test_mode,
        // paymentMetadata: payload.payment_metadata,
        // customFields: payload.custom_fields_values,
        createdAt: new Date(payload.createdAt),
        updatedAt: new Date(payload.updatedAt)
      }
    });

    console.log(`🎉 Successfully created ticket purchase: ${ticketPurchase.id}`);

    // Send confirmation email
    try {
      await sendTicketConfirmationEmail(ticketPurchase as TicketPurchase, process.env.LOGO_PATH || "/logo.png");
      console.log('📧 Confirmation email sent successfully');
    } catch (emailError) {
      console.error('⚠️ Failed to send confirmation email:', emailError);
      // Don't throw error - payment is still successful
    }

  } catch (error) {
    console.error('💥 Error handling successful payment:', error);
    throw error;
  }
}

async function handleFailedPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('❌ Handling failed payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: {
        modemPayChargeId: payload.id
      }
    });

    if (existingPurchase) {
      await db.ticketPurchase.update({
        where: {
          modemPayChargeId: payload.id
        },
        data: {
          paymentStatus: 'FAILED',
          updatedAt: new Date()
        }
      });
    } else {
      const ticketType = determineTicketType(
        payload.metadata, 
        payload.custom_fields_values, 
        payload.amount,
        payload.payment_link_id
      );
      
      await db.ticketPurchase.create({
        data: {
          ticketType: ticketType,
          amount: payload.amount / 100,
          currency: payload.currency,
          customerName: payload.customer_name,
          customerEmail: payload.customer_email,
          customerPhone: payload.customer_phone,
          paymentStatus: 'FAILED',
          transactionReference: payload.transaction_reference,
          paymentIntentId: payload.payment_intent_id,
          modemPayChargeId: payload.id,
          paymentMethod: mapPaymentMethod(payload.payment_method),
          testMode: payload.test_mode,
          // paymentMetadata: payload.payment_metadata,
          // customFields: payload.custom_fields_values,
          createdAt: new Date(payload.createdAt),
          updatedAt: new Date(payload.updatedAt)
        }
      });
    }

    console.log(`⚠️ Handled failed payment: ${payload.id}`);
    
  } catch (error) {
    console.error('💥 Error handling failed payment:', error);
    throw error;
  }
}

async function handleCancelledPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('🚫 Handling cancelled payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: {
        modemPayChargeId: payload.id
      }
    });

    if (existingPurchase) {
      await db.ticketPurchase.update({
        where: {
          modemPayChargeId: payload.id
        },
        data: {
          paymentStatus: 'CANCELLED',
          updatedAt: new Date()
        }
      });
    }

    console.log(`🚫 Handled cancelled payment: ${payload.id}`);
    
  } catch (error) {
    console.error('💥 Error handling cancelled payment:', error);
    throw error;
  }
}

async function handlePendingPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('⏳ Handling pending payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: {
        modemPayChargeId: payload.id
      }
    });

    if (existingPurchase) {
      await db.ticketPurchase.update({
        where: {
          modemPayChargeId: payload.id
        },
        data: {
          paymentStatus: 'PENDING',
          updatedAt: new Date()
        }
      });
    } else {
      const ticketType = determineTicketType(
        payload.metadata, 
        payload.custom_fields_values, 
        payload.amount,
        payload.payment_link_id
      );
      
      await db.ticketPurchase.create({
        data: {
          ticketType: ticketType,
          amount: payload.amount / 100,
          currency: payload.currency,
          customerName: payload.customer_name,
          customerEmail: payload.customer_email,
          customerPhone: payload.customer_phone,
          paymentStatus: 'PENDING',
          transactionReference: payload.transaction_reference,
          paymentIntentId: payload.payment_intent_id,
          modemPayChargeId: payload.id,
          paymentMethod: mapPaymentMethod(payload.payment_method),
          testMode: payload.test_mode,
          // paymentMetadata: payload.payment_metadata,
          // customFields: payload.custom_fields_values,
          createdAt: new Date(payload.createdAt),
          updatedAt: new Date(payload.updatedAt)
        }
      });
    }

    console.log(`⏳ Handled pending payment: ${payload.id}`);
    
  } catch (error) {
    console.error('💥 Error handling pending payment:', error);
    throw error;
  }
}

async function handleUpdatedPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('🔄 Handling updated payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: {
        modemPayChargeId: payload.id
      }
    });

    if (existingPurchase) {
      let paymentStatus: PaymentStatus = 'PENDING';
      
      switch (payload.status.toLowerCase()) {
        case 'completed':
          paymentStatus = 'COMPLETED';
          break;
        case 'failed':
          paymentStatus = 'FAILED';
          break;
        case 'cancelled':
          paymentStatus = 'CANCELLED';
          break;
        default:
          paymentStatus = 'PENDING';
      }

      const updatedPurchase = await db.ticketPurchase.update({
        where: {
          modemPayChargeId: payload.id
        },
        data: {
          paymentStatus: paymentStatus,
          // paymentMetadata: payload.payment_metadata || {},
          // customFields: payload.custom_fields_values || {},
          updatedAt: new Date(payload.updatedAt)
        }
      });

      // Send confirmation email if status changed to completed
      if (paymentStatus === 'COMPLETED' && existingPurchase.paymentStatus !== 'COMPLETED') {
        try {
          await sendTicketConfirmationEmail(updatedPurchase as TicketPurchase, process.env.LOGO_PATH || "/logo.png");
          console.log('📧 Confirmation email sent for updated payment');
        } catch (emailError) {
          console.error('⚠️ Failed to send email for updated payment:', emailError);
        }
      }
    }

    console.log(`🔄 Handled updated payment: ${payload.id}`);
    
  } catch (error) {
    console.error('💥 Error handling updated payment:', error);
    throw error;
  }
}