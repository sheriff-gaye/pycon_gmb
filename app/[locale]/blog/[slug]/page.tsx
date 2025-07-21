import { notFound } from 'next/navigation';
import { blogPosts, featuredPost } from '../data';
import SingleBlogPost from './single_post';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  
  const allPosts = [featuredPost, ...blogPosts];
  
  const post = allPosts.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  return <SingleBlogPost post={post} />;
};

export default BlogPostPage;