
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

const Beranda = () => {
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
        <LogoMarquee />

        {/* Services Section */}
        <ServicesSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CtaSection companyName="DigiCore" />

        {/* Contact Section */}
        <ContactSection />
      </main>
    </ScrollAnimation>
  );
};

export default Beranda;
