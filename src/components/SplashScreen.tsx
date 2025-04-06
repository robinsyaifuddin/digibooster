
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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] w-full h-full"
        >
          {/* Full screen GIF background */}
          <div className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full">
              <img 
                src="https://i.gifer.com/3UsO.gif" 
                alt="Cyberpunk Animation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </div>

          {/* Logo overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neon-purple glow-text">
              DigiBooster
            </h1>
            <p className="text-gray-300 mt-2">Transformasi Digital Untuk Semua</p>
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
