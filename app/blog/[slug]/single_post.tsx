"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ArrowLeft, ArrowRight, Calendar, User, Clock, Eye, MessageCircle, 
  Tag, Share2, Heart, Bookmark, Twitter, Facebook, Linkedin,
  ThumbsUp, Send
} from 'lucide-react';
import { blogPosts, featuredPost } from '../data';

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

interface SingleBlogPostProps {
  post: BlogPost;
}

const SingleBlogPost = ({ post }: SingleBlogPostProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  // Generate full content based on post data
  const generateContent = (post: BlogPost) => {
    // This is a sample content generator - replace with actual content from your CMS/database
    const contentTemplates = {
      'building-future-pycon-senegambia-shaping-west-africa-tech-landscape': `
        <p class="text-lg leading-relaxed mb-6">The tech landscape in West Africa is experiencing unprecedented growth, and at the heart of this transformation lies a vibrant community of Python developers who are pushing boundaries and creating innovative solutions for local and global challenges.</p>
        
        <p class="text-lg leading-relaxed mb-6">When we first conceptualized PyCon Senegambia, our vision was simple yet ambitious: create a platform where developers, innovators, and thought leaders from Gambia and Senegal could come together to share knowledge, collaborate, and build the future of technology in our region.</p>
        
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">The Genesis of PyCon Senegambia</h2>
        
        <p class="text-lg leading-relaxed mb-6">The idea was born from countless conversations with local developers who expressed a desire for a world-class Python conference right here in West Africa. We recognized that while our region has immense talent, many developers lacked access to the kind of high-quality technical content and networking opportunities that conferences like PyCon US or EuroPython provide.</p>
        
        <blockquote class="border-l-4 border-yellow-400 pl-6 py-4 my-8 bg-yellow-50 italic text-lg">
          "Technology is not just about code; it's about community, collaboration, and creating solutions that matter to our people." - Conference Vision Statement
        </blockquote>
        
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">Building Bridges Across Borders</h2>
        
        <p class="text-lg leading-relaxed mb-6">One of the most exciting aspects of PyCon Senegambia is its cross-border nature. By bringing together developers from both Gambia and Senegal, we're fostering collaboration that transcends national boundaries and creates a unified tech ecosystem in the Senegambia region.</p>
        
        <p class="text-lg leading-relaxed mb-6">Join us as we build the future, one line of Python code at a time.</p>
      `,
      'getting-started-django-west-african-developer-guide': `
        <p class="text-lg leading-relaxed mb-6">Django has become one of the most popular web frameworks for Python developers worldwide, and for good reason. Its "batteries included" philosophy and rapid development capabilities make it perfect for building robust web applications that can serve the African market.</p>
        
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">Why Django for African Markets?</h2>
        
        <p class="text-lg leading-relaxed mb-6">When building applications for the African market, we face unique challenges: varying internet connectivity, mobile-first users, and the need for applications that work well on lower-spec devices. Django's efficiency and scalability make it an excellent choice for addressing these challenges.</p>
        
        <p class="text-lg leading-relaxed mb-6">In this guide, we'll explore how to leverage Django's features to build applications that truly serve our communities.</p>
      `,
      // Add more content templates as needed
      'default': `
        <p class="text-lg leading-relaxed mb-6">${post.excerpt}</p>
        
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">Introduction</h2>
        
        <p class="text-lg leading-relaxed mb-6">This article explores the fascinating world of ${post.category.toLowerCase()} development in the context of West African technology innovation. As we continue to build our tech ecosystem, understanding these concepts becomes increasingly important for developers in our region.</p>
        
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">Key Concepts</h2>
        
        <p class="text-lg leading-relaxed mb-6">The principles discussed in this article are fundamental to understanding modern development practices. By applying these concepts, developers can create more efficient, scalable, and maintainable applications.</p>
        
        <h2 class="text-2xl font-bold text-slate-800 mb-4 mt-8">Conclusion</h2>
        
        <p class="text-lg leading-relaxed mb-6">As we continue to grow our developer community in Senegambia, sharing knowledge and best practices becomes essential. We hope this article provides valuable insights for your development journey.</p>
      `
    };
    
    return contentTemplates[post.slug as keyof typeof contentTemplates] || contentTemplates.default;
  };

  // Get related posts (exclude current post)
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
      // Handle comment submission here
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
      {/* Back Navigation */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={handleBackClick}
            className="flex items-center text-slate-600 hover:text-yellow-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Hero Section */}
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
        
        {/* Floating Action Buttons */}
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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
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

          {/* Author Info */}
          <div className="flex items-center justify-between flex-wrap gap-6 pb-8 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-slate-800">{post.author}</div>
                <div className="text-slate-600">{post.authorRole || 'Contributing Writer'}</div>
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

        {/* Article Body */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: generateContent(post) }}
        />

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tags</h3>
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

        {/* Engagement Actions */}
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
            <span className="text-slate-600 text-sm">Share:</span>
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

        {/* Author Bio */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 mb-12">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">About {post.author}</h3>
              <p className="text-slate-600 mb-4">
                {post.author} is a passionate developer and community leader contributing to the growth of the Python ecosystem in West Africa. They bring years of experience in software development and a deep commitment to fostering technical education in the region.
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

        {/* Comments Section */}
        {showComments && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Comments ({post.comments})</h3>
            
            {/* Comment Form */}
            <div className="mb-8">
              <div className="bg-slate-50 rounded-2xl p-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full h-32 bg-white border border-slate-200 rounded-xl p-4 focus:border-yellow-400 focus:outline-none resize-none"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleCommentSubmit}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-6">
              {[1, 2, 3].map((commentId) => (
                <div key={commentId} className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-slate-800">Community Member</span>
                        <span className="text-slate-500 text-sm">2 hours ago</span>
                      </div>
                      <p className="text-slate-600 mb-3">
                        Great article! Looking forward to more content like this from the PyCon Senegambia community.
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

        {/* Related Posts */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Related Articles</h3>
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