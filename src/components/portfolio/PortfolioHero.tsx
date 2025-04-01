
import React from 'react';
import { motion } from 'framer-motion';

const PortfolioHero = () => {
  return (
    <div className="mb-16 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-block mb-4"
      >
        <div className="px-4 py-1 bg-digiblue-100 border border-digiblue-300 rounded-full">
          <span className="text-sm font-medium tracking-wider text-digiblue-700">PORTOFOLIO KAMI</span>
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight text-gray-900"
      >
        <span className="text-gradient-elegant">Digital Portfolio</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
      >
        Jelajahi showcase digital kami yang menampilkan berbagai proyek kreatif dan inovatif. 
        Dari pengembangan web hingga kampanye digital marketing, kami mewujudkan ide menjadi realitas.
      </motion.p>
    </div>
  );
};

export default PortfolioHero;
