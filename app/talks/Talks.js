import React from 'react';
import styles from '../styles/MediaGrids.module.css';
import Image from 'next/image';

const talksData = [
    {
      "title": "How to Use AI in Marketing",
      "company": "Arima & Co",
      "date": "2024-02-06",
      "image": "/images/arima_podcast.png",
      "url": "https://www.arimacompany.com/mmi-podcast/ep-40-how-to-use-ai-in-marketing-with-laura-gemmell",
      "type": "Podcast",
      "blurb": "In this podcast episode, I discuss how AI is transforming marketing, from the construction of ChatGPT to practical tips on how to leverage AI effectively. We also explore the critical issue of bias in AI."
    },
    {
      "title": "Interview on Being an AI-First Company",
      "company": "Financial Times",
      "date": "2024-03-15",
      "image": "/images/financial_times_interview.png",
      "url": "https://vimeo.com/902199290/321fd5953b",
      "type": "Interview",
      "blurb": "I was interviewed as an AI expert for the Financial Times, discussing the benefits and challenges of running an AI-first company, focusing on how businesses can adopt AI while ensuring ethical practices."
    },
    {
      "title": "AI Ethics Roundtable",
      "company": "WeShape",
      "date": "2024-04-15",
      "image": "/images/ai_ethics_roundtable.png",
      "url": "https://www.youtube.com/watch?v=l0zj4srYV8E",
      "type": "Roundtable",
      "blurb": "During this roundtable discussion, we tackled AI ethics, examining how bias, transparency, and accountability should shape the future of AI development and application."
    },
    {
      "title": "Jean Golding Institute Data Week - Talk",
      "company": "University of Bristol",
      "date": "2024-06-06",
      "image": "/images/jgi_data_week_talk.png",
      "url": "https://www.youtube.com/watch?v=5srFhYHgINI&list=PLx325CxArn16xrvm76lsFdKFxxlohF_qJ&index=4",
      "type": "Talk",
      "blurb": "At the Jean Golding Institute's Data Week, I delivered a talk on AI applications and the importance of data confidence in the workplace, exploring how AI can empower better decision-making."
    },
    {
      "title": "Tech Spotlight - TEDx Speakers - Past and Future",
      "company": "TEDx Bristol",
      "date": "2023-10-10",
      "image": "/images/tedxbristol_tech_spotlight.png",
      "url": "",
      "type": "Panel Host",
      "blurb": "I organised and moderated two panels at the 'Tech Spotlight' event as part of TEDx Bristol, exploring the evolving tech landscape in the city. The first panel featured past speakers discussing their journeys since 2019, while the second panel introduced new voices set to take the TEDx stage in 2023."
    },
    {
      "title": "Jean Golding Institute Data Week - Panel",
      "company": "University of Bristol",
      "date": "2024-06-06",
      "image": "/images/jgi_data_week_panel.png",
      "url": "https://www.youtube.com/watch?v=cjJOLcwzCdU",
      "type": "Panel",
      "blurb": "As part of the Data Week, I joined a panel to discuss the future of data science and AI, particularly how organisations can bridge the gap between data insights and real-world application."
    },
    {
      "title": "One Bot Isn't Enough",
      "company": "AI West",
      "date": "2024-02-15",
      "image": "/images/ai_west_one_bot_isnt_enough.png",
      "url": "",
      "type": "Talk",
      "blurb": "At AI West, I presented 'One Bot Isn't Enough,' highlighting the limitations of single AI systems and the importance of multi-bot architectures for complex decision-making processes. (No recording available)"
    },
    {
      "title": "Panel Host: Using AI and Regulation",
      "company": "AI West",
      "date": "2024-05-08",
      "image": "/images/ai_west_panel.png",
      "url": "",
      "type": "Panel Host",
      "blurb": "I hosted this AI West panel, which delved into the regulatory landscape surrounding AI. The discussion focused on how to balance innovation with ethical responsibility in AI. (No recording available)"
    },
    {
      "title": "Impact of AI - Panel",
      "company": "Ghyston Impact Conference",
      "date": "2024-10-08",
      "image": "/images/ghyston_impact_conference.png",
      "url": "",
      "type": "Panel",
      "blurb": "At Ghyston's Impact Conference, I joined a panel to explore the far-reaching impacts of AI across industries, discussing both the opportunities and the risks of widespread AI adoption. (No recording available)"
    },  
  {
    "title": "Giant Minds: From the Bristol Tech Community",
    "company": "Ghyston",
    "date": "2024-04-09",
    "image": "/images/giant_minds_podcast.png",
    "url": "https://www.youtube.com/watch?v=hBDTfLum7Rg",
    "type": "Podcast",
    "blurb": "I had the pleasure of discussing the intersection of tech and data confidence as part of the Bristol tech community. This conversation dives into the importance of AI in shaping the future of work and the lessons learned from building AI education platforms."
  },
  {
    "title": "Panel Discussion",
    "company": "Women Who Code",
    "date": "2021-03-27",
    "image": "/images/womenWhoCodePanel_edited.jpg",
    "url": "https://www.youtube.com/watch?v=hr1PJFSHGcg&list=PLVcEZG2JPVhdSp4MGVTmLVCHlXfCpb0DW&index=8",
    "type": "Panel",
    "blurb": "In this panel discussion with Women Who Code, I joined other tech leaders to share insights into the evolving role of women in data science, as well as challenges and opportunities in AI."
  },
  {
    "title": "International Women's Day Panel",
    "company": "Taught by Humans",
    "date": "2022-03-08",
    "image": "/images/iwd_panel.jpg",
    "url": "https://vimeo.com/686659027",
    "type": "Organiser / Moderator",
    "blurb": "On International Women’s Day, I hosted and moderated this panel for Taught by Humans, focusing on the journeys of women in data science and AI. We explored themes of data confidence, inclusivity, and breaking barriers in the tech industry."
  },
  {
    "title": "Technologist, Educator and Innovator Laura Gemmell",
    "company": "IET",
    "date": "2019-08-01",
    "image": "/images/IET_interview_edited.jpg",
    "url": "https://www.youtube.com/watch?v=T4TTJeUZ_Hc",
    "type": "Interview",
    "blurb": "In this interview with the IET, I reflected on my journey as a technologist and educator, discussing my work in AI education and how I strive to make complex data skills more accessible to all."
  },
  {
    "title": "Swarms",
    "company": "IET",
    "date": "2019-04-19",
    "image": "/images/IET.png",
    "url": "https://tv.theiet.org/EmbedPlayer.aspx?videoid=12892&guid=cc54bcdf-7f50-4a0d-bee6-e895139d3aee",
    "type": "Keynote Presenter",
    "blurb": "I had the honour of presenting at IET’s Eng Fest, where I delivered a keynote on swarm intelligence. I explored how nature-inspired algorithms can solve complex problems and their implications for AI development."
  },
  {
    "title": "Inspiring Women and Girls in STEAM",
    "company": "Engine Shed",
    "date": "2021-10-21",
    "image": "/images/adaLovelace.png",
    "url": "https://www.youtube.com/watch?v=bJQwj-7el4k",
    "type": "Panel",
    "blurb": "As part of Ada Lovelace Day, I joined a panel celebrating women and girls in STEAM (Science, Technology, Engineering, Arts, and Mathematics), sharing stories of resilience and innovation in the tech space."
  },
  {
    "title": "Unsupervised Learning",
    "company": "Women Who Code",
    "date": "2021-03-20",
    "image": "/images/womenWhoCodePart7.png",
    "url": "https://www.youtube.com/watch?v=gozvBzup19Y&list=PLVcEZG2JPVhdSp4MGVTmLVCHlXfCpb0DW&index=7",
    "type": "Teaching",
    "blurb": "In this teaching session for Women Who Code, I broke down the complexities of unsupervised learning, offering practical insights and hands-on examples to help demystify this core concept in data science."
  }
]

const TalksPage = () => {
  return (
    <div className={styles.talksPage}>
      <h1>Talks, Presentations, Podcasts, Interviews</h1>
      <br/>
      <br/>
      <p> Once upon a time, I was quite a nervous public speaker (knees knocking together). Fast forward to today, I now love sharing my thoughts on the future of AI, data, and technology with audiences of all sizes. Whether it’s moderating panels, delivering keynotes, or joining podcasts, I aim to make complex topics engaging and relatable. Below is a collection of some of my favourite speaking engagements, where I’ve had the chance to discuss everything from AI ethics to the practical applications of data science in the real world.

</p>
      <br/>
      <br/>
      <div className={styles.talksGrid}>
        {talksData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((talk, index) => (
          <div key={index} className={styles.talkCard}>
            {/* <img src={talk.image} alt={talk.title} className={styles.talkImage} /> */}
            <Image src={talk.image} alt={talk.title} className={styles.talkImage}  width={200} height={200} />

            <div className={styles.talkInfo}>
              <h2>{talk.title}</h2>
              <p><strong>Company:</strong> {talk.company}</p>
              <p><strong>Date:</strong> {new Date(talk.date).toLocaleDateString('en-GB')}</p>
              {/* <p><strong>Series:</strong> {talk.series}</p> */}
              <p> {talk.blurb} </p>
              <p><strong>Type:</strong> {talk.type}</p>
              {talk.url && (
                <a href={talk.url} target="_blank" rel="noopener noreferrer" className={styles.watchButton}>
                  Watch Talk
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalksPage;