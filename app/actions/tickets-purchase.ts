'use server';

import { db } from '@/lib/db';

export async function getTickets() {
    try {
        const purchases = await db.ticketPurchase.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return purchases;
    } catch (error) {
        console.error('Error fetching ticket purchases:', error);
        return [];
    }
}


export async function numberofTickets() {

    try {
        return await db.ticketPurchase.count(
            {
                where: {
                    paymentStatus: 'COMPLETED'
                }
            }
        );

    } catch (error) {
        console.error('Error fetching ticket purchases:', error);
        return [];


    }
}

export async function getTotalSuccessfulAmount() {
    try {
        const result = await db.ticketPurchase.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                paymentStatus: 'COMPLETED'
            }
        });

        return result._sum.amount || 0;
    } catch (error) {
        console.error('Error calculating successful ticket amount:', error);
        return 0;
    }
}



export async function getRecentTickets(limit: number = 5) {
  try {
    const tickets = await db.ticketPurchase.findMany({
      where: {
        paymentStatus: 'COMPLETED'
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      select: {
        id: true,
        customerName: true,
        customerEmail: true,
        ticketType: true,
        amount: true,
        currency: true,
        createdAt: true,
        isCheckedIn: true
      }
    });

    return {
      success: true,
      data: tickets.map(ticket => ({
        ...ticket,
        createdAt: ticket.createdAt.toISOString()
      }))
    };
  } catch (error) {
    console.error("Error fetching recent tickets:", error);
    return {
      success: false,
      data: [],
      error: "Failed to fetch recent tickets"
    };
  }
}

// Get ticket type distribution for pie chart
export async function getTicketTypeDistribution() {
  try {
    const distribution = await db.ticketPurchase.groupBy({
      by: ['ticketType'],
      where: {
        paymentStatus: 'COMPLETED'
      },
      _count: {
        ticketType: true
      },
      _sum: {
        amount: true
      }
    });

    return {
      success: true,
      data: distribution.map(item => ({
        type: item.ticketType,
        count: item._count.ticketType,
        revenue: item._sum.amount || 0
      }))
    };
  } catch (error) {
    console.error("Error fetching ticket distribution:", error);
    return {
      success: false,
      data: [],
      error: "Failed to fetch ticket distribution"
    };
  }
}