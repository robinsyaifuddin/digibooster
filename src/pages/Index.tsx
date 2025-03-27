
import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import CtaSection from '@/components/home/CtaSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import ContactSection from '@/components/home/ContactSection';
import ScrollAnimation from '@/components/home/ScrollAnimation';
import LogoMarquee from '@/components/home/LogoMarquee';
import { useHomeContent } from '@/contexts/HomeContentContext';
import { ReactNode } from 'react';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';

const Index = () => {
  const { homeContent, isLoading } = useHomeContent();
  const websiteData = useWebsiteDataStore();
  const companyName = websiteData.generalInfo.title;
  
  // Fallback data jika homeContent masih loading
  const servicesFallback = [
    {
      id: '1',
      title: 'Layanan Jasa Digital',
      description: 'Tingkatkan presence digital Anda dengan layanan jasa design, web development, dan digital marketing kami.',
      icon: 'Code',
      link: '/layanan/jasa-digital',
    },
    {
      id: '2',
      title: 'Motivasi dan Edukasi Digital',
      description: 'Dapatkan inspirasi dan pengetahuan digital melalui seminar dan workshop yang kami selenggarakan.',
      icon: 'Lightbulb',
      link: '/layanan/motivasi-edukasi',
    },
    {
      id: '3',
      title: 'Sharing dan Konsultasi Bisnis Digital',
      description: 'Konsultasikan kebutuhan digital bisnis Anda dengan pakar kami untuk solusi terbaik.',
      icon: 'Users',
      link: '/layanan/sharing-konsultasi',
    },
    {
      id: '4',
      title: 'Short Class dan Mini Bootcamp',
      description: 'Pelajari keterampilan digital terbaru melalui kelas intensif dan bootcamp dari para ahli.',
      icon: 'PenTool',
      link: '/layanan/kelas',
    },
  ];
  
  const testimonialsFallback = [
    {
      id: '1',
      name: 'Lania',
      role: 'Owner zenboard.id',
      content: 'Voodoo recomended banget, menurut saya itu jasa paling clex sih. Dijamin pek rapi hasilnya memuaskan!!!!',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: '2',
      name: 'Alvin Rahman',
      role: 'Owner sixtwogkarta.com',
      content: 'Pelayananya cepat, hasil bagusss, udah bikin 5 bulanan yang lalu terus minta tolong ada yg di edit masih bisa dibanggiin!!!',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: '3',
      name: 'John Smith',
      role: 'Marketing rentalspace.web.id',
      content: 'Voodoo sangat membantu dlm membuat website, kerja dengan cepat, dan hasil website memuaskan banget!',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  ];
  
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

  // Create the alternating colored title for the logo marquee
  const logoMarqueeTitle: ReactNode = (
    <>
      <span className="text-gray-900">Dipercaya</span>{" "}
      <span className="text-digiblue">oleh</span>{" "}
      <span className="text-gray-900">Perusahaan</span>{" "}
      <span className="text-digiblue">Teknologi</span>{" "}
      <span className="text-gray-900">Terkemuka</span>
    </>
  );

  // Cek pembaruan konten dari event yang diterima dari publikasi
  useEffect(() => {
    const handleContentUpdated = (event: CustomEvent) => {
      console.log('Home page received content update event:', event.detail);
      // Muat ulang halaman untuk menampilkan perubahan terbaru
      if (event.detail && event.detail.isPermanent) {
        console.log('Applying permanent content updates to homepage');
      }
    };

    window.addEventListener('websiteContentUpdated', handleContentUpdated as EventListener);
    
    return () => {
      window.removeEventListener('websiteContentUpdated', handleContentUpdated as EventListener);
    };
  }, []);

  // Scroll event listener to handle animations
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
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection 
        generalInfo={websiteData.generalInfo}
        hero={homeContent?.hero}
      />
      
      {/* Logo Marquee - Trusted by Companies */}
      <LogoMarquee
        logos={homeContent?.partners || partnersFallback}
        title={logoMarqueeTitle}
        description="Bekerja sama dengan berbagai perusahaan teknologi untuk menghadirkan solusi terbaik"
        speed="slow"
        bgColor="bg-gray-50"
      />
      
      {/* Services Section */}
      <ServicesSection services={homeContent?.services || servicesFallback} />
      
      {/* Benefits Section with Animation */}
      <ScrollAnimation>
        <BenefitsSection 
          benefits={homeContent?.benefits || []} 
          companyName={companyName}
        />
      </ScrollAnimation>
      
      {/* Testimonials Section */}
      <TestimonialsSection 
        testimonials={homeContent?.testimonials || testimonialsFallback}
        companyName={companyName}
      />
      
      {/* Contact Section */}
      <ContactSection companyName={companyName} />
      
      {/* CTA Section */}
      <CtaSection companyName={companyName} />
    </main>
  );
};

export default Index;
