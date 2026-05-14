import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontmatter } from '@/types/post';
import { calculateReadingTime } from './readingTime';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const all = fs.readdirSync(POSTS_DIR);
  return all.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

function parsePost(slug: string, raw: string): Post {
  const parsed = matter(raw);
  const frontmatter = parsed.data as PostFrontmatter;
  const content = parsed.content;
  return {
    slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    content,
    date: frontmatter.date,
    updatedDate: frontmatter.updatedDate,
    tags: frontmatter.tags ?? [],
    author: frontmatter.author,
    coverImage: frontmatter.coverImage,
    readingTime: calculateReadingTime(content),
    featured: frontmatter.featured ?? false,
  };
}

export function getAllPosts(): Post[] {
  const files = getPostFiles();
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, '');
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return parsePost(slug, raw);
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(POSTS_DIR, slug + '.mdx');
  const mdPath = path.join(POSTS_DIR, slug + '.md');

  let filePath = '';
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  return parsePost(slug, raw);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): Post[] {
  const all = getAllPosts();
  return all.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): Post[] {
  const all = getAllPosts();
  const related = all.filter((post) => {
    if (post.slug === slug) return false;
    return post.tags.some((t) => tags.includes(t));
  });
  return related.slice(0, limit);
}
