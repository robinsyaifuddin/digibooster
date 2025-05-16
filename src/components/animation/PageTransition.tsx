
import React, { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({
  children
}: PageTransitionProps) => {
  const location = useLocation();
  
  // Reset scroll position to top when navigating to a new page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // If there's a hash in the URL (e.g., #section), scroll to it after a short delay
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Small delay to allow the page to render first
    }
  }, [location.pathname, location.hash]);
  
  return (
    <motion.div 
      key={location.pathname} 
      initial={{
        opacity: 0,
        y: 20
      }} 
      animate={{
        opacity: 1,
        y: 0
      }} 
      exit={{
        opacity: 0,
        y: -20
      }} 
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }} 
      className="bg-black min-h-screen"
    >
      {children}
    </motion.div>
  );
};
