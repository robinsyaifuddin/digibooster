
import React, { ReactNode } from 'react';
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
  bgColor = 'bg-white'
}: LogoMarqueeProps) => {
  // Speed mapping
  const speedMap = {
    slow: 'animate-marquee-slow',
    medium: 'animate-marquee-medium',
    fast: 'animate-marquee-fast'
  };
  
  const animationClass = speedMap[speed];
  
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <section className={cn("py-12 md:py-16 overflow-hidden", bgColor)}>
      <div className="container mx-auto px-4 mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>
        {description && (
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className={cn("flex space-x-12 whitespace-nowrap", animationClass)}>
          {duplicatedLogos.map((logo, index) => (
            <Card key={`${logo.id}-${index}`} className="inline-flex items-center justify-center p-4 rounded-lg shadow-sm border-gray-100 min-w-[160px] h-20">
              <img 
                src={logo.image} 
                alt={logo.name} 
                className="max-h-12 max-w-[120px] object-contain"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
