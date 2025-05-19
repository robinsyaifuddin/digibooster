
import React, { ReactNode, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PartnerItem } from '@/types/websiteTypes';
import { motion } from 'framer-motion';

interface LogoMarqueeProps {
  logos: PartnerItem[];
  title: ReactNode;
  description?: string;
  speed?: 'slow' | 'medium' | 'fast';
  bgColor?: string;
  direction?: 'left' | 'right';
}

const LogoMarquee = ({ 
  logos, 
  title, 
  description, 
  speed = 'medium',
  bgColor = 'bg-dark-300',
  direction = 'left'
}: LogoMarqueeProps) => {
  // Speed mapping
  const speedMap = {
    slow: direction === 'left' ? 'animate-marquee-slow-left' : 'animate-marquee-slow-right',
    medium: direction === 'left' ? 'animate-marquee-medium-left' : 'animate-marquee-medium-right',
    fast: direction === 'left' ? 'animate-marquee-fast-left' : 'animate-marquee-fast-right'
  };
  
  const animationClass = speedMap[speed];
  
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos]);
  
  // Only render if we have logos
  if (logos.length === 0) return null;
  
  return (
    <section className={cn("py-12 md:py-16 overflow-hidden", bgColor)}>
      <div className="container mx-auto px-4 mb-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{title}</h3>
          {description && (
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{description}</p>
          )}
        </motion.div>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <motion.div 
          className={cn("flex space-x-6 md:space-x-12 whitespace-nowrap", animationClass)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {duplicatedLogos.map((logo, index) => (
            <Card 
              key={`${logo.id}-${index}`} 
              className="inline-flex items-center justify-center p-2 md:p-3 rounded-lg shadow-md bg-white min-w-[80px] md:min-w-[120px] h-10 md:h-14 hover:scale-110 transition-transform duration-300"
            >
              {logo.link ? (
                <a 
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={logo.image} 
                    alt={logo.name} 
                    className="max-h-6 md:max-h-8 max-w-[60px] md:max-w-[80px] object-contain"
                  />
                </a>
              ) : (
                <img 
                  src={logo.image} 
                  alt={logo.name} 
                  className="max-h-6 md:max-h-8 max-w-[60px] md:max-w-[80px] object-contain"
                />
              )}
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoMarquee;
