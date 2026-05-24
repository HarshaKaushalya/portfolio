import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const About = () => {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);
  const [hasAnimatedCounters, setHasAnimatedCounters] = useState(false);

  useEffect(() => {
    let observer;
    let gsapInstance;

    const initAbout = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      const ScrollTrigger = ScrollTriggerModule.default;
      
      gsap.registerPlugin(ScrollTrigger);

      // Section fade-in
      gsapInstance = gsap.from(sectionRef.current.querySelectorAll('.fade-in'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1
      });

      // Counters observer
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimatedCounters) {
          setHasAnimatedCounters(true);
          
          countersRef.current.forEach(counter => {
            if (!counter) return;
            const target = +counter.getAttribute('data-target');
            const hasPlus = counter.getAttribute('data-plus') === 'true';
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.innerText = Math.ceil(current) + (hasPlus ? '+' : '');
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target + (hasPlus ? '+' : '');
              }
            };
            updateCounter();
          });
          observer.disconnect();
        }
      }, { threshold: 0.5 });

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    };

    initAbout();

    return () => {
      if (observer) observer.disconnect();
      if (gsapInstance) gsapInstance.kill();
    };
  }, [hasAnimatedCounters]);

  return (
    <section id="about" className={`${styles.about} section-padding glass`} ref={sectionRef}>
      <img src="electronics2.jpg" alt="Electronics Background" className={styles.aboutImgFloating} loading="lazy" />
      <div className="container">
        <h2 className="section-title fade-in">About <span>Me</span></h2>
        
        <div className={styles.aboutContent}>
          <div className={`fade-in ${styles.avatarContainer}`}>
            <div className={styles.avatarRing}></div>
            <div className={styles.avatarImg}>
              <img src="profile.png" alt="Harsha Kaushalya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
          </div>
          
          <div className="about-text fade-in">
            <p className={styles.bio}>
              I'm an <strong>Electrical and Electronics Engineering</strong> undergraduate with a profound passion for Cyber Security and AI. I bridge the gap between hardware and software, focusing on building secure, efficient, and intelligent systems.
            </p>
            <p className={styles.bio}>
              My journey involves exploring the depths of Network Security, participating in CTFs, and developing machine learning models to solve real-world problems.
            </p>
            
            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[0] = el} data-target="20" data-plus="true">0</div>
                <div className={styles.statLabel}>Projects Completed</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[1] = el} data-target="15" data-plus="true">0</div>
                <div className={styles.statLabel}>CTFs Participated</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[2] = el} data-target="3" data-plus="false">0</div>
                <div className={styles.statLabel}>Years Experience</div>
              </div>
            </div>
            
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Experience & Education</h3>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>2021 - Present</span>
                <h4 className={styles.timelineTitle}>BSc Eng in Electrical & Electronics</h4>
                <p className={styles.timelineDesc}>University of Peradeniya. Focusing on power systems, electronics design, and embedded systems.</p>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>2023 - Present</span>
                <h4 className={styles.timelineTitle}>Cyber Security Researcher</h4>
                <p className={styles.timelineDesc}>Independent research in network security, penetration testing, and secure system architectures.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
