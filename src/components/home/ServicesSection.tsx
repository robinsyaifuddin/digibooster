
import React from 'react';
import { ServiceItem } from '@/types/websiteTypes';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  // Pastikan layanan ditampilkan dalam kelompok 3
  const serviceGroups = [];
  for (let i = 0; i < services.length; i += 3) {
    serviceGroups.push(services.slice(i, i + 3));
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animation">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            DigiBooster menyediakan berbagai layanan untuk membantu Anda dan bisnis Anda berkembang di era digital.
          </p>
        </div>
        
        {serviceGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-12 flex flex-col md:flex-row gap-8 justify-center">
            {group.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index + groupIndex * 3} 
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
