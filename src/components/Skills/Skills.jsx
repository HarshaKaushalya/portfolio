import React from 'react';
import styles from './Skills.module.css';

const skillsData = [
  {
    icon: 'fas fa-bolt',
    title: 'Electrical Testing & Design',
    skills: [
      { icon: 'fas fa-plug',            label: 'Earth Resistance Testing' },
      { icon: 'fas fa-bolt',            label: 'Loop Impedance Testing' },
      { icon: 'fas fa-shield-alt',      label: 'Insulation Resistance Testing' },
      { icon: 'fas fa-cogs',            label: 'Protection Relay Testing' },
      { icon: 'fas fa-temperature-high',label: 'Thermography Surveying' },
      { icon: 'fas fa-drafting-compass',label: 'ETAP / PVSyst / DiaLux' },
    ],
  },
  {
    icon: 'fas fa-microchip',
    title: 'Circuit, PCB & Digital Design',
    skills: [
      { icon: 'fas fa-draw-polygon',    label: 'Schematic Design' },
      { icon: 'fas fa-layer-group',     label: 'PCB Design (KiCad / EasyEDA)' },
      { icon: 'fas fa-desktop',         label: 'Circuit Simulation (Proteus)' },
      { icon: 'fas fa-laptop-code',     label: 'MATLAB / Simulink' },
      { icon: 'fas fa-microchip',       label: 'Arduino / ESP32' },
      { icon: 'fas fa-network-wired',   label: 'Cisco Packet Tracer' },
    ],
  },
  {
    icon: 'fas fa-memory',
    title: 'HDL & FPGA Design',
    skills: [
      { icon: 'fas fa-code',            label: 'Verilog / SystemVerilog' },
      { icon: 'fas fa-tools',           label: 'AMD Vivado' },
      { icon: 'fas fa-project-diagram', label: 'RISC-V Architecture' },
      { icon: 'fas fa-sitemap',         label: 'FSM Design' },
      { icon: 'fas fa-exchange-alt',    label: 'UART / SPI / I2C' },
      { icon: 'fas fa-cube',            label: 'BRAM / DSP Inference' },
    ],
  },
  {
    icon: 'fas fa-code',
    title: 'Programming Languages',
    skills: [
      { icon: 'fab fa-python',          label: 'Python' },
      { icon: 'fab fa-js',              label: 'JavaScript / TypeScript' },
      { icon: 'fas fa-copyright',       label: 'C / C++' },
      { icon: 'fas fa-database',        label: 'SQL' },
      { icon: 'fas fa-terminal',        label: 'Assembly (x86)' },
      { icon: 'fas fa-terminal',        label: 'Bash / Shell' },
    ],
  },
  {
    icon: 'fas fa-brain',
    title: 'AI & Machine Learning',
    skills: [
      { icon: 'fas fa-fire',            label: 'PyTorch' },
      { icon: 'fas fa-robot',           label: 'TensorFlow / Keras' },
      { icon: 'fas fa-chart-line',      label: 'Scikit-learn' },
      { icon: 'fas fa-eye',             label: 'Computer Vision (YOLOv8)' },
      { icon: 'fas fa-table',           label: 'NumPy / Pandas / Matplotlib' },
      { icon: 'fas fa-project-diagram', label: 'CNN / BiLSTM / BNN' },
    ],
  },
  {
    icon: 'fas fa-globe',
    title: 'Web Development',
    skills: [
      { icon: 'fab fa-react',           label: 'MERN Stack / Next.js' },
      { icon: 'fab fa-node-js',         label: 'Express.js' },
      { icon: 'fas fa-database',        label: 'MySQL / MongoDB' },
      { icon: 'fas fa-robot',           label: 'RAG / LLM Integration (Ollama)' },
      { icon: 'fas fa-eye',             label: 'OpenCV / YOLOv8 Web Apps' },
      { icon: 'fab fa-docker',          label: 'Docker' },
    ],
  },
];

const Skills = () => (
  <section id="skills" className="section-padding">
    <div className="container">
      <h2 className="section-title fade-in">Technical <span>Skills</span></h2>
      <p className="section-subtitle fade-in">A toolkit built through academic training and industry practice</p>
      <div className={styles.skillsContainer}>
        {skillsData.map((cat, i) => (
          <div key={cat.title} className={`${styles.skillCategory} glass fade-in`} style={{ transitionDelay: `${i * 0.05}s` }}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}><i className={cat.icon}></i></div>
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
            </div>
            <div className={styles.skillBadges}>
              {cat.skills.map(s => (
                <span key={s.label} className={styles.skillBadge}>
                  <i className={s.icon}></i> {s.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default React.memo(Skills);
