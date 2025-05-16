
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Play, Heart, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  year: string;
  category: string;
}

const ServiceCard = ({ id, title, description, image, rating, year, category }: ServiceCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/services/${id}`);
  };

  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden h-72 glow-effect"
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* Top Section with Rating & Category */}
        <div className="flex justify-between items-start">
          <div className="flex gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-white">{rating.toFixed(1)}</span>
          </div>
          
          <span className="category-badge">{category}</span>
        </div>
        
        {/* Bottom Section with Title & Actions */}
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{year}</span>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-3 py-0 h-8"
                onClick={handleViewDetails}
              >
                <Play className="mr-1 h-3 w-3" />
                Details
              </Button>
              
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-sky-500/20"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
