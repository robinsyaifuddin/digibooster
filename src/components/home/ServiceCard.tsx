
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool, DollarSign, Shield, Gift, LayoutGrid, Megaphone, FileText, FileCog, BookOpen, MessagesSquare, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { theme } = useTheme();
  
  const getIconComponent = (iconName: string) => {
    const iconClass = theme === 'dark' ? "h-6 w-6 text-neon-cyan" : "h-6 w-6 text-digicyan-500";
    
    switch (iconName) {
      case 'Code': return <Code className={iconClass} />;
      case 'Lightbulb': return <Lightbulb className={iconClass} />;
      case 'Users': return <Users className={iconClass} />;
      case 'PenTool': return <PenTool className={iconClass} />;
      case 'DollarSign': return <DollarSign className={iconClass} />;
      case 'Shield': return <Shield className={iconClass} />;
      case 'Gift': return <Gift className={iconClass} />;
      case 'LayoutGrid': return <LayoutGrid className={iconClass} />;
      case 'Megaphone': return <Megaphone className={iconClass} />;
      case 'FileText': return <FileText className={iconClass} />;
      case 'FileCog': return <FileCog className={iconClass} />;
      case 'BookOpen': return <BookOpen className={iconClass} />;
      case 'MessagesSquare': return <MessagesSquare className={iconClass} />;
      case 'GraduationCap': return <GraduationCap className={iconClass} />;
      default: return <Code className={iconClass} />;
    }
  };

  const darkCardStyle = {
    background: "linear-gradient(145deg, rgba(11, 20, 38, 0.95), rgba(7, 14, 30, 0.98))"
  };
  
  const lightCardStyle = {
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.98))"
  };

  return (
    <div 
      className={cn(
        "backdrop-blur-md rounded-lg overflow-hidden relative transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 scroll-animation",
        theme === 'dark' 
          ? "bg-dark-900/80 border border-neon-cyan/20 hover:shadow-neon-cyan/10" 
          : "bg-white border border-digicyan-200/40 hover:shadow-digicyan-300/10"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        ...(theme === 'dark' ? darkCardStyle : lightCardStyle)
      }}
    >
      {/* Accent corner */}
      <div className={cn(
        "absolute top-0 right-0 w-16 h-16",
        theme === 'dark' 
          ? "bg-gradient-to-bl from-neon-cyan/20 to-transparent" 
          : "bg-gradient-to-bl from-digicyan-300/20 to-transparent"
      )}></div>
      
      <div className="flex flex-col h-full p-7">
        <div className="mb-5">
          <div className={cn(
            "w-14 h-14 rounded-lg flex items-center justify-center",
            theme === 'dark' 
              ? "bg-dark-800/80 border border-neon-cyan/20" 
              : "bg-gray-50 border border-digicyan-200/30"
          )}>
            {getIconComponent(service.icon)}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        
        <p className={cn(
          "mb-6 flex-grow",
          theme === 'dark' ? "text-gray-300" : "text-gray-600"
        )}>{service.description}</p>
        
        <Link to={service.link} className={cn(
          "font-medium flex items-center transition-colors group mt-auto",
          theme === 'dark' 
            ? "text-neon-cyan hover:text-neon-blue" 
            : "text-digicyan-600 hover:text-digicyan-800"
        )}>
          Selengkapnya 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
