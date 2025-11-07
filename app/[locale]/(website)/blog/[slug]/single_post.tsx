"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ArrowLeft, ArrowRight, Calendar, User, Clock, Eye, MessageCircle, 
  Tag, Share2, Heart, Bookmark, Twitter, Facebook, Linkedin,
  ThumbsUp, Send
} from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import { HeroProps } from '../../components/interfaces/interface';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole?: string | null;
  authorBio?: string | null;
  authorFacebook?: string | null;
  authorTwitter?: string | null;
  authorLinkedin?: string | null;
  date: Date;
  readTime: number;
  image?: string | null;
  views: number;
  comments: number;
  likes: number;
  tags: string[];
  isFeatured?: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

type CommentType = {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
};

interface SingleBlogPostProps extends HeroProps {
  post: BlogPost;
  initialComments: CommentType[];
}

const SingleBlogPost = ({ post, currentLocale, initialComments }: SingleBlogPostProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [likesCount, setLikesCount] = useState(post.likes ?? 0);
  const [isLiking, setIsLiking] = useState(false);
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Check localStorage for liked state on mount
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    setIsLiked(likedPosts.includes(post.slug));
  }, [post.slug]);

  // Related posts functionality would need to fetch from database
  // For now, we'll show empty state or remove this section
  const relatedPosts: any[] = [];

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

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      return;
    }

    setIsSubmittingComment(true);

    try {
      const response = await fetch('/api/blog/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post.id,
          content: comment,
          author: commentAuthor.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit comment');
      }

      const result = await response.json();
      
      // Add new comment to the list
      setComments(prev => [result.data, ...prev]);
      
      // Clear form
      setComment('');
      setCommentAuthor('');
      
      // Show comments section if hidden
      setShowComments(true);
      
      // Show success message (you can add toast here if you have it)
      console.log('Comment posted successfully');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleBackClick = () => {
    router.push('/blog');
  };

  const handleRelatedPostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const handleNativeShare = async () => {
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        // Optional: Track share (analytics)
      } catch (error: any) {
        // User cancelled or error occurred
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        // Ultimate fallback: Show alert with URL
        prompt('Copy this link:', url);
      }
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  const handleLikeToggle = async () => {
    if (isLiking) return; // Prevent double-clicking
    
    setIsLiking(true);
    
    try {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      
      if (isLiked) {
        // Unlike
        const response = await fetch('/api/blog/like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: post.slug, action: 'unlike' }),
        });
        
        if (response.ok) {
          setIsLiked(false);
          setLikesCount(prev => Math.max(0, prev - 1));
          const updatedLikes = likedPosts.filter((s: string) => s !== post.slug);
          localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
        }
      } else {
        // Like
        const response = await fetch('/api/blog/like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: post.slug, action: 'like' }),
        });
        
        if (response.ok) {
          setIsLiked(true);
          setLikesCount(prev => prev + 1);
          likedPosts.push(post.slug);
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
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
        <div className="aspect-[2/1] relative bg-gradient-to-br from-slate-100 to-slate-200">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-slate-400 text-2xl">No Image</span>
            </div>
          )}
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
          <button 
            onClick={handleNativeShare}
            className="p-3 rounded-full bg-white text-slate-600 hover:bg-yellow-500 hover:text-white shadow-lg transition-all duration-300"
            title="Share this post"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
              <Tag className="w-4 h-4 mr-2" />
              {post.category.name}
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
                {new Date(post.date).toLocaleDateString(currentLocale, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime} min read
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
          dangerouslySetInnerHTML={{ __html: post.content }}
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
              onClick={handleLikeToggle}
              disabled={isLiking}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600'
              } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount.toLocaleString()}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
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
              <span className="text-white text-2xl font-bold">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {getTranslation(currentLocale, 'blog.about_author').replace('{author}', post.author)}
              </h3>
              <p className="text-slate-600 mb-4">
                {post.authorBio || getTranslation(currentLocale, 'blog.author_bio').replace('{author}', post.author)}
              </p>
              {(post.authorFacebook || post.authorTwitter || post.authorLinkedin) && (
                <div className="flex space-x-3">
                  {post.authorFacebook && (
                    <a
                      href={post.authorFacebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                      title="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {post.authorTwitter && (
                    <a
                      href={post.authorTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                      title="Twitter/X"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {post.authorLinkedin && (
                    <a
                      href={post.authorLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 transition-colors duration-300"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {showComments && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              {getTranslation(currentLocale, 'blog.comments_label').replace('{count}', comments.length.toString())}
            </h3>
            
            <div className="mb-8">
              <div className="bg-slate-50 rounded-2xl p-6">
                <div className="mb-4">
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="Your name (optional)"
                    disabled={isSubmittingComment}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={getTranslation(currentLocale, 'blog.comment_placeholder')}
                  disabled={isSubmittingComment}
                  className="w-full h-32 bg-white border border-slate-200 rounded-xl p-4 focus:border-yellow-400 focus:outline-none resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-slate-500">
                    {comment.length}/1000 characters
                  </p>
                  <button
                    onClick={handleCommentSubmit}
                    disabled={isSubmittingComment || !comment.trim()}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingComment ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {getTranslation(currentLocale, 'blog.post_comment')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                comments.map((commentItem) => {
                  const timeAgo = getTimeAgo(new Date(commentItem.createdAt));
                  const isAnonymous = commentItem.author === "Anonymous";
                  const initials = isAnonymous ? "A" : commentItem.author.charAt(0).toUpperCase();
                  
                  return (
                    <div key={commentItem.id} className="bg-slate-50 rounded-2xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold">{initials}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-semibold text-slate-800">
                              {commentItem.author}
                              {isAnonymous && (
                                <span className="ml-2 text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">
                                  Anonymous
                                </span>
                              )}
                            </span>
                            <span className="text-slate-500 text-sm">{timeAgo}</span>
                          </div>
                          <p className="text-slate-600 whitespace-pre-wrap">
                            {commentItem.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {relatedPosts.length > 0 && (
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
        )}
      </article>
    </div>
  );
};

export default SingleBlogPost;