import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
type TicketType = 'STUDENTS' | 'INDIVIDUAL' | 'CORPORATE';
type OrderStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PROCESSING';

interface PaymentMetadata {
  os?: string;
  browser?: string;
  ipAddress?: string;
  timestamp?: string;
  deviceType?: string;
  urlIPAddress?: string;
  screenResolution?: string;
  orderId?: string; // For ecommerce orders
  type?: 'ticket' | 'order'; // To distinguish payment types
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

// ============================================
// UTILITY FUNCTIONS
// ============================================

function mapPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    'qmoney': 'QMoney',
    'orange_money': 'Orange Money',
    'card': 'Card Payment',
    'bank_transfer': 'Bank Transfer',
  };
  return methodMap[method] || method;
}

function determinePaymentType(payload: ModemPayWebhookPayload): 'ticket' | 'order' {
  // Check metadata first
  if (payload.metadata?.type === 'order' || payload.metadata?.orderId) {
    console.log('🛍️ Detected ECOMMERCE payment from metadata');
    return 'order';
  }

  if (payload.metadata?.type === 'ticket') {
    console.log('🎫 Detected TICKET payment from metadata');
    return 'ticket';
  }

  // Check custom fields
  if (payload.custom_fields_values?.orderId) {
    console.log('🛍️ Detected ECOMMERCE payment from custom fields');
    return 'order';
  }

  // Check payment link ID patterns (if you use different links)
  if (payload.payment_link_id?.includes('store') || payload.payment_link_id?.includes('shop')) {
    console.log('🛍️ Detected ECOMMERCE payment from payment link');
    return 'order';
  }

  // Default to ticket for backward compatibility
  console.log('🎫 Defaulting to TICKET payment');
  return 'ticket';
}

// ============================================
// TICKET-SPECIFIC FUNCTIONS
// ============================================

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
  
  if (amountInMainCurrency === 3) {
    console.log('💡 Determined STUDENTS ticket by amount:', amountInMainCurrency);
    return 'STUDENTS';
  } else if (amountInMainCurrency === 10) {
    console.log('💡 Determined CORPORATE ticket by amount:', amountInMainCurrency);
    return 'CORPORATE';
  } else if (amountInMainCurrency === 5) {
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
  console.log('✅ Using logo URL:', logoUrl);
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
    console.log('📧 Preparing to send ticket confirmation email:', {
      customerEmail: ticketPurchase.customerEmail,
      ticketType: ticketPurchase.ticketType,
      transactionReference: ticketPurchase.transactionReference,
    });

    if (!ticketPurchase.customerEmail) {
      console.error('❌ No customer email provided');
      throw new Error('Customer email is missing');
    }

    const emailHTML = await generateTicketEmailHTML(ticketPurchase);

    const { data, error } = await resend.emails.send({
      from: 'PyCon Senegambia <noreply@pyconsenegambia.org>',
      to: [ticketPurchase.customerEmail],
      subject: `🎉 Your PyCon Senegambia 2025 Ticket is Confirmed! - ${ticketPurchase.ticketType}`,
      html: emailHTML,
      text: `Dear ${ticketPurchase.customerName},\n\nYour ${ticketPurchase.ticketType} ticket for PyCon Senegambia 2025 is confirmed!\n\nTicket ID: ${ticketPurchase.transactionReference}\nAmount Paid: ${ticketPurchase.currency} ${ticketPurchase.amount.toFixed(2)}\nPayment Method: ${ticketPurchase.paymentMethod}\nPurchase Date: ${new Date(ticketPurchase.createdAt).toLocaleString()}\n\nPlease bring a valid ID and this ticket ID to the conference. For questions, contact info@pyconsenegambia.org.\n\nPyCon Senegambia 2025`,
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`);
    }

    console.log('✅ Email sent successfully:', data);

  } catch (error) {
    console.error('💥 Error sending ticket confirmation email:', error);
    throw error;
  }
}

// ============================================
// ECOMMERCE-SPECIFIC FUNCTIONS
// ============================================

async function generateOptimizedOrderEmailHTML(order: any): Promise<string> {
  const orderItems = await db.orderItem.findMany({
    where: { orderId: order.id },
    include: { product: true }
  });

  // Build simple text list instead of image-heavy HTML
  const itemsList = orderItems.map(item => 
    `• ${item.productName} x${item.quantity} - D${item.subtotal.toFixed(2)}`
  ).join('\n');

  const shippingAddress = order.shippingAddress 
    ? JSON.parse(order.shippingAddress) 
    : null;

  // Simplified, lightweight HTML - under 100KB
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px 0">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;max-width:100%">
                    
                    <tr>
                        <td style="background:linear-gradient(135deg,#667eea,#764ba2);padding:30px;text-align:center">
                            <h1 style="margin:0;color:#fff;font-size:24px">Order Confirmed! 🎉</h1>
                            <p style="margin:10px 0 0;color:#fff;font-size:14px">Thank you for your purchase</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:30px">
                            <div style="background:#f8f9fa;padding:15px;border-radius:6px;margin-bottom:20px">
                                <p style="margin:0;font-size:16px;font-weight:bold">Order #${order.id.substring(0, 8).toUpperCase()}</p>
                                <p style="margin:5px 0 0;color:#666;font-size:14px">
                                    Date: ${new Date(order.createdAt).toLocaleDateString()}<br/>
                                    Status: <span style="color:#10B981;font-weight:bold">Confirmed</span>
                                </p>
                            </div>

                            <h3 style="margin:20px 0 10px;font-size:16px">Order Items:</h3>
                            <div style="background:#f8f9fa;padding:15px;border-radius:6px;margin-bottom:20px">
                                <pre style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.8;white-space:pre-wrap">${itemsList}</pre>
                            </div>

                            <div style="border-top:2px solid #e5e7eb;padding-top:15px;margin-top:20px">
                                <table width="100%" cellpadding="5">
                                    <tr>
                                        <td style="text-align:right;font-size:18px;font-weight:bold">Total:</td>
                                        <td style="text-align:right;font-size:18px;font-weight:bold;color:#667eea">${order.currency} ${order.totalAmount.toFixed(2)}</td>
                                    </tr>
                                </table>
                            </div>

                            ${shippingAddress ? `
                            <div style="background:#fef3c7;padding:15px;border-radius:6px;border-left:3px solid #f59e0b;margin-top:20px">
                                <h4 style="margin:0 0 10px;font-size:14px;color:#92400e">📦 Shipping Address</h4>
                                <p style="margin:0;color:#92400e;font-size:13px;line-height:1.5">
                                    ${shippingAddress.street}<br/>
                                    ${shippingAddress.city}, ${shippingAddress.state}<br/>
                                    ${shippingAddress.country} ${shippingAddress.postalCode}
                                </p>
                            </div>
                            ` : ''}

                            <div style="background:#e0e7ff;padding:15px;border-radius:6px;margin-top:20px">
                                <p style="margin:0;color:#3730a3;font-size:13px">
                                    <strong>Transaction ID:</strong> ${order.transactionReference || 'Processing'}<br/>
                                    <strong>Payment Status:</strong> Completed
                                </p>
                            </div>

                            <div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb">
                                <p style="margin:0;color:#666;font-size:13px">
                                    Questions? Contact us at<br/>
                                    <a href="mailto:shop@pyconsenegambia.org" style="color:#667eea;text-decoration:none">shop@pyconsenegambia.org</a>
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#1e293b;color:#fff;padding:20px;text-align:center;font-size:12px">
                            <strong>PyCon Senegambia Store</strong><br/>
                            Official Conference Merchandise
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}


async function sendOrderConfirmationEmail(order: any): Promise<void> {
  try {
    console.log('📧 Sending order confirmation:', order.id);

    const emailHTML = await generateOptimizedOrderEmailHTML(order);

    // Check email size
    const emailSize = Buffer.byteLength(emailHTML, 'utf8');
    console.log(`📊 Email size: ${(emailSize / 1024).toFixed(2)}KB`);

    if (emailSize > 100000) {
      console.warn('⚠️ Email might be truncated (>100KB)');
    }

    const { data, error } = await resend.emails.send({
      from: 'PyCon Senegambia Store <shop@pyconsenegambia.org>',
      to: [order.customerEmail],
      subject: `Order Confirmation #${order.id.substring(0, 8).toUpperCase()} - PyCon Store`,
      html: emailHTML,
      text: `Dear ${order.customerName},

Your order #${order.id.substring(0, 8).toUpperCase()} has been confirmed!

Order Total: ${order.currency} ${order.totalAmount.toFixed(2)}
Payment Status: Completed
Transaction ID: ${order.transactionReference || 'Processing'}

For questions, contact shop@pyconsenegambia.org

PyCon Senegambia Store`
    });

    if (error) {
      console.error('❌ Email error:', error);
      throw error;
    }

    console.log('✅ Email sent:', data?.id);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    // Don't throw - order is still valid
  }
}

// ============================================
// MAIN WEBHOOK HANDLER
// ============================================

export async function POST(req: Request): Promise<NextResponse> {
  try {
    console.log('🚀 Global Webhook received');
    
    const body = await req.text();
    console.log('📄 Raw body length:', body.length);
    
    let event: ModemPayWebhookEvent;
    try {
      event = JSON.parse(body) as ModemPayWebhookEvent;
      console.log('✅ Parsed event type:', event.event);
      console.log('💰 Amount:', event.payload?.amount);
      console.log('📋 Metadata:', event.payload?.metadata);
    } catch (error) {
      console.error('❌ Invalid JSON payload:', error);
      return new NextResponse('Invalid JSON payload', { status: 400 });
    }

    // Determine payment type (ticket or order)
    const paymentType = determinePaymentType(event.payload);
    console.log(`🎯 Payment type detected: ${paymentType.toUpperCase()}`);

    // Route to appropriate handler based on event and payment type
    switch (event.event) {
      case 'charge.succeeded':
        if (paymentType === 'ticket') {
          await handleSuccessfulTicketPayment(event.payload);
        } else {
          await handleSuccessfulOrderPayment(event.payload);
        }
        console.log('✅ Successfully processed charge.succeeded');
        break;
        
      case 'charge.failed':
        if (paymentType === 'ticket') {
          await handleFailedTicketPayment(event.payload);
        } else {
          await handleFailedOrderPayment(event.payload);
        }
        console.log('⚠️ Successfully processed charge.failed');
        break;
        
      case 'charge.cancelled':
        if (paymentType === 'ticket') {
          await handleCancelledTicketPayment(event.payload);
        } else {
          await handleCancelledOrderPayment(event.payload);
        }
        console.log('⚠️ Successfully processed charge.cancelled');
        break;
        
      case 'charge.created':
        if (paymentType === 'ticket') {
          await handlePendingTicketPayment(event.payload);
        }
        console.log('⏳ Successfully processed charge.created');
        break;
        
      case 'charge.updated':
        if (paymentType === 'ticket') {
          await handleUpdatedTicketPayment(event.payload);
        }
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

// ============================================
// TICKET PAYMENT HANDLERS
// ============================================

async function handleSuccessfulTicketPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('🎫 Handling successful ticket payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: { modemPayChargeId: payload.id }
    });

    if (existingPurchase) {
      console.log(`🔄 Ticket transaction ${payload.id} already exists, updating status`);
      
      if (existingPurchase.paymentStatus !== 'COMPLETED') {
        const updatedPurchase = await db.ticketPurchase.update({
          where: { modemPayChargeId: payload.id },
          data: {
            paymentStatus: 'COMPLETED',
            updatedAt: new Date()
          }
        });
        console.log(`✅ Updated ticket transaction ${payload.id} to COMPLETED`);
        
        try {
          await sendTicketConfirmationEmail(updatedPurchase as TicketPurchase);
        } catch (emailError) {
          console.error('⚠️ Failed to send ticket email:', emailError);
        }
      }
      return;
    }

    const ticketType = determineTicketType(
      payload.metadata, 
      payload.custom_fields_values, 
      payload.amount,
      payload.payment_link_id
    );
    console.log('🎫 Determined ticket type:', ticketType);

    const ticketPurchase = await db.ticketPurchase.create({
      data: {
        ticketType: ticketType,
        amount: payload.amount,
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

    try {
      await sendTicketConfirmationEmail(ticketPurchase as TicketPurchase);
      console.log('📧 Ticket confirmation email sent successfully');
    } catch (emailError) {
      console.error('⚠️ Failed to send ticket confirmation email:', emailError);
    }

  } catch (error) {
    console.error('💥 Error handling successful ticket payment:', error);
    throw error;
  }
}

async function handleFailedTicketPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('❌ Handling failed ticket payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: { modemPayChargeId: payload.id }
    });

    if (existingPurchase) {
      await db.ticketPurchase.update({
        where: { modemPayChargeId: payload.id },
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
          createdAt: new Date(payload.createdAt),
          updatedAt: new Date(payload.updatedAt)
        }
      });
    }

    console.log(`⚠️ Handled failed ticket payment: ${payload.id}`);
    
  } catch (error) {
    console.error('💥 Error handling failed ticket payment:', error);
    throw error;
  }
}

async function handleCancelledTicketPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('🚫 Handling cancelled ticket payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: { modemPayChargeId: payload.id }
    });

    if (existingPurchase) {
      await db.ticketPurchase.update({
        where: { modemPayChargeId: payload.id },
        data: {
          paymentStatus: 'CANCELLED',
          updatedAt: new Date()
        }
      });
    }

    console.log(`🚫 Handled cancelled ticket payment: ${payload.id}`);
    
  } catch (error) {
    console.error('💥 Error handling cancelled ticket payment:', error);
    throw error;
  }
}

async function handlePendingTicketPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('⏳ Handling pending ticket payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: { modemPayChargeId: payload.id }
    });

    if (existingPurchase) {
      await db.ticketPurchase.update({
        where: { modemPayChargeId: payload.id },
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
          createdAt: new Date(payload.createdAt),
          updatedAt: new Date(payload.updatedAt)
        }
      });
    }

    console.log(`⏳ Handled pending ticket payment: ${payload.id}`);
    
  } catch (error) {
    console.error('💥 Error handling pending ticket payment:', error);
    throw error;
  }
}

async function handleUpdatedTicketPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('🔄 Handling updated ticket payment:', payload.id);
    
    const existingPurchase = await db.ticketPurchase.findUnique({
      where: { modemPayChargeId: payload.id }
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
        where: { modemPayChargeId: payload.id },
        data: {
          paymentStatus: paymentStatus,
          updatedAt: new Date(payload.updatedAt)
        }
      });

      if (paymentStatus === 'COMPLETED' && existingPurchase.paymentStatus !== 'COMPLETED') {
        try {
          await sendTicketConfirmationEmail(updatedPurchase as TicketPurchase);
          console.log('📧 Confirmation email sent for updated ticket payment');
        } catch (emailError) {
          console.error('⚠️ Failed to send email for updated ticket payment:', emailError);
        }
      }
    }

    console.log(`🔄 Handled updated ticket payment: ${payload.id}`);
    
  } catch (error) {
    console.error('💥 Error handling updated ticket payment:', error);
    throw error;
  }
}

// ============================================
// ECOMMERCE ORDER HANDLERS
// ============================================

async function handleSuccessfulOrderPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('🛍️ Handling successful order payment:', payload.id);
    
    const orderId = payload.metadata?.orderId as string;

    if (!orderId) {
      throw new Error('Order ID not found in metadata');
    }

    console.log(`🔍 Looking up order ${orderId}`);

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

    if (order.status === 'COMPLETED') {
      console.log(`⚠️ Order ${orderId} already completed - skipping`);
      return;
    }

    const existingOrder = await db.order.findFirst({
      where: {
        modemPayChargeId: payload.id,
        status: 'COMPLETED'
      }
    });

    if (existingOrder) {
      console.log(`⚠️ Charge ${payload.id} already processed - skipping`);
      return;
    }

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: {
        status: 'COMPLETED',
        modemPayChargeId: payload.id,
        transactionReference: payload.transaction_reference,
        paymentMethod: payload.payment_method,
        paidAt: new Date()
      }
    });

    console.log(`✅ Order ${orderId} marked as COMPLETED`);

    for (const item of order.items) {
      await db.product.update({
        where: { id: item.productId },
        data: {
          // Uncomment if you track inventory
          // stock: { decrement: item.quantity }
        }
      });
    }

    try {
      await sendOrderConfirmationEmail(updatedOrder);
      console.log(`📧 Confirmation email sent for order ${orderId}`);
    } catch (emailError) {
      console.error('❌ Failed to send order confirmation email:', emailError);
    }

  } catch (error) {
    console.error('❌ Error handling successful order payment:', error);
    throw error;
  }
}

async function handleFailedOrderPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('❌ Handling failed order payment:', payload.id);
    
    const orderId = payload.metadata?.orderId as string;

    if (!orderId) {
      console.log('⚠️ Order ID not found in metadata');
      return;
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        status: 'FAILED',
        modemPayChargeId: payload.id,
        transactionReference: payload.transaction_reference
      }
    });

    console.log(`❌ Order ${orderId} marked as FAILED`);
  } catch (error) {
    console.error('❌ Error handling failed order payment:', error);
    throw error;
  }
}

async function handleCancelledOrderPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    console.log('🚫 Handling cancelled order payment:', payload.id);
    
    const orderId = payload.metadata?.orderId as string;

    if (!orderId) {
      console.log('⚠️ Order ID not found in metadata');
      return;
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
        modemPayChargeId: payload.id,
        transactionReference: payload.transaction_reference
      }
    });

    console.log(`🚫 Order ${orderId} marked as CANCELLED`);
  } catch (error) {
    console.error('❌ Error handling cancelled order payment:', error);
    throw error;
  }
}