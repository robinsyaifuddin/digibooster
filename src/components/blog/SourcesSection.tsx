
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Source } from '@/types/blogTypes';
import { motion } from 'framer-motion';

interface SourcesSectionProps {
  sources: Source[];
}

const SourcesSection = ({ sources }: SourcesSectionProps) => {
  const [expandSources, setExpandSources] = useState(false);

  if (!sources || sources.length === 0) {
    return null;
  }

  const displayedSources = expandSources ? sources : sources.slice(0, 3);
  const hasMoreSources = sources.length > 3;

  return (
    <motion.div 
      className="my-10 pb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-digicyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Sumber dan Referensi
      </h3>
      
      <div className="space-y-3 ml-6 text-sm">
        {displayedSources.map((source) => (
          <motion.div 
            key={source.id}
            className="border-l-2 border-digicyan/30 pl-4 py-1"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex text-gray-300 hover:text-digicyan"
            >
              <span className="flex-1">{source.text}</span>
              <ExternalLink className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        ))}
        
        {hasMoreSources && (
          <motion.button
            className="text-digicyan hover:underline text-sm ml-4 mt-2 flex items-center"
            onClick={() => setExpandSources(!expandSources)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {expandSources ? (
              "Tampilkan lebih sedikit"
            ) : (
              <>Lihat semua {sources.length} sumber</>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default SourcesSection;
