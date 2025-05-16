
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Play, Heart, Plus, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ServiceProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  rating: number;
  year: string;
  category: string;
}

const FeaturedServiceCard = ({ 
  id, 
  title, 
  description, 
  features, 
  image, 
  rating, 
  year, 
  category 
}: ServiceProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/services/${id}`);
  };

  return (
    <motion.div 
      className="featured-card h-[500px] md:h-[600px] w-full relative overflow-hidden glow-effect"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="featured-card-content z-10">
        {/* Top metadata */}
        <div className="flex items-center gap-3 mb-2">
          <span className="category-badge">{category}</span>
          <span className="text-sm text-gray-300">{year}</span>
        </div>
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{title}</h2>
        
        {/* Rating */}
        <div className="rating-stars mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < Math.floor(rating) ? "fill-yellow-500" : "text-gray-500"} 
            />
          ))}
          <span className="ml-2 text-white">{rating.toFixed(1)}</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4 max-w-2xl">
          {description}
        </p>
        
        {/* Features */}
        <div className="hidden md:flex flex-wrap gap-2 mb-6">
          {features.slice(0, 4).map((feature, idx) => (
            <span key={idx} className="text-sm text-sky-300 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              {feature}
            </span>
          ))}
          {features.length > 4 && (
            <span className="text-sm text-sky-300 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              +{features.length - 4} more
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            onClick={handleViewDetails} 
            size="lg"
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-full"
          >
            <Play className="mr-2 h-5 w-5" />
            View Details
          </Button>
          
          <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full border-gray-700 bg-black/50 hover:bg-sky-500/20 hover:border-sky-500"
          >
            <Plus className="h-5 w-5" />
          </Button>
          
          <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full border-gray-700 bg-black/50 hover:bg-sky-500/20 hover:border-sky-500"
          >
            <Info className="h-5 w-5" />
          </Button>
          
          <Button 
            size="icon" 
            variant="outline" 
            className="rounded-full border-gray-700 bg-black/50 hover:bg-sky-500/20 hover:border-sky-500"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedServiceCard;
