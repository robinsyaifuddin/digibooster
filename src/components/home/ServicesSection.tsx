
import React from 'react';
import { ServiceItem } from '@/types/websiteTypes';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-tr from-diginavy to-digiblue-700 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 scroll-animation">
          <span className="inline-block py-1 px-3 text-xs font-medium text-white bg-white/10 rounded-full mb-3 backdrop-blur-sm">LAYANAN KAMI</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Keuntungan Menggunakan Layanan <span className="text-purple-300">DigiBooster</span>
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Karena website bukan hanya soal bagus atau tidaknya, tapi bagaimana cara maintenancenya untuk perkembangan bisnis kamu.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
