import { db } from "@/lib/db";

export async function getCheckInStats() {
  try {
    const stats = await db.ticketPurchase.groupBy({
      by: ['isCheckedIn'],
      where: {
        paymentStatus: 'COMPLETED'
      },
      _count: {
        isCheckedIn: true
      }
    });

    const checkedIn = stats.find(s => s.isCheckedIn)?._count.isCheckedIn || 0;
    const notCheckedIn = stats.find(s => !s.isCheckedIn)?._count.isCheckedIn || 0;

    return {
      success: true,
      data: {
        checkedIn,
        notCheckedIn,
        total: checkedIn + notCheckedIn,
        checkInRate: checkedIn + notCheckedIn > 0 
          ? ((checkedIn / (checkedIn + notCheckedIn)) * 100).toFixed(1)
          : 0
      }
    };
  } catch (error) {
    console.error("Error fetching check-in stats:", error);
    return {
      success: false,
      data: {
        checkedIn: 0,
        notCheckedIn: 0,
        total: 0,
        checkInRate: 0
      },
      error: "Failed to fetch check-in stats"
    };
  }
}
