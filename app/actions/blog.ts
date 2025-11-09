"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BlogPost, Category } from "@/app/generated/prisma";
import { translateBlogPost } from "@/lib/translate-blog";

// ============ BLOG POST ACTIONS ============

export async function getBlogPosts(filters?: {
  isPublished?: boolean;
  categoryId?: string;
  isFeatured?: boolean;
  search?: string;
}) {
  try {
    const posts = await db.blogPost.findMany({
      where: {
        ...(filters?.isPublished !== undefined && { isPublished: filters.isPublished }),
        ...(filters?.categoryId && { categoryId: filters.categoryId }),
        ...(filters?.isFeatured !== undefined && { isFeatured: filters.isFeatured }),
        ...(filters?.search && {
          OR: [
            { title: { contains: filters.search, mode: "insensitive" } },
            { excerpt: { contains: filters.search, mode: "insensitive" } },
            { author: { contains: filters.search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { success: false, error: "Failed to fetch blog posts" };
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!post) {
      return { success: false, error: "Blog post not found" };
    }

    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { success: false, error: "Failed to fetch blog post" };
  }
}

export async function getBlogPostById(id: string) {
  try {
    const post = await db.blogPost.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!post) {
      return { success: false, error: "Blog post not found" };
    }

    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { success: false, error: "Failed to fetch blog post" };
  }
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  readTime: number;
  author: string;
  authorRole?: string;
  authorBio?: string;
  authorFacebook?: string;
  authorTwitter?: string;
  authorLinkedin?: string;
  categoryId: string;
  tags: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
}) {
  try {
    // Check if slug already exists
    const existingPost = await db.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existingPost) {
      return { success: false, error: "A blog post with this slug already exists" };
    }

    // Translate content to French (only for new posts)
    const translations = await translateBlogPost({
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      authorBio: data.authorBio,
    });

    const post = await db.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        readTime: data.readTime,
        author: data.author,
        authorRole: data.authorRole,
        authorBio: data.authorBio,
        authorFacebook: data.authorFacebook,
        authorTwitter: data.authorTwitter,
        authorLinkedin: data.authorLinkedin,
        categoryId: data.categoryId,
        tags: data.tags,
        isFeatured: data.isFeatured || false,
        isPublished: data.isPublished || false,
        publishedAt: data.isPublished ? new Date() : null,
        // Add French translations
        title_fr: translations.title_fr,
        excerpt_fr: translations.excerpt_fr,
        content_fr: translations.content_fr,
        authorBio_fr: translations.authorBio_fr,
      },
      include: {
        category: true,
      },
    });

    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");

    return { success: true, data: post };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error: "Failed to create blog post" };
  }
}

export async function updateBlogPost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    image?: string;
    readTime?: number;
    author?: string;
    authorRole?: string;
    authorBio?: string;
    authorFacebook?: string;
    authorTwitter?: string;
    authorLinkedin?: string;
    categoryId?: string;
    tags?: string[];
    isFeatured?: boolean;
    isPublished?: boolean;
  }
) {
  try {
    // If slug is being updated, check if it's already taken by another post
    if (data.slug) {
      const existingPost = await db.blogPost.findUnique({
        where: { slug: data.slug },
      });

      if (existingPost && existingPost.id !== id) {
        return { success: false, error: "A blog post with this slug already exists" };
      }
    }

    // Get current post to check publish status change and content changes
    const currentPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!currentPost) {
      return { success: false, error: "Blog post not found" };
    }

    // Check if any translatable content has changed
    const contentChanged =
      (data.title && data.title !== currentPost.title) ||
      (data.excerpt && data.excerpt !== currentPost.excerpt) ||
      (data.content && data.content !== currentPost.content) ||
      (data.authorBio && data.authorBio !== currentPost.authorBio);

    // Re-translate if content has changed
    let translations = {};
    if (contentChanged) {
      translations = await translateBlogPost({
        title: data.title || currentPost.title,
        excerpt: data.excerpt || currentPost.excerpt || undefined,
        content: data.content || currentPost.content,
        authorBio: data.authorBio || currentPost.authorBio || undefined,
      });
    }

    // Determine if we need to update publishedAt
    let publishedAt = currentPost.publishedAt;
    if (data.isPublished !== undefined) {
      if (data.isPublished && !currentPost.isPublished) {
        // Publishing for the first time
        publishedAt = new Date();
      } else if (!data.isPublished) {
        // Unpublishing
        publishedAt = null;
      }
    }

    const post = await db.blogPost.update({
      where: { id },
      data: {
        ...data,
        ...translations, // Include French translations if content changed
        publishedAt,
      },
      include: {
        category: true,
      },
    });

    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return { success: true, data: post };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return { success: false, error: "Failed to update blog post" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const post = await db.blogPost.delete({
      where: { id },
    });

    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");

    return { success: true, data: post };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: "Failed to delete blog post" };
  }
}

export async function togglePublishStatus(id: string) {
  try {
    const post = await db.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return { success: false, error: "Blog post not found" };
    }

    const updatedPost = await db.blogPost.update({
      where: { id },
      data: {
        isPublished: !post.isPublished,
        publishedAt: !post.isPublished ? new Date() : null,
      },
      include: {
        category: true,
      },
    });

    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedPost.slug}`);

    return { success: true, data: updatedPost };
  } catch (error) {
    console.error("Error toggling publish status:", error);
    return { success: false, error: "Failed to toggle publish status" };
  }
}

export async function incrementBlogViews(slug: string) {
  try {
    const post = await db.blogPost.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return { success: true, data: post };
  } catch (error) {
    console.error("Error incrementing blog views:", error);
    return { success: false, error: "Failed to increment views" };
  }
}

export async function incrementBlogLikes(slug: string) {
  try {
    const post = await db.blogPost.update({
      where: { slug },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return { success: true, data: post };
  } catch (error) {
    console.error("Error incrementing blog likes:", error);
    return { success: false, error: "Failed to increment likes" };
  }
}

export async function decrementBlogLikes(slug: string) {
  try {
    const post = await db.blogPost.update({
      where: { slug },
      data: {
        likes: {
          decrement: 1,
        },
      },
    });

    return { success: true, data: post };
  } catch (error) {
    console.error("Error decrementing blog likes:", error);
    return { success: false, error: "Failed to decrement likes" };
  }
}

// ============ CATEGORY ACTIONS ============

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await db.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    return { success: true, data: category };
  } catch (error) {
    console.error("Error fetching category:", error);
    return { success: false, error: "Failed to fetch category" };
  }
}

export async function createCategory(data: { name: string; slug: string }) {
  try {
    // Check if slug or name already exists
    const existingCategory = await db.category.findFirst({
      where: {
        OR: [{ slug: data.slug }, { name: data.name }],
      },
    });

    if (existingCategory) {
      return { success: false, error: "A category with this name or slug already exists" };
    }

    const category = await db.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    revalidatePath("/dashboard/blog/categories");
    revalidatePath("/blog");

    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategory(id: string, data: { name?: string; slug?: string }) {
  try {
    // If slug or name is being updated, check if it's already taken
    if (data.slug || data.name) {
      const existingCategory = await db.category.findFirst({
        where: {
          OR: [
            ...(data.slug ? [{ slug: data.slug }] : []),
            ...(data.name ? [{ name: data.name }] : []),
          ],
          NOT: {
            id,
          },
        },
      });

      if (existingCategory) {
        return { success: false, error: "A category with this name or slug already exists" };
      }
    }

    const category = await db.category.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard/blog/categories");
    revalidatePath("/blog");

    return { success: true, data: category };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    // Check if category has posts
    const category = await db.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    if (category._count.posts > 0) {
      return {
        success: false,
        error: `Cannot delete category with ${category._count.posts} blog post(s). Please reassign or delete the posts first.`,
      };
    }

    await db.category.delete({
      where: { id },
    });

    revalidatePath("/dashboard/blog/categories");
    revalidatePath("/blog");

    return { success: true, data: category };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

// Get author details from their latest post
export async function getAuthorDetails(authorName: string) {
  try {
    if (!authorName || authorName.trim().length === 0) {
      return { success: false, error: "Author name is required" };
    }

    const latestPost = await db.blogPost.findFirst({
      where: {
        author: {
          equals: authorName.trim(),
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        authorBio: true,
        authorRole: true,
        authorFacebook: true,
        authorTwitter: true,
        authorLinkedin: true,
      },
    });

    if (!latestPost) {
      return { success: false, error: "No previous posts found for this author" };
    }

    return {
      success: true,
      data: {
        authorBio: latestPost.authorBio,
        authorRole: latestPost.authorRole,
        authorFacebook: latestPost.authorFacebook,
        authorTwitter: latestPost.authorTwitter,
        authorLinkedin: latestPost.authorLinkedin,
      },
    };
  } catch (error) {
    console.error("Error fetching author details:", error);
    return { success: false, error: "Failed to fetch author details" };
  }
}

// ============ COMMENT ACTIONS ============

export async function getComments(postId: string) {
  try {
    const comments = await db.comment.findMany({
      where: { postId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: comments };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { success: false, error: "Failed to fetch comments" };
  }
}

export async function createComment(data: {
  postId: string;
  content: string;
  author?: string;
}) {
  try {
    // Validate content
    if (!data.content || data.content.trim().length === 0) {
      return { success: false, error: "Comment content is required" };
    }

    // Create comment
    const comment = await db.comment.create({
      data: {
        postId: data.postId,
        content: data.content.trim(),
        author: data.author?.trim() || "Anonymous",
      },
    });

    // Increment the comment counter on the blog post
    await db.blogPost.update({
      where: { id: data.postId },
      data: {
        comments: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/blog`);

    return { success: true, data: comment };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, error: "Failed to create comment" };
  }
}

export async function getCommentCount(postId: string) {
  try {
    const count = await db.comment.count({
      where: { postId },
    });

    return { success: true, data: count };
  } catch (error) {
    console.error("Error getting comment count:", error);
    return { success: false, error: "Failed to get comment count" };
  }
}

// Helper function to generate slug from title
export async function generateSlug(title: string): Promise<string> {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

