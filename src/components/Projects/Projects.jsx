import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Projects.module.css';

const projectData = [
  {
    id: 1,
    title: "Secure Comm Protocol",
    categories: ['security', 'networks'],
    tags: [{ label: "Security", class: "security" }, { label: "Networks", class: "networks" }],
    description: "Developed a custom encrypted communication protocol using AES-256 and RSA for embedded systems, ensuring end-to-end data integrity.",
    locked: false,
  },
  {
    id: 2,
    title: "Smart Grid Analyzer",
    categories: ['aiml', 'electronics'],
    tags: [{ label: "AI/ML", class: "aiml" }, { label: "Electronics", class: "electronics" }],
    description: "A machine learning model integrated with a custom hardware monitor to predict power surges and anomalies in local micro-grids.",
    locked: false,
  },
  {
    id: 3,
    title: "Malware Sandbox Environment",
    categories: ['security'],
    tags: [{ label: "Security", class: "security" }],
    description: "Built an isolated, virtualized environment for safely executing and analyzing zero-day malware behaviors and network footprints.",
    locked: false,
  },
  {
    id: 4,
    title: "Automated Pentest Framework",
    categories: ['security', 'networks'],
    tags: [{ label: "Security", class: "security" }],
    description: "A Python-based framework that automates initial reconnaissance and vulnerability scanning for enterprise networks.",
    locked: true,
  },
  {
    id: 5,
    title: "IoT Botnet Detection System",
    categories: ['security', 'aiml'],
    tags: [{ label: "Security", class: "security" }, { label: "AI/ML", class: "aiml" }],
    description: "Utilized deep learning models to analyze network traffic patterns and detect IoT devices participating in DDoS attacks.",
    locked: false,
  },
  {
    id: 6,
    title: "Portfolio Website v2.0",
    categories: ['web'],
    tags: [{ label: "Web", class: "web" }],
    description: "This portfolio — built with React, Vite, and highly optimized THREE.js animations for a seamless experience.",
    locked: false,
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let gsapInstance;
    let observer;

    const initProjects = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      const ScrollTrigger = ScrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
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
          observer.disconnect();
        }
      }, { threshold: 0.1 });

      if (sectionRef.current) observer.observe(sectionRef.current);
    };

    initProjects();

    return () => {
      if (observer) observer.disconnect();
      if (gsapInstance) gsapInstance.kill();
    };
  }, []);

  const handleFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  return (
    <section id="projects" className="section-padding" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Featured <span>Projects</span></h2>
        
        <div className={`fade-in ${styles.projectFilters}`}>
          <button className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`} onClick={() => handleFilter('all')}>All</button>
          <button className={`${styles.filterBtn} ${filter === 'security' ? styles.active : ''}`} onClick={() => handleFilter('security')}>Security</button>
          <button className={`${styles.filterBtn} ${filter === 'aiml' ? styles.active : ''}`} onClick={() => handleFilter('aiml')}>AI & ML</button>
          <button className={`${styles.filterBtn} ${filter === 'electronics' ? styles.active : ''}`} onClick={() => handleFilter('electronics')}>Hardware</button>
          <button className={`${styles.filterBtn} ${filter === 'networks' ? styles.active : ''}`} onClick={() => handleFilter('networks')}>Networks</button>
        </div>

        <div className={styles.projectsGrid}>
          {projectData.map((project) => {
            const isVisible = filter === 'all' || project.categories.includes(filter);
            
            return (
              <div 
                key={project.id}
                className={`${styles.projectCard} glass ${project.locked ? styles.locked : ''}`}
                style={{ 
                  display: isVisible ? 'block' : 'none',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
                }}
              >
                <div className={styles.projectTopBar}></div>
                <div className={styles.projectContent}>
                  <div className={styles.projectTags}>
                    {project.tags.map(tag => (
                      <span key={tag.label} className={`${styles.tag} ${styles[tag.class]}`}>{tag.label}</span>
                    ))}
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  
                  <div className={styles.projectLinks}>
                    {!project.locked && (
                      <>
                        <a href="#" className={styles.projectLink}><i className="fab fa-github"></i> Code</a>
                        <a href="#" className={styles.projectLink}><i className="fas fa-external-link-alt"></i> Demo</a>
                      </>
                    )}
                  </div>
                </div>
                {project.locked && (
                  <div className={styles.lockedContent}>
                    <i className="fas fa-lock"></i>
                    <span>Private Repo</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
