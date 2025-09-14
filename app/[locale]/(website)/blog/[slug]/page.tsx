import { notFound } from "next/navigation";
import { getBlogData } from "../blog_data";
import SingleBlogPost from "./single_post";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug, locale } = await params;

  const { featuredPost, blogPosts } = getBlogData(locale);
  const allPosts = [featuredPost, ...blogPosts];

  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <SingleBlogPost post={post} currentLocale={locale} />;
};

export default BlogPostPage;
