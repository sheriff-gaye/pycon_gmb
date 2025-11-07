import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryTable } from "../components/category-table";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/app/actions/blog";

export const dynamic = "force-dynamic";

export default async function CategoriesManagementPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your blog post categories
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Category
        </Button>
      </div>

      <Suspense fallback={<CategoryTableSkeleton />}>
        <CategoryTableContent />
      </Suspense>
    </div>
  );
}

async function CategoryTableContent() {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Categories</CardTitle>
        <CardDescription>
          View and manage your blog categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CategoryTable categories={categoriesResult.data || []} />
      </CardContent>
    </Card>
  );
}

function CategoryTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

