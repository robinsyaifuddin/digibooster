
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { WebsiteData } from '@/stores/websiteDataStore';

interface HeroSectionProps {
  generalInfo: WebsiteData['generalInfo'];
  hero: WebsiteData['homeContent']['hero'];
}

const HeroSection = ({ generalInfo, hero }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-diginavy to-digiblue-700 text-white py-20 md:py-28">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h5 className="text-digiblue-200 mb-3 font-medium">{generalInfo.description}</h5>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block mb-2">{hero.title.split('with')[0]}</span>
            <span className="text-digiblue-300">with {generalInfo.title}</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={hero.ctaLink}>
              <Button size="lg" className="bg-white text-diginavy hover:bg-gray-100 shadow-lg">
                {hero.ctaText}
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Mulai Sekarang
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
