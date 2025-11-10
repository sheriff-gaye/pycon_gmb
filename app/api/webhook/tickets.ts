
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

function mapPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    'qmoney': 'QMoney',
    'orange_money': 'Orange Money',
    'card': 'Card Payment',
    'bank_transfer': 'Bank Transfer',
  };
  return methodMap[method] || method;
}

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

  if (metadata && typeof metadata === 'object') {
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

  const amountInMainCurrency = amount / 100; 
  
  if (amountInMainCurrency === 3) { // 300 cents = 3 units
    console.log('💡 Determined STUDENTS ticket by amount:', amountInMainCurrency);
    return 'STUDENTS';
  } else if (amountInMainCurrency === 10) { // 1000 cents = 10 units
    console.log('💡 Determined CORPORATE ticket by amount:', amountInMainCurrency);
    return 'CORPORATE';
  } else if (amountInMainCurrency === 5) { // 500 cents = 5 units
    console.log('💡 Determined INDIVIDUAL ticket by amount:', amountInMainCurrency);
    return 'INDIVIDUAL';
  }
  
  if (amountInMainCurrency <= 3.5) {
    console.log('💡 Defaulting to STUDENTS ticket based on range');
    return 'STUDENTS';
  } else if (amountInMainCurrency >= 8) {
    console.log('💡 Defaulting to CORPORATE ticket based on range');
    return 'CORPORATE';
  }
  
  console.log('💡 Defaulting to INDIVIDUAL ticket');
  return 'INDIVIDUAL';
}

async function generateQRCodeDataURL(data: string): Promise<string> {
  try {
   
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
    console.log('✅ Generated QR code URL:', qrCodeUrl);
    return qrCodeUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  }
}

async function getEmbeddedLogo(): Promise<string> {
  const logoUrl = 'https://www.pyconsenegambia.org/images/logo.png';
  return logoUrl;
}


async function generateTicketEmailHTML(ticketPurchase: TicketPurchase): Promise<string> {
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
  });

  const qrCodeUrl = await generateQRCodeDataURL(qrData);
  const logoUrl = await getEmbeddedLogo();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PyCon Senegambia 2025 - Ticket Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
            <div style="background: #667eea; color: white; padding: 20px; text-align: center;">
                <img src="${logoUrl}" alt="PyCon Senegambia Logo" style="max-width: 120px; height: auto; display: block; margin: 0 auto 10px;" />
                <h1 style="margin: 0; font-size: 24px;">🎉 Ticket Confirmed!</h1>
                <p style="margin: 10px 0 0 0;">Welcome to PyCon Senegambia 2025</p>
            </div>
            
            <div style="padding: 20px;">
                <h2 style="margin: 0 0 10px;">Hello ${ticketPurchase.customerName}!</h2>
                <p>Your ticket purchase has been confirmed. We're excited to have you join us at PyCon Senegambia 2025!</p>
                
                <div style="background: ${ticketTypeColor[ticketPurchase.ticketType]}; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">
                        ${ticketTypeEmoji[ticketPurchase.ticketType]} ${ticketPurchase.ticketType} TICKET
                    </div>
                    <div style="font-size: 14px; font-family: monospace;">
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

                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px; color: #1e293b;">📋 Purchase Details</h3>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Ticket Type:</span>
                        <span style="float: right;">${ticketPurchase.ticketType}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Amount Paid:</span>
                        <span style="float: right;">${ticketPurchase.currency} ${ticketPurchase.amount.toFixed(2)}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Payment Method:</span>
                        <span style="float: right;">${ticketPurchase.paymentMethod}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Transaction ID:</span>
                        <span style="float: right;">${ticketPurchase.transactionReference}</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0;">
                        <span style="font-weight: bold; color: #475569;">Status:</span>
                        <span style="float: right; background: #10B981; color: white; padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold;">Confirmed</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0;">
                        <span style="font-weight: bold; color: #475569;">Purchase Date:</span>
                        <span style="float: right;">${new Date(ticketPurchase.createdAt).toLocaleString()}</span>
                    </div>
                </div>

                <div style="text-align: center;">
                    <a href="#" style="display: inline-block; background: #10B981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Conference Schedule 📅</a>
                </div>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px; color: #92400e;">📝 Important Information</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 12px;">
                        <li>Please bring a valid ID to the conference</li>
                        <li>Show the QR code above for quick entry at the venue</li>
                        <li>This email serves as your ticket confirmation</li>
                        <li>Conference details will be sent closer to the event date</li>
                        <li>For questions, contact us at info@pyconsenegambia.org</li>
                    </ul>
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

async function sendTicketConfirmationEmail(ticketPurchase: TicketPurchase): Promise<void> {
  try {
    console.log('📧 Preparing to send confirmation email:', {
      customerEmail: ticketPurchase.customerEmail,
      ticketType: ticketPurchase.ticketType,
      transactionReference: ticketPurchase.transactionReference,
    });

    if (!ticketPurchase.customerEmail) {
      console.error('❌ No customer email provided');
      throw new Error('Customer email is missing');
    }

    const emailHTML = await generateTicketEmailHTML(ticketPurchase);
    console.log('📄 Generated email HTML length:', emailHTML.length);

    const { data, error } = await resend.emails.send({
      from: 'PyCon Senegambia <info@pyconsenegambia.org>',
      to: [ticketPurchase.customerEmail],
      subject: `Your PyCon Senegambia 2025 Ticket is Confirmed! - ${ticketPurchase.ticketType}`,
      html: emailHTML,
      text: `Dear ${ticketPurchase.customerName},\n\nYour ${ticketPurchase.ticketType} ticket for PyCon Senegambia 2025 is confirmed!\n\nTicket ID: ${ticketPurchase.transactionReference}\nAmount Paid: ${ticketPurchase.currency} ${ticketPurchase.amount.toFixed(2)}\nPayment Method: ${ticketPurchase.paymentMethod}\nPurchase Date: ${new Date(ticketPurchase.createdAt).toLocaleString()}\n\nPlease bring a valid ID and this ticket ID to the conference. For questions, contact info@pyconsenegambia.org.\n\nPyCon Senegambia 2025`, // Plain-text fallback
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
    }

    console.log('✅ Email sent successfully:', data);

  } catch (error) {
    console.error('💥 Error sending confirmation email:', error);
    throw error;
  }
}
export async function POST(req: Request): Promise<NextResponse> {
  try {
    console.log('🚀 Webhook received');
    
    const body = await req.text();
    console.log('📄 Raw body length:', body.length);
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
          await sendTicketConfirmationEmail(updatedPurchase as TicketPurchase);
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
        amount: payload.amount, // Convert from cents to main currency
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
        createdAt: new Date(payload.createdAt),
        updatedAt: new Date(payload.updatedAt)
      }
    });

    console.log(`🎉 Successfully created ticket purchase: ${ticketPurchase.id}`);

    // Send confirmation email
    try {
      await sendTicketConfirmationEmail(ticketPurchase as TicketPurchase);
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

// ... (rest of your handler functions remain the same)
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
          amount: payload.amount,
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

      if (paymentStatus === 'COMPLETED' && existingPurchase.paymentStatus !== 'COMPLETED') {
        try {
          await sendTicketConfirmationEmail(updatedPurchase as TicketPurchase);
          console.log('📧 Confirmation email sent for updated payment');
        } catch (emailError) {
          console.error('⚠️ Failed to send email for updated payment:', emailError);
        }
      }
    }

    console.log(`🔄 Handled updated payment: ${payload.id}`);
    
  } catch (error) {
    console.error('errror')
  }
}
