
import React from 'react';
import { motion } from 'framer-motion';
import { ClassCard } from './ClassCard';
import { Class } from '@/types/classTypes';

interface ClassGridProps {
  classes: Class[];
}

const ClassGrid = ({ classes }: ClassGridProps) => {
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
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
    >
      {classes.map((classItem, index) => (
        <motion.div key={index} variants={item}>
          <ClassCard 
            id={classItem.id || `class-${index}`} // Adding id prop with fallback
            title={classItem.title}
            image={`/lovable-uploads/placeholder.jpg`} // Default image path, update according to your actual data structure
            duration={classItem.details.duration}
            level={classItem.details.level}
            rating={4.5} // Default rating, update according to your actual data structure
            price="Rp 499.000" // Default price, update according to your actual data structure
            featured={index === 0} // Optional: marking first item as featured
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ClassGrid;
