
import { useEffect, useState } from 'react';
import { useWebsiteDataStore, WebsiteData } from '@/stores/websiteDataStore';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import CtaSection from '@/components/home/CtaSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import ScrollAnimation from '@/components/home/ScrollAnimation';

const Index = () => {
  const [homeContent, setHomeContent] = useState<WebsiteData['homeContent'] | null>(null);
  const websiteData = useWebsiteDataStore();

  useEffect(() => {
    setHomeContent(websiteData.homeContent);
    
    const handleContentUpdate = (event: CustomEvent<WebsiteData>) => {
      console.log('Content update event received:', event.detail);
      if (event.detail && event.detail.homeContent) {
        setHomeContent(event.detail.homeContent);
      }
    };
    
    window.addEventListener('websiteContentUpdated', handleContentUpdate as EventListener);
    
    const storedData = localStorage.getItem('websiteData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.homeContent) {
          setHomeContent(parsedData.homeContent);
        }
      } catch (error) {
        console.error('Error parsing stored website data:', error);
      }
    }
    
    return () => {
      window.removeEventListener('websiteContentUpdated', handleContentUpdate as EventListener);
    };
  }, [websiteData]);

  if (!homeContent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-diginavy"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <ScrollAnimation>
        <HeroSection 
          generalInfo={websiteData.generalInfo} 
          hero={homeContent.hero} 
        />
        
        <ServicesSection 
          services={homeContent.services} 
        />
        
        <CtaSection 
          companyName={websiteData.generalInfo.title} 
        />
        
        <BenefitsSection 
          companyName={websiteData.generalInfo.title} 
          benefits={homeContent.benefits} 
        />
        
        <TestimonialsSection 
          companyName={websiteData.generalInfo.title} 
          testimonials={homeContent.testimonials} 
        />
        
        <ContactSection 
          companyName={websiteData.generalInfo.title} 
        />
      </ScrollAnimation>
    </div>
  );
};

export default Index;
