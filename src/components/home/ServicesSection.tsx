
import React from 'react';
import { ServiceItem } from '@/types/websiteTypes';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
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
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
