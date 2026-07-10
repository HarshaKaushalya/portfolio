import React, { useRef, useState, useEffect } from 'react';
import styles from './About.module.css';

const About = () => {
  const countersRef = useRef([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = document.querySelector('#about');
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated) {
        setAnimated(true);
        countersRef.current.forEach(counter => {
          if (!counter) return;
          const target = +counter.dataset.target;
          const plus   = counter.dataset.plus === 'true';
          const step   = target / (2000 / 16);
          let cur = 0;
          const tick = () => {
            cur += step;
            if (cur < target) { counter.innerText = Math.ceil(cur) + (plus ? '+' : ''); requestAnimationFrame(tick); }
            else counter.innerText = target + (plus ? '+' : '');
          };
          tick();
        });
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section id="about" className={`${styles.about} section-padding`}>
      <img src="electronics2.jpg" alt="" className={styles.aboutImgFloating} loading="lazy" aria-hidden="true" />
      <div className="container">
        <h2 className="section-title fade-in">About <span>Me</span></h2>
        <p className="section-subtitle fade-in">Engineer · Researcher · Builder</p>

        <div className={styles.aboutContent}>
          {/* Left — Avatar + Info */}
          <div className={`fade-in ${styles.avatarSide}`}>
            <div className={styles.avatarImg}>
              <img src="profile.png" alt="Harsha Kaushalya" style={{ width:'100%', height:'100%', objectFit:'cover' }} loading="lazy" />
            </div>
            <div className={styles.avatarInfo}>
              <div className={styles.infoChip}><i className="fas fa-map-marker-alt"></i> Galle, Sri Lanka</div>
              <div className={styles.infoChip}><i className="fas fa-university"></i> Univ. of Ruhuna</div>
              <div className={styles.infoChip}><i className="fas fa-graduation-cap"></i> B.Sc. Engineering</div>
              <div className={styles.infoChip}><i className="fas fa-phone"></i> +94-71-5906-850</div>
              <div className={styles.infoChip}><i className="fas fa-envelope"></i> harshakaushalya19@gmail.com</div>
            </div>
          </div>

          {/* Right — Text */}
          <div className={styles.aboutText}>
            <p className={styles.bio}>
              I'm an <strong>Electrical and Information Engineering</strong> undergraduate at the University of Ruhuna with hands-on experience in Electrical Testing &amp; Design, Embedded Systems, and Machine Learning, building end-to-end solutions from hardware RTL design to software applications.
            </p>
            <p className={styles.bio}>
              Passionate about advancing knowledge through innovation and research, with a proven track record of leadership — including Vice Chair of the IEEE Ruhuna Power Electronics Chapter and Editor of the Telecommunication Circle.
            </p>

            <div className={styles.interestTags}>
              {['Power Systems','FPGA/HDL','Embedded Systems','AI & ML','IoT','Computer Vision','Full-Stack Dev','Signal Processing'].map(t => (
                <span key={t} className={styles.interestTag}>{t}</span>
              ))}
            </div>

            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[0] = el} data-target="6" data-plus="true">0</div>
                <div className={styles.statLabel}>Projects</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[1] = el} data-target="2" data-plus="false">0</div>
                <div className={styles.statLabel}>Internships</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[2] = el} data-target="3" data-plus="false">0</div>
                <div className={styles.statLabel}>Years Study</div>
              </div>
              <div className={`${styles.statCard} glass`}>
                <div className={styles.statVal} ref={el => countersRef.current[3] = el} data-target="5" data-plus="true">0</div>
                <div className={styles.statLabel}>Leadership Roles</div>
              </div>
            </div>

            <div className={styles.timelineHeader}>
              <h3>Experience &amp; Education</h3>
              <a href="/portfolio/Harsha_CV.pdf" download className="btn btn-outline" style={{fontSize:'0.82rem',padding:'0.45rem 1rem'}}>
                <i className="fas fa-file-pdf"></i> Full CV
              </a>
            </div>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>Aug 2025 – Nov 2025</span>
                <h4 className={styles.timelineTitle}>Electrical Engineering Trainee</h4>
                <p className={styles.timelineOrg}>Amithi Power Consultants (Pvt) Ltd · Colombo</p>
                <p className={styles.timelineDesc}>Hands-on experience in electrical design and testing within an IESL recognised professional engineering consultancy environment.</p>
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
                <p className={styles.timelineDesc}>Focusing on power systems, electronics design, embedded systems, and software engineering applications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
