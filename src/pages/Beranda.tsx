
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import ContactSection from '@/components/home/ContactSection';
import LogoMarquee from '@/components/home/LogoMarquee';
import CtaSection from '@/components/home/CtaSection';
import ScrollAnimation from '@/components/home/ScrollAnimation';
import { motion } from 'framer-motion';
import defaultWebsiteData from '@/data/defaultWebsiteData';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

const Beranda = () => {
  // Get the website data from the default data
  const { homeContent, generalInfo } = defaultWebsiteData;
  const companyName = generalInfo.title;
  const { t } = useLanguage();
  
  return (
    <ScrollAnimation>
      <main>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
        </motion.div>

        {/* Logo Marquee - Show our trusted partners */}
        <LogoMarquee 
          logos={homeContent.partners} 
          title={t('trusted-partners')}
          description={t('partners-description')} 
        />

        {/* Services Section */}
        <ServicesSection services={homeContent.services} />

        {/* Benefits Section */}
        <BenefitsSection 
          companyName={companyName} 
          benefits={homeContent.benefits}
        />

        {/* Testimonials Section */}
        <TestimonialsSection 
          companyName={companyName}
          testimonials={homeContent.testimonials} 
        />

        {/* CTA Section */}
        <CtaSection companyName={companyName} />

        {/* Contact Section */}
        <ContactSection companyName={companyName} />
      </main>
    </ScrollAnimation>
  );
};

export default Beranda;
