
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="h-12 w-12 text-diginavy" />;
      case 'Lightbulb': return <Lightbulb className="h-12 w-12 text-diginavy" />;
      case 'Users': return <Users className="h-12 w-12 text-diginavy" />;
      case 'PenTool': return <PenTool className="h-12 w-12 text-diginavy" />;
      default: return <Code className="h-12 w-12 text-diginavy" />;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 scroll-animation"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="mb-4">{getIconComponent(service.icon)}</div>
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <Link to={service.link} className="text-diginavy font-medium flex items-center hover:underline">
        Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};

export default ServiceCard;
