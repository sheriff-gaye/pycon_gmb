// /app/api/staff/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth-check";

interface DashboardStats {
  // Personal Stats (by this staff member)
  myCheckins: {
    total: number;
  };
  
  // Overall Event Stats
  eventStats: {
    totalTicketsSold: number;
    totalCheckedIn: number;
    totalPending: number;
    checkInPercentage: number;
    totalRevenue: number;
  };
  
  // Breakdown by Ticket Type
  ticketTypeBreakdown: Array<{
    type: string;
    total: number;
    checkedIn: number;
    pending: number;
    percentage: number;
  }>;
  
  // Recent check-ins by this staff
  recentCheckins: Array<{
    id: string;
    customerName: string;
    ticketType: string;
    checkedInAt: string;
    amount: number;
  }>;
  
  // Top performing staff (for comparison)
  staffLeaderboard: Array<{
    name: string;
    checkInCount: number;
    isCurrentUser: boolean;
  }>;
}

interface DashboardResponse {
  success: boolean;
  message: string;
  data?: DashboardStats;
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

    // 1. Get Personal Check-in Stats
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

    // 3. Get Ticket Type Breakdown
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

    // 4. Get Recent Check-ins by this staff (last 10)
    const recentCheckins = await db.ticketPurchase.findMany({
      where: {
        staffId: staffId,
        isCheckedIn: true
      },
      orderBy: { checkedInAt: 'desc' },
      take: 10,
      select: {
        id: true,
        customerName: true,
        ticketType: true,
        checkedInAt: true,
        amount: true
      }
    });

    // 5. Get Staff Leaderboard
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
      .slice(0, 5); // Top 5 staff

    // Prepare response
    const dashboardData: DashboardStats = {
      myCheckins: {
        total: myTotalCheckins
      },
      eventStats: {
        totalTicketsSold: totalTickets,
        totalCheckedIn: checkedInTickets,
        totalPending: pendingCheckins,
        checkInPercentage: Math.round(checkInPercentage * 100) / 100,
        totalRevenue: totalRevenue
      },
      ticketTypeBreakdown,
      recentCheckins: recentCheckins.map(ticket => ({
        id: ticket.id,
        customerName: ticket.customerName,
        ticketType: ticket.ticketType,
        checkedInAt: ticket.checkedInAt!.toISOString(),
        amount: ticket.amount
      })),
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