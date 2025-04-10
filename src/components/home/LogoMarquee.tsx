
import React, { ReactNode, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PartnerItem } from '@/types/websiteTypes';

interface LogoMarqueeProps {
  logos: PartnerItem[];
  title: ReactNode;
  description?: string;
  speed?: 'slow' | 'medium' | 'fast';
  bgColor?: string;
}

const LogoMarquee = ({ 
  logos, 
  title, 
  description, 
  speed = 'medium',
  bgColor = 'bg-dark-300'
}: LogoMarqueeProps) => {
  // Speed mapping
  const speedMap = {
    slow: 'animate-marquee-slow',
    medium: 'animate-marquee-medium',
    fast: 'animate-marquee-fast'
  };
  
  const animationClass = speedMap[speed];
  
  // Duplicate logos for infinite scroll effect - using useMemo to avoid unnecessary recalculations
  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos]);
  
  // Only render if we have logos
  if (logos.length === 0) return null;
  
  return (
    <section className={cn("py-12 md:py-16 overflow-hidden", bgColor)}>
      <div className="container mx-auto px-4 mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{title}</h3>
        {description && (
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className={cn("flex space-x-6 md:space-x-12 whitespace-nowrap", animationClass)}>
          {duplicatedLogos.map((logo, index) => (
            <Card 
              key={`${logo.id}-${index}`} 
              className="inline-flex items-center justify-center p-3 md:p-4 rounded-lg shadow-md bg-white min-w-[120px] md:min-w-[160px] h-16 md:h-20"
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
                    className="max-h-10 md:max-h-12 max-w-[100px] md:max-w-[120px] object-contain"
                  />
                </a>
              ) : (
                <img 
                  src={logo.image} 
                  alt={logo.name} 
                  className="max-h-10 md:max-h-12 max-w-[100px] md:max-w-[120px] object-contain"
                />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
