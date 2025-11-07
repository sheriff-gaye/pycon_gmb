import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPostById, getCategories } from "@/app/actions/blog";
import { BlogPostForm } from "../components/blog-post-form";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {id === "new" ? "Create New Post" : "Edit Post"}
        </h1>
        <p className="text-muted-foreground">
          {id === "new"
            ? "Create a new blog post"
            : "Edit your blog post details"}
        </p>
      </div>

      <Suspense fallback={<FormSkeleton />}>
        <BlogPostFormContent id={id} />
      </Suspense>
    </div>
  );
}

async function BlogPostFormContent({ id }: { id: string }) {
  const categoriesResult = await getCategories();

  if (!categoriesResult.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load categories</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  let post = null;

  if (id !== "new") {
    const postResult = await getBlogPostById(id);

    if (!postResult.success) {
      notFound();
    }

    post = postResult.data;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id === "new" ? "New Blog Post" : "Edit Blog Post"}</CardTitle>
        <CardDescription>
          Fill in the details below to {id === "new" ? "create" : "update"} your blog post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BlogPostForm post={post} categories={categoriesResult.data || []} />
      </CardContent>
    </Card>
  );
}

function FormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

