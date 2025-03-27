
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
    <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="bg-digiblue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-5">{description}</p>
      
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-digiblue-600 mr-2">•</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
