
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import CtaSection from '@/components/home/CtaSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import ScrollAnimation from '@/components/home/ScrollAnimation';
import LogoMarquee from '@/components/home/LogoMarquee';
import { useHomeContent } from '@/contexts/HomeContentContext';

const Index = () => {
  const { homeContent, isLoading } = useHomeContent();
  const websiteData = useWebsiteDataStore();

  // Partner logos
  const partnerLogos = [
    { name: 'Google', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/150px-Google_%22G%22_Logo.svg.png' },
    { name: 'Microsoft', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/150px-Microsoft_logo.svg.png' },
    { name: 'Amazon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/175px-Amazon_logo.svg.png' },
    { name: 'IBM', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/150px-IBM_logo.svg.png' },
    { name: 'Oracle', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/150px-Oracle_logo.svg.png' },
    { name: 'Cisco', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/150px-Cisco_logo_blue_2016.svg.png' },
    { name: 'Intel', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/150px-Intel_logo_%282006-2020%29.svg.png' },
    { name: 'Nvidia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/150px-Nvidia_logo.svg.png' },
  ];

  if (isLoading || !homeContent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-diginavy"></div>
      </div>
    );
  }

  // Updated services data to match the reference image
  const updatedServices = [
    {
      id: '1',
      title: 'Layanan All in Request',
      description: 'Tak hanya website, DigiBooster juga bisa membuatkan kamu video promosi & sekalian iklan di Google',
      icon: 'Code',
      link: '/layanan/jasa-digital',
    },
    {
      id: '2',
      title: 'Harga Bisa Request',
      description: 'Suka sama DigiBooster tapi harga belum cocok? Santai, kamu bisa tentukan harga websitemu sendiri',
      icon: 'DollarSign',
      link: '/layanan/harga',
    },
    {
      id: '3',
      title: 'Ready to Customs',
      description: 'Selain web company & toko online, DigiBooster juga siap untuk membuat website kompleks / custom',
      icon: 'PenTool',
      link: '/layanan/custom',
    },
    {
      id: '4',
      title: 'Alur Pekerjaan Jelas',
      description: 'Kami memiliki cara kerja yang efisien dan profesional untuk membuat websitemu go-online dengan sangat baik',
      icon: 'Users',
      link: '/layanan/workflow',
    },
    {
      id: '5',
      title: 'Garansi Selamanya',
      description: 'Tak perlu khawatir soal support atau maintenance, DigiBooster siap beri garansi website seumur hidup',
      icon: 'Shield',
      link: '/layanan/garansi',
    },
    {
      id: '6',
      title: 'Ada Bonus Gratis',
      description: 'Dapatkan paket website, DigiBooster akan memberikan bonus yang sangat berguna buat bisnismu',
      icon: 'Gift',
      link: '/layanan/bonus',
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <ScrollAnimation>
        <HeroSection 
          generalInfo={websiteData.generalInfo} 
          hero={homeContent.hero} 
        />
        
        <ServicesSection 
          services={updatedServices} 
        />
        
        <BenefitsSection 
          companyName={websiteData.generalInfo.title} 
          benefits={homeContent.benefits} 
        />
        
        <TestimonialsSection 
          companyName={websiteData.generalInfo.title} 
          testimonials={homeContent.testimonials} 
        />
        
        <CtaSection 
          companyName={websiteData.generalInfo.title} 
        />
        
        <LogoMarquee 
          logos={partnerLogos} 
          direction="right" 
          speed="slow"
          bgColor="bg-gray-50"
          title="Dipercaya oleh Perusahaan Teknologi Terkemuka"
          description="Bermitra dengan berbagai perusahaan teknologi untuk menghadirkan solusi digital terbaik"
        />
        
        <ContactSection 
          companyName={websiteData.generalInfo.title} 
        />
      </ScrollAnimation>
    </div>
  );
};

export default Index;
