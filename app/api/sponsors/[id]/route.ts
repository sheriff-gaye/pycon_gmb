import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    const body = await request.json();
    
    const { name, logo, website, description, isActive, order } = body;

    const existingSponsor = await db.sponsor.findUnique({
      where: { id }
    });

    if (!existingSponsor) {
      return NextResponse.json(
        { error: "Sponsor not found" },
        { status: 404 }
      );
    }

    const sponsor = await db.sponsor.update({
      where: { id },
      data: {
        name,
        logo,
        website: website || null,
        description: description || null,
        isActive,
        order,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(sponsor);
  } catch (error) {
    console.error("Error updating sponsor:", error);
    return NextResponse.json(
      { error: "Failed to update sponsor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params
    
    // Check if sponsor exists
    const existingSponsor = await db.sponsor.findUnique({
      where: { id }
    });

    if (!existingSponsor) {
      return NextResponse.json(
        { error: "Sponsor not found" },
        { status: 404 }
      );
    }

    await db.sponsor.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Sponsor deleted successfully" });
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    return NextResponse.json(
      { error: "Failed to delete sponsor" },
      { status: 500 }
    );
  }
}