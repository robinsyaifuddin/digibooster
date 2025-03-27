
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { PortfolioItemType } from '@/types/portfolioTypes';

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
      <div className="relative overflow-hidden h-64">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6">
            <span className="text-xs font-medium text-digiblue-300 bg-digiblue-900/40 px-2 py-1 rounded-full">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-2">{project.title}</h3>
            <p className="text-gray-300 text-sm">{project.client}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Services:</h4>
          <div className="flex flex-wrap gap-2">
            {project.services.map((service, idx) => (
              <span 
                key={idx} 
                className="text-xs bg-digiblue-50 text-digiblue-700 px-2 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        
        <button className="inline-flex items-center text-digiblue-600 hover:text-digiblue-800 font-medium">
          Lihat Detail 
          <ExternalLink className="ml-2 h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;
