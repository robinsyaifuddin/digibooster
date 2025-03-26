
import React, { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Cleanup any existing observer first
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          
          // Unobserve after animation
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Target all elements with scroll-animation class
    const animatedElements = document.querySelectorAll('.scroll-animation');
    
    animatedElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observerRef.current?.observe(el);
    });

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); // Only run once on mount

  return <>{children}</>;
};

export default ScrollAnimation;
