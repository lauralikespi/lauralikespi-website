import React from 'react';
import styles from '../styles/MediaGrids.module.css';
import Image from 'next/image';

const Articles = () => {
  const articles = [
    {
    title: "Leaving No One Behind: Educating Those Most Impacted by Artificial Intelligence",
    type: "writing",
    publication: "Artificial Intelligence in Education",
    date: "2019-06-21",
    url: "https://link.springer.com/chapter/10.1007/978-3-030-23207-8_63",
    topics: ["AI", "education"],
    contentType: "Academic Publication",
    image: "/images/journal.png"
  },
  {
    title: "Coding, Not Coffee, on Work Experience??",
    type: "writing",
    publication: "Thought by Humans",
    date: "2018-06-28",
    url: "https://medium.com/thoughts-by-humans/coding-not-coffee-on-work-experience-6b0277e36cbd",
    image: "/images/coffee.png",
    topics: ["work experience", "tech education", "women in tech"],
    contentType: "Blog"
  },
  {
    title: "Leaving no one behind: 21 conversations on designing education in AI and robotics",
    type: "writing",
    publication: "Advanced Science News",
    date: "2021-01-20",
    url: "https://www.advancedsciencenews.com/leaving-no-one-behind-21-conversations-on-designing-education-in-ai-and-robotics/",
    image: "/images/robot-education.png",
    topics: ["AI", "education"],
    contentType: "Article"
  },
  {
    title: "Skilling the Gap: 21 Conversations on Designing Education for Those Left Behind as Robotics and Artificial Intelligence Advance",
    type: "writing",
    publication: "Advanced Intelligent Systems",
    date: "2021-01-18",
    url: "https://onlinelibrary.wiley.com/doi/10.1002/aisy.202000169",
    image: "/images/life.png",
    topics: ["AI", "education"],
    contentType: "Academic Publication"
  },
  {
    title: "Fintech + Inequality, and the need for education",
    type: "writing",
    publication: "University of Bristol School of Education Blog",
    date: "2020-12-08",
    url: "https://schoolofeducation.blogs.bristol.ac.uk/2020/12/08/fintech-inequality-and-the-need-for-education/",
    image: "/images/cashless.png",
    topics: ["fintech"],
    contentType: "Blog"
  },
  {
    title: "#0— Why Oh Why?",
    type: "writing",
    publication: "Laura Likes AI",
    date: "2020-08-03",
    url: "https://lauralikespi.medium.com/laura-likes-ai-0-why-oh-why-54fbf0c3e48f",
    image: "/images/venn diagram.png",
    topics: ["AI", "work"],
    contentType: "Blog"
  }
];

  return (

    <div className={styles.talksPage}>
    <h1>Articles, Guest Blogs, Publications</h1>
    <div className={styles.talksGrid}>
      {articles.sort((a, b) => new Date(b.date) - new Date(a.date)).map((talk, index) => (
        <div key={index} className={styles.talkCard}>
          {/* <img src={talk.image} alt={talk.title} className={styles.talkImage} /> */}
          <Image src={talk.image} alt={talk.title} className={styles.talkImage}  width={200} height={200} />

          <div className={styles.talkInfo}>
            <h2>{talk.title}</h2>
            <p><strong>Company:</strong> {talk.company}</p>
            <p><strong>Date:</strong> {new Date(talk.date).toLocaleDateString('en-GB')}</p>
            {/* <p><strong>Series:</strong> {talk.series}</p> */}
            <p><strong>Type:</strong> {talk.contentType}</p>
            <a href={talk.url} target="_blank" rel="noopener noreferrer" className={styles.watchButton}>
              Read
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};
export default Articles;