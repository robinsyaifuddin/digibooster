
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Lightbulb, BookOpen, GraduationCap } from 'lucide-react';

const ClassHero = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      controls.start({ y: scrollY * 0.1 });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-16"
    >
      <div className="bg-gradient-to-br from-dark-300 to-dark-500 rounded-xl py-16 px-6 md:px-10 shadow-lg border border-neon-purple/30 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
            filter: ["blur(80px)", "blur(90px)", "blur(80px)"]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-neon-purple rounded-full"
        />
        
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1],
            filter: ["blur(80px)", "blur(95px)", "blur(80px)"]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-violet rounded-full"
        />
        
        {/* Floating 3D icons */}
        <motion.div
          className="absolute top-10 right-10 text-neon-purple/60 hidden md:block"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen size={40} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 right-16 text-neon-violet/60 hidden md:block"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <GraduationCap size={50} />
        </motion.div>
        
        <motion.div
          className="absolute left-10 top-1/2 text-neon-pink/60 hidden md:block"
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Lightbulb size={35} />
        </motion.div>
        
        {/* Cyber grid background */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        {/* Content */}
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-block py-1 px-3 text-xs font-medium text-white bg-neon-purple/30 border border-neon-purple/50 rounded-full mb-3 backdrop-blur-sm animate-pulse-light"
        >
          PROGRAM KAMI
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
        >
          Short Class & <motion.span 
            className="text-neon-purple relative inline-block"
            animate={{ textShadow: ["0 0 5px rgba(166, 51, 255, 0.7)", "0 0 20px rgba(166, 51, 255, 0.9)", "0 0 5px rgba(166, 51, 255, 0.7)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Mini Bootcamp
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-white/80 max-w-3xl mx-auto"
        >
          Tingkatkan keterampilan digital Anda melalui kelas intensif dan bootcamp yang dirancang
          untuk memberikan pengetahuan praktis dalam waktu singkat.
        </motion.p>
        
        {/* Animated line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neon-purple via-neon-violet to-neon-purple"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

export default ClassHero;
