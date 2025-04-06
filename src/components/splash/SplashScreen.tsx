
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import swordfightGif from '/lovable-uploads/63175a8a-8817-436e-8f8b-a3246a8bf733.png'; // Pastikan untuk mengganti dengan URL GIF yang benar

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, duration = 2500 }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Tampilkan efek flash setelah 1.5 detik
    const flashTimeout = setTimeout(() => {
      setShowFlash(true);
    }, 1500);

    // Hilangkan splash screen setelah durasi yang ditentukan
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
      setTimeout(onComplete, 300); // Berikan waktu untuk animasi exit
    }, duration);

    return () => {
      clearTimeout(splashTimeout);
      clearTimeout(flashTimeout);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Smoke effect overlay */}
          <div className="absolute inset-0 z-10">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent opacity-40"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
            
            {/* Animated fog/smoke particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5 backdrop-blur-md"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  opacity: [0, 0.1, 0],
                  scale: [0.1, Math.random() + 0.5, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Main content with sword fight animation */}
          <div className="relative z-20">
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={swordfightGif} 
                alt="Sword Fight" 
                className="max-w-full h-auto max-h-[60vh]" 
              />
              
              {/* Flash effect when swords collide */}
              <AnimatePresence>
                {showFlash && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, times: [0, 0.1, 1] }}
                    onAnimationComplete={() => setShowFlash(false)}
                  />
                )}
              </AnimatePresence>
              
              {/* Shatter effect particles */}
              <AnimatePresence>
                {showFlash && (
                  <>
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-neon-purple/80 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          boxShadow: '0 0 10px 2px rgba(166, 51, 255, 0.8), 0 0 20px 6px rgba(166, 51, 255, 0.6)'
                        }}
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: Math.random() * 400 - 200,
                          y: Math.random() * 400 - 200,
                          opacity: 0,
                          scale: [1, Math.random() * 3]
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Website title appearing during splash */}
          <motion.div 
            className="absolute bottom-10 left-0 w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-neon-purple glow-text">
              DigiBooster
            </h1>
            <p className="text-gray-400 mt-2">Transformasi Digital Untuk Semua</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
