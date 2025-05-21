// blog/page.js
import BlogPage from '../components/BlogPage';
import styles from "../styles/page.module.css";
import mockBlogPosts from './mockBlogPosts.json';
import BlogMetadata from '../components/BlogMetadata';

function getBlogs(page = 1, pageSize = 10, topic = null) {
  let posts = mockBlogPosts.posts;

  // Filter by topic if provided
  if (topic) {
    posts = posts.filter(post => post.topics_array && post.topics_array.includes(topic));
  }

  // Sort posts by date
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Paginate
  const totalCount = posts.length;
  posts = posts.slice((page - 1) * pageSize, page * pageSize);

  return { posts, totalCount };
}

function getTopics() {
  const allTopics = new Set();
  
  mockBlogPosts.posts.forEach(post => {
    if (post.topics_array) {
      post.topics_array.forEach(topic => allTopics.add(topic));
    }
  });

  return Array.from(allTopics);
}

export default function Blog({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const topic = searchParams.topic || null;
  
  try {
    const { posts, totalCount } = getBlogs(page, 10, topic);
    const topics = getTopics();

    const totalPages = Math.ceil(totalCount / 10);

    // Generate a descriptive URL for the current page
    let currentUrl = '/blog';
    if (topic) {
      currentUrl += `?topic=${topic}`;
      if (page > 1) {
        currentUrl += `&page=${page}`;
      }
    } else if (page > 1) {
      currentUrl += `?page=${page}`;
    }

    return (
      <>
        {/* Add the BlogMetadata component */}
        <BlogMetadata 
          post={null} // null because we're on the index page
          url={currentUrl}
        />
        
        <BlogPage 
          posts={posts} 
          currentPage={page} 
          totalPages={totalPages} 
          topics={topics} 
          currentTopic={topic}
        />
      </>
    );
  } catch (error) {
    return (
      <main className={styles.main}>
        <section className={styles.pricing}>
          <h1>Error</h1>
          <p>{error.message}</p>
        </section>
      </main>
    );
  }
}