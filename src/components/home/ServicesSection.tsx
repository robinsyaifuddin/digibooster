
import React from 'react';
import { ServiceItem } from '@/types/websiteTypes';
import ServiceCard from './ServiceCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-dark-950 to-dark-900 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 scroll-animation">
          <span className="inline-block py-1 px-3 text-xs font-medium text-cyan-400 bg-cyan-950/50 rounded-full mb-3 backdrop-blur-sm border border-cyan-500/10">PROGRAM KAMI</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Solusi Digital <span className="text-cyan-400">Komprehensif</span> untuk Bisnis Anda
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Kami menawarkan berbagai program digital terintegrasi untuk membantu bisnis Anda berkembang di era digital dengan strategi yang terukur dan berkelanjutan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
            />
          ))}
        </div>

        {services.length > 4 && (
          <div className="mt-10 text-center">
            <Link to="/program/jasa-digital" className="inline-flex items-center px-6 py-3 bg-cyan-950/30 backdrop-blur-sm hover:bg-cyan-900/40 text-cyan-400 rounded-full transition-all group border border-cyan-500/20">
              Lihat Semua Program 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
