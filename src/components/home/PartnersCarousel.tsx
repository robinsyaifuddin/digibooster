
import React from 'react';
import { motion } from 'framer-motion';

interface PartnerItem {
  id: string;
  name: string;
  image: string;
  link?: string;
}

interface PartnersCarouselProps {
  partners: PartnerItem[];
}

const PartnersCarousel = ({ partners }: PartnersCarouselProps) => {
  // Duplicate partners for seamless looping
  const duplicatedPartners = [...partners, ...partners];
  
  return (
    <section className="py-16 bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10 mb-10">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold mb-4 cyber-heading">
            Our Partners
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Working with leading companies and organizations to deliver exceptional digital solutions.
          </p>
        </div>
      </div>
      
      <div className="marquee-container overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-cyber-darker to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-cyber-darker to-transparent"></div>
        
        <div className="animate-marquee flex items-center gap-16 py-6">
          {duplicatedPartners.map((partner, index) => (
            <div 
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 px-6 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {partner.link ? (
                <a 
                  href={partner.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="h-12 w-auto object-contain"
                  />
                </a>
              ) : (
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  className="h-12 w-auto object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
