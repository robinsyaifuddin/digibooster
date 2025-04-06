
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  duration?: number;
}

const SplashScreen = ({ duration = 3000 }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-dark"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut", 
              delay: 0.2 
            }}
            className="flex flex-col items-center justify-center"
          >
            <motion.img 
              src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" 
              alt="DigiBooster Logo" 
              className="w-48 md:w-64 mb-6"
              animate={{ 
                y: [0, -10, 0], 
                filter: ["drop-shadow(0 0 0px rgba(157, 23, 210, 0))", "drop-shadow(0 0 15px rgba(157, 23, 210, 0.8))", "drop-shadow(0 0 0px rgba(157, 23, 210, 0))"] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "loop" 
              }}
            />
            <motion.div 
              className="relative h-1.5 w-64 rounded-full overflow-hidden bg-dark-300"
              initial={{ width: 0 }}
              animate={{ width: "16rem" }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute h-full bg-gradient-to-r from-neon-purple to-neon-blue"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: duration / 1000 - 0.5, ease: "linear" }}
              />
            </motion.div>
            <motion.p 
              className="mt-4 text-neon-purple text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              DigiBooster
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
