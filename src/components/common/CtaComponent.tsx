
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
      theme === 'dark' 
        ? ctaTheme === 'cyan'
          ? "bg-gradient-to-r from-dark-300 to-dark-200 border border-neon-cyan/20" 
          : "bg-gradient-to-r from-dark-400 to-dark-200 border border-neon-cyan/20"
        : ctaTheme === 'cyan'
          ? "bg-gradient-to-r from-digicyan-50 to-blue-50 border border-digicyan-200/30"
          : "bg-gradient-to-r from-slate-100 to-gray-50 border border-slate-200/50"
    )}>
      <h2 className={cn(
        "text-2xl md:text-3xl font-bold mb-4",
        theme === 'dark' ? "text-white" : "text-gray-800"
      )}>{title}</h2>
      <p className={cn(
        "max-w-2xl mx-auto mb-8",
        theme === 'dark' ? "text-gray-300" : "text-gray-600"
      )}>
        {description}
      </p>
      <a 
        href={buttonLink} 
        className={cn(
          "inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors",
          theme === 'dark' 
            ? "bg-neon-cyan text-dark-900 hover:bg-neon-cyan/90" 
            : "bg-digicyan-500 text-white hover:bg-digicyan-600"
        )}
      >
        {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

export default CtaComponent;
