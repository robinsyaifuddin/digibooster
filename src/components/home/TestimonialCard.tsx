
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestimonialCardProps {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  id,
  name,
  role,
  content,
  image,
  rating
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-4 md:p-6 bg-gradient-to-b from-gray-900/40 to-black border border-gray-800 hover:border-sky-500/30 rounded-xl transition-all duration-300 h-full flex flex-col"
    >
      <div className="flex items-center mb-3 md:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={isMobile ? 12 : 14} 
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} 
          />
        ))}
      </div>
      
      <p className="text-gray-300 mb-4 md:mb-6 flex-grow text-sm md:text-base line-clamp-4 md:line-clamp-6">
        "{content}"
      </p>
      
      <div className="flex items-center mt-auto">
        <img 
          src={image} 
          alt={name} 
          className="w-5 h-5 md:w-6 md:h-6 rounded-full mr-2 border border-sky-500/30"
        />
        <div>
          <h4 className="font-medium text-white text-xs md:text-sm">{name}</h4>
          <p className="text-gray-400 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
