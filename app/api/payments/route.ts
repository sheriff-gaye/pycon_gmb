// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { modempay } from "@/lib/modempay";


// interface PaymentLinkRequest {
//   ticketType: 'STUDENTS' | 'INDIVIDUAL' | 'CORPORATE';
//   price: number;
//   description?: string;
//   customFields?: Record<string, any>;
//   metadata?: Record<string, any>;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { 
//       ticketType, 
//       price, 
//       description, 
//       metadata = {}
//     }: PaymentLinkRequest = await req.json();

//     if (!['STUDENTS', 'INDIVIDUAL', 'CORPORATE'].includes(ticketType)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid ticket type" },
//         { status: 400 }
//       );
//     }

//     const enhancedMetadata = {
//       ticketType,
//       conferenceEvent: 'PyCon Senegambia 2024',
//       createdFrom: 'website',
//       timestamp: new Date().toISOString(),
//       ...metadata
//     };

//     // Create payment link with ModemPay
//     const paymentLink = await modempay.paymentLinks.create({
//       title: `PyCon Senegambia - ${ticketType} Ticket`,
//       description: description || `Conference ticket for PyCon Senegambia (${ticketType})`,
//       amount: Math.round(price), // Convert to cents
//       currency: "GMD",
//       redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancelled`,
//       // webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/modempay`, // Add this line
//       metadata: enhancedMetadata,
//     });

//     const savedLink = await db.paymentLinks.create({
//       data: {
//         type: ticketType,
//         paymentUrl: paymentLink.payment_link,
//         linkId: paymentLink.id,
//         status: 'ACTIVE',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       paymentLink: paymentLink.payment_link,
//       linkId: paymentLink.id,
//       databaseId: savedLink.id,
//       metadata: enhancedMetadata,
//     });

//   } catch (error: any) {
//     console.error("Error creating payment link:", error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: error.message || "Failed to create payment link",
//         details: error.response?.data || null
//       },
//       { status: 500 }
//     );
//   }
// }

// // GET Payment Links (with database sync)
// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const ticketType = searchParams.get('ticketType');
//     const status = searchParams.get('status');

//     // Get links from database
//     const whereClause: any = {};
//     if (ticketType) whereClause.type = ticketType;
//     if (status) whereClause.status = status;

//     const dbLinks = await db.paymentLinks.findMany({
//       where: whereClause,
//       orderBy: { createdAt: 'desc' }
//     });

//     // Optionally sync with ModemPay API
//     let modemPayLinks = null;
//     try {
//       modemPayLinks = await modempay.paymentLinks.list();
//     } catch (error) {
//       console.warn("Could not fetch from ModemPay API:", error);
//     }

//     return NextResponse.json({ 
//       success: true, 
//       links: dbLinks,
//       modemPaySync: modemPayLinks?.data || null,
//       count: dbLinks.length
//     });

//   } catch (error: any) {
//     console.error("Error listing payment links:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // UPDATE Payment Link
// export async function PUT(req: NextRequest) {
//   try {
//     const { linkId, databaseId, status, title, amount } = await req.json();

//     // Update in ModemPay if linkId provided
//     let updatedModemPayLink = null;
//     if (linkId) {
//       try {
//         updatedModemPayLink = await modempay.paymentLinks.update(linkId, {
//           status,
//           title,
//           amount: amount ? Math.round(amount * 100) : undefined,
//         });
//       } catch (error) {
//         console.warn("Could not update ModemPay link:", error);
//       }
//     }

//     // Update in database if databaseId provided
//     let updatedDbLink = null;
//     if (databaseId) {
//       updatedDbLink = await db.paymentLinks.update({
//         where: { id: databaseId },
//         data: {
//           status: status || undefined,
//           updatedAt: new Date(),
//         }
//       });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       modemPayUpdate: updatedModemPayLink,
//       databaseUpdate: updatedDbLink
//     });

//   } catch (error: any) {
//     console.error("Error updating payment link:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // DELETE Payment Link
// export async function DELETE(req: NextRequest) {
//   try {
//     const { linkId, databaseId } = await req.json();

//     // Delete from ModemPay if linkId provided
//     if (linkId) {
//       try {
//         await modempay.paymentLinks.delete(linkId);
//       } catch (error) {
//         console.warn("Could not delete from ModemPay:", error);
//       }
//     }

//     // Delete from database if databaseId provided
//     if (databaseId) {
//       await db.paymentLinks.delete({
//         where: { id: databaseId }
//       });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: "Payment link deleted successfully" 
//     });

//   } catch (error: any) {
//     console.error("Error deleting payment link:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }