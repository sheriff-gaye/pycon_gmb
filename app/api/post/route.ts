import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth();

    if (!userId) {
      console.error("Authentication failed: No user ID");
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, image, readTime, categoryId, isFeatured = false } = body;

    // Validate required fields
    if (!title || !content || !categoryId || !readTime) {
      return NextResponse.json(
        { error: "Title, content, categoryId, and readTime are required" },
        { status: 400 }
      );
    }

    // Check if category exists
    const categoryExists = await db.category.findUnique({
      where: { id: categoryId }
    });

    if (!categoryExists) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Create the post
    const post = await db.blogPost.create({
      data: {
        title,
        content,
        image,
        readTime: parseInt(readTime),
        categoryId,
        isFeatured
      },
      include: { 
        category: true 
      }
    });

    // Log the action (if you want to keep logging)
    // await logUserAction.create(
    //   userId,
    //   post.id,
    //   {
    //     entity: LogEntity.BLOG_POST,
    //     action: LogAction.CREATE,
    //     title: post.title,
    //     categoryId: post.categoryId,
    //     isFeatured: post.isFeatured
    //   },
    //   request
    // );

    return NextResponse.json(
      {
        message: "Post created successfully",
        post
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Post creation error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}