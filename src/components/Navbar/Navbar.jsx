import React, { useState, useEffect, useCallback } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [menuActive, setMenuActive]   = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          const sections = document.querySelectorAll('section, header');
          let current = '';
          sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - s.clientHeight / 3) current = s.getAttribute('id');
          });
          if (current) setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => setMenuActive(p => !p), []);
  const closeMenu  = useCallback(() => setMenuActive(false), []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <a href="#home" className={styles.logo}>HK</a>

      <div className={`${styles.navLinks} ${menuActive ? styles.active : ''}`}>
        {[['#home','Home'],['#about','About'],['#skills','Skills'],['#projects','Projects'],['#contact','Contact']].map(([href, label]) => (
          <a key={href} href={href} className={activeSection === href.slice(1) ? styles.active : ''} onClick={closeMenu}>{label}</a>
        ))}
      </div>

      <div className={styles.navActions}>
        <a href="/Harsha_CV.pdf" download className={`btn btn-primary ${styles.cvBtn}`}>
          <i className="fas fa-download"></i> CV
        </a>
        <div className={`${styles.menuToggle} ${menuActive ? styles.active : ''}`} onClick={toggleMenu}>
          <span /><span /><span />
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
