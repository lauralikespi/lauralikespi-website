import React from 'react';
import styles from '../styles/MediaGrids.module.css';
import Image from 'next/image';

const talksData = [
  {
    title: "Panel Discussion",
    company: "Women Who Code",
    date: "2021-03-27",
    image: "/images/womenWhoCodePanel_edited.jpg",
    url: "https://www.youtube.com/watch?v=hr1PJFSHGcg&list=PLVcEZG2JPVhdSp4MGVTmLVCHlXfCpb0DW&index=8",
    series: "Statistics in Data Science Series",
    type: "Panel"
  },
  {
    title: "International Women's Day Panel",
    company: "Taught by Humans",
    date: "2022-03-08",
    image: "/images/iwd_panel.jpg",
    url: "https://vimeo.com/686659027",
    series: "Data Confidence Journeys",
    type: "Organiser / Moderator"
  },
  {
    title: "Technologist, Educator and Innovator Laura Gemmell",
    company: "IET",
    date: "2019-08-01",
    image: "/images/IET_interview_edited.jpg",
    url: "https://www.youtube.com/watch?v=T4TTJeUZ_Hc",
    series: "In Conversation with... ",
    type: "Interview"
  },
  {
    title: "Swarms",
    company: "IET",
    date: "2019-04-19",
    image: "/images/IET.png",
    url: "https://tv.theiet.org/EmbedPlayer.aspx?videoid=12892&guid=cc54bcdf-7f50-4a0d-bee6-e895139d3aee",
    series: "Eng Fest",
    type: "Keynote presenter"
  },
  {
    title: "Inspiring Women and Girls in STEAM",
    company: "Engine Shed",
    date: "2021-10-21",
    image: "/images/adaLovelace.png",
    url: "https://www.youtube.com/watch?v=your_video_id",
    series: "Ada Lovelace Day",
    type: "Panel"
  },
  {
    title: "Unsupervised Learning",
    company: "Women Who Code",
    date: "2021-03-20",
    image: "/images/womenWhoCodePart7.png",
    url: "https://www.youtube.com/watch?v=gozvBzup19Y&list=PLVcEZG2JPVhdSp4MGVTmLVCHlXfCpb0DW&index=7",
    series: "Statistics in Data Science Series",
    type: "Teaching"
  }
];

const TalksPage = () => {
  return (
    <div className={styles.talksPage}>
      <h1>Talks, Presentations, Podcasts, Interviews</h1>
      <div className={styles.talksGrid}>
        {talksData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((talk, index) => (
          <div key={index} className={styles.talkCard}>
            {/* <img src={talk.image} alt={talk.title} className={styles.talkImage} /> */}
            <Image src={talk.image} alt={talk.title} className={styles.talkImage}  width={200} height={200} />

            <div className={styles.talkInfo}>
              <h2>{talk.title}</h2>
              <p><strong>Company:</strong> {talk.company}</p>
              <p><strong>Date:</strong> {new Date(talk.date).toLocaleDateString('en-GB')}</p>
              <p><strong>Series:</strong> {talk.series}</p>
              <p><strong>Type:</strong> {talk.type}</p>
              <a href={talk.url} target="_blank" rel="noopener noreferrer" className={styles.watchButton}>
                Watch Talk
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalksPage;