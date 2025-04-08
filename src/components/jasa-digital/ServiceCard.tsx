
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const ServiceCard = ({ icon, title, description, items }: ServiceProps) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      whileHover={{ translateY: -8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "p-7 relative overflow-hidden group",
        theme === 'light' ? "card-3d-light" : "cyberpunk-card"
      )}
    >
      {/* Background glow effect */}
      <div className={cn(
        "absolute -inset-1 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300",
        theme === 'light' 
          ? "bg-gradient-to-r from-digicyan-100 to-digicyan-200/50" 
          : "bg-gradient-to-r from-primary/5 to-primary/5"
      )}></div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className={cn(
          "absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16",
          theme === 'light' ? "bg-digicyan-200/30" : "bg-primary/20"
        )}></div>
      </div>
      
      {/* Icon container */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "w-16 h-16 rounded-lg flex items-center justify-center mb-6 relative z-10",
          theme === 'light' 
            ? "bg-white shadow-md border border-digicyan-200/50 group-hover:border-digicyan-300/80" 
            : "bg-secondary/80 border border-primary/30 group-hover:border-primary/60"
        )}
      >
        <div className={cn(
          "group-hover:scale-110 transition-transform",
          theme === 'light' ? "text-digicyan-500" : "text-primary"
        )}>
          {icon}
        </div>
        
        {/* Inner glow */}
        <div className={cn(
          "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity",
          theme === 'light' ? "bg-digicyan-100/20" : "bg-primary/5"
        )}></div>
      </motion.div>
      
      {/* Content */}
      <h3 className={cn(
        "text-xl font-bold mb-3 group-hover:transition-all",
        theme === 'light' 
          ? "text-gray-800 group-hover:text-digicyan-700" 
          : "text-card-foreground group-hover:text-shadow-neon"
      )}>
        {title}
      </h3>
      <p className={cn(
        "mb-5",
        theme === 'light' ? "text-gray-600" : "text-muted-foreground"
      )}>
        {description}
      </p>
      
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <motion.li 
            key={idx} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
            className="flex items-start"
          >
            <span className={cn(
              "mr-2 group-hover:animate-pulse",
              theme === 'light' ? "text-digicyan-500" : "text-primary"
            )}>•</span>
            <span className={cn(
              theme === 'light' ? "text-gray-700" : "text-card-foreground/80"
            )}>
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
      
      {/* Bottom accent line */}
      <motion.div 
        className={cn(
          "absolute bottom-0 left-0 h-1",
          theme === 'light' 
            ? "bg-gradient-to-r from-digicyan-400 to-digicyan-300/70" 
            : "bg-gradient-to-r from-primary to-primary/70"
        )}
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default ServiceCard;
