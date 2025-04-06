
import React from 'react';
import { motion } from 'framer-motion';

export interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const ServiceCard = ({ icon, title, description, items }: ServiceProps) => {
  return (
    <div className="bg-dark-200 rounded-xl p-7 shadow-lg hover:shadow-xl transition-shadow border border-dark-400 relative overflow-hidden group">
      {/* Hover effect glow */}
      <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="bg-dark-300 w-16 h-16 rounded-lg flex items-center justify-center mb-6 border border-neon-purple/30 group-hover:border-neon-purple/60 transition-colors">
        <div className="text-neon-purple group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-5">{description}</p>
      
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-neon-purple mr-2">•</span>
            <span className="text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
