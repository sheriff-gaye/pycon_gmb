import { notFound } from "next/navigation";
import { getBlogPostBySlug, incrementBlogViews, getComments } from "@/app/actions/blog";
import SingleBlogPost from "./single_post";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export const dynamic = "force-dynamic";

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug, locale } = await params;

  const result = await getBlogPostBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data;

  // Only show published posts (or allow preview for admins - future feature)
  if (!post.isPublished) {
    notFound();
  }

  // Fetch comments for this post
  const commentsResult = await getComments(post.id);
  const comments = commentsResult.success ? commentsResult.data || [] : [];

  // Increment view count (fire and forget)
  incrementBlogViews(slug).catch(() => {
    // Silently fail if view count increment fails
  });

  return <SingleBlogPost post={post} currentLocale={locale} initialComments={comments} />;
};

export default BlogPostPage;
