
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { WebsiteData } from '@/stores/websiteDataStore';

interface HeroSectionProps {
  generalInfo: WebsiteData['generalInfo'];
  hero: WebsiteData['homeContent']['hero'];
}

const HeroSection = ({ generalInfo, hero }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-diginavy to-digiblue-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-digiblue-400 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-digiblue-200 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-digiblue-200 font-medium text-sm mb-3 border border-white/10">
              {generalInfo.description}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block mb-2">{hero.title.split('with')[0]}</span>
            <span className="bg-gradient-to-r from-white to-digiblue-300 bg-clip-text text-transparent">
              with <span className="text-digiblue-300">{generalInfo.title}</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-3xl">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={hero.ctaLink}>
              <Button size="lg" className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-none shadow-lg shadow-blue-500/20 group">
                {hero.ctaText}
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 group transition-all duration-300">
                Mulai Sekarang
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,266.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
