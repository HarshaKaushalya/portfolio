import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Projects.module.css';

const projectData = [
  {
    id: 0,
    title: "Hardware Accelerated Neural Network using FPGA",
    year: "2025",
    status: "completed",
    categories: ['electronics', 'aiml'],
    tags: [{ label: "FPGA/HDL", class: "electronics" }, { label: "AI/ML", class: "aiml" }],
    description: "Designed a pipelined Binarized Neural Network (BNN) accelerator in Verilog on a Nexys A7-100T FPGA using XNOR-popcount logic; achieved ~4 μs inference at 100 MHz and ~95% MNIST accuracy.",
    github: "https://github.com/HarshaKaushalya",
    image: "/portfolio/fpga.jpg",
    longDescription: {
      intro: "I designed and implemented a full-stack hardware-software system that performs real-time handwritten digit recognition (MNIST) using a custom Binarized Neural Network (BNN) running entirely on a Nexys A7-100T FPGA. Rather than using an off-the-shelf processor, I wrote custom Verilog RTL to perform hardware-accelerated inference. A modern web UI allows users to draw a digit, which is sent over a UART serial connection to the FPGA, where the hardware predicts the digit in real-time and sends the result back to the browser.",
      architecture: [
        "**Hardware Design (Verilog / FPGA):** Built a custom pipelined hardware for a 3-layer neural network (784→256→128→10). Implemented XNOR-popcount BNN logic replacing expensive DSP multipliers. Custom FSM controller orchestrates UART buffering, layer-by-layer inference, and Argmax detection. Synthesized and implemented using Xilinx Vivado 2025.",
        "**Software & Machine Learning (Python / PyTorch):** Custom PyTorch BNN training pipeline with Batch Normalization folding into ROM-exported thresholds. Implemented Straight-Through Estimator (STE) to overcome dead gradient problem. Achieved ~95% MNIST accuracy. BN thresholds exported as .mif files baked into FPGA Block RAM.",
        "**Full-Stack Web Interface (Flask / JavaScript):** Flask backend bridges the browser to FPGA via PySerial. HTML5 Canvas drawing interface downscales input to 28×28, binarizes, and streams 784 bytes over UART. Real-time prediction dashboard displays result."
      ],
      challenges: [
        "**Architecture Mismatch Resolution:** A standard floating-point PyTorch model quantized post-training caused ~10% FPGA accuracy. Resolved by rewriting training as a true BNN with STE binarization matching Verilog XNOR logic exactly.",
        "**Hardware/Software Synchronization:** Mapped the UART byte stream into the FPGA FSM ensuring seamless data buffering and inference triggering without dropped frames."
      ],
      stack: "Verilog HDL, Xilinx Vivado, Nexys A7-100T FPGA, UART, BNN, Python, PyTorch, STE, Flask, PySerial, HTML/CSS/JS, HTML5 Canvas."
    }
  },
  {
    id: 1,
    title: "IoT Smart Energy Meter",
    year: "2025",
    status: "completed",
    categories: ['electronics', 'aiml', 'iot'],
    tags: [{ label: "IoT", class: "iot" }, { label: "AI/ML", class: "aiml" }, { label: "Embedded", class: "electronics" }],
    description: "ESP32-based smart energy meter measuring RMS voltage, current, frequency, power factor and kWh; real-time cloud dashboard with SMS/push anomaly alerts, relay-based load protection, and ML load forecasting.",
    github: "https://github.com/HarshaKaushalya",
    longDescription: {
      intro: "Built a full-stack IoT smart energy monitoring solution using an ESP32 microcontroller. The system measures key electrical parameters in real-time, streams data to a cloud dashboard, and uses machine learning to forecast future consumption and recommend energy-saving strategies.",
      architecture: [
        "**Hardware & Embedded (ESP32):** Measures RMS voltage, current, frequency, power factor, and kWh using precision sensor ICs. Relay module for automated load protection and remote switching. UART/Wi-Fi dual connectivity.",
        "**Cloud & Dashboard:** Real-time data streaming to cloud dashboard with historical visualization. SMS and push notification alerts triggered on anomaly detection (over-current, voltage sag).",
        "**Multi-modal Control:** Manual hardware switches, web interface, and voice-command load control integration. Full remote monitoring capability.",
        "**ML Forecasting Model:** Trained on collected sensor data to predict consumption patterns and recommend energy-saving strategies using time-series analysis."
      ],
      challenges: [
        "**Sensor Accuracy:** Calibrating RMS measurements across varying load types (resistive, inductive, capacitive) required careful offset compensation.",
        "**Real-Time Reliability:** Ensuring uninterrupted data streaming and alert delivery under poor network conditions using local buffering and retry logic."
      ],
      stack: "ESP32, Arduino IDE, Python, Scikit-learn, Flask, MQTT, HTML/CSS/JS, Cloud IoT Platform, Relay Control, SMS API."
    }
  },
  {
    id: 2,
    title: "Smart Laboratory Management System",
    year: "2025",
    status: "ongoing",
    categories: ['aiml', 'web'],
    tags: [{ label: "AI/ML", class: "aiml" }, { label: "Full-Stack", class: "web" }],
    description: "Scalable full-stack web & mobile ecosystem featuring real-time YOLOv8 CCTV occupancy tracking and an Ollama-powered RAG AI assistant to automate laboratory administration for DEIE Dept.",
    github: "https://github.com/HarshaKaushalya",
    longDescription: {
      intro: "Developed for the Department of Electrical and Information Engineering (DEIE), University of Ruhuna. A scalable full-stack web and mobile platform that automates laboratory management using cutting-edge AI, computer vision, and LLM integration.",
      architecture: [
        "**Computer Vision (YOLOv8):** Real-time CCTV-based occupancy tracking using YOLOv8 object detection. Monitors lab occupancy, detects unauthorized access, and logs historical usage patterns.",
        "**RAG AI Assistant (Ollama):** Local LLM-powered Retrieval-Augmented Generation assistant trained on department-specific knowledge. Automates booking inquiries, equipment FAQs, and administrative tasks.",
        "**Full-Stack Web & Mobile:** MERN stack backend with Next.js frontend. Mobile-responsive design. Role-based access control (Admin, Lecturer, Student). Real-time notifications via WebSocket."
      ],
      challenges: [
        "**Real-Time Video Processing:** Optimizing YOLOv8 inference pipeline for near real-time performance on available hardware without GPU acceleration.",
        "**RAG Knowledge Quality:** Curating and chunking department-specific documents for accurate retrieval and coherent LLM responses."
      ],
      stack: "Next.js, Node.js, Express.js, MongoDB, YOLOv8, OpenCV, Ollama, RAG, Docker, WebSocket, React Native."
    }
  },
  {
    id: 3,
    title: "ML-Based Human Activity Recognition",
    year: "2026",
    status: "completed",
    categories: ['aiml'],
    tags: [{ label: "AI/ML", class: "aiml" }],
    description: "CNN-BiLSTM model in TensorFlow/Keras classifying six human activities from 5-sensor, 15-feature accelerometer data; achieved 93.08% test accuracy and 0.9469 macro F1-score.",
    github: "https://github.com/HarshaKaushalya",
    longDescription: {
      intro: "Built a deep learning model combining Convolutional Neural Networks and Bidirectional LSTM layers to classify six human activities (walking, sitting, standing, etc.) from accelerometer sensor data collected across five body-mounted sensors.",
      architecture: [
        "**Model Architecture (CNN-BiLSTM):** Convolutional layers extract spatial features from the 15-feature sensor window. Bidirectional LSTM layers capture temporal dependencies in both forward and backward sequence directions. Fully connected classification head for 6-class output.",
        "**Dataset & Features:** 5-sensor IMU data with 15 engineered features per sensor. Sliding window segmentation with overlap. Data augmentation to handle class imbalance.",
        "**Results:** 93.08% test accuracy, 0.9469 macro F1-score. Confusion matrix analysis revealed near-perfect classification of static activities with slightly lower performance on transitional states."
      ],
      challenges: [
        "**Class Imbalance:** Dynamic activities (transitions) were underrepresented. Resolved using SMOTE oversampling and class-weighted loss functions.",
        "**Feature Engineering:** Selecting the most discriminative features from raw accelerometer signals required domain knowledge of biomechanics."
      ],
      stack: "Python, TensorFlow, Keras, Scikit-learn, NumPy, Pandas, Matplotlib, Jupyter Notebook."
    }
  },
  {
    id: 4,
    title: "Custom 32-bit RISC-V Processor on FPGA",
    year: "2026",
    status: "ongoing",
    categories: ['electronics'],
    tags: [{ label: "FPGA/HDL", class: "electronics" }],
    description: "Developing a 32-bit RISC-V soft-core processor from scratch in SystemVerilog, targeting a Nexys A7 Artix-7 FPGA via AMD Vivado. Includes custom datapath, program counter, and BRAM instruction memory.",
    github: "https://github.com/HarshaKaushalya",
    longDescription: {
      intro: "An ongoing project to implement a fully functional 32-bit RISC-V (RV32I) instruction set architecture processor from scratch using SystemVerilog, targeting the Nexys A7 Artix-7 FPGA. The goal is to understand processor micro-architecture by building every stage from first principles.",
      architecture: [
        "**Instruction Fetch Stage:** Custom datapath with program counter (PC) register and BRAM-inferred instruction memory. Supports sequential fetch and branch redirection.",
        "**Decode & Execute (In Progress):** SystemVerilog RTL for instruction decode unit, register file, and ALU. Implementing all RV32I base integer instructions.",
        "**Vivado Design Flow:** Full synthesis, implementation, and behavioral simulation using AMD Vivado. Modular testbenches for each pipeline stage."
      ],
      challenges: [
        "**BRAM Inference:** Ensuring Vivado correctly infers Block RAM for the instruction memory required specific RTL coding patterns.",
        "**Pipeline Hazards:** Designing data forwarding and stall logic to handle RAW hazards without correctness violations."
      ],
      stack: "SystemVerilog, AMD Vivado, Nexys A7 Artix-7 FPGA, Modelsim, RISC-V ISA."
    }
  },
  {
    id: 5,
    title: "Preliminary Energy Audit",
    year: "2024",
    status: "completed",
    categories: ['electronics'],
    tags: [{ label: "Electrical", class: "electronics" }],
    description: "Faculty-wide energy audit across four student hostels, analyzing fan-load consumption patterns from room-wise surveys, proposing data-driven efficiency recommendations.",
    github: null,
    longDescription: {
      intro: "Conducted as part of a 26-group faculty-wide initiative at the University of Ruhuna, this preliminary energy audit focused on identifying energy-saving opportunities in fan-load consumption across four student hostels.",
      architecture: [
        "**Data Collection:** Room-wise fan usage survey via Google Forms and on-site visits. Data captured: fan type, power rating (W), average daily hours of operation, number of fans per room.",
        "**Analysis:** Aggregated and analyzed consumption patterns by hostel, floor, and room type. Calculated kWh estimates and identified high-consumption clusters.",
        "**Recommendations:** Proposed targeted efficiency measures including replacement of older fans with BEE 5-star rated models and installation of timers/occupancy sensors."
      ],
      challenges: [
        "**Data Quality:** Ensuring self-reported usage data accuracy through cross-validation with on-site observations.",
        "**Scale:** Coordinating data collection across four hostels with varying resident cooperation levels."
      ],
      stack: "Google Forms, Microsoft Excel, Data Analysis, Energy Audit Methodology."
    }
  },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'electronics', label: 'Hardware/EE' },
  { key: 'aiml', label: 'AI & ML' },
  { key: 'web', label: 'Full-Stack' },
  { key: 'iot', label: 'IoT' },
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
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
            opacity: 0, y: 30, duration: 0.8, ease: "power2.out", stagger: 0.1
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
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
  }, [selectedProject]);

  const handleFilter = useCallback((f) => setFilter(f), []);
  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  const visibleProjects = projectData.filter(p => filter === 'all' || p.categories.includes(filter));

  return (
    <section id="projects" className="section-padding" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Featured <span>Projects</span></h2>
        <p className="section-subtitle fade-in">Real-world engineering solutions spanning hardware, AI, and full-stack development</p>

        <div className={`fade-in ${styles.projectFilters}`}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.active : ''}`}
              onClick={() => handleFilter(f.key)}
            >{f.label}</button>
          ))}
        </div>

        <div className={styles.projectsGrid}>
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className={`${styles.projectCard} glass`}
              onClick={() => openModal(project)}
            >
              <div className={styles.projectTopBar}></div>
              <div className={styles.projectContent}>
                <div className={styles.projectMeta}>
                  <div className={styles.projectTags}>
                    {project.tags.map(tag => (
                      <span key={tag.label} className={`${styles.tag} ${styles[tag.class]}`}>{tag.label}</span>
                    ))}
                  </div>
                  <div className={styles.projectBadges}>
                    <span className={`badge-${project.status}`}>{project.status === 'completed' ? '✓ Completed' : '⟳ Ongoing'}</span>
                    <span className={styles.yearBadge}>{project.year}</span>
                  </div>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>

                <div className={styles.projectLinks}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className={styles.projectLink} onClick={e => e.stopPropagation()}>
                      <i className="fab fa-github"></i> Code
                    </a>
                  )}
                  {project.longDescription && (
                    <span className={styles.projectLink} style={{ marginLeft: 'auto' }}>
                      <i className="fas fa-book-open"></i> Case Study
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
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
                <div className={styles.modalTopMeta}>
                  <div className={styles.projectTags}>
                    {selectedProject.tags.map(tag => (
                      <span key={tag.label} className={`${styles.tag} ${styles[tag.class]}`}>{tag.label}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className={`badge-${selectedProject.status}`}>{selectedProject.status === 'completed' ? '✓ Completed' : '⟳ Ongoing'}</span>
                    <span className={styles.yearBadge}>{selectedProject.year}</span>
                  </div>
                </div>
                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>

                <div className={styles.modalSection}>
                  <h4><i className="fas fa-info-circle"></i> Introduction</h4>
                  <p>{selectedProject.longDescription.intro}</p>
                </div>

                <div className={styles.modalSection}>
                  <h4><i className="fas fa-layer-group"></i> Architecture & Tech Stack</h4>
                  <ul>
                    {selectedProject.longDescription.architecture.map((item, i) => {
                      const parts = item.split('**').filter(Boolean);
                      return parts.length >= 2
                        ? <li key={i}><strong>{parts[0]}</strong>{parts[1]}</li>
                        : <li key={i}>{item}</li>;
                    })}
                  </ul>
                </div>

                <div className={styles.modalSection}>
                  <h4><i className="fas fa-wrench"></i> Core Challenges & Solutions</h4>
                  <ul>
                    {selectedProject.longDescription.challenges.map((item, i) => {
                      const parts = item.split('**').filter(Boolean);
                      return parts.length >= 2
                        ? <li key={i}><strong>{parts[0]}</strong>{parts[1]}</li>
                        : <li key={i}>{item}</li>;
                    })}
                  </ul>
                </div>

                <div className={styles.modalSection}>
                  <h4><i className="fas fa-tools"></i> Tech Stack</h4>
                  <p>{selectedProject.longDescription.stack}</p>
                </div>

                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn btn-primary" style={{marginTop: '1.5rem', display: 'inline-flex'}}>
                    <i className="fab fa-github"></i> View on GitHub
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
