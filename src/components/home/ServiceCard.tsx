
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool, DollarSign, Shield, Gift, LayoutGrid, Megaphone, FileText, FileCog, BookOpen, MessagesSquare, GraduationCap, Camera, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
}

const ServiceCard = ({
  service,
  index,
  isActive = false,
  onClick
}: ServiceCardProps) => {
  const { t } = useLanguage();
  
  const getIconComponent = (iconName: string) => {
    const iconClass = "h-8 w-8 text-primary";
    switch (iconName) {
      case 'Code':
        return <Code className={iconClass} />;
      case 'Lightbulb':
        return <Lightbulb className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'PenTool':
        return <PenTool className={iconClass} />;
      case 'DollarSign':
        return <DollarSign className={iconClass} />;
      case 'Shield':
        return <Shield className={iconClass} />;
      case 'Gift':
        return <Gift className={iconClass} />;
      case 'LayoutGrid':
        return <LayoutGrid className={iconClass} />;
      case 'Megaphone':
        return <Megaphone className={iconClass} />;
      case 'FileText':
        return <FileText className={iconClass} />;
      case 'FileCog':
        return <FileCog className={iconClass} />;
      case 'BookOpen':
        return <BookOpen className={iconClass} />;
      case 'MessagesSquare':
        return <MessagesSquare className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Camera':
        return <Camera className={iconClass} />;
      case 'Share2':
        return <Share2 className={iconClass} />;
      default:
        return <Code className={iconClass} />;
    }
  };
  
  return (
    <motion.div 
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 h-full",
        isActive ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30" : "bg-card/80 border border-card-foreground/10 hover:border-primary/20"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      style={{ 
        minHeight: '280px',
        maxWidth: isActive ? '100%' : '280px'
      }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
      
      {/* Card content */}
      <div className="p-6 z-10 relative h-full flex flex-col">
        <div className="mb-4 p-3 rounded-lg bg-primary/10 inline-block">
          {getIconComponent(service.icon)}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white">
          {service.title}
        </h3>
        
        <div className={cn(
          "transition-all duration-300",
          isActive ? "opacity-100" : "opacity-80 line-clamp-3"
        )}>
          <p className="text-gray-300 mb-4">
            {service.description}
          </p>
          
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3"
            >
              <Link 
                to={service.link} 
                className="inline-flex items-center text-primary hover:text-white transition-colors group mt-auto"
              >
                <span>{t('learn-more')}</span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Glowing accent */}
      <div className={cn(
        "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/20",
        isActive ? "w-full" : "w-1/3"
      )}></div>
    </motion.div>
  );
};

export default ServiceCard;
