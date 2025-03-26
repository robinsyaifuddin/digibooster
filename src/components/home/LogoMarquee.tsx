
import React from 'react';

interface LogoMarqueeProps {
  logos: { name: string; image: string }[];
  direction?: 'left' | 'right';
  bgColor?: string;
  title?: string;
  description?: string;
}

const LogoMarquee = ({ 
  logos, 
  direction = 'left', 
  bgColor = 'bg-black',
  title,
  description
}: LogoMarqueeProps) => {
  // Duplikasi logo untuk efek continuous loop
  const duplicatedLogos = [...logos, ...logos, ...logos];
  
  return (
    <div className={`py-10 ${bgColor} text-white`}>
      {(title || description) && (
        <div className="container mx-auto px-4 text-center mb-8">
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>}
          {description && <p className="max-w-2xl mx-auto">{description}</p>}
        </div>
      )}
      
      <div className="relative overflow-hidden py-6">
        <div className={`flex items-center ${direction === 'left' ? 'logo-marquee-left' : 'logo-marquee-right'}`}>
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-6">
              <img 
                src={logo.image} 
                alt={logo.name} 
                className="h-12 md:h-16 object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
