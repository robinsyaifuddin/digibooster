
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
      className="bg-dark-200 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group h-[28rem] flex flex-col"
    >
      <PortfolioImage 
        image={project.image}
        title={project.title}
        category={project.category}
        client={project.client}
      />
      
      <PortfolioItemDetails 
        id={project.id}
        description={project.description}
        services={project.services}
      />
    </motion.div>
  );
};

export default PortfolioItem;
