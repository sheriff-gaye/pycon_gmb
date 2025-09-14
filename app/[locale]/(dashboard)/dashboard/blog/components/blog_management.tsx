"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {  Tag, FileText, Star } from 'lucide-react';
import CreatePostComponent from './post';
import CategoryManagementComponent from './category';
import PostsListComponent from './all_posts';
import AnalyticsComponent from './analytics';



const BlogManagementPage = () => {
  const [categories, setCategories] = useState([]);

  const [blogPosts, setBlogPosts] = useState([
   
  ]);

  const handleCreatePost = (newPost) => {
    setBlogPosts([...blogPosts, newPost]);
  };

  const handleCreateCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (id:string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleDeletePost = (id:string) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Blog Management
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Create, manage, and organize your blog content with our powerful content management system
          </p>
        </div>

        <Tabs defaultValue="create-post" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-2">
            <TabsTrigger value="create-post" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <FileText className="h-4 w-4" />
              Create Post
            </TabsTrigger>
            <TabsTrigger value="create-category" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-600 data-[state=active]:text-white transition-all duration-300">
              <Tag className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300">
              <FileText className="h-4 w-4" />
              All Posts
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300">
              <Star className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create-post">
            <CreatePostComponent 
              categories={categories} 
              onCreatePost={handleCreatePost} 
            />
          </TabsContent>

          <TabsContent value="create-category">
            <CategoryManagementComponent 
              categories={categories} 
              onCreateCategory={handleCreateCategory} 
              onDeleteCategory={handleDeleteCategory} 
            />
          </TabsContent>

          <TabsContent value="posts">
            <PostsListComponent 
              blogPosts={blogPosts} 
              onDeletePost={handleDeletePost} 
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsComponent 
              blogPosts={blogPosts} 
              categories={categories} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogManagementPage;