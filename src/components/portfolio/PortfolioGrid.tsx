
import React from 'react';
import { motion } from 'framer-motion';
import PortfolioItem from './PortfolioItem';
import { PortfolioItemType } from '@/types/portfolioTypes';

interface PortfolioGridProps {
  items: PortfolioItemType[];
}

const PortfolioGrid = ({ items }: PortfolioGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
    >
      {items.map((project) => (
        <PortfolioItem key={project.id} project={project} />
      ))}
    </motion.div>
  );
};

export default PortfolioGrid;
