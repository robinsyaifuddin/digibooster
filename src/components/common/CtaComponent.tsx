
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CtaSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CtaComponent = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink
}: CtaSectionProps) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-dark-200 to-dark-300 border border-neon-cyan/20 rounded-2xl p-8 md:p-12 mb-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{title}</h2>
      <p className="max-w-2xl mx-auto mb-8 text-gray-300">
        {description}
      </p>
      <a 
        href={buttonLink} 
        className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors shadow-md bg-neon-cyan hover:bg-neon-cyan/90 text-gray-900"
      >
        {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

export default CtaComponent;
