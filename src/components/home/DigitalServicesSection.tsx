
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/home/ServiceCard';
import { jasaDigitalServices } from '@/data/jasaDigitalData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  
  // Filter to include only the services we want to display
  const filteredServices = jasaDigitalServices.filter(service => 
    service.title === 'Website & Aplikasi' || 
    service.title === 'Foto dan Videografi' ||
    service.title === 'Desain Grafis' ||
    service.title === 'Digital Marketing'
  );
  
  const totalSlides = Math.max(0, filteredServices.length - 2);
  
  const nextSlide = () => {
    if (currentIndex < totalSlides) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
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
            Kami menawarkan berbagai layanan digital untuk membantu bisnis Anda berkembang di era digital
          </motion.p>
        </div>

        {/* Responsive Service Slider */}
        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-6 z-10 transform -translate-y-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/10 backdrop-blur-md border-gray-600 hover:bg-sky-500/20 hover:border-sky-500"
              onClick={prevSlide}
              disabled={currentIndex === 0}
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
              disabled={currentIndex >= totalSlides}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Services Carousel */}
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.slug}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 md:px-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  custom={index}
                >
                  <ServiceCard 
                    title={service.title}
                    description={service.description} 
                    icon={service.icon} 
                    color="neon-cyan"
                    link={`/layanan/${service.slug}`}
                    animated={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides + 1 }).map((_, idx) => (
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
              <a href="/jasa-digital">Lihat Semua Layanan</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DigitalServicesSection;
