
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHomeContent } from '@/contexts/HomeContentContext';
import { useSplashScreen } from '../contexts/SplashScreenContext';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import { Helmet } from 'react-helmet-async';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';

const Beranda = () => {
  const { homeContent } = useHomeContent();
  const { triggerSplash } = useSplashScreen();
  const websiteData = useWebsiteDataStore();
  const companyName = websiteData.generalInfo.title;
  
  // Handle refresh action
  useEffect(() => {
    // Setup storage listener to detect page refreshes
    const handleBeforeUnload = () => {
      // This will run before page refresh
      sessionStorage.setItem('shouldShowSplash', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check if we should show splash after refresh
    const shouldShowSplash = sessionStorage.getItem('shouldShowSplash');
    if (shouldShowSplash === 'true') {
      triggerSplash();
      sessionStorage.removeItem('shouldShowSplash');
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [triggerSplash]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // If homeContent isn't loaded yet, we can use default data from websiteDataStore
  const heroData = homeContent?.hero || websiteData.homeContent.hero;
  const servicesData = homeContent?.services || websiteData.homeContent.services;
  const testimonialsData = homeContent?.testimonials || websiteData.homeContent.testimonials;

  return (
    <>
      <Helmet>
        <title>DigiBooster - Platform Digital Marketing & Education</title>
        <meta name="description" content="DigiBooster adalah platform agensi dan pengembangan ekosistem digital Indonesia. Kami membantu masyarakat mengoptimalkan digitalisasi." />
      </Helmet>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="overflow-hidden"
      >
        <motion.div variants={itemVariants}>
          <HeroSection 
            title={heroData.title} 
            subtitle={heroData.subtitle}
            ctaText={heroData.ctaText}
            ctaLink={heroData.ctaLink}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ServicesSection services={servicesData} />
        </motion.div>
        
        {/* Removed AboutSection */}
        
        <motion.div variants={itemVariants}>
          <TestimonialsSection 
            testimonials={testimonialsData}
            companyName={companyName} 
          />
        </motion.div>
        
        {/* Removed BlogPreviewSection */}
        
        {/* Removed PartnersSection */}
        
        <motion.div variants={itemVariants}>
          <CtaSection companyName={companyName} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Beranda;
