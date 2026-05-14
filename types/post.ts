export interface Author {
  name: string;
  bio: string;
  avatar: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  author: Author;
  coverImage?: string;
  readingTime: number;
  featured?: boolean;
}

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  updatedDate?: string;
  tags: string[];
  author: Author;
  coverImage?: string;
  featured?: boolean;
}
