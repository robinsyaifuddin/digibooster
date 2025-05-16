
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import ContactSection from '@/components/home/ContactSection';
import LogoMarquee from '@/components/home/LogoMarquee';
import CtaSection from '@/components/home/CtaSection';
import PopularPortfolioSection from '@/components/home/PopularPortfolioSection';
import { motion } from 'framer-motion';
import defaultWebsiteData from '@/data/defaultWebsiteData';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioItems } from '@/data/portfolioData';
import { ServiceItem } from '@/types/websiteTypes';

const Beranda = () => {
  // Get the website data from the default data
  const { homeContent, generalInfo } = defaultWebsiteData;
  const companyName = generalInfo.title;
  const { t } = useLanguage();
  
  // DigiBooster specific digital services
  const digiBoosterServices: ServiceItem[] = [
    {
      id: '1',
      title: t('website-app-development'),
      description: t('website-app-desc'),
      icon: 'Code',
      link: '/program/jasa-digital',
    },
    {
      id: '2',
      title: t('graphic-design'),
      description: t('graphic-design-desc'),
      icon: 'PenTool',
      link: '/program/jasa-digital',
    },
    {
      id: '3',
      title: t('digital-marketing'),
      description: t('digital-marketing-desc'),
      icon: 'Megaphone',
      link: '/program/jasa-digital',
    },
    {
      id: '4',
      title: t('content-management'),
      description: t('content-management-desc'),
      icon: 'FileText',
      link: '/program/jasa-digital',
    },
    {
      id: '5',
      title: t('photo-video'),
      description: t('photo-video-desc'),
      icon: 'Camera',
      link: '/program/jasa-digital',
    },
    {
      id: '6',
      title: t('social-media'),
      description: t('social-media-desc'),
      icon: 'Share2',
      link: '/program/jasa-digital',
    },
  ];
  
  const logoMarqueeTitle = (
    <>
      <span className="text-neon-cyan">Dipercaya</span>{" "}
      <span className="text-white">oleh</span>{" "}
      <span className="text-neon-cyan">Brand</span>{" "}
      <span className="text-white">Terkemuka</span>
    </>
  );
  
  return (
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

      {/* Popular Portfolio Section */}
      <AnimatedSection>
        <PopularPortfolioSection portfolioItems={portfolioItems} />
      </AnimatedSection>

      {/* Services Section - DigiBooster Digital Services */}
      <ServicesSection services={digiBoosterServices} />

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
  );
};

export default Beranda;
