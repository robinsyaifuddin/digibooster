
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const DigitalServicesSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const services = [
    {
      id: "website-apps",
      title: "Website & Aplikasi",
      description: "Solusi digital profesional untuk kebutuhan website dan aplikasi bisnis Anda dengan teknologi terkini.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      rating: 4.8,
      category: "Development",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sky-400">
        <path d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M9 12H20M20 12L17.5 9.5M20 12L17.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      slug: "website-dan-aplikasi"
    },
    {
      id: "design-graphics",
      title: "Desain Grafis",
      description: "Layanan desain visual profesional untuk meningkatkan identitas brand dan visual marketing Anda.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      rating: 4.8,
      category: "Design",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sky-400">
        <path d="M2 7.5C2 6.67157 2.67157 6 3.5 6H20.5C21.3284 6 22 6.67157 22 7.5V16.5C22 17.3284 21.3284 18 20.5 18H3.5C2.67157 18 2 17.3284 2 16.5V7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10Z" fill="currentColor"/>
        <path d="M15 15L17.5 12L20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 15L4 11L7 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      slug: "desain-grafis"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Strategi pemasaran digital komprehensif untuk meningkatkan brand awareness dan penjualan.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      rating: 4.8,
      category: "Marketing",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sky-400">
        <path d="M16 8H8V16H16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 16L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 8L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 16L21 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 12L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      slug: "digital-marketing"
    },
    {
      id: "photo-video",
      title: "Foto dan Videografi",
      description: "Layanan visual profesional untuk kebutuhan konten marketing dan branding Anda.",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      rating: 4.8,
      category: "Video",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sky-400">
        <path d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      slug: "foto-dan-videografi"
    }
  ];
  
  const totalSlides = Math.max(0, services.length - 1);
  
  const nextSlide = () => {
    if (currentIndex < totalSlides) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first slide
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(totalSlides); // Loop to the last slide
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-dark-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            Layanan Digital Kami
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            Berbagai layanan digital untuk kebutuhan bisnis Anda
          </motion.p>
        </div>

        {/* Services Grid for Desktop */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="relative overflow-hidden rounded-2xl h-[480px] group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
              </div>
              
              {/* Card content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top section */}
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-500/30">
                    {service.icon}
                  </div>
                  
                  <button className="p-2 rounded-full hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors">
                    <Plus size={18} />
                  </button>
                </div>
                
                {/* Title and metadata */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                      <span className="text-white">{service.rating}</span>
                    </div>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300">
                      {service.category}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                    {service.description}
                  </p>
                  
                  {/* Action button */}
                  <Link 
                    to={`/layanan/${service.slug}`} 
                    className="inline-block px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-full transition-colors duration-300"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive Service Slider for Mobile and Tablet */}
        <div className="lg:hidden relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-6 z-10 transform -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/10 backdrop-blur-md border-gray-600 hover:bg-sky-500/20 hover:border-sky-500"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-6 z-10 transform -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/10 backdrop-blur-md border-gray-600 hover:bg-sky-500/20 hover:border-sky-500"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Services Carousel */}
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="relative overflow-hidden rounded-2xl h-[480px] group">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                    </div>
                    
                    {/* Card content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Top section */}
                      <div className="flex justify-between items-start">
                        <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-500/30">
                          {service.icon}
                        </div>
                        
                        <button className="p-2 rounded-full hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors">
                          <Plus size={18} />
                        </button>
                      </div>
                      
                      {/* Title and metadata */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">
                          {service.title}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-3 text-sm">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                            <span className="text-white">{service.rating}</span>
                          </div>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300">
                            {service.category}
                          </span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                          {service.description}
                        </p>
                        
                        {/* Action button */}
                        <Link 
                          to={`/layanan/${service.slug}`} 
                          className="inline-block px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-full transition-colors duration-300"
                        >
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {services.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx ? "w-6 bg-sky-400" : "bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white">
              <Link to="/jasa-digital">Lihat Semua Layanan</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DigitalServicesSection;
