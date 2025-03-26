
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BenefitsSectionProps {
  companyName: string;
  benefits: string[];
}

const BenefitsSection = ({ companyName, benefits }: BenefitsSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 scroll-animation">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mengapa {companyName}?</h2>
            <p className="text-gray-600 mb-8">
              {companyName} hadir sebagai solusi terpadu untuk kebutuhan digitalisasi Anda. Dengan pendekatan yang komprehensif, kami membantu baik individu maupun bisnis mencapai potensi maksimal di era digital.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-diginavy shrink-0 mr-3" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <Link to="/tentang">
                <Button className="bg-diginavy text-white hover:bg-diginavy-800">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 scroll-animation">
            <div className="relative">
              <div className="absolute -top-4 -left-4 bg-diginavy w-24 h-24 rounded-lg opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 bg-digiblue-700 w-24 h-24 rounded-lg opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="Digital Transformation" 
                className="w-full h-auto rounded-lg shadow-lg relative z-10" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
