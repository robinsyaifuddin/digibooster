
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GeneralInfo } from '@/types/websiteTypes';

interface HeroSectionProps {
  generalInfo: GeneralInfo;
  hero?: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
}

const HeroSection = ({ generalInfo, hero }: HeroSectionProps) => {
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
    <section className="pt-32 pb-20 relative overflow-hidden bg-cyber-dark">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-cyber-grid-bg opacity-30"></div>
        
        {/* Animated glowing circles */}
        <motion.div
          variants={glowingCircleVariants}
          animate="pulse"
          className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-cyber-primary/10 blur-3xl"
        />
        <motion.div
          variants={glowingCircleVariants}
          animate="pulse"
          className="absolute top-[30%] left-[5%] w-40 h-40 rounded-full bg-cyber-accent/5 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          variants={glowingCircleVariants}
          animate="pulse"
          className="absolute bottom-[15%] right-[15%] w-52 h-52 rounded-full bg-cyber-highlight/5 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <div className="px-4 py-1 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full">
              <span className="text-sm text-cyber-accent font-medium tracking-wider">DIGITAL EMPOWERMENT</span>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight"
          >
            <span className="text-white block">Skill Up,</span>
            <span className="text-gradient-cyber animate-cyber-glitch block">Stand Up</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            DigiBooster empowers students and professionals with cutting-edge digital skills through 
            innovative education and real-world application, accelerating the path to digital mastery.
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button asChild className="cyber-btn text-base px-8 py-6">
              <Link to={hero?.ctaLink || "/program/jasa-digital"}>
                {hero?.ctaText || "Explore Our Programs"} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="border border-white/20 text-white hover:bg-white/5 text-base px-8 py-6">
              <Link to="/tentang">
                Learn More About Us
              </Link>
            </Button>
          </motion.div>
          
          {/* Feature highlights */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-cyber-darker/80 backdrop-blur-sm p-6 rounded-lg border border-cyber-primary/20 hover:border-cyber-primary/40 transition-all">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-cyber-primary/20 rounded-lg flex items-center justify-center">
                  <Code className="h-6 w-6 text-cyber-accent" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Digital Services</h3>
              <p className="text-white/70 text-sm">Professional web development, design & digital marketing solutions for your business.</p>
            </div>
            
            <div className="bg-cyber-darker/80 backdrop-blur-sm p-6 rounded-lg border border-cyber-primary/20 hover:border-cyber-primary/40 transition-all">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-cyber-primary/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-cyber-accent" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Skill Development</h3>
              <p className="text-white/70 text-sm">Intensive programs and workshops to master in-demand digital skills.</p>
            </div>
            
            <div className="bg-cyber-darker/80 backdrop-blur-sm p-6 rounded-lg border border-cyber-primary/20 hover:border-cyber-primary/40 transition-all">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-cyber-primary/20 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-cyber-accent" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Expert Guidance</h3>
              <p className="text-white/70 text-sm">Mentorship and consultations from industry professionals.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
