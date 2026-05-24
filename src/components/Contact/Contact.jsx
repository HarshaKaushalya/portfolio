import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  useEffect(() => {
    let gsapInstance;
    let observer;

    const initContact = async () => {
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
            stagger: 0.2
          });
          observer.disconnect();
        }
      }, { threshold: 0.1 });

      if (sectionRef.current) observer.observe(sectionRef.current);
    };

    initContact();

    return () => {
      if (observer) observer.disconnect();
      if (gsapInstance) gsapInstance.kill();
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: false }));
    }
  }, [errors]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    let isValid = true;
    const newErrors = { name: false, email: false, message: false };
    
    if (!formState.name.trim()) { newErrors.name = true; isValid = false; }
    if (!formState.email.trim()) { newErrors.email = true; isValid = false; }
    if (!formState.message.trim()) { newErrors.message = true; isValid = false; }
    
    if (!isValid) {
      setErrors(newErrors);
      // Remove error shake class after animation completes
      setTimeout(() => setErrors({ name: false, email: false, message: false }), 500);
      return;
    }

    setStatus('submitting');
    
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }, 1500);
  }, [formState]);

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Initiate <span>Connection</span></h2>
        <p className={`fade-in ${styles.contactSubtitle}`}>Let's build secure and intelligent systems together.</p>
        
        <div className={styles.contactContainer}>
          <div className={`fade-in ${styles.contactInfo}`}>
            <a href="mailto:contact@harsha.dev" className={`${styles.contactCard} glass`}>
              <div className={styles.contactIcon}>
                <i className="fas fa-envelope"></i>
              </div>
              <div className={styles.contactText}>
                <h4>Email</h4>
                <p>contact@harsha.dev</p>
              </div>
            </a>
            <a href="#" className={`${styles.contactCard} glass`}>
              <div className={styles.contactIcon}>
                <i className="fab fa-discord"></i>
              </div>
              <div className={styles.contactText}>
                <h4>Discord</h4>
                <p>HarshaK#1234</p>
              </div>
            </a>
            <a href="#" className={`${styles.contactCard} glass`}>
              <div className={styles.contactIcon}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className={styles.contactText}>
                <h4>Location</h4>
                <p>Kandy, Sri Lanka</p>
              </div>
            </a>
          </div>

          <form id="contact-form" className={`${styles.contactForm} glass fade-in`} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input 
                type="text" 
                id="name" 
                className={`${styles.formControl} ${errors.name ? styles.errorShake : ''}`} 
                placeholder="Your Identity (Name)" 
                value={formState.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input 
                type="email" 
                id="email" 
                className={`${styles.formControl} ${errors.email ? styles.errorShake : ''}`} 
                placeholder="Return Address (Email)" 
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <textarea 
                id="message" 
                className={`${styles.formControl} ${errors.message ? styles.errorShake : ''}`} 
                placeholder="Encrypted Payload (Message)"
                value={formState.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className={`btn btn-primary ${styles.btnSubmit} ${status === 'success' ? styles.success : ''}`}
              disabled={status === 'submitting'}
            >
              {status === 'idle' && <><i className="fas fa-paper-plane"></i> Transmit Data</>}
              {status === 'submitting' && <><i className="fas fa-spinner fa-spin"></i> Sending...</>}
              {status === 'success' && <><i className="fas fa-check"></i> Message Sent!</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
