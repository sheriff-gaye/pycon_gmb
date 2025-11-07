import BlogSection from "../components/blog";
import { getBlogPosts, getCategories } from "@/app/actions/blog";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function Blog({ params }: BlogPageProps) {
  const { locale } = await params;
  const currentLocale = locale || "en";

  // Fetch only published posts
  const [postsResult, categoriesResult] = await Promise.all([
    getBlogPosts({ isPublished: true }),
    getCategories(),
  ]);

  if (!postsResult.success || !categoriesResult.success) {
    notFound();
  }

  const posts = postsResult.data || [];
  const categories = categoriesResult.data || [];

  return (
    <div>
      <BlogSection 
        currentLocale={currentLocale} 
        posts={posts}
        categories={categories}
      />
    </div>
  );
}