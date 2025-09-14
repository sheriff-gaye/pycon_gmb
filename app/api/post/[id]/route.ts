import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;
    const body = await request.json();
    const { title, content, image, readTime, categoryId, isFeatured } = body;

    // Check if post exists
    const existingPost = await db.blogPost.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // If categoryId is provided, check if category exists
    if (categoryId) {
      const categoryExists = await db.category.findUnique({
        where: { id: categoryId }
      });

      if (!categoryExists) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
    }

    // Prepare update data (only include provided fields)
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (readTime !== undefined) updateData.readTime = parseInt(readTime);
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

    const updatedPost = await db.blogPost.update({
      where: { id },
      data: updateData,
      include: { 
        category: true 
      }
    });

    // Log the action (if you want to keep logging)
    // await logUserAction.create(
    //   userId,
    //   updatedPost.id,
    //   {
    //     entity: LogEntity.BLOG_POST,
    //     action: LogAction.UPDATE,
    //     title: updatedPost.title,
    //     categoryId: updatedPost.categoryId,
    //     changes: updateData
    //   },
    //   request
    // );

    return NextResponse.json(
      {
        message: "Post updated successfully",
        post: updatedPost
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Post update error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;

    // Check if post exists
    const existingPost = await db.blogPost.findUnique({
      where: { id },
      include: {
        category: true
      }
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Delete the post
    await db.blogPost.delete({
      where: { id }
    });

    // Log the action (if you want to keep logging)
    // await logUserAction.create(
    //   userId,
    //   id,
    //   {
    //     entity: LogEntity.BLOG_POST,
    //     action: LogAction.DELETE,
    //     title: existingPost.title,
    //     categoryId: existingPost.categoryId
    //   },
    //   request
    // );

    return NextResponse.json(
      {
        message: "Post deleted successfully"
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Post deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}