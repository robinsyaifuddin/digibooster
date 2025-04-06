
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  theme?: 'cyan' | 'dark';
}

const CtaComponent = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  theme = 'cyan'
}: CtaSectionProps) => {
  return (
    <div className={`${
      theme === 'cyan' 
        ? "bg-gradient-to-r from-dark-300 to-dark-200 border border-neon-cyan/20" 
        : "bg-gradient-to-r from-dark-400 to-dark-200 border border-neon-cyan/20"
    } rounded-2xl p-8 md:p-12 mb-16 text-center`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{title}</h2>
      <p className="text-gray-300 max-w-2xl mx-auto mb-8">
        {description}
      </p>
      <a 
        href={buttonLink} 
        className="inline-flex items-center px-6 py-3 rounded-full font-medium bg-neon-cyan text-dark-900 hover:bg-neon-cyan/90 transition-colors"
      >
        {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

export default CtaComponent;
