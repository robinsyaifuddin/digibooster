
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ServiceItem } from '@/types/websiteTypes';

export interface ServiceCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  link?: string;
  animated?: boolean;
  service?: ServiceItem;
  index?: number;
  isActive?: boolean;
  onClick?: () => void;
}

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  color = "sky-500", 
  link = "#",
  animated = true,
  service,
  isActive,
  onClick
}: ServiceCardProps) => {
  
  // Use service object properties if service is provided, otherwise use direct props
  const displayTitle = service ? service.title : title;
  const displayDescription = service ? service.description : description;
  const displayIcon = service ? service.icon : icon;
  const displayLink = service ? service.link : link;
  
  const cardVariants = {
    initial: { 
      y: 20,
      opacity: 0 
    },
    animate: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: { 
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const content = (
    <div 
      className={`h-full bg-gray-900 border border-gray-800 rounded-xl overflow-hidden p-6 group transition-all duration-300 hover:border-${color} ${isActive ? 'ring-2 ring-sky-500/50' : ''}`}
      onClick={onClick}
    >
      <div className={`p-3 inline-block rounded-xl bg-${color}/10 mb-4`}>
        {displayIcon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-sky-400 transition-colors">
        {displayTitle}
      </h3>
      
      <p className="text-gray-400 mb-5 line-clamp-3">
        {displayDescription}
      </p>
      
      <Button 
        variant="link"
        className={`p-0 text-${color} group-hover:translate-x-1 transition-transform flex items-center`}
        asChild
      >
        <a href={displayLink}>
          Pelajari lebih lanjut
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </Button>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        className="h-full"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {content}
      </motion.div>
    );
  }

  return <div className="h-full">{content}</div>;
};

export default ServiceCard;
