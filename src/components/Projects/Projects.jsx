import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Projects.module.css';

const projectData = [
  {
    id: 0,
    title: "Hardware Accelerated Neural Network using FPGA",
    categories: ['electronics', 'aiml', 'web'],
    tags: [{ label: "Hardware", class: "electronics" }, { label: "AI/ML", class: "aiml" }, { label: "Web", class: "web" }],
    description: "A full-stack hardware-software system performing real-time handwritten digit recognition (MNIST) using a custom Binarized Neural Network (BNN) on a Nexys A7-100T FPGA.",
    locked: false,
    image: "/fpga.jpg",
    longDescription: {
      intro: "I designed and implemented a full-stack hardware-software system that performs real-time handwritten digit recognition (MNIST) using a custom Binarized Neural Network (BNN) running entirely on a Nexys A7-100T FPGA. Rather than using an off-the-shelf processor, I wrote custom Verilog RTL to perform hardware-accelerated inference. A modern web UI allows users to draw a digit, which is sent over a UART serial connection to the FPGA, where the hardware predicts the digit in real-time and sends the result back to the browser.",
      architecture: [
        "**Hardware Design (Verilog / FPGA):** Built a custom hardware pipeline for a 3-layer neural network (784 -> 128 -> 64 -> 10). Implemented a BNN architecture to achieve lightning-fast inference and low resource utilization. Instead of expensive DSP slices and floating-point multipliers, the network uses 1-bit weights and 1-bit activations. Multiplications were replaced by highly efficient XNOR gates, and accumulations were done using combinational popcount trees. Created a custom FSM (Finite State Machine) controller to orchestrate the pipeline: buffering incoming UART pixels, triggering the layer-by-layer inference, and running the final Argmax module to determine the winning digit class. Synthesized, routed, and implemented the design using Xilinx Vivado.",
        "**Software & Machine Learning (Python / PyTorch):** Built a custom PyTorch training pipeline tailored specifically to match the hardware's mathematical constraints. Overcame the \"dead gradient\" problem associated with hardware thresholding by implementing a custom Straight-Through Estimator (STE). Achieved ~86.5% accuracy on the MNIST dataset, which is highly performant for a fully binarized constraint. Wrote quantization and export scripts to extract the trained PyTorch weights and convert them into Memory Initialization Files (.mif), which Vivado bakes directly into the FPGA's Block RAM and LUTs.",
        "**Full-Stack Web Interface (Flask / HTML5 Canvas):** Developed a Flask backend that bridges the web browser to the FPGA via a PySerial connection. Built a frontend UI with an HTML5 drawing canvas where users can sketch digits. The backend captures the canvas image, downscales it to 28x28 pixels, binarizes it, and streams the 784 bytes over the serial port to the FPGA. Once the FPGA computes the result, the web dashboard immediately displays the prediction."
      ],
      challenges: [
        "**Architecture Mismatch Resolution:** Initially, a standard floating-point PyTorch model was quantized post-training, which caused the FPGA to output random predictions (accuracy dropped to ~10%). I resolved this by completely rewriting the training script into a true BNN, replacing standard ReLUs with a custom STE binarization function that perfectly matched the Verilog XNOR logic.",
        "**Hardware/Software Synchronization:** Successfully mapped the host PC's UART byte stream into the FPGA's state machine, ensuring seamless data buffering and inference triggering without dropped frames or synchronization errors."
      ],
      stack: "Verilog HDL, Xilinx Vivado, Nexys A7-100T FPGA, UART, Binarized Neural Networks (BNNs), Python, PyTorch, Straight-Through Estimators (STE), Flask, PySerial, HTML/CSS/JS, HTML5 Canvas."
    }
  },
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
  const [selectedProject, setSelectedProject] = useState(null);

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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  const handleFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const openModal = (project) => {
    if (project.longDescription) {
      setSelectedProject(project);
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

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
                onClick={() => !project.locked && openModal(project)}
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
                        <span className={styles.projectLink}><i className="fas fa-arrow-right"></i> {project.longDescription ? 'Read Case Study' : 'View Project'}</span>
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

      {/* Project Details Modal */}
      <div className={`${styles.modalOverlay} ${selectedProject ? styles.active : ''}`} onClick={closeModal}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <button className={styles.closeModal} onClick={closeModal}><i className="fas fa-times"></i></button>
          
          {selectedProject && (
            <>
              {selectedProject.image && (
                <img src={selectedProject.image} alt={selectedProject.title} className={styles.modalImage} />
              )}
              <div className={styles.modalBody}>
                <div className={styles.projectTags}>
                  {selectedProject.tags.map(tag => (
                    <span key={tag.label} className={`${styles.tag} ${styles[tag.class]}`}>{tag.label}</span>
                  ))}
                </div>
                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                
                <div className={styles.modalSection}>
                  <h4>Introduction</h4>
                  <p>{selectedProject.longDescription.intro}</p>
                </div>

                <div className={styles.modalSection}>
                  <h4>Architecture & Tech Stack</h4>
                  <ul>
                    {selectedProject.longDescription.architecture.map((item, i) => {
                      const [bold, rest] = item.split('**').filter(Boolean);
                      return (
                        <li key={i}><strong>{bold}</strong>{rest}</li>
                      );
                    })}
                  </ul>
                </div>

                <div className={styles.modalSection}>
                  <h4>Core Challenges & Solutions</h4>
                  <ul>
                    {selectedProject.longDescription.challenges.map((item, i) => {
                      const [bold, rest] = item.split('**').filter(Boolean);
                      return (
                        <li key={i}><strong>{bold}</strong>{rest}</li>
                      );
                    })}
                  </ul>
                </div>

                <div className={styles.modalSection}>
                  <h4>Tech Stack Highlights</h4>
                  <p>{selectedProject.longDescription.stack}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
