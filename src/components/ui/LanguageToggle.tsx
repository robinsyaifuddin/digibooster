
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useTheme } from '@/contexts/ThemeContext';

const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const [rotating, setRotating] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleClick = () => {
    setRotating(true);
    setTimeout(() => {
      toggleLanguage();
      setTimeout(() => {
        setRotating(false);
      }, 300);
    }, 300);
  };

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
              "relative h-9 w-9 rounded-full flex items-center justify-center cursor-pointer overflow-hidden",
              "transition-colors duration-300",
              theme === 'dark' 
                ? "bg-gradient-to-r from-dark-300 to-dark-400 border border-dark-300" 
                : "bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300"
            )}
            onClick={handleClick}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                rotate: rotating ? 360 : 0,
                scale: hovering ? 1.2 : 1
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="relative"
            >
              <Globe 
                className={cn(
                  "h-4 w-4 transition-colors",
                  theme === 'dark' ? "text-neon-cyan" : "text-digicyan-500"
                )} 
              />
              
              {/* Language indicator */}
              <motion.div 
                className={cn(
                  "absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-[8px] font-bold",
                  theme === 'dark' ? "text-neon-cyan" : "text-digicyan-600"
                )}
              >
                {language.toUpperCase()}
              </motion.div>
            </motion.div>
            
            {/* Background ripple effect */}
            {hovering && (
              <motion.div 
                className={cn(
                  "absolute inset-0 opacity-30 rounded-full",
                  theme === 'dark' 
                    ? "bg-neon-cyan animate-pulse-light" 
                    : "bg-digicyan-300"
                )}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{language === 'id' ? t('english') : t('indonesian')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LanguageToggle;
