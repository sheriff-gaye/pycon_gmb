import { NextRequest, NextResponse } from "next/server";
import { incrementBlogLikes, decrementBlogLikes } from "@/app/actions/blog";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, action } = body;

    if (!slug || !action) {
      return NextResponse.json(
        { error: "Slug and action are required" },
        { status: 400 }
      );
    }

    if (action !== "like" && action !== "unlike") {
      return NextResponse.json(
        { error: "Invalid action. Must be 'like' or 'unlike'" },
        { status: 400 }
      );
    }

    let result;
    if (action === "like") {
      result = await incrementBlogLikes(slug);
    } else {
      result = await decrementBlogLikes(slug);
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update likes" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      likes: result.data?.likes,
    });
  } catch (error) {
    console.error("Like API error:", error);
    return NextResponse.json(
      { error: "Failed to process like" },
      { status: 500 }
    );
  }
}

