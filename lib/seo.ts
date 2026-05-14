import { Metadata } from 'next';
import { Post } from '@/types/post';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devblog.example.com';
const SITE_NAME = 'DevBlog';
const SITE_DESCRIPTION = 'A blog about web development, TypeScript, React, and modern tooling.';

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: '%s | ' + SITE_NAME,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@devblog',
    },
  };
}

export function getPostMetadata(post: Post): Metadata {
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : [],
      publishedTime: post.date,
      modifiedTime: post.updatedDate,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export function getTagMetadata(tag: string, postCount: number): Metadata {
  return {
    title: 'Posts tagged "' + tag + '"',
    description: 'Browse ' + postCount + ' posts tagged with ' + tag + ' on ' + SITE_NAME + '.',
    openGraph: {
      type: 'website',
      title: 'Posts tagged "' + tag + '" | ' + SITE_NAME,
      description: 'Browse ' + postCount + ' posts tagged with ' + tag + '.',
    },
  };
}

export { SITE_NAME, SITE_DESCRIPTION, SITE_URL };
