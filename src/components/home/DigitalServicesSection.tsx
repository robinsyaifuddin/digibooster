
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/home/ServiceCard';
import { jasaDigitalServices } from '@/data/jasaDigitalData';

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

  // Only include the 4 specific services - taking the first 4 services from the array
  const serviceItems = jasaDigitalServices.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceItems.map((service, index) => (
            <motion.div
              key={service.slug}
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
                animated={false}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Button asChild className="bg-[#00E9F2] hover:bg-[#00E9F2]/80 text-black py-2 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="/jasa-digital">Lihat Semua Layanan</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DigitalServicesSection;
