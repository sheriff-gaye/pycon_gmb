"use server";

import { db } from "@/lib/db";

export async function getAllStaff() {
  try {
    const staff = await db.staff.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        // _count: {
        //   select: {
        //     checkedInTickets: true
        //   }
        // }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const serializedStaff = staff.map(member => ({
      ...member,
      createdAt: member.createdAt.toISOString(),
      updatedAt: member.updatedAt.toISOString(),
      lastLogin: member.lastLogin?.toISOString() || null
    }));

    return {
      success: true,
      data: serializedStaff,
      count: serializedStaff.length
    };
  } catch (error) {
    console.error("Failed to fetch staff:", error);
    return {
      success: false,
      error: "Failed to fetch staff members",
      data: [],
      count: 0
    };
  }
}

export async function getActiveStaff() {
  try {
    const staff = await db.staff.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        // _count: {
        //   select: {
        //     checkedInTickets: true
        //   }
        // }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const serializedStaff = staff.map(member => ({
      ...member,
      createdAt: member.createdAt.toISOString(),
      lastLogin: member.lastLogin?.toISOString() || null
    }));

    return {
      success: true,
      data: serializedStaff,
      count: serializedStaff.length
    };
  } catch (error) {
    console.error("Failed to fetch active staff:", error);
    return {
      success: false,
      error: "Failed to fetch active staff members",
      data: [],
      count: 0
    };
  }
}

export async function getActiveStaffCount() {
  try {
    return await db.staff.count({
      where: {
        isActive: true
      }
    });
  } catch (error) {
    console.error("Failed to count active staff:", error);
    return 0;
  }
}