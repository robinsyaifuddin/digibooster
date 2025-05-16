
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgramCard, { ProgramProps } from './ProgramCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgramsGridProps {
  programs: ProgramProps[];
}

const ProgramsGrid = ({ programs }: ProgramsGridProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(programs.length / itemsPerPage);
  
  const currentPrograms = programs.slice(
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
    <div id="programs-section" className="relative py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Program Motivasi & Edukasi</h2>
          <p className="text-gray-400 mt-2">Program edukasi terbaik untuk pengembangan skill digital Anda</p>
        </div>
        
        <div className="flex items-center gap-2">
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
          
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-sky-500/20 hover:border-sky-500"
              onClick={prevPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-sky-500/20 hover:border-sky-500"
              onClick={nextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {currentPrograms.map((program, index) => (
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
            <ProgramCard 
              icon={program.icon}
              title={program.title}
              description={program.description}
              features={program.features}
              rating={4 + Math.random()}
              duration={program.duration || "4 minggu"}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProgramsGrid;
