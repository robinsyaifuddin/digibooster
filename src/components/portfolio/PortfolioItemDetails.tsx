
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
    <div className="p-6">
      <p className="text-white mb-4">{description}</p>
      
      <PortfolioServiceTags services={services} />
      
      <Link 
        to={`/portofolio/${id}`} 
        className="inline-flex items-center text-digicyan hover:text-digicyan-300 font-medium transition-colors"
      >
        Lihat Detail 
        <ExternalLink className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};

export default PortfolioItemDetails;
