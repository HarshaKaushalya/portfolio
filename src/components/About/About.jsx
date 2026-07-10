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

      gsapInstance = gsap.from(sectionRef.current.querySelectorAll('.fade-in'), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        opacity: 0, y: 30, duration: 0.8, ease: "power2.out", stagger: 0.1
      });

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

      if (sectionRef.current) observer.observe(sectionRef.current);
    };

    initAbout();
    return () => {
      if (observer) observer.disconnect();
      if (gsapInstance) gsapInstance.kill();
    };
  }, [hasAnimatedCounters]);

  return (
    <section id="about" className={`${styles.about} section-padding`} ref={sectionRef}>
      <img src="electronics2.jpg" alt="Electronics Background" className={styles.aboutImgFloating} loading="lazy" />
      <div className="container">
        <h2 className="section-title fade-in">About <span>Me</span></h2>
        <p className="section-subtitle fade-in">
          Engineer. Researcher. Builder.
        </p>

        <div className={styles.aboutContent}>
          <div className={`fade-in ${styles.avatarContainer}`}>
            <div className={styles.avatarRing}></div>
            <div className={styles.avatarImg}>
              <img src="profile.png" alt="Harsha Kaushalya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
            <div className={styles.avatarInfo}>
              <div className={styles.infoChip}><i className="fas fa-map-marker-alt"></i> Galle, Sri Lanka</div>
              <div className={styles.infoChip}><i className="fas fa-university"></i> Univ. of Ruhuna</div>
              <div className={styles.infoChip}><i className="fas fa-star"></i> CGPA: 3.8</div>
            </div>
          </div>

          <div className={styles.aboutText}>
            <p className={styles.bio}>
              I'm an <strong>Electrical and Information Engineering</strong> undergraduate at the University of Ruhuna with strong academic standing (CGPA: 3.8). I have hands-on experience in Electrical Testing &amp; Design, Embedded Systems, and Machine Learning, building end-to-end solutions from hardware RTL design to AI-powered web applications.
            </p>
            <p className={styles.bio}>
              Passionate about advancing knowledge through innovation and research, with a proven track record of leadership — including Vice Chair of the IEEE Ruhuna Power Electronics Chapter and Editor of the Telecommunication Circle.
            </p>

            <div className={styles.interestTags}>
              {['Power Systems', 'FPGA/HDL', 'Embedded Systems', 'AI & ML', 'IoT', 'Cyber Security', 'Computer Vision', 'Full-Stack'].map(tag => (
                <span key={tag} className={styles.interestTag}>{tag}</span>
              ))}
            </div>

            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[0] = el} data-target="6" data-plus="true">0</div>
                <div className={styles.statLabel}>Projects Completed</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[1] = el} data-target="3" data-plus="false">0</div>
                <div className={styles.statLabel}>Industry Internships</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[2] = el} data-target="3" data-plus="false">0</div>
                <div className={styles.statLabel}>Years Engineering</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[3] = el} data-target="5" data-plus="true">0</div>
                <div className={styles.statLabel}>Leadership Roles</div>
              </div>
            </div>

            <div className={styles.timelineHeader}>
              <h3>Experience &amp; Education</h3>
              <a href="/portfolio/Harsha_CV.pdf" download className="btn btn-outline" style={{fontSize: '0.85rem', padding: '0.5rem 1.2rem'}}>
                <i className="fas fa-file-pdf"></i> Full CV
              </a>
            </div>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>Aug 2025 – Nov 2025</span>
                <h4 className={styles.timelineTitle}>Electrical Engineering Trainee</h4>
                <p className={styles.timelineOrg}>Amithi Power Consultants (Pvt) Ltd · Colombo</p>
                <p className={styles.timelineDesc}>Hands-on experience in electrical design and testing within an IESL Recognized professional engineering consultancy environment.</p>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>Jun 2024 – Aug 2024</span>
                <h4 className={styles.timelineTitle}>Quality Assurance Laboratory Assistant</h4>
                <p className={styles.timelineOrg}>Forever Skin Naturals Pvt Ltd · Pallekele</p>
                <p className={styles.timelineDesc}>Performed bulk testing, raw material and finished goods inspection in a cosmetic production environment.</p>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>Feb 2023 – Present</span>
                <h4 className={styles.timelineTitle}>B.Sc. Electrical and Information Engineering</h4>
                <p className={styles.timelineOrg}>University of Ruhuna · Galle, Sri Lanka</p>
                <p className={styles.timelineDesc}>CGPA: 3.8 | Focusing on power systems, electronics design, embedded systems, and AI/ML applications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
