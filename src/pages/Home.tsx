
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedServiceCard from '@/components/services/FeaturedServiceCard';
import PricingCard from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import LogoMarquee from '@/components/home/LogoMarquee';
import PopularPortfolioSection from '@/components/home/PopularPortfolioSection';
import DigitalServicesSection from '@/components/home/DigitalServicesSection';
import CardSlider from '@/components/ui/card-slider';
import CtaSection from '@/components/home/CtaSection';
import { partners } from '@/data/homepageData';
import { portfolioItems } from '@/data/portfolioData';

// Sample data
const featuredService = {
  id: 'featured-1',
  title: 'Jasa Pengembangan Website & Aplikasi',
  description: 'Layanan pembuatan website dan aplikasi mobile dengan teknologi terkini untuk berbagai kebutuhan bisnis Anda. Kami membantu mewujudkan visi digital Anda dengan solusi yang terukur, handal, dan user-friendly.',
  features: ['Website Development', 'Mobile Apps', 'Custom CMS', 'E-Commerce', 'API Integration', 'Responsive Design'],
  image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  rating: 4.8,
  year: '2023',
  category: 'Premium'
};
const Home = () => {
  return <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <HeroSection title="DigiBooster Indonesia" subtitle="Skill Up, Stand Up!" description="Platform Layanan Jasa Digital Terbaik untuk membantu bisnis Anda bertransformasi ke era digital dengan solusi komprehensif dan profesional. DigiBooster hadir sebagai partner digital terpercaya untuk pertumbuhan bisnis Anda." image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" rating={4.9} year="2023" ctaText="Explore Services" ctaLink="/services" />
      
      {/* Logo Marquee - Partner Section */}
      <LogoMarquee logos={partners.map(p => ({
      id: p.id,
      name: p.name,
      image: p.logo,
      link: '#'
    }))} title={<>Partner <span className="text-sky-500">Terpercaya</span> Kami</>} description="Berkolaborasi dengan perusahaan teknologi terkemuka untuk menghadirkan solusi digital terbaik" speed="medium" direction="left" />
      
      {/* Featured Service */}
      <div className="container mx-auto px-4 mb-16">
        <FeaturedServiceCard id={featuredService.id} title={featuredService.title} description={featuredService.description} features={featuredService.features} image={featuredService.image} rating={featuredService.rating} year={featuredService.year} category={featuredService.category} />
      </div>
      
      {/* Digital Services Section */}
      <DigitalServicesSection />
      
      {/* Portfolio Showcase */}
      <PopularPortfolioSection portfolioItems={portfolioItems} />
      
      {/* Categories */}
      
      
      {/* Pricing Section */}
      
      
      {/* Call to Action Section */}
      <CtaSection companyName="DigiBooster" />
    </div>;
};
export default Home;
