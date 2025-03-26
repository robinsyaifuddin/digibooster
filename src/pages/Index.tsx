
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import CtaSection from '@/components/home/CtaSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import ScrollAnimation from '@/components/home/ScrollAnimation';
import { useHomeContent } from '@/contexts/HomeContentContext';
import LogoMarquee from '@/components/home/LogoMarquee';

const Index = () => {
  const { homeContent, isLoading } = useHomeContent();
  const websiteData = useWebsiteDataStore();

  const partnerLogos = [
    { name: 'BitNinja', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cloudlinux-logo.png/320px-Cloudlinux-logo.png' },
    { name: 'CloudLinux', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cpanel_logo.svg/320px-Cpanel_logo.svg.png' },
    { name: 'cPanel', image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg' },
    { name: 'DigitalOcean', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/OVH_Logo.svg/320px-OVH_Logo.svg.png' },
    { name: 'AWS', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/320px-Amazon_Web_Services_Logo.svg.png' },
    { name: 'Sectigo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Ssl-logo-140x92.png/320px-Ssl-logo-140x92.png' },
    { name: 'Softaculous', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/SiteLock-logo.svg/320px-SiteLock-logo.svg.png' },
  ];

  if (isLoading || !homeContent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-diginavy"></div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <ScrollAnimation>
        <HeroSection 
          generalInfo={websiteData.generalInfo} 
          hero={homeContent.hero} 
        />
        
        <ServicesSection 
          services={homeContent.services} 
        />
        
        {/* First Partner Section - beweging ke kanan */}
        <LogoMarquee 
          logos={partnerLogos} 
          direction="right"
          bgColor="bg-black"
          title="Beberapa Partner IT Hardware & Software Kami"
          description="Kami bekerja sama untuk memberikan solusi terbaik untuk Anda."
        />
        
        <CtaSection 
          companyName={websiteData.generalInfo.title} 
        />
        
        <BenefitsSection 
          companyName={websiteData.generalInfo.title} 
          benefits={homeContent.benefits} 
        />
        
        {/* Second Partner Section - beweging ke kiri */}
        <LogoMarquee 
          logos={partnerLogos} 
          direction="left"
          bgColor="bg-gray-900"
          title="Mitra Teknologi Kami"
          description="Berkolaborasi dengan perusahaan teknologi terkemuka untuk melayani Anda."
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
