import BlogPage from '../components/BlogPage';
import styles from "../styles/page.module.css";
import mockBlogPosts from './mockBlogPosts.json';

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

    return (
      // <main className={styles.main}>
      //   <section className={styles.singlePage}>
          <BlogPage 
            posts={posts} 
            currentPage={page} 
            totalPages={totalPages} 
            topics={topics} 
            currentTopic={topic}
          />
      //   </section>
      // </main>
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