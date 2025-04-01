
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
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter
              ? "bg-digiblue-600 text-white shadow-md transform -translate-y-0.5"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
