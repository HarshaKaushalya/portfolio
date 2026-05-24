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
      // Dynamic imports for performance
      const [TypedModule, gsapModule] = await Promise.all([
        import('typed.js'),
        import('gsap')
      ]);
      
      const Typed = TypedModule.default;
      const gsap = gsapModule.default;

      // Typed.js initialization
      if (typedRef.current && !typedInstance.current) {
        typedInstance.current = new Typed(typedRef.current, {
          strings: [
            'Electrical Engineer',
            'Electronics Engineer',
            'Cyber Security Enthusiast',
            'AI & ML Enthusiast',
            'Network Security Researcher'
          ],
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 2000,
          loop: true,
          cursorChar: '|'
        });
      }

      // GSAP entrance animation - trigger when visible
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsapInstance = gsap.from(heroRef.current.querySelectorAll('.fade-in'), {
              opacity: 0,
              y: 30,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out"
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });

      if (heroRef.current) {
        observer.observe(heroRef.current);
      }
    };

    initHero();

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
      if (gsapInstance) {
        gsapInstance.kill();
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <header id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.heroContainer}>
        <div className={`fade-in ${styles.heroContent}`}>
          <p className={styles.greeting}>Hello, I'm</p>
          <h1 className={`animated-gradient-text ${styles.name}`}>Harsha Kaushalya</h1>
          <div className={styles.rolesContainer}>
            <span ref={typedRef} className={styles.typedRoles}></span>
          </div>
          <div className={`fade-in ${styles.heroBtns}`} style={{ animationDelay: '0.3s' }}>
            <a href="Harsha_CV.pdf" download className="btn btn-primary glass" data-tooltip="Download PDF">
              <i className="fas fa-download"></i> Download CV
            </a>
            <a href="#projects" className="btn btn-outline glass">
              <i className="fas fa-code"></i> View Projects
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
