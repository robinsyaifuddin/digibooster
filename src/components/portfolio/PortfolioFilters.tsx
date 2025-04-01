
import React from 'react';
import { motion } from 'framer-motion';

interface PortfolioFiltersProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const PortfolioFilters = ({ filters, activeFilter, onFilterChange }: PortfolioFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map((filter, index) => (
        <motion.button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
            activeFilter === filter
              ? "bg-cyber-primary text-white shadow-neon-purple"
              : "bg-cyber-darker/70 text-white/70 hover:text-white border border-cyber-primary/30 hover:border-cyber-primary/60"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">{filter}</span>
          
          {/* Hover effect background */}
          <span className="absolute inset-0 bg-cyber-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"></span>
          
          {/* Active indicator */}
          {activeFilter === filter && (
            <motion.span 
              className="absolute bottom-0 left-0 h-0.5 w-full bg-cyber-accent" 
              layoutId="activeFilterIndicator"
            ></motion.span>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
