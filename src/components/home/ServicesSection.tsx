
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import { ServiceItem } from '@/types/websiteTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState<number | null>(null);
  
  const handleServiceClick = (index: number) => {
    setActiveService(activeService === index ? null : index);
  };
  
  return (
    <section className="py-20 bg-gradient-to-br from-dark-400/90 to-dark-300/90 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-neon-blue/20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-neon-cyan/20 blur-xl animate-pulse-light"></div>
      
      <div className="container mx-auto px-4 mb-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto" animation="fadeIn" delay={200}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('our-services')}
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            {t('services-subtitle')}
          </p>
        </AnimatedSection>
      </div>
      
      <div className="container mx-auto px-4">
        {activeService !== null ? (
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <ServiceCard 
                service={services[activeService]} 
                index={0} 
                isActive={true}
                onClick={() => setActiveService(null)}
              />
              
              <Button
                variant="outline" 
                size="icon"
                className="absolute top-1/2 -left-4 -translate-y-1/2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20"
                onClick={() => setActiveService(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="relative">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full overflow-visible"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {services.map((service, index) => (
                  <CarouselItem 
                    key={index} 
                    className="pl-2 md:pl-4 flex items-center justify-center"
                    style={{ 
                      width: '100%',
                      maxWidth: '340px',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    {({ isSelected }) => (
                      <div className={`h-full transition-all duration-500 ${isSelected ? 'scale-110 z-10' : 'scale-90 opacity-70'}`}>
                        <ServiceCard 
                          service={service} 
                          index={index} 
                          isActive={isSelected}
                          onClick={() => handleServiceClick(index)}
                        />
                      </div>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation buttons positioned at the bottom */}
              <div className="flex justify-center items-center mt-8 gap-4">
                <CarouselPrevious className="static translate-y-0 bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:text-white" />
                <CarouselNext className="static translate-y-0 bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:text-white" />
              </div>
            </Carousel>

            {/* CTA Button */}
            <div className="text-center mt-10">
              <p className="text-gray-300 mb-4">{t('discover-more-services')}</p>
              <Link to="/program/jasa-digital">
                <Button 
                  variant="outline" 
                  className="bg-dark-300/80 border-primary/40 hover:bg-primary/20 hover:border-primary/60 group backdrop-blur-sm"
                >
                  <span>{t('explore-all-services')}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
