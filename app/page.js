'use client';
import React from 'react';
import Link from 'next/link';
import SpinningPiSpiral from './components/SpinningPiSpiral';
import styles from './styles/page.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hello, I&apos;m Laura</h1>
        <p>Wearing of many hats, including that of a developer, data scientist, educator, writer, researcher, entrepreneur and content creator.</p>
        
        <div>
          <Image 
            src="/images/jgi_data_week_talk.png" 
            alt="Laura giving a talk" 
            className={`${styles.talkImage} ${styles.featuredImage}`}  
            width={600} 
            height={360} 
            priority
          />
        </div>
        
        {/* <section className={styles.intro}>
          <h2>Welcome to my digital space!</h2>
          <p>I&apos;m passionate about the intersection of technology, innovation, and education. Here, you&apos;ll find my thoughts on data, fintech, and the future of tech education.</p>
        </section> */}
        
        <section className={styles.quickLinks}>
          {/* <h3>Explore My Work</h3> */}
          <div className={styles.linkGrid}>
            <Link href="/blog" className={styles.card}>
              <h4>Blog</h4>
              <br/>
              <p>Read my latest rambles on all things tech and innovation - from Black Mirror to angel investing.</p>
            </Link>
            <Link href="/projects" className={styles.card}>
              <h4>Projects</h4>
              <br/>
              <p>Some fun little coding and data projects I&apos;ve worked on.</p>
            </Link>
            <Link href="/talks" className={styles.card}>
              <h4>Talks</h4>
              <br/>
              <p>On many topics from women in tech to tiny robots and flocks of birds.</p>
            </Link>
            <Link href="/writing" className={styles.card}>
              <h4>External Writing</h4>
              <br/>
              <p>Other people sometimes ask me to write my opinions for them.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}