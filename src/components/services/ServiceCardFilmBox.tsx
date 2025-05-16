
import React from 'react';
import { Star, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ServiceCardFilmBoxProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  year?: string;
  category?: string;
  link?: string;
  slug?: string;
}

const ServiceCardFilmBox: React.FC<ServiceCardFilmBoxProps> = ({
  id,
  title,
  description,
  image,
  rating = 4.7,
  year = '2023',
  category = 'Premium',
  link = '#',
  slug
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="filmbox-card"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover filmbox-image"
        />
        <div className="filmbox-overlay"></div>
        
        <div className="absolute top-3 right-3 z-10">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="filmbox-icon-button w-8 h-8"
          >
            <Plus size={16} />
          </motion.button>
        </div>
        
        <div className="absolute bottom-0 left-0 p-4 z-10">
          <h3 className="text-lg font-bold mb-1 text-white">{title}</h3>
          
          <div className="flex items-center text-xs text-gray-300 mb-2">
            <div className="flex items-center mr-2">
              <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
              <span>{rating}</span>
            </div>
            <span className="mr-2">{year}</span>
            <span className="bg-sky-500/20 text-sky-400 text-xs px-2 py-0.5 rounded">
              {category}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">{description}</p>
          
          <Link 
            to={link} 
            className="group inline-flex items-center text-sky-400 hover:text-sky-300 text-xs font-medium"
          >
            Lihat Detail 
            <ChevronRight size={14} className="ml-1 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCardFilmBox;
