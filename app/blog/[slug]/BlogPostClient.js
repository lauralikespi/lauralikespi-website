'use client';

import { useState, useEffect } from 'react';
import styles from '../../styles/page.module.css';
import blogStyles from '../../styles/BlogPost.module.css';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Client-side component for rendering a single blog post.
 * 
 * - Receives a fully-hydrated `post` object from the Server Component.
 * - Fetches the HTML body specified by `post.contentFile`.
 * - Renders hero, image, and post content.
 */
export default function BlogPostClient({ post }) {
  const [content, setContent] = useState('');

  /* Fetch the HTML content for this post (runs client-side). */
  useEffect(() => {
    async function fetchContent() {
      if (!post?.contentFile) return;
      try {
        const res  = await fetch(`/blog-content/${post.contentFile}`);
        setContent(await res.text());
      } catch (err) {
        console.error('Failed to fetch blog content:', err);
        setContent('<p>Failed to load blog content.</p>');
      }
    }
    fetchContent();
  }, [post?.contentFile]);

  if (!post) return <div>Post not found</div>;

  return (
    <main className={styles.main}>
      {/* ────── HERO ────── */}
      <section className={`${styles.hero} ${blogStyles.blogHero}`}>
        <div className={blogStyles.backLink}>
          <Link href="/blog">
            <span className={blogStyles.backArrow}>←</span> Back to Blog
          </Link>
        </div>

        <div className={styles.heroContent}>
          {post.series && (
            <p style={{ paddingBottom: '2vh' }}>{post.series}</p>
          )}

          <h1>{post.title}</h1>

          {post.subtitle && (
            <p style={{ paddingTop: '2vh' }}>
              <i>{post.subtitle}</i>
            </p>
          )}
        </div>

        <br />
        <p className={blogStyles.metaTitle}>
          By {post.author} |{' '}
          {new Date(post.date).toLocaleDateString('en-GB')}
        </p>

        <br />
        <div className={blogStyles.imageWrapper}>
          <Image
            src={post.image}
            alt={post.title}
            width={500}
            height={300}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            priority
          />
        </div>

        {post.imageText && (
          <p style={{ textAlign: 'center' }}>
            <i>{post.imageText}</i>
          </p>
        )}
      </section>

      {/* ────── BODY ────── */}
      <section className={blogStyles.content}>
        <article className={blogStyles.fullPost}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </section>
      <br />
      <br />
      <br />
    </main>
  );
}
