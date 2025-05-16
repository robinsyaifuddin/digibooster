
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool, DollarSign, Shield, Gift, LayoutGrid, Megaphone, FileText, FileCog, BookOpen, MessagesSquare, GraduationCap, Camera, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
    const iconClass = cn(
      "transition-all duration-300",
      isActive ? "h-12 w-12" : "h-8 w-8", 
      "text-primary"
    );
    
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
        "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 h-full group",
        isActive 
          ? "bg-gradient-to-br from-primary/30 to-dark-400/90 border border-primary/60 shadow-[0_0_30px_rgba(0,216,232,0.6)]" 
          : "bg-dark-300/50 border border-primary/10 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(0,216,232,0.3)]"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      style={{ 
        minHeight: isActive ? '320px' : '280px',
        width: isActive ? '100%' : '100%',
        maxWidth: isActive ? '640px' : '320px',
        backdropFilter: 'blur(10px)',
        transform: isActive ? 'translateZ(50px)' : 'translateZ(0)',
        boxShadow: isActive 
          ? '0 15px 35px rgba(0, 216, 232, 0.3), 0 0 30px rgba(0, 216, 232, 0.5)' 
          : '0 5px 15px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Enhanced glow effects */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(0,216,232,0.4),transparent_80%)]"></div>
      
      {/* Improved glass overlay effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-40",
        isActive ? "from-primary/20 to-transparent" : "from-dark-300/50 to-transparent"
      )}></div>

      {/* Card content with improved spacing and animations */}
      <div className="p-6 z-10 relative h-full flex flex-col">
        <div className={cn(
          "mb-4 p-4 rounded-xl bg-gradient-to-br from-primary/30 to-dark-300/70 inline-block border border-primary/30 group-hover:border-primary/60 transition-all duration-300",
          isActive ? "scale-110" : ""
        )}>
          {getIconComponent(service.icon)}
        </div>
        
        <h3 className={cn(
          "font-bold mb-3 text-white group-hover:text-primary transition-colors",
          isActive ? "text-2xl" : "text-lg"
        )}>
          {service.title}
        </h3>
        
        <div className={cn(
          "transition-all duration-500",
          isActive ? "opacity-100" : "opacity-80 line-clamp-3"
        )}>
          <p className={cn(
            "text-gray-300 mb-4 group-hover:text-gray-200 transition-colors",
            isActive ? "text-base" : "text-sm"
          )}>
            {service.description}
          </p>
          
          {isActive ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <Link 
                to={service.link} 
                className="inline-flex items-center text-primary hover:text-white bg-primary/20 px-5 py-2.5 rounded-lg border border-primary/40 hover:border-primary/70 hover:bg-primary/30 transition-all group mt-auto"
              >
                <span>{t('learn-more')}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ) : (
            <div className="mt-auto pt-2">
              <Link to={service.link}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-white hover:bg-primary/20 p-0 h-auto text-xs font-medium flex items-center"
                >
                  {t('learn-more')}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced glowing accents */}
      <div className={cn(
        "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/10",
        isActive ? "w-full" : "w-1/3 group-hover:w-2/3 transition-all duration-500"
      )}></div>
      
      {/* Top accent */}
      <div className={cn(
        "absolute top-0 right-0 h-1 bg-gradient-to-l from-primary via-primary/80 to-primary/10",
        isActive ? "w-full" : "w-1/3 group-hover:w-2/3 transition-all duration-500"
      )}></div>
      
      {/* Enhanced corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className={cn(
          "absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 bg-gradient-to-br",
          isActive ? "from-primary/70 to-transparent" : "from-primary/40 to-transparent"
        )}></div>
      </div>

      {/* Enhanced side glow effect when active */}
      {isActive && (
        <>
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-32 bg-primary/30 blur-xl"></div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-32 bg-primary/30 blur-xl"></div>
          
          {/* Special highlight for active card */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
        </>
      )}
    </motion.div>
  );
};

export default ServiceCard;
