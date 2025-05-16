
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  excerpt,
  image,
  date,
  category,
  link
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group filmbox-card h-full flex flex-col"
    >
      <div className="aspect-video overflow-hidden relative rounded-t-xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute top-2 md:top-3 left-2 md:left-3">
          <span className="bg-sky-500/90 text-white text-xs px-2 py-0.5 md:py-1 rounded-md">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-3 md:p-4 flex-grow flex flex-col">
        <div className="flex items-center text-xs md:text-sm text-gray-400 mb-1 md:mb-2">
          <Calendar size={isMobile ? 12 : 14} className="mr-1" />
          <span>{date}</span>
        </div>
        
        <h3 className="text-base md:text-lg font-bold mb-2 line-clamp-2 group-hover:text-sky-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          to={link} 
          className="mt-auto inline-flex items-center text-sky-400 hover:text-sky-300 text-xs md:text-sm group"
        >
          Selengkapnya 
          <ArrowRight size={isMobile ? 14 : 16} className="ml-1 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default NewsCard;
