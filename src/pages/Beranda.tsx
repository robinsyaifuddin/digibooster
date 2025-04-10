
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
  
  const logoMarqueeTitle = (
    <>
      <span className="text-neon-cyan">Dipercaya</span>{" "}
      <span className="text-white">oleh</span>{" "}
      <span className="text-neon-cyan">Brand</span>{" "}
      <span className="text-white">Terkemuka</span>
    </>
  );
  
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
          title={logoMarqueeTitle}
          description="Berkolaborasi dengan berbagai perusahaan dan organisasi untuk mengembangkan solusi digital."
          speed="slow"
          bgColor="bg-dark-300"
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
