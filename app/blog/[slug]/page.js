// /app/blog/[slug]/page.js (SERVER COMPONENT - NO 'use client')

import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import mockBlogPosts from '../mockBlogPosts.json';

// Replace this with server-side fetch if needed
function getPostBySlug(slug) {
  return mockBlogPosts.posts.find(post => post.slug === slug);
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lauralikespi.com';
  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.image?.startsWith('http')
    ? post.image
    : `${baseUrl}${post.image || '/images/default-blog-image.png'}`;

  let description = post.excerpt || '';
  if (!description && post.content) {
    const match = post.content.match(/<p>(.*?)<\/p>/s);
    if (match?.[1]) {
      description = match[1].replace(/<[^>]*>/g, '');
      if (description.length > 160) {
        description = description.substring(0, 157) + '...';
      }
    }
  }

  const keywords = post.topics_array?.join(', ') || '';

  return {
    title: `${post.title} | lauralikespi's Blog`,
    description: description || "lauralikespi's thoughts on AI, technology, startups, and founder life",
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: "lauralikespi's Blog",
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      article: {
        publishedTime: post.date,
        modifiedTime: post.updated_at || post.date,
        authors: [post.author],
        tags: post.topics_array || [],
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  return <BlogPostClient post={post} />;
}
