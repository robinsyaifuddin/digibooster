
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSplashScreen } from '@/contexts/SplashScreenContext';
import logoImage from '/lovable-uploads/63175a8a-8817-436e-8f8b-a3246a8bf733.png';

interface SplashScreenProps {
  duration?: number;
}

const SplashScreen = ({ duration = 2000 }: SplashScreenProps) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  const { hideSplash } = useSplashScreen();
  
  useEffect(() => {
    // Show particles effect before hiding the splash
    const particlesTimer = setTimeout(() => {
      setShowParticles(true);
    }, duration - 500);
    
    // Hide splash after duration
    const hideTimer = setTimeout(() => {
      setShowAnimation(false);
      setTimeout(() => {
        hideSplash();
      }, 300); // Give time for exit animation
    }, duration);
    
    return () => {
      clearTimeout(particlesTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, hideSplash]);

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] w-full h-full bg-dark"
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Grid lines for cyber effect */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            {/* Horizontal grid lines */}
            {[...Array(10)].map((_, i) => (
              <motion.div 
                key={`h-line-${i}`}
                className="absolute h-[1px] bg-neon-cyan/20 w-full left-0"
                style={{ top: `${i * 10}%` }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scaleX: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 2px rgba(0, 216, 232, 0.2)",
                    "0 0 8px rgba(0, 216, 232, 0.6)",
                    "0 0 2px rgba(0, 216, 232, 0.2)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: 1,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.05
                }}
              />
            ))}
            
            {/* Vertical grid lines */}
            {[...Array(10)].map((_, i) => (
              <motion.div 
                key={`v-line-${i}`}
                className="absolute w-[1px] bg-neon-cyan/20 h-full top-0"
                style={{ left: `${i * 10}%` }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scaleY: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 2px rgba(0, 216, 232, 0.2)",
                    "0 0 8px rgba(0, 216, 232, 0.6)",
                    "0 0 2px rgba(0, 216, 232, 0.2)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: 1,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.05
                }}
              />
            ))}
            
            {/* Glowing orbs in background for depth */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute rounded-full bg-neon-cyan/5"
                style={{
                  width: Math.random() * 200 + 100,
                  height: Math.random() * 200 + 100,
                  filter: "blur(40px)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: 1,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* 3D Animated Logo */}
          <motion.div 
            className="relative z-10 w-[80%] max-w-[500px]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ 
              scale: 1, 
              y: 0, 
              opacity: 1,
              rotateY: [0, 5, 0, -5, 0],
              rotateX: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            <div className="relative">
              {/* Shadow effect */}
              <motion.div
                className="absolute -bottom-4 left-0 right-0 mx-auto h-4 bg-neon-cyan/20 rounded-full filter blur-md"
                style={{ width: '90%' }}
                animate={{ 
                  opacity: [0.2, 0.6, 0.2],
                  width: ['80%', '90%', '80%']
                }}
                transition={{ duration: 2, repeat: 1, repeatType: "reverse" }}
              />
              
              {/* Logo with glow effect */}
              <motion.img 
                src={logoImage} 
                alt="DigiBooster Logo" 
                className="w-full h-auto object-contain relative z-10"
                style={{ 
                  filter: "drop-shadow(0 0 10px rgba(0, 216, 232, 0.5))",
                }}
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 5px rgba(0, 216, 232, 0.3))",
                    "drop-shadow(0 0 20px rgba(0, 216, 232, 0.7))",
                    "drop-shadow(0 0 5px rgba(0, 216, 232, 0.3))"
                  ]
                }}
                transition={{ duration: 2, repeat: 1, repeatType: "reverse" }}
              />
            </div>
          </motion.div>
          
          {/* Particles effect for exit animation */}
          <AnimatePresence>
            {showParticles && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full shatter-particle"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                      x: (Math.random() - 0.5) * window.innerWidth,
                      y: (Math.random() - 0.5) * window.innerHeight,
                      opacity: [0, 1, 0],
                      scale: [1, Math.random() * 3 + 1, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
