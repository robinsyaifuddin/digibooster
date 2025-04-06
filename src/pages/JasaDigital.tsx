
import React, { useEffect } from 'react';
import JasaDigitalHero from '@/components/jasa-digital/JasaDigitalHero';
import ServicesGrid from '@/components/jasa-digital/ServicesGrid';
import CtaComponent from '@/components/common/CtaComponent';
import { jasaDigitalServices } from '@/data/jasaDigitalData';
import { motion } from 'framer-motion';

const JasaDigital = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.scroll-reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-24 md:pt-32 bg-dark min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <JasaDigitalHero />

        {/* Services Grid with enhanced animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ServicesGrid services={jasaDigitalServices} />
        </motion.div>

        {/* CTA Section with a more cyberpunk theme */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <CtaComponent
            title="Siap Meningkatkan Bisnis Digital Anda?"
            description="Konsultasikan kebutuhan digital Anda dengan tim ahli kami dan dapatkan solusi yang sesuai dengan bisnis Anda."
            buttonText="Hubungi Kami"
            buttonLink="/kontak"
            theme="purple"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default JasaDigital;
