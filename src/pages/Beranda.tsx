
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import PopularPortfolioSection from '@/components/home/PopularPortfolioSection';
import ContactSection from '@/components/home/ContactSection';
import LogoMarquee from '@/components/home/LogoMarquee';
import BenefitsSection from '@/components/home/BenefitsSection';
import ServiceCard from '@/components/home/ServiceCard';
import { jasaDigitalServices } from '@/data/jasaDigitalData';

const Beranda = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Only show the first 4 services from jasaDigitalData
  const limitedServices = jasaDigitalServices.slice(0, 4);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              Layanan Digital Kami
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              Kami menawarkan berbagai layanan digital untuk membantu bisnis Anda berkembang di era digital
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {limitedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                custom={index}
              >
                <ServiceCard 
                  title={service.title}
                  description={service.shortDescription} 
                  icon={service.icon} 
                  color={service.accentColor}
                  link={`/layanan/${service.slug}`}
                  animated={false}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <a href="/jasa-digital">Lihat Semua Layanan</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section - What makes us different */}
      <BenefitsSection />

      {/* Popular Portfolio */}
      <PopularPortfolioSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Partner Logos */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              Partner Kami
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              Kami telah bekerja sama dengan berbagai perusahaan terkemuka
            </motion.p>
          </div>
          
          <LogoMarquee />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default Beranda;
