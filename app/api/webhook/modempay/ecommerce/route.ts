import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PROCESSING';

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
  business_id: string;
  account_id: string;
  test_mode: boolean;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  createdAt: string;
  updatedAt: string;
  payment_account: string;
  payment_intent_id: string;
  transaction_reference: string;
  payment_method_id: string;
}

interface ModemPayWebhookEvent {
  event: string;
  payload: ModemPayWebhookPayload;
}

// Generate order confirmation email
async function generateOrderEmailHTML(order: any): Promise<string> {
  const orderItems = await db.orderItem.findMany({
    where: { orderId: order.id },
    include: { product: true }
  });

  const itemsHTML = orderItems.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.product.image}" alt="${item.productName}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
          <div>
            <strong>${item.productName}</strong><br/>
            <span style="color: #64748b; font-size: 14px;">Qty: ${item.quantity}</span>
          </div>
        </div>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">
        D${item.price.toFixed(2)}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">
        D${item.subtotal.toFixed(2)}
      </td>
    </tr>
  `).join('');

  const shippingAddress = order.shippingAddress 
    ? JSON.parse(order.shippingAddress) 
    : null;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - PyCon Senegambia Store</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">Order Confirmed!</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for your purchase</p>
            </div>
            
            <div style="padding: 30px;">
                <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h2 style="margin: 0 0 10px; font-size: 18px;">Order #${order.id.substring(0, 8).toUpperCase()}</h2>
                    <p style="margin: 5px 0; color: #64748b;">
                        <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p style="margin: 5px 0; color: #64748b;">
                        <strong>Status:</strong> <span style="background: #10B981; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold;">${order.status}</span>
                    </p>
                </div>

                <h3 style="margin: 20px 0 10px; font-size: 18px;">Order Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #f8fafc;">
                      <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e2e8f0;">Item</th>
                      <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e2e8f0;">Price</th>
                      <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e2e8f0;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 18px;">
                        Total:
                      </td>
                      <td style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 18px; color: #667eea;">
                        ${order.currency} ${order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                ${shippingAddress ? `
                  <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px; color: #92400e;">Shipping Address</h4>
                    <p style="margin: 5px 0; color: #92400e; font-size: 14px;">
                      ${shippingAddress.street}<br/>
                      ${shippingAddress.city}, ${shippingAddress.state}<br/>
                      ${shippingAddress.country} ${shippingAddress.postalCode}
                    </p>
                  </div>
                ` : ''}

                <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="margin: 0 0 10px; color: #3730a3;">Payment Information</h4>
                  <p style="margin: 5px 0; color: #3730a3; font-size: 14px;">
                    <strong>Transaction ID:</strong> ${order.transactionReference}<br/>
                    <strong>Payment Status:</strong> Completed
                  </p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                  <p style="color: #64748b; font-size: 14px;">
                    Questions about your order? Contact us at<br/>
                    <a href="mailto:shop@pyconsenegambia.org" style="color: #667eea;">shop@pyconsenegambia.org</a>
                  </p>
                </div>
            </div>

            <div style="background: #1e293b; color: white; padding: 20px; text-align: center; font-size: 12px;">
                <p style="margin: 0;">
                    <strong>PyCon Senegambia Store</strong><br/>
                    Official Conference Merchandise
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

async function sendOrderConfirmationEmail(order: any): Promise<void> {
  try {
    const emailHTML = await generateOrderEmailHTML(order);

    const { data, error } = await resend.emails.send({
      from: 'PyCon Senegambia Store <shop@pyconsenegambia.org>',
      to: [order.customerEmail],
      subject: `Order Confirmation #${order.id.substring(0, 8).toUpperCase()} - PyCon Senegambia Store`,
      html: emailHTML,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Order confirmation email sent:', data);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.text();
    const event: ModemPayWebhookEvent = JSON.parse(body);

    console.log(`Processing event: ${event.event} for charge ${event.payload.id}`);

    switch (event.event) {
      case 'charge.succeeded':
        await handleSuccessfulPayment(event.payload);
        break;
        
      case 'charge.failed':
        await handleFailedPayment(event.payload);
        break;
        
      case 'charge.cancelled':
        await handleCancelledPayment(event.payload);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new NextResponse(
      `Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    const orderId = payload.metadata?.orderId as string;

    if (!orderId) {
      throw new Error('Order ID not found in metadata');
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

    if (order.status === 'COMPLETED') {
      console.log(`Order ${orderId} already completed`);
      return;
    }

    // Update order status
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

    console.log(`Order ${orderId} marked as completed`);

    // Update product stock
    for (const item of order.items) {
      await db.product.update({
        where: { id: item.productId },
        data: {
          // Optionally track inventory if you have a stock field
          // stock: { decrement: item.quantity }
        }
      });
    }

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(updatedOrder);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

  } catch (error) {
    console.error('Error handling successful payment:', error);
    throw error;
  }
}

async function handleFailedPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    const orderId = payload.metadata?.orderId as string;

    if (!orderId) {
      console.log('Order ID not found in metadata');
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

    console.log(`Order ${orderId} marked as failed`);
  } catch (error) {
    console.error('Error handling failed payment:', error);
    throw error;
  }
}

async function handleCancelledPayment(payload: ModemPayWebhookPayload): Promise<void> {
  try {
    const orderId = payload.metadata?.orderId as string;

    if (!orderId) {
      console.log('Order ID not found in metadata');
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

    console.log(`Order ${orderId} marked as cancelled`);
  } catch (error) {
    console.error('Error handling cancelled payment:', error);
    throw error;
  }
}