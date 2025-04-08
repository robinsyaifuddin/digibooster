
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

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
  theme: ctaTheme = 'cyan'
}: CtaSectionProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "rounded-2xl p-8 md:p-12 mb-16 text-center",
      theme === 'light' 
        ? ctaTheme === 'cyan'
          ? "bg-gradient-to-r from-digicyan-50/80 to-blue-50/80 border border-digicyan-100 shadow-lg" 
          : "bg-gradient-to-r from-slate-50/90 to-gray-50/90 border border-slate-100 shadow-lg"
        : ctaTheme === 'cyan'
          ? "bg-gradient-to-r from-dark-300 to-dark-200 border border-neon-cyan/20" 
          : "bg-gradient-to-r from-dark-400 to-dark-200 border border-neon-cyan/20"
    )}>
      <h2 className={cn(
        "text-2xl md:text-3xl font-bold mb-4",
        theme === 'light' ? "text-gray-800" : "text-white"
      )}>{title}</h2>
      <p className={cn(
        "max-w-2xl mx-auto mb-8",
        theme === 'light' ? "text-gray-600" : "text-gray-300"
      )}>
        {description}
      </p>
      <a 
        href={buttonLink} 
        className={cn(
          "inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors shadow-md",
          theme === 'light' 
            ? "bg-digicyan-500 hover:bg-digicyan-600 text-white" 
            : "bg-neon-cyan hover:bg-neon-cyan/90 text-gray-900"
        )}
      >
        {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

export default CtaComponent;
