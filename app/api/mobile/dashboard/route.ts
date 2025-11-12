// /app/api/staff/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth-check";

interface DashboardStats {
  // Personal Stats (by this staff member) - UPDATED STRUCTURE
  myStats: {
    totalCheckins: number;
    totalTicketsScanned: number;
  };

  // Overall Event Stats
  eventStats: {
    totalTicketsSold: number;
    totalCheckedIn?: number; // Made optional to match frontend
    totalPending: number;
    checkInPercentage?: number; // Made optional
    totalRevenue?: number; // Made optional
  };

  // Recent scanned tickets by this staff - UPDATED STRUCTURE
  myScannedTickets: Array<{
    ticketId: string;
    attendeeFullName: string;
    attendeeEmail: string;
    ticketType: string;
    purchaseDate: string;
    checkinTime: string;
    scannedBy: string;
  }>;

  // Breakdown by Ticket Type (optional, keep if needed)
  ticketTypeBreakdown?: Array<{
    type: string;
    total: number;
    checkedIn: number;
    pending: number;
    percentage: number;
  }>;

  // Top performing staff (optional, keep if needed)
  staffLeaderboard?: Array<{
    name: string;
    checkInCount: number;
    isCurrentUser: boolean;
  }>;
}

/** Extended response – now includes the logged-in staff name */
interface DashboardResponse {
  success: boolean;
  message: string;
  data?: DashboardStats & { staffName: string };
  error?: string;
}

export async function GET(req: NextRequest): Promise<NextResponse<DashboardResponse>> {
  try {
    // Authenticate request
    const auth = await authenticateRequest(req);

    if (!auth.authenticated) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
          error: auth.error || "UNAUTHORIZED"
        },
        { status: 401 }
      );
    }

    const staffId = auth.staff!.staffId;
    const staffName = `${auth.staff!.firstName} ${auth.staff!.lastName}`;

    // 1. Get Personal Check-in Stats - UPDATED
    const myTotalCheckins = await db.ticketPurchase.count({
      where: {
        staffId: staffId,
        isCheckedIn: true
      }
    });

    // 2. Get Overall Event Stats
    const [totalTickets, checkedInTickets, completedTickets] = await Promise.all([
      db.ticketPurchase.count({
        where: { paymentStatus: 'COMPLETED' }
      }),
      db.ticketPurchase.count({
        where: {
          paymentStatus: 'COMPLETED',
          isCheckedIn: true
        }
      }),
      db.ticketPurchase.aggregate({
        where: { paymentStatus: 'COMPLETED' },
        _sum: { amount: true }
      })
    ]);

    const totalRevenue = completedTickets._sum.amount || 0;
    const pendingCheckins = totalTickets - checkedInTickets;
    const checkInPercentage = totalTickets > 0 ? (checkedInTickets / totalTickets) * 100 : 0;

    // 3. Get Recent Scanned Tickets by this staff - UPDATED STRUCTURE
    const myScannedTickets = await db.ticketPurchase.findMany({
      where: {
        staffId: staffId,
        isCheckedIn: true
      },
      orderBy: { checkedInAt: 'desc' },
      take: 20,
      select: {
        id: true,
        customerName: true,
        customerEmail: true,
        ticketType: true,
        createdAt: true,
        checkedInAt: true
      }
    });

    // 4. Get Ticket Type Breakdown (optional)
    const ticketsByType = await db.ticketPurchase.groupBy({
      by: ['ticketType'],
      where: { paymentStatus: 'COMPLETED' },
      _count: { id: true }
    });

    const checkedInByType = await db.ticketPurchase.groupBy({
      by: ['ticketType'],
      where: {
        paymentStatus: 'COMPLETED',
        isCheckedIn: true
      },
      _count: { id: true }
    });

    const ticketTypeBreakdown = ticketsByType.map(typeGroup => {
      const checkedInCount = checkedInByType.find(c => c.ticketType === typeGroup.ticketType)?._count.id || 0;
      const totalCount = typeGroup._count.id;

      return {
        type: typeGroup.ticketType,
        total: totalCount,
        checkedIn: checkedInCount,
        pending: totalCount - checkedInCount,
        percentage: totalCount > 0 ? (checkedInCount / totalCount) * 100 : 0
      };
    });

    // 5. Get Staff Leaderboard (optional)
    const staffCheckIns = await db.ticketPurchase.groupBy({
      by: ['staffId'],
      where: {
        isCheckedIn: true,
        staffId: { not: null }
      },
      _count: { id: true }
    });

    const staffIds = staffCheckIns.map(s => s.staffId!);
    const staffDetails = await db.staff.findMany({
      where: { id: { in: staffIds } },
      select: {
        id: true,
        firstName: true,
        lastName: true
      }
    });

    const staffLeaderboard = staffCheckIns
      .map(staffCheck => {
        const staff = staffDetails.find(s => s.id === staffCheck.staffId);
        return {
          name: staff ? `${staff.firstName} ${staff.lastName}` : 'Unknown',
          checkInCount: staffCheck._count.id,
          isCurrentUser: staffCheck.staffId === staffId
        };
      })
      .sort((a, b) => b.checkInCount - a.checkInCount)
      .slice(0, 5);

    // Prepare response with UPDATED STRUCTURE + staffName
    const dashboardData: DashboardStats & { staffName: string } = {
      staffName,                                   // <-- NEW
      myStats: {
        totalCheckins: myTotalCheckins,
        totalTicketsScanned: myTotalCheckins
      },
      eventStats: {
        totalTicketsSold: totalTickets,
        totalCheckedIn: checkedInTickets,
        totalPending: pendingCheckins,
        checkInPercentage: Math.round(checkInPercentage * 100) / 100,
        totalRevenue: totalRevenue
      },
      myScannedTickets: myScannedTickets.map(ticket => ({
        ticketId: ticket.id,
        attendeeFullName: ticket.customerName,
        attendeeEmail: ticket.customerEmail || '',
        ticketType: ticket.ticketType,
        purchaseDate: ticket.createdAt.toISOString(),
        checkinTime: ticket.checkedInAt!.toISOString(),
        scannedBy: staffName
      })),
      ticketTypeBreakdown,
      staffLeaderboard
    };

    return NextResponse.json(
      {
        success: true,
        message: "Dashboard data retrieved successfully",
        data: dashboardData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching dashboard data",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}