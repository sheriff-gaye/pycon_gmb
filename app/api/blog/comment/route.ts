import { NextRequest, NextResponse } from "next/server";
import { createComment } from "@/app/actions/blog";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, content, author } = body;

    if (!postId || !content) {
      return NextResponse.json(
        { error: "Post ID and comment content are required" },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: "Comment is too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    const result = await createComment({
      postId,
      content,
      author: author || undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Comment API error:", error);
    return NextResponse.json(
      { error: "Failed to process comment" },
      { status: 500 }
    );
  }
}

