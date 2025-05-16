
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import { ServiceItem } from '@/types/websiteTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <section className="py-20 bg-dark-400/40 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 mb-16">
        <AnimatedSection className="text-center max-w-3xl mx-auto" animation="fadeIn" delay={200}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('our-services')}
          </h2>
          <p className="text-lg text-gray-300">
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
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="py-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="h-full">
                    <ServiceCard 
                      service={service} 
                      index={index} 
                      onClick={() => handleServiceClick(index)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-card/80 backdrop-blur-sm border-primary/20" />
            <CarouselNext className="right-2 bg-card/80 backdrop-blur-sm border-primary/20" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
