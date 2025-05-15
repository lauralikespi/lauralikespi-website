'use client';
import React from 'react';
import Image from 'next/image';
import Navigation from './Navigation';
import styles from '../styles/Header.module.css';
import SpinningPiSpiral from './SpinningPiSpiral';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logoAndContent}>
          <div className={styles.logoContainer}>
            {/* <Image src="/pi-logo.png" alt="Pi Logo" width={100} height={100} /> */}
            <SpinningPiSpiral />
          </div>
          <div className={styles.headerContent}>
            <h1>lauralikespi</h1>
            <p>
              Technology, Innovation and Education.
              
              {/* Data Obsessed. Technology Evangelical. Fintech Dork.
             
              Passionate about tech education. */}
            </p>
          </div>
        </div>
        <Navigation />
      </div>
      <hr/>
    </header>
  );
}