import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Star, Plus, ChevronRight, ChevronLeft, Newspaper, Users2, Image, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import defaultWebsiteData from '@/data/defaultWebsiteData';
import { ServiceItem } from '@/types/websiteTypes';
import { latestNews, partners, testimonials } from '@/data/homepageData';
import { portfolioItems } from '@/data/portfolioData';
import CardSlider from '@/components/ui/card-slider';
import NewsCard from '@/components/home/NewsCard';
import PartnerCard from '@/components/home/PartnerCard';
import TestimonialCard from '@/components/home/TestimonialCard';
import FeaturedPortfolioCard from '@/components/home/FeaturedPortfolioCard';
import { useIsMobile } from '@/hooks/use-mobile';
import LogoMarquee from '@/components/home/LogoMarquee';
import TestimonialMarquee from '@/components/home/TestimonialMarquee';
import { jasaDigitalServices } from '@/data/jasaDigitalData';

// Featured service data
const featuredService = {
  title: "Jasa Pengembangan Website & Aplikasi",
  description: "Layanan pembuatan website dan aplikasi mobile dengan teknologi terkini untuk membantu bisnis Anda bertransformasi ke era digital dengan solusi yang terukur dan handal.",
  image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  rating: 4.8,
  year: "2023",
  category: "Featured"
};

// Popular service cards for recommendations section - Using only 4 services from jasaDigitalServices
const popularServices = jasaDigitalServices.slice(0, 4).map((service, index) => ({
  id: (index + 1).toString(),
  title: service.title,
  description: service.description,
  image: service.image || 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  rating: 4.9 - (index * 0.1),
  year: '2023',
  slug: service.slug,
}));

// Subscription plans
const subscriptionPlans = [
  {
    name: "Basic Plan",
    price: "Rp 999k",
    period: "/bulan",
    color: "text-yellow-500",
    features: [
      "Website Development",
      "Basic SEO",
      "5 Halaman Website",
      "Support 8/5",
      "1 Revisi Gratis"
    ]
  },
  {
    name: "Premium Plan",
    price: "Rp 2.999k",
    period: "/bulan",
    color: "text-cyan-400",
    featured: true,
    features: [
      "Website & Mobile App",
      "Advanced SEO",
      "Unlimited Pages",
      "Social Media Management",
      "Support 24/7",
      "3 Revisi Gratis"
    ]
  },
  {
    name: "Enterprise Plan",
    price: "Rp 5.999k",
    period: "/bulan",
    color: "text-purple-400",
    features: [
      "Custom Digital Solutions",
      "Premium SEO & Analytics",
      "E-Commerce Integration",
      "Digital Marketing Strategy",
      "Dedicated Support Team",
      "Unlimited Revisions"
    ]
  }
];

// Get featured portfolio items
const featuredPortfolio = portfolioItems.slice(0, 6);

const Beranda = () => {
  const { t } = useLanguage();
  const { homeContent, generalInfo } = defaultWebsiteData;
  const companyName = generalInfo.title;
  const isMobile = useIsMobile();

  // DigiBooster specific digital services with proper links
  const digiBoosterServices: ServiceItem[] = [
    {
      id: '1',
      title: t('website-app-development'),
      description: t('website-app-desc'),
      icon: 'Code',
      link: '/program/jasa-digital#website-dan-aplikasi',
    },
    {
      id: '2',
      title: t('graphic-design'),
      description: t('graphic-design-desc'),
      icon: 'PenTool',
      link: '/program/jasa-digital#desain-grafis',
    },
    {
      id: '3',
      title: t('digital-marketing'),
      description: t('digital-marketing-desc'),
      icon: 'Megaphone',
      link: '/program/jasa-digital#digital-marketing',
    },
    {
      id: '4',
      title: t('photo-video'),
      description: t('photo-video-desc'),
      icon: 'Camera',
      link: '/program/jasa-digital#foto-dan-videografi',
    },
  ];
  
  // Create the testimonial title with DigiBooster specific text
  const testimonialTitle = (
    <>
      <span className="text-neon-cyan">Testimoni </span>
      <span className="text-white">Klien </span>
      <span className="text-neon-cyan">DigiBooster </span>
      <span className="text-white">Indonesia</span>
    </>
  );
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-sky-900/30 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-sky-500/20 rounded-l-full blur-3xl z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-sky-400 font-medium mb-3 inline-block">DIGIBOOSTER INDONESIA</span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                Layanan Jasa Digital Terbaik
              </h1>
              
              <div className="flex flex-wrap items-center mb-4 gap-2">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star.toString()}
                      size={isMobile ? 14 : 16} 
                      className={star <= 4.5 ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
                    />
                  ))}
                  <span className="ml-2 text-white text-sm md:text-base">4.5</span>
                </div>
                <span className="text-gray-400 hidden sm:inline-block">•</span>
                <span className="text-white text-sm md:text-base">2023</span>
                <span className="bg-sky-500/20 text-sky-400 text-xs py-1 px-2 rounded">Premium</span>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-xl text-sm md:text-base">
                Percepatan Digitalisasi Indonesia melalui solusi digital komprehensif 
                dan profesional untuk bisnis Anda. DigiBooster hadir sebagai partner 
                digital terpercaya untuk pertumbuhan bisnis Anda.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white rounded-full text-xs md:text-sm">
                  <Link to="/kontak">
                    <Play size={isMobile ? 14 : 18} className="mr-1" /> Konsultasi Sekarang
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="rounded-full border-gray-700 hover:bg-sky-500/20 hover:border-sky-500 text-xs md:text-sm">
                  <Link to="/program/jasa-digital">
                    <Plus size={isMobile ? 14 : 18} className="mr-1" /> Lihat Layanan
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
              {/* Main featured image */}
              <div className="relative aspect-[3/4] sm:aspect-video md:aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={featuredService.image} 
                  alt="Digital Services" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold mb-1">{featuredService.title}</h3>
                  <div className="flex items-center text-xs md:text-sm text-gray-300">
                    <div className="flex items-center mr-3">
                      <Star size={isMobile ? 12 : 14} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{featuredService.rating}</span>
                    </div>
                    <span>{featuredService.year}</span>
                    <span className="ml-2 px-2 py-0.5 bg-sky-500/20 rounded text-sky-400 text-xs">
                      {featuredService.category}
                    </span>
                  </div>
                </div>
                
                {/* Play button */}
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                             w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full 
                             bg-sky-500/80 text-white hover:bg-sky-600 transition-colors"
                >
                  <Play size={isMobile ? 20 : 24} className="ml-1" />
                </motion.button>
              </div>
              
              {/* Thumbnails */}
              <div className="absolute -right-12 top-10 space-y-4 hidden lg:block">
                {[1, 2, 3].map(index => (
                  <motion.div 
                    key={index.toString()}
                    whileHover={{ scale: 1.05 }}
                    className="w-16 md:w-24 h-12 md:h-16 rounded-lg overflow-hidden bg-gray-800 border border-gray-700"
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${1550745165 + index * 100}?auto=format&fit=crop&w=300&q=60`}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Page indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {[1, 2, 3].map(dot => (
              <button 
                key={dot.toString()}
                className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-sky-400' : 'bg-gray-600'}`}
                aria-label={`Go to slide ${dot}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <div className="py-12 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Layanan <span className="text-sky-400">Digital</span> Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan digital profesional untuk membantu bisnis Anda tumbuh dan berkembang di era digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jasaDigitalServices.slice(0, 4).map((service, index) => (
              <div
                key={index.toString()} // Fix the type error by converting number to string
                className="bg-gray-900 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 border border-gray-800"
              >
                <div className="w-14 h-14 rounded-full bg-sky-500/20 flex items-center justify-center mb-6">
                  <img src={service.icon} alt={service.title} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <Link to={`/layanan/${service.slug}`} className="text-sky-400 flex items-center hover:underline">
                  Selengkapnya
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/jasa-digital" className="inline-flex items-center justify-center px-6 py-3 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition duration-300 rounded-full">
              Lihat Semua Layanan
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Latest News Section */}
      <section className="py-10 md:py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="bg-sky-500/20 p-2 md:p-3 rounded-full">
              <Newspaper size={isMobile ? 18 : 24} className="text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Berita Terbaru</h2>
          </div>
          
          <CardSlider
            title=""
            slidesPerView={isMobile ? 1 : 3}
            cardClassName={isMobile ? "md:basis-1/2" : "md:basis-1/3 lg:basis-1/4"}
          >
            {latestNews.map((news) => (
              <NewsCard
                key={news.id.toString()}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                image={news.image}
                date={news.date}
                category={news.category}
                link={news.link}
              />
            ))}
          </CardSlider>
          
          <div className="text-center mt-8 md:mt-10">
            <Button asChild variant="outline" className="rounded-full border-gray-700 hover:bg-sky-500/20 hover:border-sky-500 text-xs md:text-sm">
              <Link to="/berita">
                Lihat Semua Berita <ChevronRight size={isMobile ? 14 : 16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-10 md:py-16 bg-black/80 border-t border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="bg-sky-500/20 p-2 md:p-3 rounded-full">
              <Users2 size={isMobile ? 18 : 24} className="text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Mitra DigiBooster</h2>
          </div>
          
          <p className="text-gray-400 max-w-2xl mb-6 md:mb-10 text-sm md:text-base">
            DigiBooster berkolaborasi dengan berbagai perusahaan teknologi terkemuka untuk menyediakan solusi digital terbaik bagi klien kami.
          </p>
          
          {/* Replace the grid with the marquee component */}
          <LogoMarquee
            logos={partners.map(partner => ({
              id: partner.id,
              name: partner.name, 
              image: partner.logo,
              link: ''
            }))}
            title="Partner Teknologi DigiBooster"
            description="Kami berkolaborasi dengan perusahaan teknologi terkemuka untuk membantu pertumbuhan bisnis digital Anda"
            speed="medium"
            bgColor="bg-transparent"
          />
        </div>
      </section>
      
      {/* Portfolio Showcase */}
      <section className="py-10 md:py-16 bg-black border-t border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="bg-sky-500/20 p-2 md:p-3 rounded-full">
              <Image size={isMobile ? 18 : 24} className="text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Portofolio Unggulan</h2>
          </div>
          
          <CardSlider
            title=""
            slidesPerView={isMobile ? 1 : 3}
            cardClassName={isMobile ? "md:basis-1/2" : "md:basis-1/3"}
          >
            {featuredPortfolio.map((item) => (
              <FeaturedPortfolioCard
                key={item.id.toString()}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={item.category}
                link={`/portofolio/${item.id}`}
              />
            ))}
          </CardSlider>
          
          <div className="text-center mt-8 md:mt-10">
            <Button asChild variant="outline" className="rounded-full border-gray-700 hover:bg-sky-500/20 hover:border-sky-500 text-xs md:text-sm">
              <Link to="/portofolio">
                Lihat Semua Portofolio <ChevronRight size={isMobile ? 14 : 16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-10 md:py-16 bg-black/80 border-t border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="bg-sky-500/20 p-2 md:p-3 rounded-full">
              <MessageSquare size={isMobile ? 18 : 24} className="text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Testimoni Klien</h2>
          </div>
          
          <p className="text-gray-400 max-w-2xl mb-6 md:mb-10 text-sm md:text-base">
            Dengarkan pengalaman klien kami yang telah merasakan dampak positif dari layanan digital DigiBooster.
          </p>
          
          {/* Use TestimonialMarquee for desktop */}
          <div className="hidden md:block">
            <TestimonialMarquee
              testimonials={testimonials}
              title={testimonialTitle}
              description="Pengalaman nyata dari klien yang telah bekerjasama dengan DigiBooster Indonesia"
              speed="medium"
              bgColor="transparent"
            />
          </div>
          
          {/* Use CardSlider for mobile */}
          <div className="block md:hidden">
            <CardSlider
              title=""
              slidesPerView={isMobile ? 1 : 3}
              cardClassName="md:basis-1/2"
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id.toString()}
                  id={testimonial.id}
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                  image={testimonial.image}
                  rating={testimonial.rating}
                />
              ))}
            </CardSlider>
          </div>
        </div>
      </section>
      
      {/* Recommendations Section - Display only 4 jasaDigitalServices */}
      <section className="py-10 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Layanan Digital</h2>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full border-gray-700 hover:bg-gray-800 hidden md:flex text-xs">
                Semua
              </Button>
              <Button size="sm" className="rounded-full bg-sky-500 hover:bg-sky-600 hidden md:flex text-xs">
                Terpopuler
              </Button>
              <Button variant="outline" size="sm" className="rounded-full border-gray-700 hover:bg-gray-800 hidden md:flex text-xs">
                Terbaru
              </Button>
              
              <div className="flex gap-2 ml-2">
                <Button size="icon" variant="outline" className="rounded-full border-gray-700 hover:bg-gray-800">
                  <ChevronLeft size={isMobile ? 14 : 18} />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full border-gray-700 hover:bg-gray-800">
                  <ChevronRight size={isMobile ? 14 : 18} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {popularServices.map((service) => (
              <motion.div
                key={service.id.toString()}
                whileHover={{ y: -5 }}
                className="filmbox-card"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover filmbox-image"
                  />
                  <div className="filmbox-overlay"></div>
                  
                  <div className="absolute top-2 right-2">
                    <button className="filmbox-icon-button w-6 h-6 md:w-7 md:h-7">
                      <Plus size={isMobile ? 12 : 14} />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-2 md:p-3">
                    <h3 className="text-xs md:text-sm font-semibold mb-1 line-clamp-2">{service.title}</h3>
                    <div className="flex items-center text-xs text-gray-300">
                      <Star size={10} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="mr-2">{service.rating}</span>
                      <span>{service.year}</span>
                    </div>
                    <Link 
                      to={`/layanan/${service.slug}`} 
                      className="mt-2 text-xs bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded-full inline-flex items-center"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full border-gray-700 hover:bg-sky-500/20 hover:border-sky-500 text-xs md:text-sm">
              <Link to="/program/jasa-digital">
                Lihat Semua Layanan <ChevronRight size={isMobile ? 14 : 16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Subscription Plans */}
      <section className="py-10 md:py-16 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Pilih Paket Anda</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Maksimalkan potensi digital bisnis Anda dengan paket layanan yang sesuai kebutuhan dan anggaran Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={index.toString()}
                whileHover={{ y: -10 }}
                className={`relative p-4 md:p-6 rounded-xl ${
                  plan.featured 
                    ? 'bg-gradient-to-b from-sky-900/40 to-black border-2 border-sky-500/50' 
                    : 'bg-gray-900/30 border border-gray-800'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sky-500 text-white text-xs px-3 py-1 rounded-full">
                    Paling Populer
                  </div>
                )}
                
                <h3 className="text-lg md:text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4 md:mb-6">
                  <span className={`text-2xl md:text-3xl font-bold ${plan.color}`}>{plan.price}</span>
                  <span className="text-gray-400 text-xs md:text-sm">{plan.period}</span>
                </div>
                
                <ul className="space-y-2 md:space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx.toString()} className="flex items-start">
                      <span className={`mr-2 text-base md:text-lg ${plan.color}`}>•</span>
                      <span className="text-gray-300 text-xs md:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full text-xs md:text-sm ${
                    plan.featured 
                      ? 'bg-sky-500 hover:bg-sky-600 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  Pilih Paket
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beranda;
