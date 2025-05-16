
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface FeaturedPortfolioCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const FeaturedPortfolioCard: React.FC<FeaturedPortfolioCardProps> = ({
  id,
  title,
  description,
  image,
  category,
  link
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group filmbox-card h-full"
    >
      <div className="aspect-video overflow-hidden rounded-xl relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>
        
        <div className="absolute top-3 left-3">
          <span className="bg-sky-500/20 text-sky-400 text-xs px-2 py-1 rounded-md border border-sky-500/30">
            {category}
          </span>
        </div>
        
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold mb-1 text-white group-hover:text-sky-400 transition-colors">{title}</h3>
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{description}</p>
          
          <Link 
            to={link} 
            className="inline-flex items-center text-sky-400 hover:text-sky-300 text-sm"
          >
            Lihat Project <ExternalLink size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedPortfolioCard;
