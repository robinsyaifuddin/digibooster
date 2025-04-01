
import React from 'react';
import { motion } from 'framer-motion';

const BlogHeader = () => {
  return (
    <motion.div 
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="inline-block py-1 px-3 text-xs font-medium text-neon-purple bg-dark-300 rounded-full mb-3 border border-neon-purple/30 neon-border">
        ARTIKEL TERBARU
      </span>
      <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">
        DigiBooster <span className="neon-text">Blog</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
        Temukan berbagai artikel informatif tentang dunia digital untuk membantu Anda berkembang
      </p>

      {/* Decorative elements */}
      <div className="hidden md:block">
        <div className="absolute top-40 right-20 w-20 h-20 bg-neon-purple rounded-full filter blur-[50px] opacity-20 animate-pulse"></div>
        <div className="absolute top-60 left-20 w-16 h-16 bg-neon-violet rounded-full filter blur-[40px] opacity-20 animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default BlogHeader;
