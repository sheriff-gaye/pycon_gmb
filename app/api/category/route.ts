import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
  
    const { userId } = await auth();

    if (!userId) {
      console.error("Authentication failed: No user ID");
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const existingCategory = await db.category.findFirst({
      where: {
        OR: [
          { name },
          { slug }
        ]
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this name or slug already exists" },
        { status: 409 }
      );
    }

    const category = await db.category.create({
      data: { name, slug },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

   

    return NextResponse.json(
      {
        message: "Category created successfully",
        category
      },
      { status: 201 }
    );

  } catch (error: any) {
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A category with this name or slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}