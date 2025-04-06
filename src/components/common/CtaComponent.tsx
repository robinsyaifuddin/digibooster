
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CtaComponentProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  theme?: 'blue' | 'dark' | 'purple';
}

const CtaComponent = ({
  title,
  description,
  buttonText,
  buttonLink,
  theme = 'dark',
}: CtaComponentProps) => {
  // Theme variants
  const themeStyles = {
    blue: {
      bg: "bg-gradient-to-br from-dark-200 to-dark-300",
      border: "border-neon-blue/30",
      buttonBg: "bg-neon-blue hover:bg-neon-blue/80",
      glow: "bg-neon-blue"
    },
    dark: {
      bg: "bg-gradient-to-br from-dark-300 to-dark-400",
      border: "border-gray-700",
      buttonBg: "bg-white hover:bg-gray-200 text-dark",
      glow: "bg-white"
    },
    purple: {
      bg: "bg-gradient-to-br from-dark-200 to-dark-300",
      border: "border-neon-purple/30",
      buttonBg: "bg-gradient-to-r from-neon-purple to-neon-violet hover:from-neon-violet hover:to-neon-purple",
      glow: "bg-neon-purple"
    }
  };
  
  // Always use purple theme for consistency
  const currentTheme = themeStyles.purple;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="my-24 p-1 rounded-xl bg-gradient-to-r from-neon-purple/30 via-neon-violet/40 to-neon-purple/30">
      <motion.div
        className={`${currentTheme.bg} rounded-lg p-8 md:p-12 relative overflow-hidden`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Background effects */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        <motion.div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-neon-purple/20 blur-3xl"
          animate={{ 
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-neon-violet/20 blur-3xl"
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        
        {/* Content */}
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-300 mb-8"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Link to={buttonLink}>
              <Button 
                size="lg"
                className={`${currentTheme.buttonBg} group font-medium px-6 py-3 text-white shadow-lg shadow-neon-purple/20`}
              >
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Animated borders */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-neon-purple to-transparent"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            boxShadow: [
              "0 0 5px rgba(166, 51, 255, 0.3)", 
              "0 0 20px rgba(166, 51, 255, 0.7)",
              "0 0 5px rgba(166, 51, 255, 0.3)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-transparent via-neon-violet to-transparent"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            boxShadow: [
              "0 0 5px rgba(166, 51, 255, 0.3)", 
              "0 0 15px rgba(166, 51, 255, 0.6)",
              "0 0 5px rgba(166, 51, 255, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default CtaComponent;
