import React from 'react';
import styles from '../styles/MediaGrids.module.css';
import Image from 'next/image';

const Articles = () => {
  const articles = [
      {
        "title": "Leaving No One Behind: Educating Those Most Impacted by Artificial Intelligence",
        "publication": "Artificial Intelligence in Education",
        "date": "2019-06-21",
        "type": "Academic Paper",
        "url": "https://link.springer.com/chapter/10.1007/978-3-030-23207-8_63",
        "image": "/images/journal.png",
        "blurb": "AI is reshaping education, but who gets left behind? This academic piece dives into how we can bring inclusive strategies to AI education, ensuring everyone gets a chance to benefit from this technology."
      },
      {
        "title": "Leaving no one behind: 21 Conversations on Designing Education in AI and Robotics",
        "publication": "Advanced Science News",
        "date": "2021-01-20",
        "type": "Science Article",
        "url": "https://www.advancedsciencenews.com/leaving-no-one-behind-21-conversations-on-designing-education-in-ai-and-robotics/",
        "image": "/images/robot-education.png",
        "blurb": "This article pulls together 21 insightful conversations on designing AI and robotics education that’s inclusive and accessible. A must-read for anyone interested in the intersection of tech and education."
      },
      {
        "title": "Skilling the Gap: 21 Conversations on Designing Education for Those Left Behind as Robotics and Artificial Intelligence Advance",
        "publication": "Advanced Intelligent Systems",
        "date": "2021-01-18",
        "type": "Academic Paper",
        "url": "https://onlinelibrary.wiley.com/doi/10.1002/aisy.202000169",
        "image": "/images/life.png",
        "blurb": "This academic paper tackles the growing gap between those who have access to tech education and those who don’t. I look at ways to bridge that gap and bring AI and robotics learning to everyone, no matter where they start."
      },
      {
        "title": "Fintech + Inequality, and the Need for Education",
        "publication": "University of Bristol School of Education Blog",
        "date": "2020-12-08",
        "type": "Guest Blog",
        "url": "https://schoolofeducation.blogs.bristol.ac.uk/2020/12/08/fintech-inequality-and-the-need-for-education/",
        "image": "/images/cashless.png",
        "blurb": "This piece explores the growing divide created by fintech and why education is key to levelling the playing field. If you care about finance and fairness, this is for you."
      },
      {
        "title": "How Can Innovation Drive the UK’s Semiconductor Future?",
        "publication": "Biforesight",
        "date": "2023",
        "type": "Guest Journalist",
        "url": "https://biforesight.com/materials/how-can-innovation-drive-the-uks-semiconductor-future/",
        "image": "/images/semiconductor.png",
        "blurb": "Innovation is key to the UK’s semiconductor industry, and this article explores how education and investment can help push the sector forward."
      }
    ];

  return (

    <div className={styles.talksPage}>
      <h1>Articles, Guest Blogs, Publications</h1>
      <br/>
      <br/>
      <p>I write to make sense of how AI, tech, and education intersect in real life. From exploring how AI can reshape education to reflecting on work experiences that truly matter, my pieces aim to inform and inspire without being too heavy. Below are some of my articles and publications on topics I’m passionate about.</p>
      <br/>
      <br/>
      <div className={styles.talksGrid}>
        {articles.sort((a, b) => new Date(b.date) - new Date(a.date)).map((talk, index) => (
          <div key={index} className={styles.talkCard}>
            {/* <img src={talk.image} alt={talk.title} className={styles.talkImage} /> */}
            <Image src={talk.image} alt={talk.title} className={styles.talkImage}  width={200} height={200} />

            <div className={styles.talkInfo}>
              <h2>{talk.title}</h2>
              <p> {talk.blurb}</p>
              <p><strong>Publication:</strong> {talk.publication}</p>
              <p><strong>Date:</strong> {new Date(talk.date).toLocaleDateString('en-GB')}</p>
              {/* <p><strong>Series:</strong> {talk.series}</p> */}
              <p><strong>Type:</strong> {talk.type}</p>
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