import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const typedRef = useRef(null);
  const typedInstance = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    let gsapInstance;
    let observer;

    const initHero = async () => {
      const [TypedModule, gsapModule] = await Promise.all([
        import('typed.js'),
        import('gsap')
      ]);
      const Typed = TypedModule.default;
      const gsap = gsapModule.default;

      if (typedRef.current && !typedInstance.current) {
        typedInstance.current = new Typed(typedRef.current, {
          strings: [
            'Electrical Engineer',
            'Embedded Systems Developer',
            'FPGA & HDL Designer',
            'AI/ML Engineer',
            'Full-Stack Developer',
            'Cyber Security Enthusiast',
          ],
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 2000,
          loop: true,
          cursorChar: '|'
        });
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsapInstance = gsap.from(heroRef.current.querySelectorAll('.fade-in'), {
              opacity: 0,
              y: 40,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out"
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });

      if (heroRef.current) observer.observe(heroRef.current);
    };

    initHero();

    return () => {
      if (typedInstance.current) typedInstance.current.destroy();
      if (gsapInstance) gsapInstance.kill();
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <header id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.heroContainer}>
        <div className={`fade-in ${styles.heroContent}`}>
          <div className={styles.availabilityBadge}>
            <span className="pulse-dot"></span>
            Open to Opportunities
          </div>
          <p className={styles.greeting}>Hello, I'm</p>
          <h1 className={`animated-gradient-text ${styles.name}`}>Harsha Kaushalya</h1>
          <div className={styles.rolesContainer}>
            <span ref={typedRef} className={styles.typedRoles}></span>
          </div>
          <p className={styles.heroDesc}>
            Electrical &amp; Information Engineering undergraduate at University of Ruhuna (CGPA: 3.8),
            building end-to-end solutions from FPGA hardware design to AI-powered web applications.
          </p>
          <div className={`fade-in ${styles.heroBtns}`}>
            <a href="/portfolio/Harsha_CV.pdf" download className="btn btn-primary" data-tooltip="Download PDF">
              <i className="fas fa-download"></i> Download CV
            </a>
            <a href="#projects" className="btn btn-outline glass">
              <i className="fas fa-code"></i> View Projects
            </a>
          </div>
          <div className={styles.heroSocialLinks}>
            <a href="https://github.com/HarshaKaushalya" target="_blank" rel="noreferrer" className={styles.socialLink} data-tooltip="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/harsha-kaushalya-479ab5285/" target="_blank" rel="noreferrer" className={styles.socialLink} data-tooltip="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:harshakaushalya19@gmail.com" className={styles.socialLink} data-tooltip="Email Me">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://harshakaushalya.github.io/portfolio/" target="_blank" rel="noreferrer" className={styles.socialLink} data-tooltip="Portfolio">
              <i className="fas fa-globe"></i>
            </a>
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
};

export default React.memo(Hero);
