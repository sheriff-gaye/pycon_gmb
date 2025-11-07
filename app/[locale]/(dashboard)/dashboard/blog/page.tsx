import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { BlogTable } from "./components/blog-table";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPosts, getCategories } from "@/app/actions/blog";

export const dynamic = "force-dynamic";

export default async function BlogManagementPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content
          </p>
        </div>
        <Link href="/dashboard/blog/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <Suspense fallback={<BlogTableSkeleton />}>
        <BlogTableContent />
      </Suspense>
    </div>
  );
}

async function BlogTableContent() {
  const [postsResult, categoriesResult] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  if (!postsResult.success || !categoriesResult.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load blog posts</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Posts</CardTitle>
        <CardDescription>
          View and manage all your blog posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BlogTable 
          posts={postsResult.data || []} 
          categories={categoriesResult.data || []} 
        />
      </CardContent>
    </Card>
  );
}

function BlogTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

