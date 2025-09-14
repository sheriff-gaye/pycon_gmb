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
    const { name, slug } = body;

    // Check if category exists
    const existingCategory = await db.category.findUnique({
      where: { id }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check for conflicts with other categories (if name or slug is being changed)
    if (name || slug) {
      const conflictingCategory = await db.category.findFirst({
        where: {
          AND: [
            { id: { not: id } }, // Exclude current category
            {
              OR: [
                ...(name ? [{ name }] : []),
                ...(slug ? [{ slug }] : [])
              ]
            }
          ]
        }
      });

      if (conflictingCategory) {
        return NextResponse.json(
          { error: "Another category with this name or slug already exists" },
          { status: 409 }
        );
      }
    }

    // Prepare update data (only include provided fields)
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;

    const updatedCategory = await db.category.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    // Log the action (if you want to keep logging)
    // await logUserAction.create(
    //   userId,
    //   updatedCategory.id,
    //   {
    //     entity: LogEntity.CATEGORY,
    //     action: LogAction.UPDATE,
    //     name: updatedCategory.name,
    //     slug: updatedCategory.slug,
    //     changes: updateData
    //   },
    //   request
    // );

    return NextResponse.json(
      {
        message: "Category updated successfully",
        category: updatedCategory
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Category update error:", error);
    
    // Handle Prisma unique constraint errors
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
   
    const { userId } = await auth();

    if (!userId) {
      console.error("Authentication failed: No user ID");
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    const { id } = params;

   
    const existingCategory = await db.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if category has associated posts
    if (existingCategory._count.posts > 0) {
      return NextResponse.json(
        { error: "Cannot delete category that has associated blog posts" },
        { status: 409 }
      );
    }

    // Delete the category
    await db.category.delete({
      where: { id }
    });

    // Log the action (if you want to keep logging)
    // await logUserAction.create(
    //   userId,
    //   id,
    //   {
    //     entity: LogEntity.CATEGORY,
    //     action: LogAction.DELETE,
    //     name: existingCategory.name,
    //     slug: existingCategory.slug
    //   },
    //   request
    // );

    return NextResponse.json(
      {
        message: "Category deleted successfully"
      },
      { status: 200 }
    );

  } catch (error: any) {
    
    // Handle foreign key constraint errors
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Cannot delete category due to related data" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}