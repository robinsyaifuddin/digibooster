
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ duration = 500 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.2 }
          }}
          className="fixed inset-0 z-50 overflow-hidden bg-dark"
        >
          {/* Main container for the splash animation */}
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Left curtain */}
            <motion.div
              className="absolute left-0 top-0 h-full w-1/2 bg-dark-300"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            
            {/* Right curtain */}
            <motion.div
              className="absolute right-0 top-0 h-full w-1/2 bg-dark-300"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Center cyberpunk content with battle effect */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center justify-center"
              >
                {/* Character 1 */}
                <motion.div 
                  className="absolute w-32 h-32 left-[-80px]"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-neon-cyan to-neon-blue rounded-lg shadow-[0_0_15px_rgba(0,216,232,0.8)]" />
                </motion.div>
                
                {/* Character 2 */}
                <motion.div 
                  className="absolute w-32 h-32 right-[-80px]"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
                </motion.div>
                
                {/* Collision effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.4, times: [0, 0.5, 1] }}
                  className="absolute z-20"
                >
                  {/* Shards effect - using multiple elements for shattered glass look */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        width: Math.random() * 30 + 10,
                        height: Math.random() * 30 + 10,
                        backgroundColor: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, 0.8)`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        top: Math.random() * 100 - 50,
                        left: Math.random() * 100 - 50,
                      }}
                      animate={{
                        x: Math.random() * 300 - 150,
                        y: Math.random() * 300 - 150,
                        opacity: [1, 0],
                        scale: [1, 0],
                      }}
                      transition={{ duration: 0.35 }}
                    />
                  ))}
                  
                  {/* Central glow */}
                  <div className="w-20 h-20 bg-white rounded-full blur-xl opacity-70" />
                </motion.div>
                
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue"
                >
                  DigiBooster
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
