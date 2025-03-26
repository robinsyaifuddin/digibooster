
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool, DollarSign, Shield, Gift, LayoutGrid, Image, Camera, Megaphone, FileText, FileCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="h-6 w-6 text-white" />;
      case 'Lightbulb': return <Lightbulb className="h-6 w-6 text-white" />;
      case 'Users': return <Users className="h-6 w-6 text-white" />;
      case 'PenTool': return <PenTool className="h-6 w-6 text-white" />;
      case 'DollarSign': return <DollarSign className="h-6 w-6 text-white" />;
      case 'Shield': return <Shield className="h-6 w-6 text-white" />;
      case 'Gift': return <Gift className="h-6 w-6 text-white" />;
      case 'LayoutGrid': return <LayoutGrid className="h-6 w-6 text-white" />;
      case 'Image': return <Image className="h-6 w-6 text-white" />;
      case 'Camera': return <Camera className="h-6 w-6 text-white" />;
      case 'Megaphone': return <Megaphone className="h-6 w-6 text-white" />;
      case 'FileText': return <FileText className="h-6 w-6 text-white" />;
      case 'FileCog': return <FileCog className="h-6 w-6 text-white" />;
      default: return <Code className="h-6 w-6 text-white" />;
    }
  };

  return (
    <div 
      className="bg-purple-600/50 backdrop-blur-md rounded-xl p-7 text-white transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 scroll-animation"
      style={{ 
        animationDelay: `${index * 100}ms`,
        background: "linear-gradient(145deg, rgba(147, 51, 234, 0.6), rgba(126, 34, 206, 0.75))" 
      }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-5">
          <div className="bg-white/10 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center">
            {getIconComponent(service.icon)}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        
        <p className="text-purple-100 mb-6 flex-grow">{service.description}</p>
        
        <Link to={service.link} className="text-white font-medium flex items-center hover:underline group mt-auto">
          Selengkapnya 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
