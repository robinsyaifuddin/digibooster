
import React from 'react';
import JasaDigitalHero from '@/components/jasa-digital/JasaDigitalHero';
import ServicesGrid from '@/components/jasa-digital/ServicesGrid';
import CtaComponent from '@/components/common/CtaComponent';
import { jasaDigitalServices } from '@/data/jasaDigitalData';

const JasaDigital = () => {
  return (
    <div className="pt-24 md:pt-32 bg-dark">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <JasaDigitalHero />

        {/* Services Grid */}
        <ServicesGrid services={jasaDigitalServices} />

        {/* CTA Section */}
        <CtaComponent
          title="Siap Meningkatkan Bisnis Digital Anda?"
          description="Konsultasikan kebutuhan digital Anda dengan tim ahli kami dan dapatkan solusi yang sesuai dengan bisnis Anda."
          buttonText="Hubungi Kami"
          buttonLink="/kontak"
          theme="blue"
        />
      </div>
    </div>
  );
};

export default JasaDigital;
