// Blog post type definitions
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  published: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  email: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface RelatedPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
  readTime: number;
}

