import React from 'react';
import { Linkedin, Github, Instagram } from 'lucide-react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <hr/>
      <div className={styles.container}>
        <a href="https://www.linkedin.com/in/lauragemmell" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <Linkedin size={24} />
        </a>
        <a href="https://github.com/lauralikespi" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <Github size={24} />
        </a>
        <a href="https://www.instagram.com/lauralikespi" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <Instagram size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;