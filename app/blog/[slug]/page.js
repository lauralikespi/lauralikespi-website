// [slug]/page.js
'use client';
import {useState, useEffect, React} from 'react';
import styles from '../../styles/page.module.css';
import blogStyles from '../../styles/BlogPost.module.css';
import mockBlogPosts from '../mockBlogPosts.json';
import Image from 'next/image';
import Link from 'next/link';

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


function getPostBySlug(slug) {
  return mockBlogPosts.posts.find(post => post.slug === slug);
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/blog-content/${post.contentFile}`);
        const html = await response.text();
        setContent(html);
      } catch (error) {
        console.error('Failed to fetch blog content:', error);
        setContent('<p>Failed to load blog content.</p>');
      }
    };

    fetchContent();
  }, [post?.contentFile]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      
      <main className={styles.main}>
        <section className={`${styles.hero} ${blogStyles.blogHero}`}>
          <div className={blogStyles.backLink}>
            <Link href="/blog">
              <span className={blogStyles.backArrow}>←</span> Back to Blog
            </Link>
          </div>
          <div className={styles.heroContent}>
            {(post.series) && (
              <p style={{paddingBottom: "2vh"}}>{post.series}</p>
            ) }
            <h1>{post.title}</h1>
            {(post.subtitle) && (
              <p style={{paddingTop: "2vh"}} ><i>{post.subtitle}</i></p>
            ) }
          </div>
          <br/>
          <p className={blogStyles.metaTitle}>By {post.author} | {new Date(post.date).toLocaleDateString('en-GB')}</p>

          <br/>
          <div className={blogStyles.imageWrapper}>
            <Image
              src={post.image}
              alt={post.title}
              width={500}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
              priority
            />
          </div>
          {(post.imageText) && (
            <p style={{textAlign: "center"}}><i>{post.imageText}</i></p>
          )}

        </section>
        <section className={blogStyles.content}>
          <article className={blogStyles.fullPost}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </section>
        <br/>
        <br/>
        <br/>
      </main>
    </>
  );
}