'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Toggle body scroll when menu is open/closed
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        document.body.style.overflow = '';
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <nav className={styles.nav}>
      <button 
        className={`${styles.burgerButton} ${isOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.burgerIcon}></span>
      </button>
      <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
        <li><Link href="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link href="/blog" onClick={handleLinkClick}>Blog</Link></li>
        <li><Link href="/projects" onClick={handleLinkClick}>Projects</Link></li>
        <li><Link href="/talks" onClick={handleLinkClick}>Talks</Link></li>
        <li><Link href="/writing" onClick={handleLinkClick}>External Writing</Link></li>
      </ul>
    </nav>
  );
}