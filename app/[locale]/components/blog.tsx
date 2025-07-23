"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Tag, Clock, Eye, MessageCircle, Star, Zap, BookOpen } from 'lucide-react';
import { HeroProps } from './interfaces/interface';
import { getTranslation } from '@/lib/i18n';
import { getBlogData } from '../blog/blog_data';

const BlogSection = ({ currentLocale }: HeroProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { featuredPost, blogPosts } = getBlogData(currentLocale);

  const categories = [
    { id: 'all', name: getTranslation(currentLocale, 'blog.category_1_name'), count: 24 },
    { id: 'python', name: getTranslation(currentLocale, 'blog.category_2_name'), count: 12 },
    { id: 'community', name: getTranslation(currentLocale, 'blog.category_3_name'), count: 8 },
    { id: 'tutorials', name: getTranslation(currentLocale, 'blog.category_4_name'), count: 6 },
    { id: 'events', name: getTranslation(currentLocale, 'blog.category_5_name'), count: 4 }
  ];

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category.toLowerCase() === getTranslation(currentLocale, `blog.category_${categories.findIndex(c => c.id === activeCategory) + 1}_name`).toLowerCase());

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

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
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
                      <div className="text-sm text-slate-500">{featuredPost.authorRole}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-slate-500 text-sm space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
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
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <article key={post.id} className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl overflow-hidden border border-slate-200 hover:border-yellow-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="aspect-video relative bg-gradient-to-br from-yellow-100 to-yellow-200">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="mb-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-3">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
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
                    {post.readTime}
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
          ))}
        </div>

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

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={getTranslation(currentLocale, 'blog.email_placeholder')}
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none text-lg"
              />
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg">
                {getTranslation(currentLocale, 'blog.subscribe')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;