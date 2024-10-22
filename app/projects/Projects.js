import React from 'react';
import styles from '../styles/MediaGrids.module.css';
import Image from 'next/image';

const projectData = [
  {
    title: "DOT-ed",
    image: "/images/dot-ed-logo.png",
    blurb: "DOT-ed is the personalised learning platform for my company Taught by Humans. Built in NextJS and React. Hosted on Vercel. Using supabase and OpenAI to personalise our content.",
    url: "/projects/dot-ed",
    type: "Business"
  },
  {
    title: "Flocking Simulator",
    image: "/images/flocking-simulation.png",
    blurb: "Flocking is a bio-inspired swarm alogorithm. Originally built HTML, CSS and JavaScript to implement an interface for flocking, recently reconfirmed in NextJS and React.",
    url: "/projects/flocking",
    type: "Fun"
  }
];

const ProjectsPage = () => {
  return (
    <div className={styles.talksPage}>
      <h1>Projects - Fun and Serious</h1>
      <div className={styles.talksGrid}>
        {projectData.map((talk, index) => (
          <div key={index} className={styles.talkCard}>
            {/* <img src={talk.image} alt={talk.title} className={styles.talkImage} /> */}
            <Image src={talk.image} alt={talk.title} className={styles.talkImage}  width={200} height={200} />

            <div className={styles.talkInfo}>
              <h2>{talk.title}</h2>
              <p>{talk.blurb}</p>
              {/* <p><strong>Company:</strong> {talk.company}</p>
              <p><strong>Date:</strong> {new Date(talk.date).toLocaleDateString('en-GB')}</p>
              <p><strong>Series:</strong> {talk.series}</p> */}
              <p><strong>Type:</strong> {talk.type}</p>
              <a href={talk.url} rel="noopener noreferrer" className={styles.watchButton}>
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;