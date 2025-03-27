
import React from 'react';
import { ExternalLink } from 'lucide-react';
import PortfolioServiceTags from './PortfolioServiceTags';

interface PortfolioItemDetailsProps {
  description: string;
  services: string[];
}

const PortfolioItemDetails = ({ description, services }: PortfolioItemDetailsProps) => {
  return (
    <div className="p-6">
      <p className="text-gray-600 mb-4">{description}</p>
      
      <PortfolioServiceTags services={services} />
      
      <button className="inline-flex items-center text-digiblue-600 hover:text-digiblue-800 font-medium">
        Lihat Detail 
        <ExternalLink className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

export default PortfolioItemDetails;
