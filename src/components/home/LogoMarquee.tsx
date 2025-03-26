
import React from 'react';

interface LogoMarqueeProps {
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  logos: Array<{ name: string; image: string }>;
  bgColor?: string;
  title?: string;
  description?: string;
}

const LogoMarquee = ({
  direction = 'left',
  speed = 'medium',
  logos,
  bgColor = 'bg-white',
  title,
  description
}: LogoMarqueeProps) => {
  const speedClass = 
    speed === 'slow' ? 'animate-marquee-slow' : 
    speed === 'fast' ? 'animate-marquee-fast' : 
    'animate-marquee';
  
  const directionClass = direction === 'right' ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={`py-8 md:py-12 ${bgColor} overflow-hidden`}>
      {(title || description) && (
        <div className="text-center mb-8">
          {title && <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>}
          {description && <p className="text-gray-600 max-w-2xl mx-auto px-4">{description}</p>}
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <div className={`flex ${directionClass} space-x-12 ${speedClass}`}>
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex items-center justify-center h-12 md:h-16 px-5 grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src={logo.image} 
                alt={logo.name} 
                className="h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
