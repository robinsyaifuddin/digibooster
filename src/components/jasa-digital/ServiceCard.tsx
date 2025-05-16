
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlayCircle, Star, Plus } from 'lucide-react';
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
      className="relative overflow-hidden rounded-2xl bg-black border border-gray-800 h-full group"
    >
      {/* Top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
      
      {/* Main content */}
      <div className="p-5 flex flex-col h-full relative z-20">
        {/* Top section with icon */}
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 rounded-lg bg-red-600/20 border border-red-600/30">
            {icon}
          </div>
          
          <button className="text-gray-400 hover:text-white">
            <Plus size={20} />
          </button>
        </div>
        
        {/* Title and description */}
        <h3 className="text-xl font-bold text-white mt-3 group-hover:text-red-500 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-3 mt-2 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-white">{formattedRating}</span>
          </div>
          <span className="text-gray-400">{year}</span>
        </div>
        
        <p className="mt-3 text-gray-400 text-sm line-clamp-2">
          {description}
        </p>
        
        {/* Features */}
        <div className="mt-4 flex-grow">
          <ul className="space-y-1">
            {items.slice(0, 3).map((item, idx) => (
              <li key={idx} className="text-xs text-gray-400 flex items-start">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bottom action */}
        <div className="mt-4 pt-2 border-t border-gray-800">
          <Button 
            onClick={handleOrder}
            variant="ghost"
            className="w-full justify-center bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/30 group"
          >
            <PlayCircle className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            Order Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
