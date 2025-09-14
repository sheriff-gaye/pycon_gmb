"use client"

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Tag, FileText, Star, Plus, Edit2, Trash2, Upload, X, Eye, Search } from 'lucide-react';




const PostsListComponent = ({ blogPosts, onDeletePost }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-2xl border-0 bg-white/60 backdrop-blur-lg">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-6 w-6" />
            All Blog Posts ({filteredPosts.length})
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid gap-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No posts found</h3>
              <p className="text-slate-500">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first blog post to get started!'}
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="group border-2 border-slate-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 bg-white/80">
                <div className="flex items-start gap-6">
                  {post.image && (
                    <div className="flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded-lg border-2 border-slate-200 group-hover:border-blue-300 transition-all duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-xl text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                          {post.title}
                        </h3>
                        {post.isFeatured && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-md">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeletePost(post.id)}
                          className="border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <span className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};


export default PostsListComponent