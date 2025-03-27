
import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioItemType } from '@/types/portfolioTypes';
import PortfolioImage from './PortfolioImage';
import PortfolioItemDetails from './PortfolioItemDetails';

interface PortfolioItemProps {
  project: PortfolioItemType;
}

const PortfolioItem = ({ project }: PortfolioItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
    >
      <PortfolioImage 
        image={project.image}
        title={project.title}
        category={project.category}
        client={project.client}
      />
      
      <PortfolioItemDetails 
        description={project.description}
        services={project.services}
      />
    </motion.div>
  );
};

export default PortfolioItem;
