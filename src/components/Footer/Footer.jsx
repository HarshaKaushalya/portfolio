import React, { useState, useEffect, useCallback } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.socialRow}>
            <a href="https://github.com/HarshaKaushalya" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/harsha-kaushalya" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:contact@harsha.dev" className={styles.socialIcon} aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Harsha Kaushalya. All rights reserved.</p>
          <div className={styles.tagline}>
            Built with <i className="fas fa-heart"></i> & High Voltage
          </div>
        </div>
      </footer>
      <button 
        className={`${styles.backToTop} ${showBackToTop ? styles.visible : ''}`} 
        onClick={scrollToTop} 
        aria-label="Back to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
};

export default React.memo(Footer);
