
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface ClassCardProps {
  id: string;
  title: string;
  image: string;
  duration: string;
  level: string;
  rating: number;
  price: string;
  featured?: boolean;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  id,
  title,
  image,
  duration,
  level,
  rating,
  price,
  featured = false
}) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/kelas/${id}`);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900/80 rounded-xl overflow-hidden flex flex-col h-full border border-gray-800 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5 transition-all"
    >
      {/* Image container */}
      <div className="h-40 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
        
        {/* Featured badge */}
        {featured && (
          <Badge className="absolute top-2 right-2 bg-sky-500 hover:bg-sky-600">
            Featured
          </Badge>
        )}
        
        {/* Rating */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md">
          <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
          <span className="text-xs font-medium text-white">{rating.toFixed(1)}</span>
        </div>
        
        {/* Level badge */}
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="text-xs border-gray-700 bg-black/50">
            {level}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-white mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-400 mb-1">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          <span>{duration}</span>
        </div>
        
        <div className="mt-auto">
          <div className="text-sky-400 font-semibold mb-3">{price}</div>
          
          <Button 
            size="sm" 
            className="w-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center gap-1"
            onClick={handleViewDetails}
          >
            <span>Detail Kelas</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
