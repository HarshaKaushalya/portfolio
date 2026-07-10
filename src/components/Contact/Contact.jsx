import React, { useState, useCallback } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus]       = useState('idle');
  const [errors, setErrors]       = useState({ name: false, email: false, message: false });

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormState(p => ({ ...p, [id]: value }));
    if (errors[id]) setErrors(p => ({ ...p, [id]: false }));
  }, [errors]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const newErrors = {
      name: !formState.name.trim(),
      email: !formState.email.trim(),
      message: !formState.message.trim(),
    };
    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      setTimeout(() => setErrors({ name: false, email: false, message: false }), 600);
      return;
    }
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  }, [formState]);

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <h2 className="section-title fade-in">Get In <span>Touch</span></h2>
        <p className={`section-subtitle fade-in`}>I'm currently open to new opportunities. Reach out and let's talk!</p>

        <div className={styles.contactContainer}>
          <div className={`fade-in ${styles.contactInfo}`}>
            <a href="mailto:harshakaushalya19@gmail.com" className={`${styles.contactCard} glass`}>
              <div className={styles.contactIcon}><i className="fas fa-envelope"></i></div>
              <div className={styles.contactText}>
                <h4>Email</h4>
                <p>harshakaushalya19@gmail.com</p>
              </div>
            </a>
            <a href="tel:+94715906850" className={`${styles.contactCard} glass`}>
              <div className={styles.contactIcon}><i className="fas fa-phone"></i></div>
              <div className={styles.contactText}>
                <h4>Phone</h4>
                <p>+94-71-5906-850</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/harsha-kaushalya-479ab5285/" target="_blank" rel="noreferrer" className={`${styles.contactCard} glass`}>
              <div className={styles.contactIcon}><i className="fab fa-linkedin-in"></i></div>
              <div className={styles.contactText}>
                <h4>LinkedIn</h4>
                <p>linkedin.com/in/HarshaKaushalya</p>
              </div>
            </a>
            <a href="#" className={`${styles.contactCard} glass`}>
              <div className={styles.contactIcon}><i className="fas fa-map-marker-alt"></i></div>
              <div className={styles.contactText}>
                <h4>Location</h4>
                <p>Galle, Sri Lanka</p>
              </div>
            </a>
          </div>

          <form id="contact-form" className={`${styles.contactForm} glass fade-in`} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input type="text" id="name" className={`${styles.formControl} ${errors.name ? styles.errorShake : ''}`}
                placeholder="Your Name" value={formState.name} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <input type="email" id="email" className={`${styles.formControl} ${errors.email ? styles.errorShake : ''}`}
                placeholder="Your Email" value={formState.email} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <textarea id="message" className={`${styles.formControl} ${errors.message ? styles.errorShake : ''}`}
                placeholder="Your Message" value={formState.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.btnSubmit}`} disabled={status === 'submitting'}>
              {status === 'idle'       && <><i className="fas fa-paper-plane"></i> Send Message</>}
              {status === 'submitting' && <><i className="fas fa-spinner fa-spin"></i> Sending...</>}
              {status === 'success'    && <><i className="fas fa-check"></i> Message Sent!</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
