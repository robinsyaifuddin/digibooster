
import React from 'react';

interface PortfolioServiceTagsProps {
  services: string[];
}

const PortfolioServiceTags = ({ services }: PortfolioServiceTagsProps) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-500 mb-2">Services:</h4>
      <div className="flex flex-wrap gap-2">
        {services.map((service, idx) => (
          <span 
            key={idx} 
            className="text-xs bg-digiblue-50 text-digiblue-700 px-2 py-1 rounded-full"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PortfolioServiceTags;
