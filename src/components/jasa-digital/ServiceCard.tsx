
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayCircle, Star, Plus, Heart, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  rating?: number;
  year?: string;
}

const ServiceCard = ({ icon, title, description, items, rating = 4.5, year = "2023" }: ServiceProps) => {
  const navigate = useNavigate();
  
  const handleOrder = () => {
    navigate(`/order-form?service=${encodeURIComponent(title)}`);
  };

  // Format rating to have one decimal place
  const formattedRating = rating.toFixed(1);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl h-full group"
    >
      {/* Card background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
      
      {/* Red accent shape */}
      <div className="absolute -right-10 top-0 bottom-0 w-2/3 bg-red-600/30 rounded-full blur-3xl z-0"></div>
      
      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col p-5">
        {/* Top section with icon and actions */}
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-xl bg-red-600/20 border border-red-600/30">
            {icon}
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors">
              <Info size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors">
              <Heart size={18} />
            </button>
          </div>
        </div>
        
        {/* Title and metadata */}
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-3 mb-3 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-white">{formattedRating}</span>
          </div>
          <span className="text-gray-400">{year}</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-600/20 border border-red-600/30 text-red-400">Premium</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
          {description}
        </p>
        
        {/* Features/Items */}
        <div className="flex-grow mb-4">
          <ul className="space-y-2">
            {items.slice(0, 3).map((item, idx) => (
              <li key={idx} className="text-xs text-gray-400 flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                {item}
              </li>
            ))}
            {items.length > 3 && (
              <li className="text-xs text-red-400 cursor-pointer hover:text-red-300 transition-colors">
                +{items.length - 3} more features
              </li>
            )}
          </ul>
        </div>
        
        {/* Action button */}
        <Button 
          onClick={handleOrder}
          className="w-full justify-center bg-red-600 hover:bg-red-700 text-white border-0 font-medium transition-all duration-300 py-5"
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          Order Now
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
