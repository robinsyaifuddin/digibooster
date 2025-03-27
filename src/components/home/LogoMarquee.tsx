
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LogoMarqueeProps {
  logos: { name: string; image: string }[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  bgColor?: string;
  title?: ReactNode;
  description?: string;
}

const LogoMarquee = ({ 
  logos, 
  direction = 'left', 
  speed = 'medium',
  bgColor = 'bg-white',
  title,
  description
}: LogoMarqueeProps) => {
  // Map speeds to CSS animation durations
  const speedMap = {
    slow: '40s',
    medium: '30s',
    fast: '20s'
  };
  
  const animationDuration = speedMap[speed];
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';
  
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4 mb-10 text-center">
        {title && (
          <h2 className="text-3xl font-bold mb-4">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
      
      <div className="relative overflow-hidden w-full">
        <div 
          className="flex items-center space-x-12 animate-marquee whitespace-nowrap"
          style={{
            animationDuration,
            animationDirection
          }}
        >
          {logos.concat(logos).map((logo, index) => (
            <div 
              key={`${logo.name}-${index}`} 
              className="flex items-center justify-center h-16 bg-white p-2 rounded-md shadow-sm"
            >
              <img 
                src={logo.image} 
                alt={logo.name} 
                className="h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
