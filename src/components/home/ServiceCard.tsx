
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="h-10 w-10 text-diginavy" />;
      case 'Lightbulb': return <Lightbulb className="h-10 w-10 text-diginavy" />;
      case 'Users': return <Users className="h-10 w-10 text-diginavy" />;
      case 'PenTool': return <PenTool className="h-10 w-10 text-diginavy" />;
      default: return <Code className="h-10 w-10 text-diginavy" />;
    }
  };

  return (
    <Card 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group scroll-animation border-none"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="h-2 bg-gradient-to-r from-diginavy to-digiblue-500"></div>
      <CardContent className="pt-6 pb-2">
        <div className="bg-gray-50 w-16 h-16 rounded-lg flex items-center justify-center mb-5">
          {getIconComponent(service.icon)}
        </div>
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
      </CardContent>
      <CardFooter className="pb-6">
        <Link to={service.link} className="text-diginavy font-medium flex items-center hover:underline group">
          Selengkapnya 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
