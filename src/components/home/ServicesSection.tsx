
import React from 'react';
import { ServiceItem } from '@/types/websiteTypes';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-diginavy/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-digiblue-100/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 scroll-animation">
          <span className="inline-block py-1 px-3 text-xs font-medium text-diginavy bg-diginavy/10 rounded-full mb-3">LAYANAN KAMI</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-diginavy to-digiblue-700 bg-clip-text text-transparent">
            Solusi Digital Terbaik untuk Anda
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            DigiBooster menyediakan berbagai layanan untuk membantu Anda dan bisnis Anda berkembang di era digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
