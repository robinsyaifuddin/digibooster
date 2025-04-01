
import React from 'react';
import { motion } from 'framer-motion';

const PortfolioHero = () => {
  return (
    <div className="mb-16 text-center relative">
      {/* Cyberpunk decorative elements */}
      <div className="absolute top-0 left-0 w-12 h-12 border border-cyber-primary/30 rotate-45 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border border-cyber-accent/30 rotate-12 opacity-20"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-block mb-4"
      >
        <div className="px-4 py-1 bg-cyber-darker border border-cyber-primary/50 rounded-full flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-cyber-accent animate-pulse"></span>
          <span className="text-sm font-medium tracking-wider text-cyber-accent">PORTOFOLIO KAMI</span>
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight text-gradient-cyber animate-cyber-glitch"
      >
        Digital Portfolio
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
      >
        Jelajahi showcase digital kami yang menampilkan berbagai proyek kreatif dan inovatif. 
        Dari pengembangan web hingga kampanye digital marketing, kami mewujudkan ide menjadi realitas.
      </motion.p>
      
      {/* Cyberpunk decorative lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-32 h-0.5 bg-cyber-accent mx-auto mt-8 origin-left"
      ></motion.div>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="w-16 h-0.5 bg-cyber-primary mx-auto mt-2 origin-right"
      ></motion.div>
    </div>
  );
};

export default PortfolioHero;
