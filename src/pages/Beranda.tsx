
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
  
  // Sample data for required props
  const companyName = "DigiBooster";
  const benefits = [
    { title: "Profesional", description: "Tim ahli yang berpengalaman", icon: "Award" },
    { title: "Terjangkau", description: "Harga bersaing dengan kualitas terbaik", icon: "DollarSign" },
    { title: "Tepat Waktu", description: "Pengerjaan sesuai jadwal yang disepakati", icon: "Clock" },
    { title: "Support", description: "Dukungan teknis setelah penyelesaian", icon: "HeadphonesIcon" }
  ];
  
  const testimonials = [
    { 
      name: "Ahmad Riza", 
      company: "PT Maju Sejahtera", 
      text: "Layanan yang sangat profesional dan hasil yang memuaskan.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5
    },
    { 
      name: "Siti Aminah", 
      company: "CV Berkah Abadi", 
      text: "Tim yang sangat responsif dan memahami kebutuhan bisnis kami.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 5
    },
    { 
      name: "Budi Santoso", 
      company: "UD Makmur Jaya", 
      text: "Hasil website sangat menarik dan fungsional, sesuai harapan kami.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 4.5
    }
  ];
  
  const portfolioItems = [
    {
      id: 1,
      title: "Website E-Commerce Fashion",
      category: "Website & Aplikasi",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
    },
    {
      id: 2,
      title: "Branding Kafe Modern",
      category: "Desain Grafis",
      image: "https://images.unsplash.com/photo-1515600051222-a3c338ff16f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 3,
      title: "Kampanye Digital Marketing",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    }
  ];
  
  const logos = [
    { name: "Company A", src: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Company B", src: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Company C", src: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Company D", src: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Company E", src: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "Company F", src: "https://randomuser.me/api/portraits/men/6.jpg" }
  ];

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
                key={service.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                custom={index}
              >
                <ServiceCard 
                  title={service.title}
                  description={service.description} 
                  icon={service.icon} 
                  color="sky-500"
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
      <BenefitsSection companyName={companyName} benefits={benefits} />

      {/* Popular Portfolio */}
      <PopularPortfolioSection portfolioItems={portfolioItems} />

      {/* Testimonials */}
      <TestimonialsSection companyName={companyName} testimonials={testimonials} />

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
          
          <LogoMarquee logos={logos} title="Partner Kami" />
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection companyName={companyName} />

      {/* CTA Section */}
      <CtaSection companyName={companyName} />
    </div>
  );
};

export default Beranda;
