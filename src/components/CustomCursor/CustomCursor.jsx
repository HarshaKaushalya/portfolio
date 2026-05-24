import React, { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    let requestRef;

    const onMouseMove = (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
    };

    const animateFollower = () => {
      followerX += (cursorX - followerX) * 0.15;
      followerY += (cursorY - followerY) * 0.15;
      
      if (followerRef.current) {
        followerRef.current.style.left = `${followerX}px`;
        followerRef.current.style.top = `${followerY}px`;
      }
      requestRef = requestAnimationFrame(animateFollower);
    };

    document.addEventListener('mousemove', onMouseMove);
    requestRef = requestAnimationFrame(animateFollower);

    // Add hover effects for interactable elements
    const handleMouseOver = () => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
        followerRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        followerRef.current.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
      }
    };

    const handleMouseOut = () => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        followerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        followerRef.current.style.backgroundColor = 'transparent';
      }
    };

    // Attach to elements with these classes or tags
    const attachHoverEffects = () => {
      const interactables = document.querySelectorAll('a, button, .project-card, .skill-badge, .contact-card, input, textarea');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseOver);
        el.addEventListener('mouseleave', handleMouseOut);
      });
    };

    // Attach initially and maybe we should re-attach when DOM changes,
    // but React's synthetic events or simpler global listener might be better.
    // For simplicity, we just bind it to the document body with event delegation.
    const handleGlobalMouseOver = (e) => {
      const target = e.target.closest('a, button, .project-card, .skill-badge, .contact-card, input, textarea');
      if (target) {
        handleMouseOver();
      }
    };

    const handleGlobalMouseOut = (e) => {
      const target = e.target.closest('a, button, .project-card, .skill-badge, .contact-card, input, textarea');
      if (target) {
        handleMouseOut();
      }
    };

    document.addEventListener('mouseover', handleGlobalMouseOver);
    document.addEventListener('mouseout', handleGlobalMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleGlobalMouseOver);
      document.removeEventListener('mouseout', handleGlobalMouseOut);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <>
      <div className={styles.customCursor} ref={cursorRef}></div>
      <div className={styles.customCursorFollower} ref={followerRef}></div>
    </>
  );
};

export default React.memo(CustomCursor);
