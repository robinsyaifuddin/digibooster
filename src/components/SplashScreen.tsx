
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSplashScreen } from '@/contexts/SplashScreenContext';

interface SplashScreenProps {
  duration?: number;
}

const SplashScreen = ({ duration = 1500 }: SplashScreenProps) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  const { hideSplash } = useSplashScreen();
  
  useEffect(() => {
    // Show particles effect before hiding the splash
    const particlesTimer = setTimeout(() => {
      setShowParticles(true);
    }, duration - 800);
    
    // Hide splash after duration
    const hideTimer = setTimeout(() => {
      setShowAnimation(false);
      setTimeout(() => {
        hideSplash();
      }, 600); // Give time for exit animation
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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] bg-black w-screen h-screen"
        >
          {/* Background smoke effect */}
          <div className="absolute inset-0 overflow-hidden w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`smoke-${i}`}
                className="absolute rounded-full smoke-particle"
                style={{
                  width: Math.random() * 300 + 100,
                  height: Math.random() * 300 + 100,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0.2, scale: 0.8 }}
                animate={{ 
                  opacity: [0.2, 0.3, 0.2],
                  scale: [0.8, 1, 0.8],
                  x: Math.random() * 40 - 20,
                  y: Math.random() * 40 - 20,
                }}
                transition={{ 
                  duration: Math.random() * 5 + 3, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              />
            ))}
          </div>

          {/* Main GIF container - full screen sizing */}
          <motion.div
            className="absolute inset-0 z-10 w-full h-full flex items-center justify-center bg-black"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* GIF with full screen coverage */}
            <div className="w-full h-full relative overflow-hidden">
              <img 
                src="https://i.gifer.com/3UsO.gif" 
                alt="Cyberpunk Animation" 
                className="object-cover w-full h-full"
              />
              
              {/* Black overlay to make the GIF blend with the background */}
              <div className="absolute inset-0 bg-black/50 mix-blend-overlay"></div>
              
              {/* Logo overlay */}
              <motion.div
                className="absolute bottom-10 left-0 w-full text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-neon-purple glow-text">
                  DigiBooster
                </h1>
                <p className="text-gray-400 mt-2">Transformasi Digital Untuk Semua</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Smoke/fire particle effects for exit animation */}
          <AnimatePresence>
            {showParticles && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                {[...Array(40)].map((_, i) => (
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
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />
                ))}
                
                {/* Flash effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
