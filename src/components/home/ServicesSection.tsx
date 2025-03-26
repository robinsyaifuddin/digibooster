
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animation">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            DigiBooster menyediakan berbagai layanan untuk membantu Anda dan bisnis Anda berkembang di era digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
