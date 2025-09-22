import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
   
    const body = await request.json();
    const { name, logo, website, description, isActive, order } = body;
        
    if (!name || !logo || isActive === undefined || order === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sponsor = await db.sponsor.create({
      data: {
        name,
        logo,
        website: website || null,
        description: description || null,
        isActive,
        order
      }
    });

    return NextResponse.json(sponsor, { status: 201 });
  } catch (error) {
    console.error("Error creating sponsor:", error);
    return NextResponse.json(
      { error: "Failed to create sponsor" },
      { status: 500 }
    );
  }
}

