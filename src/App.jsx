import React, { Suspense, useState, useEffect } from 'react';

const Navbar = React.lazy(() => import('./components/Navbar/Navbar'));
const Hero = React.lazy(() => import('./components/Hero/Hero'));
const About = React.lazy(() => import('./components/About/About'));
const Skills = React.lazy(() => import('./components/Skills/Skills'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const CustomCursor = React.lazy(() => import('./components/CustomCursor/CustomCursor'));
const Loader = React.lazy(() => import('./components/Loader/Loader'));
const Particles = React.lazy(() => import('./components/Background/Particles'));
const ThreeBackground = React.lazy(() => import('./components/Background/ThreeBackground'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        {loading && <Loader />}
        <CustomCursor />
        <ThreeBackground />
        <Particles />
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
    </>
  );
}

export default App;
