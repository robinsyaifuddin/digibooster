
import React from 'react';

interface PortfolioImageProps {
  image: string;
  title: string;
  category: string;
  client: string;
}

const PortfolioImage = ({ image, title, category, client }: PortfolioImageProps) => {
  return (
    <div className="relative overflow-hidden h-64">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
        <div className="p-6 w-full bg-black/40 backdrop-blur-sm rounded-t-lg">
          <span className="text-xs font-medium text-digiblue-300 bg-digiblue-900/60 px-2 py-1 rounded-full">
            {category}
          </span>
          <h3 className="text-xl font-bold text-white mt-2 line-clamp-1 drop-shadow-lg">{title}</h3>
          <p className="text-gray-300 text-sm drop-shadow-md">{client}</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioImage;
