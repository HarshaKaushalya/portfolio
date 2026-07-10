import React, { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const skillsData = [
  {
    icon: 'fas fa-bolt',
    title: 'Electrical Engineering',
    skills: [
      { icon: 'fas fa-bolt', label: 'Power Systems (HV/MV/LV)' },
      { icon: 'fas fa-tools', label: 'Electrical Testing' },
      { icon: 'fas fa-drafting-compass', label: 'ETAP / DiaLux / PVSyst' },
      { icon: 'fas fa-satellite-dish', label: 'Signal Processing' },
      { icon: 'fas fa-laptop-code', label: 'MATLAB / Simulink' },
      { icon: 'fas fa-plug', label: 'Protection Relay Testing' },
    ]
  },
  {
    icon: 'fas fa-memory',
    title: 'HDL & FPGA Design',
    skills: [
      { icon: 'fas fa-microchip', label: 'Verilog / SystemVerilog' },
      { icon: 'fas fa-memory', label: 'Xilinx Vivado' },
      { icon: 'fas fa-code-branch', label: 'RISC-V Architecture' },
      { icon: 'fas fa-project-diagram', label: 'FSM Design' },
      { icon: 'fas fa-network-wired', label: 'UART / SPI / I2C' },
      { icon: 'fas fa-cube', label: 'Embedded Systems' },
    ]
  },
  {
    icon: 'fas fa-brain',
    title: 'AI & Machine Learning',
    skills: [
      { icon: 'fab fa-python', label: 'Python / PyTorch' },
      { icon: 'fas fa-robot', label: 'TensorFlow / Keras' },
      { icon: 'fas fa-chart-line', label: 'Scikit-learn' },
      { icon: 'fas fa-eye', label: 'Computer Vision (YOLO)' },
      { icon: 'fas fa-project-diagram', label: 'CNN / BiLSTM / BNN' },
      { icon: 'fas fa-database', label: 'NumPy / Pandas' },
    ]
  },
  {
    icon: 'fas fa-globe',
    title: 'Full-Stack Development',
    skills: [
      { icon: 'fab fa-react', label: 'React / Next.js' },
      { icon: 'fab fa-node-js', label: 'Node.js / Express.js' },
      { icon: 'fas fa-database', label: 'MySQL / MongoDB' },
      { icon: 'fas fa-robot', label: 'LLM / RAG Systems' },
      { icon: 'fab fa-js', label: 'TypeScript / JavaScript' },
      { icon: 'fab fa-docker', label: 'Docker' },
    ]
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Cyber Security',
    skills: [
      { icon: 'fas fa-network-wired', label: 'Network Security' },
      { icon: 'fas fa-bug', label: 'Penetration Testing' },
      { icon: 'fab fa-linux', label: 'Kali Linux' },
      { icon: 'fas fa-search', label: 'Wireshark' },
      { icon: 'fas fa-user-secret', label: 'Ethical Hacking' },
      { icon: 'fas fa-code', label: 'Reverse Engineering' },
    ]
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools & Platforms',
    skills: [
      { icon: 'fab fa-git-alt', label: 'Git / GitHub' },
      { icon: 'fas fa-microchip', label: 'Arduino / ESP32' },
      { icon: 'fas fa-drafting-compass', label: 'KiCad / Proteus' },
      { icon: 'fas fa-network-wired', label: 'Cisco Packet Tracer' },
      { icon: 'fab fa-figma', label: 'Figma' },
      { icon: 'fas fa-terminal', label: 'Bash / Shell' },
    ]
  },
];

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
            gsap.utils.toArray(`.${styles.skillCategory}`).forEach((category, i) => {
              gsap.from(category, {
                scrollTrigger: { trigger: category, start: "top 88%", once: true },
                opacity: 0, y: 40, duration: 0.7, ease: "power2.out", delay: i * 0.05
              });
              const badges = category.querySelectorAll(`.${styles.skillBadge}`);
              gsap.from(badges, {
                scrollTrigger: { trigger: category, start: "top 85%", once: true },
                opacity: 0, y: 15, stagger: 0.04, duration: 0.4, ease: "back.out(1.5)", delay: 0.2
              });
            });
          }, sectionRef);
          observer.disconnect();
        }
      }, { threshold: 0.1 });

      if (sectionRef.current) observer.observe(sectionRef.current);
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
        <p className="section-subtitle fade-in">A comprehensive toolkit built through academic research and industry practice</p>

        <div className={styles.skillsContainer}>
          {skillsData.map((cat) => (
            <div key={cat.title} className={`${styles.skillCategory} glass`}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <i className={cat.icon}></i>
                </div>
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
              </div>
              <div className={styles.skillBadges}>
                {cat.skills.map(skill => (
                  <span key={skill.label} className={styles.skillBadge}>
                    <i className={skill.icon}></i> {skill.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);
