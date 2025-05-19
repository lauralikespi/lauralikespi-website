import React from 'react';
import Link from 'next/link';
import styles from '../styles/BlogPost.module.css';
import Image from 'next/image';

const BlogPost = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <article className={styles.blogPost}>
      {(post.series) && (
        <h3>{post.series}</h3>
      )}
      <h2><Link href={`/blog/${post.slug}`} className={styles.readMore}>{post.title}</Link></h2>
      <p className={styles.meta}>
        By {post.author} | {formatDate(post.date)}
      </p>
      <div className={styles.imageWrapper}>
        <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
            priority
          />
      </div>

      {/* <div className={styles.postContent}> */}
        {/* <img className={styles.postImage} src={post.image} alt={post.title} /> */}

        {/* <div className={styles.postText}> */}
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.topics}>
            {post.topics_array.map((topic, index) => (
              <span key={index} className={styles.topic}>{topic}</span>
            ))}
          </div>
            <Link href={`/blog/${post.slug}`} className={styles.readMore}>
            Read More
          </Link>
        {/* </div> */}
      {/* </div> */}

    </article>
  );
};

export default BlogPost;