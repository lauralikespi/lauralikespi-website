'use client';
import {useState, useEffect, React} from 'react';
import styles from '../../styles/page.module.css';
import blogStyles from '../../styles/BlogPost.module.css';
import mockBlogPosts from '../mockBlogPosts.json';
import Image from 'next/image';
import Link from 'next/link';

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
    <main className={styles.main}>

      
      <section className={`${styles.hero} ${blogStyles.blogHero}`}>
        <div className={blogStyles.backLink}>
          <Link href="/blog">
            <span className={blogStyles.backArrow}>←</span> Back to Blog
          </Link>
        </div>
        <div className={styles.heroContent}>
          <h1>{post.title}</h1>
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
        <br/>
        <br/>
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
  );
}