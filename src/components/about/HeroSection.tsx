
import React from 'react';
import { motion } from 'framer-motion';

const AboutHeroSection = () => {
  return (
    <div className="max-w-5xl mx-auto mb-24 text-center relative z-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--digiblue-600-rgb),0.15),transparent_70%)]"></div>
      
      <motion.span 
        className="inline-block py-1.5 px-4 text-xs font-medium tracking-wider text-digiblue-600 bg-digiblue-50 rounded-full mb-5 border border-digiblue-200/30 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        TENTANG KAMI
      </motion.span>
      
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 text-gray-900 tracking-tight leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Tumbuh Bersama <span className="text-digiblue-600 relative">
          DigiBooster
          <svg className="absolute bottom-0 left-0 w-full h-2 -mb-1 text-digiblue-200" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 0 Q 50 10 100 0 L100 1 Q50 11 0 1Z" fill="currentColor"/>
          </svg>
        </span>
      </motion.h1>
      
      <motion.p 
        className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Kami adalah agensi digital yang berdedikasi untuk membantu bisnis dan individu 
        berkembang di era digital melalui solusi kreatif dan teknologi inovatif.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="flex justify-center space-x-4"
      >
        <div className="h-1 w-10 bg-digiblue-600 rounded-full"></div>
        <div className="h-1 w-10 bg-digiblue-400 rounded-full"></div>
        <div className="h-1 w-10 bg-digiblue-200 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default AboutHeroSection;
