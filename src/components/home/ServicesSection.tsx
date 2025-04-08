
import React from 'react';
import ServiceCard from './ServiceCard';
import { ServiceItem } from '@/types/websiteTypes';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import AnimatedSection from '@/components/animation/AnimatedSection';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <section className={cn(
      "py-20",
      theme === 'light' ? "bg-white" : "bg-dark-400/40"
    )}>
      <div className="container mx-auto px-4 mb-16">
        <AnimatedSection className="text-center max-w-3xl mx-auto" animation="fadeIn" delay={200}>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            theme === 'light' ? "text-gray-800" : "text-white"
          )}>
            {t('our-services')}
          </h2>
          <p className={cn(
            "text-lg",
            theme === 'light' ? "text-gray-600" : "text-gray-300"
          )}>
            {t('services-subtitle')}
          </p>
        </AnimatedSection>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={200 + index * 100} animation="fadeIn">
              <ServiceCard service={service} index={index} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
