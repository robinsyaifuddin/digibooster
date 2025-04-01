
import React from 'react';
import { motion } from 'framer-motion';

const AboutHeroSection = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto mb-24 text-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decorative elements */}
      <div className="absolute -top-10 right-0 w-64 h-64 bg-neon-purple rounded-full filter blur-[100px] opacity-10"></div>
      <div className="absolute -bottom-20 left-0 w-64 h-64 bg-neon-violet rounded-full filter blur-[100px] opacity-10"></div>
      
      <span className="inline-block py-1 px-3 text-xs font-medium text-neon-purple bg-dark-300 rounded-full mb-3 border border-neon-purple/30 neon-border">
        TENTANG KAMI
      </span>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
        Tumbuh Bersama <span className="neon-text">DigiBooster</span>
      </h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Kami adalah agensi digital yang berdedikasi untuk membantu bisnis dan individu 
        berkembang di era digital melalui solusi kreatif dan teknologi inovatif.
      </p>
      
      {/* Decorative elements */}
      <motion.div 
        className="w-16 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto mt-8"
        animate={{ 
          width: [64, 128, 64],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Chess piece background - subtle decoration */}
      <div className="absolute opacity-5 right-0 bottom-0 w-32 h-32 transform rotate-12">
        <img 
          src="/lovable-uploads/b9e99a39-1bea-4a66-a055-a70e8d5ac4ab.png" 
          alt="Chess decoration" 
          className="w-full h-full object-contain" 
        />
      </div>
    </motion.div>
  );
};

export default AboutHeroSection;
