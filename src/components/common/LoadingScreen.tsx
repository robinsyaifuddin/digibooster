
import React from 'react';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const LoadingScreen: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[50vh]",
      theme === 'dark' ? "text-white" : "text-gray-800"
    )}>
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { 
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          },
          scale: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
      >
        <Loader size={40} className={cn(
          theme === 'dark' ? "text-neon-cyan" : "text-digicyan"
        )} />
      </motion.div>
      
      <motion.p 
        className="mt-4 text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
