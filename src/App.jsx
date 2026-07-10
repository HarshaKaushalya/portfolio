import React, { Suspense, useState, useEffect } from 'react';

const Navbar   = React.lazy(() => import('./components/Navbar/Navbar'));
const Hero     = React.lazy(() => import('./components/Hero/Hero'));
const About    = React.lazy(() => import('./components/About/About'));
const Skills   = React.lazy(() => import('./components/Skills/Skills'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Contact  = React.lazy(() => import('./components/Contact/Contact'));
const Footer   = React.lazy(() => import('./components/Footer/Footer'));
const Loader   = React.lazy(() => import('./components/Loader/Loader'));

const App = () => {
  const [loading, setLoading] = useState(true);

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Native Scroll Progress (no React state updates = high performance)
  useEffect(() => {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) return;
    const onScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${Math.min(pct, 100)}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Global fade-in observer — replaces GSAP across all components
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 100);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [loading]);

  return (
    <Suspense fallback={null}>
      {loading && <Loader />}
      <div id="scroll-progress-bar" className="scroll-progress" style={{ width: '0%' }} />
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </Suspense>
  );
};

export default App;
