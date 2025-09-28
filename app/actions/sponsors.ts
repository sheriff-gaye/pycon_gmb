"use server";

import { db } from "@/lib/db";




export async function getAllSponsors() {
  try {
   
    const sponsors = await db.sponsor.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    
    const serializedSponsors = sponsors.map(sponsor => ({
      ...sponsor,
      createdAt: sponsor.createdAt,
      updatedAt: sponsor.updatedAt
    }));

    return { 
      success: true, 
      data: serializedSponsors,
      count: serializedSponsors.length 
    };
  } catch (error) {
    
    return { 
      success: false, 
      error: "Failed to fetch sponsors",
      
    };
  }
}


export async function getActiveSponsors() {
  try {
    
    const sponsors = await db.sponsor.findMany({
      where: {
        isActive: true, 
     
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    
    const serializedSponsors = sponsors.map(sponsor => ({
      ...sponsor,
      createdAt: sponsor.createdAt,
      updatedAt: sponsor.updatedAt
    }));

    return {
      success: true,
      data: serializedSponsors,
      count: serializedSponsors.length
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch active sponsors",
      data: [],
      count: 0
    };
  }
}


export async function getActiveSponsorsCount() {
  try {
    return await db.sponsor.count({
      where: {
        isActive: true
      }
    });
  } catch (error) {
    return [];
  }
}