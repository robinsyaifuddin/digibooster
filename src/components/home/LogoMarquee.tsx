
import React from 'react';

interface LogoMarqueeProps {
  logos: { name: string; image: string }[];
}

const LogoMarquee = ({ logos }: LogoMarqueeProps) => {
  // Duplikasi logo untuk efek continuous loop
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex items-center logo-marquee">
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-6">
            <img 
              src={logo.image} 
              alt={logo.name} 
              className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
