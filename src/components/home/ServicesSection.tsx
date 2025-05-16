
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
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [api, setApi] = React.useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handleServiceClick = (index: number) => {
    setActiveService(activeService === index ? null : index);
  };
  
  // Update current slide when the carousel changes
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="py-20 bg-gradient-to-br from-black to-dark-400/95 relative overflow-hidden">
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
            {/* Modern 3D carousel with perspective effect */}
            <div className="max-w-5xl mx-auto py-10">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                setApi={setApi}
                className="w-full perspective-1000"
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
                      <div 
                        className="h-full transition-all duration-500 transform"
                        data-selected={index === currentSlide}
                        style={{
                          transformStyle: 'preserve-3d',
                          scale: index === currentSlide ? 1.5 : index === ((currentSlide - 1 + services.length) % services.length) || index === ((currentSlide + 1) % services.length) ? 0.85 : 0.7,
                          opacity: index === currentSlide ? 1 : index === ((currentSlide - 1 + services.length) % services.length) || index === ((currentSlide + 1) % services.length) ? 0.6 : 0.3,
                          transform: `translateY(${
                            index === currentSlide 
                              ? '0' 
                              : index === ((currentSlide - 1 + services.length) % services.length)
                                ? '-1rem' 
                                : index === ((currentSlide + 1) % services.length)
                                  ? '-1rem'
                                  : '-2rem'
                          }) rotate(${
                            index === ((currentSlide - 1 + services.length) % services.length)
                              ? '-5deg'
                              : index === ((currentSlide + 1) % services.length)
                                ? '5deg'
                                : '0deg'
                          })`
                        }}
                      >
                        <ServiceCard 
                          service={service} 
                          index={index} 
                          isActive={index === currentSlide}
                          onClick={() => index === currentSlide ? handleServiceClick(index) : api?.scrollTo(index)}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="absolute inset-0 pointer-events-none flex items-center">
                  <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black to-transparent z-10"></div>
                  <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black to-transparent z-10"></div>
                </div>
                
                {/* Navigation buttons */}
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark-300/80 hover:bg-primary/20 backdrop-blur-sm border-primary/20 z-20" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark-300/80 hover:bg-primary/20 backdrop-blur-sm border-primary/20 z-20" />
              </Carousel>
            </div>

            {/* Current item indicator - improved design */}
            <div className="flex justify-center gap-1.5 mt-4">
              {services.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlide === index ? "w-8 bg-primary" : "w-1.5 bg-primary/40"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* CTA Button with improved styling */}
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
