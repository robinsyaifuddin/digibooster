
import React from 'react';
import { motion } from 'framer-motion';

interface PartnerCardProps {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({
  id,
  name,
  logo,
  description
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-3 md:p-4 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-sky-500/30 transition-all duration-300"
    >
      <div className="aspect-video flex items-center justify-center p-2 md:p-4 bg-black/30 rounded-lg mb-2 md:mb-3">
        <img 
          src={logo} 
          alt={name} 
          className="max-h-12 md:max-h-16 max-w-full object-contain filter brightness-100 hover:brightness-110 transition-all"
        />
      </div>
      
      {description && (
        <div className="text-center">
          <h3 className="text-xs md:text-sm font-medium text-white">{name}</h3>
          <p className="text-xs text-gray-400 mt-0.5 md:mt-1 line-clamp-2">{description}</p>
        </div>
      )}
    </motion.div>
  );
};

export default PartnerCard;
