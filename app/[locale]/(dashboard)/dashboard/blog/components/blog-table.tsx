"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal, Pencil, Trash2, Eye, Search, MessageCircle, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteBlogPost, togglePublishStatus } from "@/app/actions/blog";
import { toast } from "sonner";
import { useBlogConfirmModal } from "@/hooks/blog-confirm";
import BlogDeleteModal from "@/modals/blog-delete-modal";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  comments: number;
  likes: number;
  createdAt: Date;
  category: {
    id: string;
    name: string;
  };
};

type Category = {
  id: string;
  name: string;
};

interface BlogTableProps {
  posts: BlogPost[];
  categories: Category[];
}

export function BlogTable({ posts, categories }: BlogTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);
  const confirmModal = useBlogConfirmModal();


  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && post.isPublished) ||
      (statusFilter === "draft" && !post.isPublished);
    const matchesCategory =
      categoryFilter === "all" || post.category.id === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDelete = async (id: string, title: string) => {
    confirmModal.onOpen({ postId: id, postTitle: title });
  };

  const handleConfirmDelete = async (postId: string) => {
    setIsDeleting(postId);
    const result = await deleteBlogPost(postId);

    if (result.success) {
      toast.success("Blog post deleted successfully");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to delete blog post");
    }

    setIsDeleting(null);
  };

  const handleTogglePublish = async (id: string) => {
    setIsToggling(id);
    const result = await togglePublishStatus(id);

    if (result.success) {
      toast.success(
        result.data?.isPublished
          ? "Blog post published successfully"
          : "Blog post unpublished successfully"
      );
      router.refresh();
    } else {
      toast.error(result.error || "Failed to update publish status");
    }

    setIsToggling(null);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reactions</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No blog posts found
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {post.title}
                      {post.isFeatured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category.name}</Badge>
                  </TableCell>
                  <TableCell>
                    {post.isPublished ? (
                      <Badge className="bg-green-500">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{(post.views ?? 0).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{(post.comments ?? 0).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{(post.likes ?? 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={post.isPublished}
                      onCheckedChange={() => handleTogglePublish(post.id)}
                      disabled={isToggling === post.id}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => router.push(`/dashboard/blog/${post.id}`)}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={isDeleting === post.id}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredPosts.length} of {posts.length} posts
      </div>

      {/* Delete Confirmation Modal */}
      <BlogDeleteModal onConfirm={handleConfirmDelete} />
    </div>
  );
}

