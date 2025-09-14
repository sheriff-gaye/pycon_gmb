"use client"

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Tag, FileText, Star, Plus, Edit2, Trash2, Upload, X, Eye, Search } from 'lucide-react';



const CreatePostComponent = ({ categories, onCreatePost }) => {
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    image: '',
    categoryId: '',
    readTime: '',
    isFeatured: false,
    date: new Date().toISOString().split('T')[0]
  });
  const [selectedImage, setSelectedImage] = useState('');
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setSelectedImage(imageUrl);
        setBlogForm({...blogForm, image: imageUrl});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(cat => cat.id === blogForm.categoryId);
    const newPost = {
      id: Date.now().toString(),
      ...blogForm,
      category: selectedCategory?.name || '',
      readTime: parseInt(blogForm.readTime)
    };
    onCreatePost(newPost);
    setBlogForm({
      title: '',
      content: '',
      image: '',
      categoryId: '',
      readTime: '',
      isFeatured: false,
      date: new Date().toISOString().split('T')[0]
    });
    setSelectedImage('');
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/60 backdrop-blur-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Plus className="h-6 w-6" />
          Create New Blog Post
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleBlogSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Title</Label>
              <Input
                id="title"
                value={blogForm.title}
                onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                placeholder="Enter an engaging blog post title..."
                className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="text-sm font-semibold text-slate-700">Category</Label>
              <Select
                value={blogForm.categoryId}
                onValueChange={(value) => setBlogForm({...blogForm, categoryId: value})}
                required
              >
                <SelectTrigger className="border-slate-300 bg-white/80 focus:ring-2 focus:ring-blue-200">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <Tag className="h-3 w-3" />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 space-y-3">
              <Label htmlFor="image" className="text-sm font-semibold text-slate-700">Featured Image</Label>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    id="image"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                    placeholder="https://example.com/image.jpg or upload below"
                    className="flex-1 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white/80"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    type="button"
                    className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                {(selectedImage || blogForm.image) && (
                  <div className="relative group">
                    <img
                      src={selectedImage || blogForm.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-slate-200 shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setIsImagePreviewOpen(true)}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        type="button"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setBlogForm({...blogForm, image: ''});
                          setSelectedImage('');
                        }}
                        variant="destructive"
                        className="bg-red-500/80 hover:bg-red-600/80"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="readTime" className="text-sm font-semibold text-slate-700">Read Time (minutes)</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="readTime"
                    type="number"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                    placeholder="5"
                    className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white/80"
                    min="1"
                    max="60"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="date" className="text-sm font-semibold text-slate-700">Publish Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="date"
                    type="date"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({...blogForm, date: e.target.value})}
                    className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white/80"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="content" className="text-sm font-semibold text-slate-700">Content</Label>
            <Textarea
              id="content"
              value={blogForm.content}
              onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
              placeholder="Write your amazing blog content here... Support for markdown coming soon!"
              className="min-h-[300px] border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none bg-white/80"
              required
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <Switch
                id="featured"
                checked={blogForm.isFeatured}
                onCheckedChange={(checked) => setBlogForm({...blogForm, isFeatured: checked})}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
              />
              <Label htmlFor="featured" className="text-sm font-semibold text-slate-700">Featured Post</Label>
              {blogForm.isFeatured && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            disabled={!blogForm.title || !blogForm.content || !blogForm.categoryId || !blogForm.readTime}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Blog Post
          </Button>
        </form>
      </CardContent>

      {/* Image Preview Modal */}
      {isImagePreviewOpen && (selectedImage || blogForm.image) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage || blogForm.image}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <Button
              onClick={() => setIsImagePreviewOpen(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              size="sm"
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};


export default CreatePostComponent