
import React from 'react';
import { motion } from 'framer-motion';

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
      className="cyberpunk-card p-7 relative overflow-hidden group"
    >
      {/* Background glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"></div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 bg-neon-cyan/20"></div>
      </div>
      
      {/* Icon container */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-dark-300 w-16 h-16 rounded-lg flex items-center justify-center mb-6 border border-neon-cyan/30 group-hover:border-neon-cyan/60 transition-colors relative z-10"
      >
        <div className="text-neon-cyan group-hover:scale-110 transition-transform">
          {icon}
        </div>
        
        {/* Inner glow */}
        <div className="absolute inset-0 bg-neon-cyan/5 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity"></div>
      </motion.div>
      
      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-shadow-neon transition-all">{title}</h3>
      <p className="text-gray-400 mb-5">{description}</p>
      
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
            <span className="text-neon-cyan mr-2 group-hover:animate-pulse">•</span>
            <span className="text-gray-300">{item}</span>
          </motion.li>
        ))}
      </ul>
      
      {/* Bottom accent line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default ServiceCard;
