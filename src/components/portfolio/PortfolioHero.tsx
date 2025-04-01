
import React from 'react';
import { motion } from 'framer-motion';

const PortfolioHero = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto mb-16 text-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-purple rounded-full filter blur-[80px] opacity-10 animate-pulse"></div>
      <div className="absolute -bottom-10 -left-20 w-40 h-40 bg-neon-blue rounded-full filter blur-[80px] opacity-10 animate-pulse"></div>
      
      <span className="inline-block py-1 px-3 text-xs font-medium text-neon-purple bg-dark-300 rounded-full mb-3 border border-neon-purple/30 neon-border">
        KARYA KAMI
      </span>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
        Portofolio <span className="neon-text">Proyek Digital</span>
      </h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Kumpulan karya dan proyek digital yang telah kami kerjakan untuk berbagai klien
        di berbagai industri dengan hasil yang memuaskan.
      </p>
      
      {/* Animated lines */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-neon-purple to-neon-pink opacity-70"
        animate={{ width: ["0%", "30%", "0%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  );
};

export default PortfolioHero;
