
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BenefitsSectionProps {
  companyName: string;
  benefits: string[];
}

const BenefitsSection = ({ companyName, benefits }: BenefitsSectionProps) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-sky-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 lg:gap-20">
          <div className="md:w-5/12 lg:w-5/12 scroll-animation">
            <span className="inline-block py-1 px-3 text-xs font-medium text-digiblue bg-digiblue/10 rounded-full mb-3">KEUNGGULAN KAMI</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-diginavy-900">Mengapa {companyName}?</h2>
            <p className="text-gray-600 mb-8">
              {companyName} hadir sebagai solusi terpadu untuk kebutuhan digitalisasi Anda. Dengan pendekatan yang komprehensif, kami membantu baik individu maupun bisnis mencapai potensi maksimal di era digital.
            </p>
            
            <Link to="/tentang">
              <Button className="bg-digiblue text-white hover:bg-digiblue-700 group mb-8">
                Pelajari Lebih Lanjut
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="md:w-6/12 scroll-animation">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-blue-100">
              <ul className="space-y-5">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-digiblue shrink-0 mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative mt-10 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute -top-4 -left-4 bg-digiblue w-20 h-20 rounded-lg opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 bg-digiblue-700 w-20 h-20 rounded-lg opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="Digital Transformation" 
                className="w-full h-auto rounded-lg relative z-10" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
