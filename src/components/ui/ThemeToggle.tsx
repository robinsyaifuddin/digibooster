
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [rotationY, setRotationY] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Animate to proper side when theme changes
    setRotationY(theme === 'dark' ? 0 : 180);
  }, [theme]);

  const handleHoverStart = () => {
    setHovering(true);
  };

  const handleHoverEnd = () => {
    setHovering(false);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={cn(
              "relative h-9 w-9 rounded-full flex items-center justify-center cursor-pointer",
              "bg-gradient-to-r transition-colors duration-300",
              theme === 'dark' 
                ? "from-dark-300 to-dark-400 border border-dark-300" 
                : "from-slate-100 to-slate-200 border border-slate-300"
            )}
            onClick={toggleTheme}
            animate={{ 
              rotateY: rotationY,
              scale: hovering ? 1.1 : 1 
            }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.7
            }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Decorative center element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className={cn(
                  "h-7 w-7 rounded-full",
                  "bg-gradient-to-br",
                  theme === 'dark' 
                    ? "from-dark-200 to-dark-400"
                    : "from-white to-slate-50"
                )}
              />
            </div>

            {/* Sun face */}
            <motion.div 
              className={cn(
                "absolute backface-hidden flex items-center justify-center",
                theme === 'light' ? "opacity-100" : "opacity-0"
              )}
              style={{ rotateY: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Sun className="h-4 w-4 text-amber-500" />
              {hovering && (
                <motion.div
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-1 w-1"
                      style={{
                        rotate: i * 60,
                        translateX: 10,
                      }}
                    >
                      <Sparkles className="h-2 w-2 text-amber-400" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Moon face */}
            <motion.div 
              className={cn(
                "absolute backface-hidden flex items-center justify-center",
                theme === 'dark' ? "opacity-100" : "opacity-0"
              )}
              transition={{ duration: 0.5 }}
            >
              <Moon className="h-4 w-4 text-neon-cyan" />
              {hovering && (
                <motion.div
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-1 w-1"
                      style={{
                        top: Math.sin(i * Math.PI / 2) * 8 - 2,
                        left: Math.cos(i * Math.PI / 2) * 8 - 2
                      }}
                    >
                      <span className="block h-1 w-1 rounded-full bg-neon-cyan animate-pulse-light" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{theme === 'dark' ? t('switch-to-light') : t('switch-to-dark')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
