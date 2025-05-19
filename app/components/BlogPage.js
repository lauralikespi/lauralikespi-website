// components/BlogPage.js
'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BlogPost from './BlogPost';
import styles from '../styles/BlogPage.module.css';

const BlogPage = ({ posts, currentPage, totalPages, topics, currentTopic }) => {
  const router = useRouter();

  const handlePageChange = (newPage) => {
    router.push(`/blog?page=${newPage}${currentTopic ? `&topic=${currentTopic}` : ''}`);
  };

  const handleTopicChange = (topic) => {
    router.push(`/blog?page=1&topic=${topic}`);
  };

  return (
    <div className={styles.blogPage}>
      <h1>Blog</h1>

      <p><i>"[I write] to find out what I think about things I don't understand."</i> <br/>- Brooke Harwood (Nicole Kidman), A Family Affair.</p>
      <div className={styles.topicFilter}>
        <select 
          value={currentTopic || ''} 
          onChange={(e) => handleTopicChange(e.target.value)}
        >
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <br/>
      <br/>
      <div className={styles.blogPosts}>
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        <span>Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default BlogPage;