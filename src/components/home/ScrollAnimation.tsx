
import React, { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    // Membuat observer baru hanya sekali
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Pilih semua elemen dengan class scroll-animation
    const elements = document.querySelectorAll('.scroll-animation');
    
    // Setup observer untuk setiap elemen
    elements.forEach(el => {
      el.classList.add('opacity-0');
      observerRef.current?.observe(el);
    });

    // Cleanup pada unmount
    return () => {
      if (observerRef.current) {
        elements.forEach(el => observerRef.current?.unobserve(el));
        observerRef.current = null;
      }
    };
  }, []); // Pastikan effect hanya berjalan sekali

  return <>{children}</>;
};

export default ScrollAnimation;
