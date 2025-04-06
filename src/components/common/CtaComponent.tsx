
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CtaComponentProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  theme?: 'light' | 'dark' | 'blue';
}

const CtaComponent = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  theme = 'dark'
}: CtaComponentProps) => {
  const getThemeClasses = () => {
    switch(theme) {
      case 'light':
        return {
          container: 'bg-dark-200 border border-neon-purple/30',
          title: 'text-white',
          description: 'text-gray-300',
          button: 'bg-neon-purple hover:bg-neon-violet text-white'
        };
      case 'blue':
        return {
          container: 'bg-gradient-to-br from-dark-300 to-dark-400 border border-neon-purple/30',
          title: 'text-white',
          description: 'text-gray-300',
          button: 'bg-neon-purple hover:bg-neon-violet text-white'
        };
      case 'dark':
      default:
        return {
          container: 'bg-dark-300 border border-neon-purple/20',
          title: 'text-white',
          description: 'text-gray-300',
          button: 'bg-gradient-to-r from-neon-purple to-neon-violet hover:from-neon-violet hover:to-neon-purple text-white'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`rounded-lg shadow-lg p-8 md:p-12 my-16 relative overflow-hidden ${themeClasses.container}`}>
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-purple rounded-full filter blur-[80px] opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-violet rounded-full filter blur-[80px] opacity-10 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 text-center">
        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${themeClasses.title}`}>
          {title}
        </h2>
        <p className={`text-base md:text-lg mb-8 max-w-3xl mx-auto ${themeClasses.description}`}>
          {description}
        </p>
        <Link to={buttonLink}>
          <Button className={`px-6 py-3 rounded-md group ${themeClasses.button}`}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CtaComponent;
