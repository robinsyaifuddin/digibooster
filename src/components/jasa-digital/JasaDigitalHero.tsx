
import React from 'react';
import { motion } from 'framer-motion';

const JasaDigitalHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-16 text-center"
    >
      <div className="bg-gradient-to-br from-dark-300 to-dark-500 rounded-xl py-16 px-6 shadow-lg border border-neon-purple/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-purple rounded-full filter blur-[80px] opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-violet rounded-full filter blur-[80px] opacity-20"></div>
        
        <span className="inline-block py-1 px-3 text-xs font-medium text-white bg-neon-purple/30 border border-neon-purple/50 rounded-full mb-3 backdrop-blur-sm animate-pulse-light">
          PROGRAM KAMI
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
          Solusi Digital <span className="text-neon-purple animate-glow">Komprehensif</span> untuk<br />Bisnis Anda
        </h1>
        <p className="text-lg text-white/80 max-w-3xl mx-auto">
          Kami menawarkan berbagai program digital terintegrasi untuk membantu bisnis Anda berkembang di era digital
          dengan strategi yang terukur dan berkelanjutan.
        </p>
      </div>
    </motion.div>
  );
};

export default JasaDigitalHero;
