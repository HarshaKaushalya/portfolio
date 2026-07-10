import React from 'react';
import styles from './Hero.module.css';

const roles = ['Electrical Engineer', 'Embedded Systems Developer', 'FPGA & HDL Designer', 'AI/ML Engineer', 'Full-Stack Developer'];

const Hero = () => (
  <header id="home" className={styles.hero}>
    <div className={styles.heroContainer}>
      <div className={`fade-in ${styles.heroContent}`}>
        <div className={styles.availabilityBadge}>
          <span className="pulse-dot"></span>
          Open to Opportunities
        </div>
        <p className={styles.greeting}>Hello, I'm</p>
        <h1 className={`animated-gradient-text ${styles.name}`}>Harsha Kaushalya</h1>
        <div className={styles.rolesContainer}>
          <span className={styles.typedRoles}>{roles.join(' · ')}</span>
        </div>
        <p className={styles.heroDesc}>
          Electrical &amp; Information Engineering undergraduate at the University of Ruhuna,
          building end-to-end solutions from FPGA hardware design to full-stack web applications.
        </p>
        <div className={styles.heroBtns}>
          <a href="/portfolio/Harsha_CV.pdf" download className="btn btn-primary" data-tooltip="Download PDF">
            <i className="fas fa-download"></i> Download CV
          </a>
          <a href="#projects" className="btn btn-outline glass">
            <i className="fas fa-code"></i> View Projects
          </a>
        </div>
        <div className={styles.heroSocialLinks}>
          <a href="https://github.com/HarshaKaushalya" target="_blank" rel="noreferrer" className={styles.socialLink} data-tooltip="GitHub"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/harsha-kaushalya-479ab5285/" target="_blank" rel="noreferrer" className={styles.socialLink} data-tooltip="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          <a href="mailto:harshakaushalya19@gmail.com" className={styles.socialLink} data-tooltip="Email"><i className="fas fa-envelope"></i></a>
          <a href="tel:+94715906850" className={styles.socialLink} data-tooltip="+94-71-5906-850"><i className="fas fa-phone"></i></a>
        </div>
      </div>
      <div className={`fade-in ${styles.heroVisuals}`}>
        <img src="Electrical_tower_image.jpg" alt="Electrical Engineering" className={styles.heroImgMain} loading="eager" />
        <img src="PCB_image.jpg" alt="Electronics" className={styles.heroImgSecondary} loading="eager" />
      </div>
    </div>
    <a href="#about" className={styles.scrollIndicator}>
      <i className="fas fa-chevron-down"></i>
    </a>
  </header>
);

export default React.memo(Hero);
