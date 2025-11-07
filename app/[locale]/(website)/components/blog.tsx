"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Tag, Clock, Eye, MessageCircle, Star, Zap, BookOpen } from 'lucide-react';
import { HeroProps } from './interfaces/interface';
import { getTranslation } from '@/lib/i18n';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole?: string | null;
  date: Date;
  readTime: number;
  image?: string | null;
  views: number;
  comments: number;
  isFeatured: boolean;
  tags: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

type Category = {
  id: string;
  name: string;
  slug: string;
  _count?: {
    posts: number;
  };
};

interface BlogSectionProps extends HeroProps {
  posts: BlogPost[];
  categories: Category[];
}

const BlogSection = ({ currentLocale, posts, categories }: BlogSectionProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Check if there are any posts at all
  const hasNoPosts = posts.length === 0;
  
  // Filter ALL posts by category first (if not 'all')
  const categoryFilteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category.id === activeCategory);
  
  // Find featured post from filtered posts
  const featuredPost = categoryFilteredPosts.find((post) => post.isFeatured) || categoryFilteredPosts[0];
  
  // Get remaining posts (excluding the featured one if it exists)
  const blogPosts = categoryFilteredPosts.filter((post) => post.id !== featuredPost?.id);

  // Build category filter options with post counts
  const categoryFilters = [
    { id: 'all', name: getTranslation(currentLocale, 'blog.category_1_name'), count: posts.length },
    ...categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: cat._count?.posts || 0
    }))
  ];
  
  // Check if filter returned no results (but posts exist overall)
  // This should show empty state when:
  // 1. Database has posts (not completely empty)
  // 2. The filtered result is empty
  // 3. User has selected a specific category (not 'all')
  const hasNoFilteredResults = !hasNoPosts && categoryFilteredPosts.length === 0 && activeCategory !== 'all';

  
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
    const handleNewsletterSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email) {
        setMessage('Please enter your email address');
        setMessageType('error');
        return;
      }
  
      setIsSubmitting(true);
      setMessage('');
  
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage('Successfully subscribed to newsletter!');
          setMessageType('success');
          setEmail('');
        } else {
          setMessage(data.error || 'Failed to subscribe');
          setMessageType('error');
        }
      } catch (error) {
        setMessage(`Something went wrong. Please try again. ${error}`);
        setMessageType('error');
      }
  
      setIsSubmitting(false);
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    };
  
  
    return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-800/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCD34D' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <BookOpen className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">{getTranslation(currentLocale, 'blog.from_community')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">{getTranslation(currentLocale, 'blog.stories_insights')}</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              {getTranslation(currentLocale, 'blog.python_knowledge')}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {getTranslation(currentLocale, 'blog.section_description')}
          </p>
        </div>

        {!hasNoPosts && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categoryFilters.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transform scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        )}

        {hasNoPosts ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                No Blog Posts Yet
              </h3>
              <p className="text-lg text-slate-600 mb-8">
                We're working on bringing you amazing content about Python, community events, tutorials, and more. Check back soon!
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
              <p className="text-slate-700 mb-4">
                In the meantime, subscribe to our newsletter to be notified when we publish new articles.
              </p>
            </div>
          </div>
        ) : (
          <>
            {featuredPost && (
              <div className="mb-20">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-yellow-200 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            <div className="absolute top-6 left-6 z-10">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {getTranslation(currentLocale, 'blog.featured_label')}
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-12">
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 mt-5 group-hover:text-yellow-600 transition-colors duration-300">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{featuredPost.author}</div>
                      {featuredPost.authorRole && (
                        <div className="text-sm text-slate-500">{featuredPost.authorRole}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-slate-500 text-sm space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString(currentLocale, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime} min
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <button className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <div className="flex items-center">
                        {getTranslation(currentLocale, 'blog.read_full_story')}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </Link>
                  
                  <div className="flex items-center space-x-4 text-slate-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {featuredPost.views.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {featuredPost.comments}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 flex items-center justify-center">
                <div className="w-full h-64 lg:h-full relative rounded-2xl overflow-hidden">
                  {featuredPost.image ? (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200">
                      <span className="text-slate-400 text-lg">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
              </div>
            )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {hasNoFilteredResults ? (
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-3">
                No Posts in This Category
              </h3>
              <p className="text-slate-500 mb-6">
                Try selecting a different category to see more posts.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
              >
                View All Posts
              </button>
            </div>
          ) : (
            blogPosts.map((post) => (
            <article key={post.id} className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl overflow-hidden border border-slate-200 hover:border-yellow-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="aspect-video relative bg-gradient-to-br from-yellow-100 to-yellow-200">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-slate-400">No Image</span>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="mb-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-3">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category.name}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 text-sm">{post.author}</div>
                    </div>
                  </div>
                  
                  <div className="text-slate-500 text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime} min
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link href={`/blog/${post.slug}`}>
                    <button className="group text-yellow-600 font-semibold hover:text-yellow-700 transition-colors duration-300">
                      <div className="flex items-center">
                        {getTranslation(currentLocale, 'blog.read_more')}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </Link>
                  
                  <div className="flex items-center space-x-3 text-slate-400 text-sm">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {post.views}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))
          )}
        </div>
        </>
        )}

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl transform rotate-1"></div>
          <div className="relative bg-white border-2 border-yellow-400 rounded-3xl p-10 shadow-2xl text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold text-lg mb-6 shadow-lg">
                <Zap className="w-5 h-5 mr-2" />
                {getTranslation(currentLocale, 'blog.stay_updated')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{getTranslation(currentLocale, 'blog.newsletter_title')}</h3>
              <p className="text-xl text-slate-600 mb-8">{getTranslation(currentLocale, 'blog.newsletter_description')}</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                disabled={isSubmitting}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={getTranslation(currentLocale, 'blog.email_placeholder')}
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none text-lg"
              />
              <button    disabled={isSubmitting} className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg">
              {isSubmitting ? 'Subscribing...' : getTranslation(currentLocale, "footer.subscribe_button")}
            
              </button>
            </div>
            {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                  messageType === 'success' 
                    ? 'bg-green-500 bg-opacity-20 text-green-100 border border-green-400' 
                    : 'bg-red-500 bg-opacity-20 text-red-100 border border-red-400'
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;