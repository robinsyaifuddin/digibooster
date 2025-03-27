
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface CtaComponentProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  theme?: 'blue' | 'light' | 'white';
  size?: 'default' | 'large';
  className?: string;
}

const CtaComponent = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  theme = 'blue',
  size = 'default',
  className = ''
}: CtaComponentProps) => {
  // Theme styles
  const themeStyles = {
    blue: "bg-gradient-to-r from-digiblue-800 to-digiblue-600 text-white",
    light: "bg-digiblue-50 text-gray-900",
    white: "bg-white border border-gray-200 text-gray-900"
  };

  // Size styles
  const sizeStyles = {
    default: "p-8 md:p-12 rounded-2xl",
    large: "p-12 md:p-16 rounded-3xl"
  };

  // Button styles based on theme
  const buttonStyles = {
    blue: "bg-white text-digiblue-700 hover:bg-digiblue-50",
    light: "bg-digiblue-600 text-white hover:bg-digiblue-700",
    white: "bg-digiblue-600 text-white hover:bg-digiblue-700"
  };

  // Description text color based on theme
  const descriptionStyles = {
    blue: "text-digiblue-100",
    light: "text-gray-600",
    white: "text-gray-600"
  };

  return (
    <div className={`${themeStyles[theme]} ${sizeStyles[size]} mb-16 text-center ${className}`}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'blue' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <p className={`${descriptionStyles[theme]} max-w-2xl mx-auto mb-8`}>
        {description}
      </p>
      <Link to={buttonLink}>
        <Button 
          className={`px-6 py-3 rounded-full ${buttonStyles[theme]} transition-colors font-medium inline-flex items-center`}
        >
          {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default CtaComponent;
