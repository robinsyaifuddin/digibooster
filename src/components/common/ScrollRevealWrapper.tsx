
import React, { useEffect, ReactNode } from 'react';

interface ScrollRevealWrapperProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
}

const ScrollRevealWrapper = ({ 
  children, 
  threshold = 150,
  className = ''
}: ScrollRevealWrapperProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.scroll-reveal-item');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = threshold;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return (
    <div className={`scroll-reveal-item ${className}`}>
      {children}
    </div>
  );
};

export default ScrollRevealWrapper;
