
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-gradient-to-b from-gray-900/40 to-black border border-gray-800 hover:border-sky-500/30 rounded-xl transition-all duration-300 h-full flex flex-col"
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} 
          />
        ))}
      </div>
      
      <p className="text-gray-300 mb-6 flex-grow">
        "{content}"
      </p>
      
      <div className="flex items-center mt-auto">
        <img 
          src={image} 
          alt={name} 
          className="w-10 h-10 rounded-full mr-3 border border-sky-500/30"
        />
        <div>
          <h4 className="font-medium text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
