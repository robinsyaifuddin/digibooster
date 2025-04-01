
import React from 'react';
import { motion } from 'framer-motion';

const PortfolioHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <div className="inline-block mb-4">
        <div className="px-4 py-1 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full">
          <span className="text-sm text-cyber-accent font-medium tracking-wider">OUR WORK</span>
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
        <span className="text-gradient-cyber animate-cyber-glitch">Digital Portfolio</span>
      </h1>
      <p className="text-lg text-white/80 max-w-2xl mx-auto">
        Explore our showcase of digital projects, student achievements, and industry collaborations.
        From web development to digital marketing campaigns, see how we bring ideas to life.
      </p>
    </motion.div>
  );
};

export default PortfolioHero;
