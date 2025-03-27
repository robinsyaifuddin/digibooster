
import React from 'react';
import { ArrowRight } from 'lucide-react';
import AboutHeroSection from '@/components/about/HeroSection';
import OurStorySection from '@/components/about/OurStorySection';
import ValuesSection from '@/components/about/ValuesSection';
import StatsSection from '@/components/about/StatsSection';
import TimelineSection from '@/components/about/TimelineSection';
import TeamSection from '@/components/about/TeamSection';

const Tentang = () => {
  return (
    <div className="pt-24 md:pt-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <AboutHeroSection />

        {/* Our Story Section */}
        <OurStorySection />

        {/* Values Section */}
        <ValuesSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Timeline Section */}
        <TimelineSection />

        {/* Team Section */}
        <TeamSection />

        {/* CTA Section */}
        <div className="bg-digiblue-50 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Mari Berkolaborasi!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Kami siap membantu bisnis Anda berkembang di dunia digital. Hubungi kami untuk mendiskusikan
            kebutuhan dan tujuan bisnis Anda.
          </p>
          <a 
            href="/kontak" 
            className="inline-flex items-center px-6 py-3 bg-digiblue-600 text-white rounded-full hover:bg-digiblue-700 transition-colors font-medium shadow-md"
          >
            Hubungi Kami Sekarang <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tentang;
