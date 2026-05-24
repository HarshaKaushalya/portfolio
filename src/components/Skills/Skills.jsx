import React, { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let gsapInstance;
    let observer;

    const initSkills = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      const ScrollTrigger = ScrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          gsapInstance = gsap.context(() => {
            gsap.from('.fade-in', {
              opacity: 0,
              y: 30,
              duration: 0.8,
              ease: "power2.out"
            });

            gsap.utils.toArray(`.${styles.skillCategory}`).forEach((category) => {
              const badges = category.querySelectorAll(`.${styles.skillBadge}`);
              gsap.from(badges, {
                scrollTrigger: {
                  trigger: category,
                  start: "top 85%",
                  once: true
                },
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.5,
                ease: "back.out(1.5)",
                delay: 0.2
              });
            });
          }, sectionRef);

          observer.disconnect();
        }
      }, { threshold: 0.2 });

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    };

    initSkills();

    return () => {
      if (observer) observer.disconnect();
      if (gsapInstance) gsapInstance.revert();
    };
  }, []);

  return (
    <section id="skills" className="section-padding" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Technical <span>Arsenal</span></h2>
        
        <div className={styles.skillsContainer}>
          {/* Engineering Skills */}
          <div className={`${styles.skillCategory} glass fade-in`}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>
                <i className="fas fa-microchip"></i>
              </div>
              <h3 className={styles.categoryTitle}>Engineering</h3>
            </div>
            <div className={styles.skillBadges}>
              <span className={styles.skillBadge}><i className="fas fa-bolt"></i> Power Systems</span>
              <span className={styles.skillBadge}><i className="fas fa-microchip"></i> Embedded Systems</span>
              <span className={styles.skillBadge}><i className="fas fa-memory"></i> FPGA</span>
              <span className={styles.skillBadge}><i className="fas fa-laptop-code"></i> MATLAB/Simulink</span>
              <span className={styles.skillBadge}><i className="fas fa-drafting-compass"></i> AutoCAD</span>
              <span className={styles.skillBadge}><i className="fas fa-satellite-dish"></i> Signal Processing</span>
            </div>
          </div>

          {/* Cyber Security */}
          <div className={`${styles.skillCategory} glass fade-in`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className={styles.categoryTitle}>Cyber Security</h3>
            </div>
            <div className={styles.skillBadges}>
              <span className={styles.skillBadge}><i className="fas fa-network-wired"></i> Network Security</span>
              <span className={styles.skillBadge}><i className="fas fa-bug"></i> Penetration Testing</span>
              <span className={styles.skillBadge}><i className="fas fa-user-secret"></i> Ethical Hacking</span>
              <span className={styles.skillBadge}><i className="fab fa-linux"></i> Kali Linux</span>
              <span className={styles.skillBadge}><i className="fas fa-search"></i> Wireshark</span>
              <span className={styles.skillBadge}><i className="fas fa-code"></i> Reverse Engineering</span>
            </div>
          </div>

          {/* AI & ML */}
          <div className={`${styles.skillCategory} glass fade-in`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>
                <i className="fas fa-brain"></i>
              </div>
              <h3 className={styles.categoryTitle}>AI & Machine Learning</h3>
            </div>
            <div className={styles.skillBadges}>
              <span className={styles.skillBadge}><i className="fab fa-python"></i> Python</span>
              <span className={styles.skillBadge}><i className="fas fa-project-diagram"></i> Neural Networks</span>
              <span className={styles.skillBadge}><i className="fas fa-database"></i> Data Science</span>
              <span className={styles.skillBadge}><i className="fas fa-robot"></i> TensorFlow/Keras</span>
              <span className={styles.skillBadge}><i className="fas fa-chart-line"></i> Scikit-Learn</span>
            </div>
          </div>

          {/* Web & Software */}
          <div className={`${styles.skillCategory} glass fade-in`} style={{ animationDelay: '0.6s' }}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>
                <i className="fas fa-code"></i>
              </div>
              <h3 className={styles.categoryTitle}>Software Development</h3>
            </div>
            <div className={styles.skillBadges}>
              <span className={styles.skillBadge}><i className="fab fa-js"></i> JavaScript</span>
              <span className={styles.skillBadge}><i className="fab fa-react"></i> React</span>
              <span className={styles.skillBadge}><i className="fab fa-node-js"></i> Node.js</span>
              <span className={styles.skillBadge}><i className="fas fa-database"></i> SQL/NoSQL</span>
              <span className={styles.skillBadge}><i className="fab fa-git-alt"></i> Git/GitHub</span>
              <span className={styles.skillBadge}><i className="fas fa-terminal"></i> Bash/Shell</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);
