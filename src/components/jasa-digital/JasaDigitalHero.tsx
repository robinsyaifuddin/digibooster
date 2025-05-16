
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const JasaDigitalHero = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      controls.start({ y: scrollY * 0.1 });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <div className="w-full relative overflow-hidden rounded-xl mb-16">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-red-900/60 z-0"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[400px]">
        <div className="w-full md:w-1/2 pr-0 md:pr-8">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-red-600/80 rounded-full mb-4"
          >
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
            DigiBooster
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Layanan Jasa <br/>
            <span className="text-red-500">Digital Terbaik</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-gray-300 mb-8 max-w-xl"
          >
            Percepatan Digitalisasi Indonesia melalui solusi digital komprehensif dan profesional untuk bisnis Anda
          </motion.p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => navigate('/kontak')}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white border-0"
            >
              Konsultasi Sekarang
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                const servicesSection = document.getElementById('services-section');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Lihat Layanan
            </Button>
          </div>
        </div>
        
        {/* Right side with decorative elements */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 hidden md:flex justify-end relative">
          <div className="w-64 h-64 rounded-full bg-red-600/30 absolute -right-20 -top-20 blur-3xl"></div>
          <div className="w-64 h-64 rounded-full bg-red-600/20 absolute -right-10 bottom-0 blur-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * item, duration: 0.5 }}
                className="w-32 h-24 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 flex items-center justify-center"
              >
                <Code className="text-red-500 h-10 w-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.8 }}
      />
    </div>
  );
};

export default JasaDigitalHero;
