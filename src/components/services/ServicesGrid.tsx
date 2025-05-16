
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesGridProps {
  services: any[];
  title: string;
  subtitle?: string;
}

const ServicesGrid = ({ services, title, subtitle }: ServicesGridProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(services.length / itemsPerPage);
  
  const currentServices = services.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="section-heading">{title}</h2>
          {subtitle && <p className="text-gray-400 mt-2">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full p-1">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentPage ? "w-8 bg-sky-500" : "w-2 bg-gray-600"
                }`}
                aria-label={`Page ${idx + 1}`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-sky-500/20 hover:border-sky-500"
              onClick={prevPage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-sky-500/20 hover:border-sky-500"
              onClick={nextPage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ServiceCard
              id={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              rating={service.rating}
              year={service.year}
              category={service.category}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 w-2 rounded-full transition-all ${
                idx === currentPage ? "bg-sky-500 scale-150" : "bg-gray-600"
              }`}
              aria-label={`Page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;
