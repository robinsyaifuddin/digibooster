
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Star, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CyberHero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const glowingCircleVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-cyber-dark">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30"></div>
      
      {/* Animated glowing circles */}
      <motion.div
        variants={glowingCircleVariants}
        animate="pulse"
        className="absolute top-1/4 right-[15%] w-80 h-80 rounded-full bg-cyber-primary/10 blur-3xl"
      />
      <motion.div
        variants={glowingCircleVariants}
        animate="pulse"
        className="absolute bottom-1/4 left-[10%] w-60 h-60 rounded-full bg-cyber-accent/10 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
      
      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <div className="px-4 py-1 bg-cyber-darker border border-cyber-primary rounded-full flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-cyber-accent animate-pulse"></span>
              <span className="text-sm text-cyber-accent font-medium tracking-wider">THE FUTURE OF DIGITAL EDUCATION</span>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tighter"
          >
            <span className="text-gradient-cyber">SKILL UP.</span>{" "}
            <span className="text-white">STAND UP.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-white/80 leading-relaxed mb-12 max-w-3xl"
          >
            Empowering digital transformation through cutting-edge education, real-world application, 
            and innovative solutions that drive the future of technology.
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Button asChild className="cyber-btn text-base px-10 py-7 text-lg">
              <Link to="/program/jasa-digital">
                Explore Programs <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border border-cyber-primary text-cyber-primary hover:bg-cyber-primary/10 text-base px-10 py-7 text-lg">
              <Link to="/tentang">
                About Us
              </Link>
            </Button>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            variants={itemVariants}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white/60 text-sm">Scroll Down</span>
            <MousePointer className="h-5 w-5 text-cyber-accent" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyber-darker to-transparent pointer-events-none"
      ></motion.div>
    </section>
  );
};

export default CyberHero;
