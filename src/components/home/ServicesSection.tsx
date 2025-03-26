
import React from 'react';
import { ServiceItem } from '@/types/websiteTypes';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 scroll-animation">
          <span className="inline-block py-1 px-3 text-xs font-medium text-diginavy bg-diginavy/10 rounded-full mb-3">LAYANAN KAMI</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Solusi Digital Terbaik untuk Anda</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            DigiBooster menyediakan berbagai layanan untuk membantu Anda dan bisnis Anda berkembang di era digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
