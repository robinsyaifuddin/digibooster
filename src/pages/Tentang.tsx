
import React from 'react';
import AboutHeroSection from '@/components/about/HeroSection';
import OurStorySection from '@/components/about/OurStorySection';
import ValuesSection from '@/components/about/ValuesSection';
import StatsSection from '@/components/about/StatsSection';
import TimelineSection from '@/components/about/TimelineSection';
import TeamSection from '@/components/about/TeamSection';
import CtaComponent from '@/components/common/CtaComponent';

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
        <CtaComponent
          title="Mari Berkolaborasi!"
          description="Kami siap membantu bisnis Anda berkembang di dunia digital. Hubungi kami untuk mendiskusikan kebutuhan dan tujuan bisnis Anda."
          buttonText="Hubungi Kami Sekarang"
          buttonLink="/kontak"
          theme="light"
        />
      </div>
    </div>
  );
};

export default Tentang;
