import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import ModemPay from "modem-pay";

// Initialize ModemPay
const modempay = new ModemPay(process.env.MODEM_PAY_SECRET_KEY!);

interface CheckoutItem {
    productId: string;
    quantity: number;
}

interface CheckoutRequest {
    items: CheckoutItem[];
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    locale?: string;
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const body: CheckoutRequest = await req.json();

        // Validate environment variable
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;
        if (!appUrl) {
            console.error("❌ NEXT_PUBLIC_APP_URL is not defined");
            return NextResponse.json(
                { success: false, error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Validate required fields
        if (!body.items || body.items.length === 0) {
            return NextResponse.json(
                { success: false, error: "Cart is empty" },
                { status: 400 }
            );
        }

        if (!body.customerEmail || !body.customerName || !body.customerPhone) {
            return NextResponse.json(
                { success: false, error: "Customer information is required" },
                { status: 400 }
            );
        }

        // Fetch products and calculate total
        const productIds = body.items.map(item => item.productId);
        const products = await db.product.findMany({
            where: {
                id: { in: productIds },
                isActive: true,
                inStock: true
            }
        });

        if (products.length !== body.items.length) {
            return NextResponse.json(
                { success: false, error: "Some products are unavailable" },
                { status: 400 }
            );
        }

        // Calculate total amount and prepare order items
        let totalAmount = 0;
        const orderItems = body.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                throw new Error(`Product ${item.productId} not found`);
            }

            const itemTotal = product.price * item.quantity;
            totalAmount += itemTotal;

            return {
                productId: product.id,
                productName: product.name,
                quantity: item.quantity,
                price: product.price,
                subtotal: itemTotal
            };
        });

        // Create order in database with PENDING status
        const order = await db.order.create({
            data: {
                customerName: body.customerName,
                customerEmail: body.customerEmail,
                customerPhone: body.customerPhone,
                totalAmount: totalAmount,
                currency: "GMD",
                status: "PENDING",
                shippingAddress: body.shippingAddress ? JSON.stringify(body.shippingAddress) : null,
                items: {
                    create: orderItems.map(item => ({
                        productId: item.productId,
                        productName: item.productName,
                        quantity: item.quantity,
                        price: item.price,
                        subtotal: item.subtotal
                    }))
                }
            }
        });

        // Prepare URLs with locale
        const locale = body.locale || 'en';
        const baseUrl = appUrl.replace(/\/$/, ''); // Remove trailing slash
        
        const returnUrl = `${baseUrl}/${locale}/order/success?orderId=${order.id}`;
        const cancelUrl = `${baseUrl}/${locale}/order/cancelled?orderId=${order.id}`;
        const callbackUrl = `${baseUrl}/api/webhook/modempay/ecommerce`;

        // Debug log to verify URLs
        console.log('🔍 ModemPay URLs:', {
            returnUrl,
            cancelUrl,
            callbackUrl,
            baseUrl,
            locale
        });

        // Prepare payment intent data
        const paymentData: any = {
            amount: totalAmount,
            currency: "GMD",
            customer_name: body.customerName,
            customer_email: body.customerEmail,
            customer_phone: body.customerPhone,
            title: `PyCon Senegambia Store - Order #${order.id.substring(0, 8)}`,
            description: `Purchase of ${body.items.length} item(s)`,
            metadata: {
                orderId: order.id,
                orderType: "ECOMMERCE",
                itemCount: body.items.length.toString(),
                customerEmail: body.customerEmail
            },
            payment_methods: ["card", "wallet", "bank"],
            return_url: returnUrl,
            cancel_url: cancelUrl
        };

        // Only add callback_url if using HTTPS (production/ngrok)
        if (baseUrl.startsWith('https://')) {
            paymentData.callback_url = callbackUrl;
            console.log('✅ Using callback URL (HTTPS detected)');
        } else {
            console.log('⚠️ Skipping callback URL (localhost detected - webhooks won\'t work)');
        }

        // Create Payment Intent with ModemPay
        const paymentIntent = await modempay.paymentIntents.create(paymentData);

        // Update order with payment intent details
        await db.order.update({
            where: { id: order.id },
            data: {
                paymentIntentId: paymentIntent.data.intent_secret,
                paymentLink: paymentIntent.data.payment_link,
                expiresAt: new Date(paymentIntent.data.expires_at)
            }
        });

        console.log(`✅ Payment Intent created for order ${order.id}`);

        return NextResponse.json({
            success: true,
            data: {
                orderId: order.id,
                paymentLink: paymentIntent.data.payment_link,
                amount: totalAmount,
                currency: paymentIntent.data.currency,
                expiresAt: paymentIntent.data.expires_at,
                status: paymentIntent.data.status
            }
        });

    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Checkout failed"
            },
            { status: 500 }
        );
    }
}