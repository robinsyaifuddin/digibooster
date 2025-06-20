
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioServiceTags from './PortfolioServiceTags';

interface PortfolioItemDetailsProps {
  id: number;
  description: string;
  services: string[];
}

const PortfolioItemDetails = ({ id, description, services }: PortfolioItemDetailsProps) => {
  return (
    <div className="p-6 h-48 flex flex-col justify-between bg-dark-200 bg-opacity-90 backdrop-blur-sm">
      <p className="text-white mb-4 line-clamp-2 drop-shadow-lg">{description}</p>
      
      <div className="mt-auto">
        <PortfolioServiceTags services={services} />
        
        <Link 
          to={`/portofolio/${id}`} 
          className="inline-flex items-center text-digicyan hover:text-digicyan-300 font-medium transition-colors mt-3 drop-shadow-lg"
        >
          Lihat Detail 
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioItemDetails;
