"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ArrowLeft, ArrowRight, Calendar, User, Clock, Eye, MessageCircle, 
  Tag, Share2, Heart, Bookmark, Twitter, Facebook, Linkedin,
  ThumbsUp, Send
} from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import { HeroProps } from '../../components/interfaces/interface';
import { getBlogData } from '../blog_data';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  views: number;
  comments: number;
  tags: string[];
  featured?: boolean;
}

interface SingleBlogPostProps extends HeroProps {
  post: BlogPost;
}

const SingleBlogPost = ({ post, currentLocale }: SingleBlogPostProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const generateContent = (post: BlogPost) => {
    const contentTemplates = {
      'building-future-pycon-senegambia-shaping-west-africa-tech-landscape': `
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_building_future_p1')}</p>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_building_future_p2')}</p>
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">${getTranslation(currentLocale, 'blog.content_building_future_h2_1')}</h2>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_building_future_p3')}</p>
        <blockquote class="border-l-4 border-yellow-400 pl-6 py-4 my-8 bg-yellow-50 italic text-lg">
          ${getTranslation(currentLocale, 'blog.content_building_future_quote')}
        </blockquote>
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">${getTranslation(currentLocale, 'blog.content_building_future_h2_2')}</h2>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_building_future_p4')}</p>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_building_future_p5')}</p>
      `,
      'getting-started-django-west-african-developer-guide': `
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_django_p1')}</p>
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">${getTranslation(currentLocale, 'blog.content_django_h2_1')}</h2>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_django_p2')}</p>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_django_p3')}</p>
      `,
      'default': `
        <p class="text-lg leading-relaxed mb-6">${post.excerpt}</p>
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">${getTranslation(currentLocale, 'blog.content_default_h2_1')}</h2>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_default_p1')}</p>
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">${getTranslation(currentLocale, 'blog.content_default_h2_2')}</h2>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_default_p2')}</p>
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">${getTranslation(currentLocale, 'blog.content_default_h2_3')}</h2>
        <p class="text-lg leading-relaxed mb-6">${getTranslation(currentLocale, 'blog.content_default_p3')}</p>
      `
    };
    
    return contentTemplates[post.slug as keyof typeof contentTemplates] || contentTemplates.default;
  };

  const { featuredPost, blogPosts } = getBlogData(currentLocale);
  const allPosts = [featuredPost, ...blogPosts];
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      image: p.image,
      date: p.date
    }));

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment);
      setComment('');
    }
  };

  const handleBackClick = () => {
    router.push('/blog');
  };

  const handleRelatedPostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={handleBackClick}
            className="flex items-center text-slate-600 hover:text-yellow-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {getTranslation(currentLocale, 'blog.back_to_blog')}
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="aspect-[2/1] relative">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute top-6 right-6 flex space-x-3">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
              isBookmarked ? 'bg-yellow-500 text-white' : 'bg-white text-slate-600 hover:bg-yellow-500 hover:text-white'
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-white text-slate-600 hover:bg-yellow-500 hover:text-white shadow-lg transition-all duration-300">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
              <Tag className="w-4 h-4 mr-2" />
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-6 pb-8 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-slate-800">{post.author}</div>
                <div className="text-slate-600">{post.authorRole || getTranslation(currentLocale, 'blog.default_author_role')}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-slate-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {post.views.toLocaleString()}
              </div>
            </div>
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: generateContent(post) }}
        />

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{getTranslation(currentLocale, 'blog.tags_label')}</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-yellow-100 hover:text-yellow-800 transition-colors duration-300 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-6 border-t border-b border-slate-200 mb-8">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.comments + (isLiked ? 1 : 0)}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-slate-600 text-sm">{getTranslation(currentLocale, 'blog.share_label')}</span>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 text-slate-600 hover:text-blue-400 transition-colors duration-300"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 text-slate-600 hover:text-blue-600 transition-colors duration-300"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 text-slate-600 hover:text-blue-700 transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 mb-12">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{getTranslation(currentLocale, 'blog.about_author')}</h3>
              <p className="text-slate-600 mb-4">
                {getTranslation(currentLocale, 'blog.author_bio')}
              </p>
              <div className="flex space-x-3">
                <button className="text-blue-400 hover:text-blue-600 transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="text-blue-700 hover:text-blue-800 transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {showComments && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">{getTranslation(currentLocale, 'blog.comments_label')}</h3>
            
            <div className="mb-8">
              <div className="bg-slate-50 rounded-2xl p-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={getTranslation(currentLocale, 'blog.comment_placeholder')}
                  className="w-full h-32 bg-white border border-slate-200 rounded-xl p-4 focus:border-yellow-400 focus:outline-none resize-none"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCommentSubmit}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {getTranslation(currentLocale, 'blog.post_comment')}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((commentId) => (
                <div key={commentId} className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-slate-800">{getTranslation(currentLocale, 'blog.comment_author')}</span>
                        <span className="text-slate-500 text-sm">{getTranslation(currentLocale, 'blog.comment_time')}</span>
                      </div>
                      <p className="text-slate-600 mb-3">
                        {getTranslation(currentLocale, 'blog.sample_comment')}
                      </p>
                      <button className="flex items-center text-slate-500 hover:text-yellow-600 transition-colors duration-300">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">5</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-8">{getTranslation(currentLocale, 'blog.related_articles')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden border border-slate-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="aspect-video relative">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-slate-800 mb-2 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs">{relatedPost.date}</span>
                    <button 
                      onClick={() => handleRelatedPostClick(relatedPost.slug)}
                      className="text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default SingleBlogPost;