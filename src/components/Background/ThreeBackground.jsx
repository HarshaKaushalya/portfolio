import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, particles, animationFrameId;
    let handleResize;

    const initThree = async () => {
      const THREE = await import('three');

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;
      
      // Move camera slightly to the right to be behind hero visuals
      camera.position.x = window.innerWidth > 768 ? 10 : 0;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      const geometry = new THREE.BufferGeometry();
      const count = window.innerWidth > 768 ? 2000 : 800;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const color1 = new THREE.Color('#00d4ff');
      const color2 = new THREE.Color('#7c3aed');

      for(let i = 0; i < count; i++) {
        // Create an organic ring/torus field effect
        const t = Math.random() * Math.PI * 2;
        const p = Math.random() * Math.PI * 2;
        const R = 15 + Math.random() * 5; 
        const r = 5 + Math.random() * 8; 

        const x = (R + r * Math.cos(p)) * Math.cos(t);
        const y = (R + r * Math.cos(p)) * Math.sin(t);
        const z = r * Math.sin(p);

        positions[i*3] = x;
        positions[i*3+1] = y;
        positions[i*3+2] = z;

        const mixedColor = color1.clone().lerp(color2, Math.random());
        colors[i*3] = mixedColor.r;
        colors[i*3+1] = mixedColor.g;
        colors[i*3+2] = mixedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Create circular texture for particles
      const particleCanvas = document.createElement('canvas');
      particleCanvas.width = 32;
      particleCanvas.height = 32;
      const ctx = particleCanvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      const particleTexture = new THREE.CanvasTexture(particleCanvas);

      const material = new THREE.PointsMaterial({
        size: 0.25,
        map: particleTexture,
        alphaTest: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (particles) {
          particles.rotation.x += 0.001;
          particles.rotation.y += 0.0015;
          particles.rotation.z += 0.0005;
        }
        renderer.render(scene, camera);
      };

      animate();

      handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      window.addEventListener('resize', handleResize);
    };

    initThree();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -3, 
        pointerEvents: 'none' 
      }} 
    />
  );
};

export default React.memo(ThreeBackground);
