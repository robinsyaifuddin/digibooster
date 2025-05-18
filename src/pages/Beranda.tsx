
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/home/HeroSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import PopularPortfolioSection from '@/components/home/PopularPortfolioSection';
import ContactSection from '@/components/home/ContactSection';
import LogoMarquee from '@/components/home/LogoMarquee';
import BenefitsSection from '@/components/home/BenefitsSection';
import DigitalServicesSection from '@/components/home/DigitalServicesSection';
import { PartnerItem, TestimonialItem } from '@/types/websiteTypes';
import { PortfolioItemType } from '@/types/portfolioTypes';

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
  
  // Sample data for required props
  const companyName = "DigiBooster";
  
  // Fixed benefits data that matches the expected structure
  const benefits = [
    "Profesional - Tim ahli yang berpengalaman",
    "Terjangkau - Harga bersaing dengan kualitas terbaik",
    "Tepat Waktu - Pengerjaan sesuai jadwal yang disepakati", 
    "Support - Dukungan teknis setelah penyelesaian"
  ];
  
  // Fixed testimonials data that matches TestimonialItem
  const testimonials: TestimonialItem[] = [
    { 
      id: "1",
      name: "Ahmad Riza", 
      role: "CEO PT Maju Sejahtera", 
      content: "Layanan yang sangat profesional dan hasil yang memuaskan.",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    { 
      id: "2",
      name: "Siti Aminah", 
      role: "Manager CV Berkah Abadi", 
      content: "Tim yang sangat responsif dan memahami kebutuhan bisnis kami.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    { 
      id: "3",
      name: "Budi Santoso", 
      role: "Owner UD Makmur Jaya", 
      content: "Hasil website sangat menarik dan fungsional, sesuai harapan kami.",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];
  
  // Fixed portfolio items that match PortfolioItemType
  const portfolioItems: PortfolioItemType[] = [
    {
      id: 1,
      title: "Website E-Commerce Fashion",
      category: "Website & Aplikasi",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
      client: "Fashion Store",
      description: "Modern e-commerce website for a fashion brand",
      services: ["Web Development", "UI/UX Design"]
    },
    {
      id: 2,
      title: "Branding Kafe Modern",
      category: "Desain Grafis",
      image: "https://images.unsplash.com/photo-1515600051222-a3c338ff16f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      client: "Urban Café",
      description: "Complete branding package for a modern café",
      services: ["Logo Design", "Branding", "Packaging"]
    },
    {
      id: 3,
      title: "Kampanye Digital Marketing",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      client: "Tech Startup",
      description: "Comprehensive digital marketing campaign",
      services: ["Social Media", "Content Marketing", "SEO"]
    }
  ];
  
  // Fixed partner logos that match the PartnerItem interface
  const logos: PartnerItem[] = [
    { id: "1", name: "Company A", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: "2", name: "Company B", image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: "3", name: "Company C", image: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: "4", name: "Company D", image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: "5", name: "Company E", image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: "6", name: "Company F", image: "https://randomuser.me/api/portraits/men/6.jpg" }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with new DigiBooster logo */}
      <section className="py-16 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/df7f3339-8861-49d1-ab17-bd951aed0cfc.png"
            alt="DigiBooster Logo" 
            className="h-24 md:h-32 mb-8" 
          />
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Solusi Digital <span className="text-[#00E9F2]">Terbaik</span> untuk Bisnis Anda
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Tingkatkan performa bisnis Anda dengan layanan digital marketing, web development, dan edukasi digital yang komprehensif
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <Button asChild className="bg-[#00E9F2] hover:bg-[#00E9F2]/80 text-black py-2 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="/jasa-digital">Lihat Layanan</a>
            </Button>
            <Button asChild variant="outline" className="border-[#00E9F2] text-[#00E9F2] hover:bg-[#00E9F2]/10 py-2 px-6 rounded-lg text-lg">
              <a href="/kontak">Hubungi Kami</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Digital Services */}
      <DigitalServicesSection />

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
