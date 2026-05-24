import React, { useState, useEffect, useCallback } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          
          const sections = document.querySelectorAll('section, header');
          let current = '';
          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
              current = section.getAttribute('id');
            }
          });
          if (current) setActiveSection(current);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuActive(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuActive(false);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <a href="#home" className={styles.logo}><span>H</span>K</a>
      <div className={`${styles.navLinks} ${menuActive ? styles.active : ''}`}>
        <a href="#home" className={activeSection === 'home' ? styles.active : ''} onClick={closeMenu}>Home</a>
        <a href="#about" className={activeSection === 'about' ? styles.active : ''} onClick={closeMenu}>About</a>
        <a href="#skills" className={activeSection === 'skills' ? styles.active : ''} onClick={closeMenu}>Skills</a>
        <a href="#projects" className={activeSection === 'projects' ? styles.active : ''} onClick={closeMenu}>Projects</a>
        <a href="#contact" className={activeSection === 'contact' ? styles.active : ''} onClick={closeMenu}>Contact</a>
      </div>
      <div className={styles.navActions}>
        <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle Theme">
          <i className={theme === 'dark' ? "fas fa-sun" : "fas fa-moon"}></i>
        </button>
        <div className={`${styles.menuToggle} ${menuActive ? styles.active : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
