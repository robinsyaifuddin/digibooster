
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
    <Card 
      className="w-full md:w-1/3 hover:shadow-xl transition-all duration-300 border-t-4 border-diginavy scroll-animation bg-white rounded-lg overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardHeader className="pb-2">
        <div className="mb-2">{getIconComponent(service.icon)}</div>
        <h3 className="text-xl font-semibold">{service.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{service.description}</p>
      </CardContent>
      <CardFooter>
        <Link to={service.link} className="text-diginavy font-medium flex items-center hover:underline group">
          Selengkapnya 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
