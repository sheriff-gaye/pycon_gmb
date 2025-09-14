export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  readTime: number;
  isFeatured: boolean;
  date: string;
  image?: string;
}