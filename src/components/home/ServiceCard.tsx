
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool, DollarSign, Shield, Gift, LayoutGrid, Megaphone, FileText, FileCog, BookOpen, MessagesSquare, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="h-6 w-6 text-cyan-400" />;
      case 'Lightbulb': return <Lightbulb className="h-6 w-6 text-cyan-400" />;
      case 'Users': return <Users className="h-6 w-6 text-cyan-400" />;
      case 'PenTool': return <PenTool className="h-6 w-6 text-cyan-400" />;
      case 'DollarSign': return <DollarSign className="h-6 w-6 text-cyan-400" />;
      case 'Shield': return <Shield className="h-6 w-6 text-cyan-400" />;
      case 'Gift': return <Gift className="h-6 w-6 text-cyan-400" />;
      case 'LayoutGrid': return <LayoutGrid className="h-6 w-6 text-cyan-400" />;
      case 'Megaphone': return <Megaphone className="h-6 w-6 text-cyan-400" />;
      case 'FileText': return <FileText className="h-6 w-6 text-cyan-400" />;
      case 'FileCog': return <FileCog className="h-6 w-6 text-cyan-400" />;
      case 'BookOpen': return <BookOpen className="h-6 w-6 text-cyan-400" />;
      case 'MessagesSquare': return <MessagesSquare className="h-6 w-6 text-cyan-400" />;
      case 'GraduationCap': return <GraduationCap className="h-6 w-6 text-cyan-400" />;
      default: return <Code className="h-6 w-6 text-cyan-400" />;
    }
  };

  return (
    <div 
      className="bg-dark-900/80 backdrop-blur-md rounded-lg border border-cyan-500/20 overflow-hidden relative transform transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 scroll-animation"
      style={{ 
        animationDelay: `${index * 100}ms`,
        background: "linear-gradient(145deg, rgba(11, 20, 38, 0.95), rgba(7, 14, 30, 0.98))" 
      }}
    >
      {/* Blue accent corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/20 to-transparent"></div>
      
      <div className="flex flex-col h-full p-7">
        <div className="mb-5">
          <div className="bg-dark-800/80 border border-cyan-500/20 w-14 h-14 rounded-lg flex items-center justify-center">
            {getIconComponent(service.icon)}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
        
        <p className="text-gray-300 mb-6 flex-grow">{service.description}</p>
        
        <Link to={service.link} className="text-cyan-400 font-medium flex items-center hover:text-cyan-300 transition-colors group mt-auto">
          Selengkapnya 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
