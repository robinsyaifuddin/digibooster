
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard, { ServiceProps } from './ServiceCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesGridProps {
  services: ServiceProps[];
}

const ServicesGrid = ({ services }: ServicesGridProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
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
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div id="services-section" className="relative py-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">DigiBooster Services</h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-700 text-white hover:bg-red-600/20 hover:border-red-600"
            onClick={prevPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-sm text-gray-400">
            <span className="text-white">{currentPage + 1}</span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-gray-700 text-white hover:bg-red-600/20 hover:border-red-600"
            onClick={nextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {currentServices.map((service, index) => (
          <motion.div
            key={index}
            variants={item}
            className="h-full"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ServiceCard 
              icon={service.icon}
              title={service.title}
              description={service.description}
              items={service.items}
              rating={4 + Math.random()}
              year={`20${20 + Math.floor(Math.random() * 4)}`}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Pagination indicators */}
      <div className="flex justify-center gap-1">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentPage ? "w-6 bg-red-600" : "w-1.5 bg-gray-600"
            }`}
            aria-label={`Page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
