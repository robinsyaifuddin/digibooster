
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
        
        <div className="absolute top-2 md:top-3 left-2 md:left-3">
          <span className="bg-sky-500/30 text-sky-400 text-xs px-2 py-0.5 md:py-1 rounded-md border border-sky-500/40 shadow-md backdrop-blur-sm">
            {category}
          </span>
        </div>
        
        <div className="absolute bottom-0 left-0 p-3 md:p-4 w-full bg-black/50 backdrop-blur-sm">
          <h3 className="text-base md:text-lg font-bold mb-1 text-white group-hover:text-sky-400 transition-colors line-clamp-1 drop-shadow-lg">{title}</h3>
          <p className="text-gray-300 text-xs md:text-sm line-clamp-2 mb-2 md:mb-3 drop-shadow-md">{description}</p>
          
          <Link 
            to={link} 
            className="inline-flex items-center text-sky-400 hover:text-sky-300 text-xs md:text-sm drop-shadow-md"
          >
            Lihat Project <ExternalLink size={isMobile ? 12 : 14} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedPortfolioCard;
