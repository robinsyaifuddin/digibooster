
import React from 'react';
import { motion } from 'framer-motion';

const AboutHeroSection = () => {
  return (
    <div className="max-w-4xl mx-auto mb-24 text-center">
      <motion.span 
        className="inline-block py-1 px-3 text-xs font-medium text-digiblue-600 bg-digiblue-100 rounded-full mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        TENTANG KAMI
      </motion.span>
      
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Tumbuh Bersama <span className="text-digiblue-600">DigiBooster</span>
      </motion.h1>
      
      <motion.p 
        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Kami adalah agensi digital yang berdedikasi untuk membantu bisnis dan individu 
        berkembang di era digital melalui solusi kreatif dan teknologi inovatif.
      </motion.p>
    </div>
  );
};

export default AboutHeroSection;
