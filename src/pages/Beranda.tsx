import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHomeContent } from '@/contexts/HomeContentContext';
import { useSplashScreen } from '../contexts/SplashScreenContext';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import PartnersSection from '@/components/home/PartnersSection';
import BlogPreviewSection from '@/components/home/BlogPreviewSection';
import { Helmet } from 'react-helmet';

const Beranda = () => {
  const { homeContent } = useHomeContent();
  const { triggerSplash } = useSplashScreen();
  
  // Handle refresh action
  useEffect(() => {
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
            title={homeContent.hero.title} 
            subtitle={homeContent.hero.subtitle}
            ctaText={homeContent.hero.ctaText}
            ctaLink={homeContent.hero.ctaLink}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ServicesSection services={homeContent.services} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <AboutSection />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TestimonialsSection testimonials={homeContent.testimonials} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <BlogPreviewSection />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <PartnersSection partners={homeContent.partners} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <CtaSection />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Beranda;
