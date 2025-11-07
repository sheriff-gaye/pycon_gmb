"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createBlogPost, updateBlogPost, getAuthorDetails } from "@/app/actions/blog";
import { toast } from "sonner";
import { Loader2, Save, Eye } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;  
  content: string | null; 
  image?: string | null;
  readTime: number;
  author: string | null;  
  authorRole?: string | null;
  authorBio?: string | null;
  authorFacebook?: string | null;
  authorTwitter?: string | null;
  authorLinkedin?: string | null;
  categoryId: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
};

type Category = {
  id: string;
  name: string;
};

interface BlogPostFormProps {
  post: BlogPost | null | undefined;
  categories: Category[];
}

export function BlogPostForm({ post, categories }: BlogPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(!post);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(post?.image || null);
  const [loadingAuthorDetails, setLoadingAuthorDetails] = useState(false);
  const [hasLoadedAuthorDetails, setHasLoadedAuthorDetails] = useState(false);

  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    image: post?.image || "",
    readTime: post?.readTime || 5,
    author: post?.author || "",
    authorRole: post?.authorRole || "",
    authorBio: post?.authorBio || "",
    authorFacebook: post?.authorFacebook || "",
    authorTwitter: post?.authorTwitter || "",
    authorLinkedin: post?.authorLinkedin || "",
    categoryId: post?.categoryId || "",
    tags: post?.tags.join(", ") || "",
    isFeatured: post?.isFeatured || false,
    isPublished: post?.isPublished || false,
  });

  // Auto-populate author details when author name changes
  useEffect(() => {
    if (!formData.author || formData.author.trim().length < 3 || hasLoadedAuthorDetails || post) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingAuthorDetails(true);
      
      const result = await getAuthorDetails(formData.author);
      
      if (result.success && result.data) {
        // Only auto-populate if fields are empty
        setFormData((prev) => ({
          ...prev,
          authorRole: prev.authorRole || result.data?.authorRole || "",
          authorBio: prev.authorBio || result.data?.authorBio || "",
          authorFacebook: prev.authorFacebook || result.data?.authorFacebook || "",
          authorTwitter: prev.authorTwitter || result.data?.authorTwitter || "",
          authorLinkedin: prev.authorLinkedin || result.data?.authorLinkedin || "",
        }));
        setHasLoadedAuthorDetails(true);
        toast.success("Author details loaded from previous posts");
      }
      
      setLoadingAuthorDetails(false);
    }, 800); // Debounce for 800ms

    return () => clearTimeout(timer);
  }, [formData.author, hasLoadedAuthorDetails, post]);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: autoGenerateSlug ? title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "") : prev.slug,
    }));
  };

  const handleSlugChange = (slug: string) => {
    setAutoGenerateSlug(false);
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const imageUrl = data.url;

      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setImagePreview(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.categoryId || !formData.author) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const data = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image || undefined,
      readTime: formData.readTime,
      author: formData.author,
      authorRole: formData.authorRole || undefined,
      authorBio: formData.authorBio || undefined,
      authorFacebook: formData.authorFacebook || undefined,
      authorTwitter: formData.authorTwitter || undefined,
      authorLinkedin: formData.authorLinkedin || undefined,
      categoryId: formData.categoryId,
      tags: tagsArray,
      isFeatured: formData.isFeatured,
      isPublished: publish,
    };

    const result = post
      ? await updateBlogPost(post.id, data)
      : await createBlogPost(data);

    if (result.success) {
      toast.success(
        post
          ? "Blog post updated successfully"
          : "Blog post created successfully"
      );
      router.push("/dashboard/blog");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to save blog post");
    }

    setIsSubmitting(false);
  };

  return (
    <form className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter blog post title"
            required
          />
        </div>

        {/* Slug */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={autoGenerateSlug}
                onCheckedChange={setAutoGenerateSlug}
              />
              <span className="text-sm text-muted-foreground">
                Auto-generate
              </span>
            </div>
          </div>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="blog-post-slug"
            disabled={autoGenerateSlug}
            required
          />
          <p className="text-sm text-muted-foreground">
            URL: /blog/{formData.slug || "your-slug-here"}
          </p>
        </div>

        {/* Author */}
        <div className="space-y-2">
          <Label htmlFor="author">
            Author <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, author: e.target.value }));
                setHasLoadedAuthorDetails(false);
              }}
              placeholder="Author name"
              required
            />
            {loadingAuthorDetails && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Bio and social links will auto-populate from previous posts
          </p>
        </div>

        {/* Author Role */}
        <div className="space-y-2">
          <Label htmlFor="authorRole">Author Role</Label>
          <Input
            id="authorRole"
            value={formData.authorRole}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, authorRole: e.target.value }))
            }
            placeholder="e.g., Lead Developer"
          />
        </div>

        {/* Author Bio */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="authorBio">Author Bio</Label>
          <Textarea
            id="authorBio"
            value={formData.authorBio}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, authorBio: e.target.value }))
            }
            placeholder="Tell readers about the author..."
            rows={4}
          />
          <p className="text-sm text-muted-foreground">
            This will appear in the "About the Author" section
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-base font-semibold">Social Media Links</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Add author's social media profiles (optional)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorFacebook">Facebook URL</Label>
          <Input
            id="authorFacebook"
            type="url"
            value={formData.authorFacebook}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, authorFacebook: e.target.value }))
            }
            placeholder="https://facebook.com/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorTwitter">Twitter/X URL</Label>
          <Input
            id="authorTwitter"
            type="url"
            value={formData.authorTwitter}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, authorTwitter: e.target.value }))
            }
            placeholder="https://twitter.com/username"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="authorLinkedin">LinkedIn URL</Label>
          <Input
            id="authorLinkedin"
            type="url"
            value={formData.authorLinkedin}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, authorLinkedin: e.target.value }))
            }
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.categoryId}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, categoryId: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Read Time */}
        <div className="space-y-2">
          <Label htmlFor="readTime">
            Read Time (minutes) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="readTime"
            type="number"
            min="1"
            value={formData.readTime}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                readTime: parseInt(e.target.value) || 1,
              }))
            }
            required
          />
        </div>

        {/* Featured Image */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="image">Featured Image</Label>
          
          {imagePreview && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-slate-200 mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <label
              htmlFor="image-upload"
              className={`flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                uploadingImage
                  ? "border-slate-300 bg-slate-50 cursor-not-allowed"
                  : "border-slate-300 hover:border-yellow-400 hover:bg-yellow-50"
              }`}
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
              <div className="flex items-center space-x-2">
                {uploadingImage ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                    <span className="text-sm text-slate-500">Uploading...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-slate-700">
                      Upload from device
                    </span>
                  </>
                )}
              </div>
            </label>

            <div className="flex items-center text-slate-500">
              <span className="text-sm">or</span>
            </div>

            <Input
              id="image-url"
              value={formData.image}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, image: e.target.value }));
                if (e.target.value) {
                  setImagePreview(e.target.value);
                }
              }}
              placeholder="Enter image URL"
              className="flex-1"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Upload an image or enter a URL. Max file size: 5MB
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tags: e.target.value }))
            }
            placeholder="Python, Django, Tutorial (comma-separated)"
          />
          <p className="text-sm text-muted-foreground">
            Separate tags with commas
          </p>
        </div>

        {/* Excerpt */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="excerpt">
            Excerpt <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
            }
            placeholder="Short description for the blog post"
            rows={3}
            required
          />
          <p className="text-sm text-muted-foreground">
            {formData.excerpt.length} characters
          </p>
        </div>

        {/* Content */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="content">
            Content <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="Write your blog post content here..."
            rows={15}
            required
          />
          <p className="text-sm text-muted-foreground">
            {formData.content.length} characters
          </p>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center space-x-2 md:col-span-2">
          <Switch
            id="featured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isFeatured: checked }))
            }
          />
          <Label htmlFor="featured" className="cursor-pointer">
            Mark as featured post
          </Label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        <Button
          type="button"
          onClick={(e) => handleSubmit(e, false)}
          disabled={isSubmitting}
          variant="outline"
          className="flex-1"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save as Draft
        </Button>
        <Button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Eye className="w-4 h-4 mr-2" />
          )}
          {post?.isPublished ? "Update & Keep Published" : "Publish Now"}
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/dashboard/blog")}
          disabled={isSubmitting}
          variant="ghost"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

