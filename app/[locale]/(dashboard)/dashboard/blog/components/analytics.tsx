"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Tag, FileText, Star, Plus, Edit2, Trash2, Upload, X, Eye, Search } from 'lucide-react';




const AnalyticsComponent = ({ blogPosts, categories }) => {
  const featuredCount = blogPosts.filter(post => post.isFeatured).length;
  const avgReadTime = blogPosts.length > 0 
    ? Math.round(blogPosts.reduce((acc, post) => acc + post.readTime, 0) / blogPosts.length) 
    : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{blogPosts.length}</div>
            <p className="text-xs opacity-80">+{Math.floor(Math.random() * 5) + 1} from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{categories.length}</div>
            <p className="text-xs opacity-80">Active categories</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Featured Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{featuredCount}</div>
            <p className="text-xs opacity-80">Currently featured</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Avg. Read Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{avgReadTime} min</div>
            <p className="text-xs opacity-80">Average reading time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl border-0 bg-white/60 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">No recent activity</p>
                </div>
              ) : (
                blogPosts.slice(-5).reverse().map((post) => (
                  <div key={post.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{post.title}</p>
                      <p className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    {post.isFeatured && <Star className="h-4 w-4 text-yellow-500" />}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/60 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Categories Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.length === 0 ? (
                <div className="text-center py-8">
                  <Tag className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">No categories created yet</p>
                </div>
              ) : (
                categories.map((category) => {
                  const postCount = blogPosts.filter(post => post.category === category.name).length;
                  return (
                    <div key={category.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-slate-600" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary">{postCount} posts</Badge>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


export default AnalyticsComponent