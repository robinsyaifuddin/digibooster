
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const ServiceCard = ({ icon, title, description, items }: ServiceProps) => {
  return (
    <motion.div
      whileHover={{ translateY: -8 }}
      transition={{ duration: 0.3 }}
      className="p-7 relative overflow-hidden group cyberpunk-card"
    >
      {/* Background glow effect */}
      <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 bg-gradient-to-r from-primary/5 to-primary/5"></div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 bg-primary/20"></div>
      </div>
      
      {/* Icon container */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 relative z-10 bg-secondary/80 border border-primary/30 group-hover:border-primary/60"
      >
        <div className="group-hover:scale-110 transition-transform text-primary">
          {icon}
        </div>
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity bg-primary/5"></div>
      </motion.div>
      
      {/* Content */}
      <h3 className="text-xl font-bold mb-3 group-hover:transition-all text-card-foreground group-hover:text-shadow-neon">
        {title}
      </h3>
      <p className="mb-5 text-muted-foreground">
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
            <span className="mr-2 group-hover:animate-pulse text-primary">•</span>
            <span className="text-card-foreground/80">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
      
      {/* Bottom accent line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/70"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default ServiceCard;
