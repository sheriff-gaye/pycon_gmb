"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const CategoryManagementComponent = ({ categories, onCreateCategory, onDeleteCategory }) => {
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/category", categoryForm, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Axios automatically parses JSON, so response.data is the parsed object
      const data = response.data;

      // Check for success (assuming the API returns a `category` object)
      if (!data.category) {
        throw new Error(data.error || "Invalid response from server");
      }

      // Call the parent component's onCreateCategory with the new category
      onCreateCategory(data.category);
      setCategoryForm({ name: "", slug: "" });
      toast.success("Category created successfully!");
    } catch (error) {
      console.error("Error submitting category:", error);
      // Handle axios-specific errors
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to create category";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Create Category
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                value={categoryForm.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setCategoryForm({
                    name,
                    slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                  });
                }}
                placeholder="e.g., Technology"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorySlug">Slug</Label>
              <Input
                id="categorySlug"
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                placeholder="e.g., technology"
                required
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
              disabled={isSubmitting}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Existing Categories ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {categories.length === 0 ? (
              <div className="text-center py-8">
                <Tag className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">No categories yet. Create your first category!</p>
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-slate-500">/{category.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryManagementComponent;