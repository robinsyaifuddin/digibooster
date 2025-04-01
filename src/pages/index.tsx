
import React, { useEffect } from 'react';
import CyberHero from '@/components/home/CyberHero';
import FeatureSection from '@/components/home/FeatureSection';
import CyberTestimonials from '@/components/home/CyberTestimonials';
import BenefitsSection from '@/components/home/BenefitsSection';
import PartnersCarousel from '@/components/home/PartnersCarousel';
import CyberCta from '@/components/home/CyberCta';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';

const Index = () => {
  const websiteData = useWebsiteDataStore();
  const companyName = websiteData.generalInfo.title;
  
  const partnersFallback = [
    {
      id: '1',
      name: 'Google',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
    },
    {
      id: '2',
      name: 'Microsoft',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    },
    {
      id: '3',
      name: 'Amazon',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
    },
    {
      id: '4',
      name: 'Facebook',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png',
    },
    {
      id: '5',
      name: 'IBM',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
    },
  ];

  // Detect content updates
  useEffect(() => {
    const handleContentUpdated = (event: CustomEvent) => {
      console.log('Home page received content update event:', event.detail);
      // Reload the page to show the latest changes
      if (event.detail && event.detail.isPermanent) {
        console.log('Applying permanent content updates to homepage');
      }
    };

    window.addEventListener('websiteContentUpdated', handleContentUpdated as EventListener);
    
    return () => {
      window.removeEventListener('websiteContentUpdated', handleContentUpdated as EventListener);
    };
  }, []);

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
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
    handleScroll(); // Trigger on first load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-cyber-dark text-white">
      {/* Hero Section */}
      <CyberHero />
      
      {/* Features Section */}
      <FeatureSection />
      
      {/* Partners Carousel */}
      <PartnersCarousel partners={websiteData.homeContent?.partners || partnersFallback} />
      
      {/* Benefits Section */}
      <BenefitsSection 
        benefits={websiteData.homeContent?.benefits || []} 
        companyName={companyName}
      />
      
      {/* Testimonials Section */}
      <CyberTestimonials />
      
      {/* CTA Section */}
      <CyberCta />
    </main>
  );
};

export default Index;
