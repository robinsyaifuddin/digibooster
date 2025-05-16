
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Star, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import defaultWebsiteData from '@/data/defaultWebsiteData';
import { ServiceItem } from '@/types/websiteTypes';

// Featured service data
const featuredService = {
  title: "Jasa Pengembangan Website & Aplikasi",
  description: "Layanan pembuatan website dan aplikasi mobile dengan teknologi terkini untuk membantu bisnis Anda bertransformasi ke era digital dengan solusi yang terukur dan handal.",
  image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  rating: 4.8,
  year: "2023",
  category: "Featured"
};

// Popular service cards for recommendations section
const popularServices = [
  {
    id: '1',
    title: 'Website Development',
    description: 'Pembuatan website profesional untuk berbagai kebutuhan bisnis',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.9,
    year: '2023',
  },
  {
    id: '2',
    title: 'App Development',
    description: 'Pengembangan aplikasi mobile iOS dan Android untuk bisnis Anda',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.7,
    year: '2023',
  },
  {
    id: '3',
    title: 'Digital Marketing',
    description: 'Strategi marketing digital untuk meningkatkan brand awareness',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.8,
    year: '2023',
  },
  {
    id: '4',
    title: 'Graphic Design',
    description: 'Desain grafis profesional untuk kebutuhan branding bisnis',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.5,
    year: '2023',
  },
  {
    id: '5',
    title: 'Content Management',
    description: 'Pengelolaan konten website dan media sosial yang terstruktur',
    image: 'https://images.unsplash.com/photo-1553484771-11998c592b9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.9,
    year: '2023',
  },
];

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

const Beranda = () => {
  const { t } = useLanguage();
  const { homeContent, generalInfo } = defaultWebsiteData;
  const companyName = generalInfo.title;

  // DigiBooster specific digital services with proper links
  const digiBoosterServices: ServiceItem[] = [
    {
      id: '1',
      title: t('website-app-development'),
      description: t('website-app-desc'),
      icon: 'Code',
      link: '/program/jasa-digital#website-development',
    },
    {
      id: '2',
      title: t('graphic-design'),
      description: t('graphic-design-desc'),
      icon: 'PenTool',
      link: '/program/jasa-digital#graphic-design',
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
      title: t('content-management'),
      description: t('content-management-desc'),
      icon: 'FileText',
      link: '/program/jasa-digital#content-management',
    },
    {
      id: '5',
      title: t('photo-video'),
      description: t('photo-video-desc'),
      icon: 'Camera',
      link: '/program/jasa-digital#photo-video',
    },
    {
      id: '6',
      title: t('social-media'),
      description: t('social-media-desc'),
      icon: 'Share2',
      link: '/program/jasa-digital#social-media',
    },
  ];
  
  return (
    <main className="bg-black text-white">
      {/* Hero Section inspired by the film header */}
      <section className="relative overflow-hidden pt-10 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-sky-900/30 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-sky-500/20 rounded-l-full blur-3xl z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-sky-400 font-medium mb-3 inline-block">DIGIBOOSTER INDONESIA</span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Layanan Jasa Digital Terbaik
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      className={star <= 4.5 ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
                    />
                  ))}
                  <span className="ml-2 text-white">4.5</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="mx-3 text-white">2023</span>
                <span className="bg-sky-500/20 text-sky-400 text-xs py-1 px-2 rounded">Premium</span>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-xl">
                Percepatan Digitalisasi Indonesia melalui solusi digital komprehensif 
                dan profesional untuk bisnis Anda. DigiBooster hadir sebagai partner 
                digital terpercaya untuk pertumbuhan bisnis Anda.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white rounded-full">
                  <Link to="/kontak">
                    <Play size={18} className="mr-1" /> Konsultasi Sekarang
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="rounded-full border-gray-700 hover:bg-sky-500/20 hover:border-sky-500">
                  <Link to="/program/jasa-digital">
                    <Plus size={18} className="mr-1" /> Lihat Layanan
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              {/* Main featured image */}
              <div className="relative aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={featuredService.image} 
                  alt="Digital Services" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-xl font-bold mb-1">{featuredService.title}</h3>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="flex items-center mr-3">
                      <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
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
                             w-16 h-16 flex items-center justify-center rounded-full 
                             bg-sky-500/80 text-white hover:bg-sky-600 transition-colors"
                >
                  <Play size={24} className="ml-1" />
                </motion.button>
              </div>
              
              {/* Thumbnails */}
              <div className="absolute -right-12 top-10 space-y-4 hidden lg:block">
                {[1, 2, 3].map(index => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-16 rounded-lg overflow-hidden bg-gray-800 border border-gray-700"
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
                key={dot} 
                className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-sky-400' : 'bg-gray-600'}`}
                aria-label={`Go to slide ${dot}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Recommendations Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Rekomendasi Layanan</h2>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full border-gray-700 hover:bg-gray-800 hidden md:flex">
                Semua
              </Button>
              <Button size="sm" className="rounded-full bg-sky-500 hover:bg-sky-600 hidden md:flex">
                Terpopuler
              </Button>
              <Button variant="outline" size="sm" className="rounded-full border-gray-700 hover:bg-gray-800 hidden md:flex">
                Terbaru
              </Button>
              
              <div className="flex gap-2 ml-2">
                <Button size="icon" variant="outline" className="rounded-full border-gray-700 hover:bg-gray-800">
                  <ChevronLeft size={18} />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full border-gray-700 hover:bg-gray-800">
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {popularServices.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                className="relative rounded-xl overflow-hidden bg-gray-900/50 border border-gray-800"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  
                  <div className="absolute top-2 right-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-black/50 hover:bg-sky-500/50 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-3">
                    <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-2">{service.title}</h3>
                    <div className="flex items-center text-xs text-gray-300">
                      <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="mr-2">{service.rating}</span>
                      <span>{service.year}</span>
                    </div>
                    <Link 
                      to={`/program/jasa-digital#${service.id}`} 
                      className="mt-2 text-xs bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-full inline-flex items-center"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center gap-1 mt-6">
            {[1, 2, 3, 4, 5].map(page => (
              <button 
                key={page} 
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm 
                           ${page === 1 ? 'bg-sky-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                {page}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
      
      {/* Subscription Plans */}
      <section className="py-16 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pilih Paket Anda</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Maksimalkan potensi digital bisnis Anda dengan paket layanan yang sesuai kebutuhan dan anggaran Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`relative p-6 rounded-xl ${
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
                
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-3xl font-bold ${plan.color}`}>{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`mr-2 text-lg ${plan.color}`}>•</span>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
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
    </main>
  );
};

export default Beranda;
