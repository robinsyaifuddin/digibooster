import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool, DollarSign, Shield, Gift, LayoutGrid, Megaphone, FileText, FileCog, BookOpen, MessagesSquare, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}
const ServiceCard = ({
  service,
  index
}: ServiceCardProps) => {
  const {
    t
  } = useLanguage();
  const getIconComponent = (iconName: string) => {
    const iconClass = "h-6 w-6 text-neon-cyan";
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
      default:
        return <Code className={iconClass} />;
    }
  };
  const darkCardStyle = {
    background: "linear-gradient(145deg, rgba(21, 34, 56, 0.95), rgba(16, 28, 48, 0.98))"
  };
  return <div className="backdrop-blur-md rounded-lg overflow-hidden relative transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 scroll-animation bg-dark-300/80 border border-neon-cyan/20 hover:shadow-neon-cyan/10" style={{
    animationDelay: `${index * 100}ms`,
    ...darkCardStyle
  }}>
      {/* Accent corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-cyan/20 to-transparent"></div>
      
      
    </div>;
};
export default ServiceCard;