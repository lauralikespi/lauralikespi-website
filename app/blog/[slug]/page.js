'use client';
import {useState, useEffect, React} from 'react';
import styles from '../../styles/page.module.css';
import blogStyles from '../../styles/BlogPost.module.css';
import mockBlogPosts from '../mockBlogPosts.json';

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
  }, [post.contentFile]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main className={styles.main}>
      <section className={`${styles.hero} ${blogStyles.blogHero}`}>
        <div className={styles.heroContent}>
          <h1>{post.title}</h1>
          <p className={blogStyles.meta}>By {post.author} | {new Date(post.date).toLocaleDateString('en-GB')}</p>
        </div>
        <div className={styles.heroImage}>
          <img src={post.image} alt={post.title} width={500} height={300} />
        </div>
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