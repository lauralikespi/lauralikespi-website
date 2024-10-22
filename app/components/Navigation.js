'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.nav}>
      <button className={styles.burgerButton} onClick={toggleMenu}>
        <span className={styles.burgerIcon}></span>
      </button>
      <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
}