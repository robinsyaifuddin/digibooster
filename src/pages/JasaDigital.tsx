
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jasaDigitalData } from '@/data/jasaDigitalData';
import ServiceSubcategories from '@/components/jasa-digital/ServiceSubcategories';
import { Link } from 'react-router-dom';

const JasaDigital = () => {
  // Featured service data
  const featuredService = {
    title: "Website & Aplikasi",
    description: "Layanan pembuatan website dan aplikasi mobile dengan teknologi terkini untuk berbagai kebutuhan bisnis Anda. Kami membantu mewujudkan visi digital Anda dengan solusi yang terukur, handal, dan user-friendly.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    rating: 4.9,
    year: "2023",
    category: "Premium",
    slug: "website-dan-aplikasi"
  };
  
  return (
    <div className="bg-black min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-sky-900/30 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-sky-500/20 rounded-l-full blur-3xl z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-sky-400 font-medium mb-3 inline-block">JASA DIGITAL</span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                Layanan Digital <br className="hidden md:block" />Profesional
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star.toString()} 
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
                Jasa digital terbaik untuk membantu bisnis Anda bertransformasi ke era digital dengan solusi komprehensif dan profesional. 
                DigiBooster hadir sebagai partner digital terpercaya untuk pertumbuhan bisnis Anda.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild className="filmbox-button">
                  <Link to="/tentang">
                    <Play size={18} className="mr-1" /> Konsultasi Sekarang
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="rounded-full border-gray-700 hover:bg-sky-500/20 hover:border-sky-500">
                  <a href="#services-section">
                    <Plus size={18} className="mr-1" /> Lihat Semua Layanan
                  </a>
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
                  <h3 className="text-xl font-bold mb-1 text-white">{featuredService.title}</h3>
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
                
                {/* Play button with link to detail page */}
                <Link to={`/layanan/${featuredService.slug}`}>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              w-16 h-16 flex items-center justify-center rounded-full 
                              bg-sky-500/80 text-white hover:bg-sky-600 transition-colors"
                  >
                    <Play size={24} className="ml-1" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services-section" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Layanan Digital</h2>
            
            <div className="flex gap-2">
              <Button size="sm" className="rounded-full bg-sky-500 hover:bg-sky-600 hidden md:flex">
                Semua Layanan
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
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {jasaDigitalData.map((service, index) => (
              <motion.div
                key={index.toString()}
                id={service.title.toLowerCase().replace(/\s+/g, '-')}
                whileHover={{ y: -5 }}
                className="filmbox-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${1460925895917 + index}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`}
                    alt={service.title} 
                    className="w-full h-full object-cover filmbox-image"
                  />
                  <div className="filmbox-overlay"></div>
                  
                  <div className="absolute top-3 right-3 z-10">
                    <button className="filmbox-icon-button w-8 h-8">
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-4 z-10">
                    <h3 className="text-lg font-bold mb-1 text-white">{service.title}</h3>
                    
                    <div className="flex items-center text-xs text-gray-300 mb-3">
                      <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="mr-2">4.8</span>
                      <span className="bg-sky-500/20 text-sky-400 text-xs px-2 py-0.5 rounded">
                        Premium
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">{service.description}</p>
                    
                    <Button asChild size="sm" className="text-sm bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-full">
                      <Link to={`/layanan/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        Lihat Detail
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Sections - Display subcategories for each service */}
      {jasaDigitalData.map((service, index) => (
        service.subcategories && (
          <ServiceSubcategories
            key={`subcategories-${index}`}
            subcategories={service.subcategories}
            serviceName={service.title}
          />
        )
      ))}
      
      {/* Benefits Section */}
      <section className="py-16 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Mengapa Memilih DigiBooster?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Layanan digital kami memberikan berbagai keuntungan untuk membantu bisnis Anda berkembang di era digital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Tim Profesional",
                description: "Didukung oleh tim ahli yang berpengalaman dalam industri digital"
              },
              {
                title: "Solusi Komprehensif",
                description: "Layanan digital lengkap untuk memenuhi semua kebutuhan bisnis Anda"
              },
              {
                title: "Hasil Terukur",
                description: "Menyediakan laporan dan analitik untuk mengukur keberhasilan proyek"
              },
              {
                title: "Dukungan Responsif",
                description: "Tim support yang siap membantu kapanpun Anda membutuhkan"
              },
              {
                title: "Teknologi Terkini",
                description: "Menggunakan teknologi dan trend digital terbaru untuk hasil optimal"
              },
              {
                title: "Harga Transparan",
                description: "Penawaran harga yang jelas tanpa biaya tersembunyi"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl hover:border-sky-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button asChild className="filmbox-button">
              <Link to="/tentang">
                Hubungi Kami Sekarang
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-xl p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-900/40 to-black z-0"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Siap Meningkatkan Bisnis Digital Anda?
              </h2>
              <p className="text-gray-300 mb-8">
                Konsultasikan kebutuhan digital Anda dengan tim ahli kami dan dapatkan solusi yang sesuai dengan bisnis Anda.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild className="filmbox-button">
                  <Link to="/tentang">
                    <Play size={18} className="mr-2" /> Mulai Konsultasi
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="rounded-full border-gray-700 hover:bg-sky-500/20 hover:border-sky-500">
                  <Link to="/portofolio">
                    Lihat Portfolio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JasaDigital;
