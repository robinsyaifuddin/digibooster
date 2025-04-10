
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import AnimatedSection from '@/components/animation/AnimatedSection';

interface BenefitsSectionProps {
  companyName: string;
  benefits: string[];
}

const BenefitsSection = ({ companyName, benefits }: BenefitsSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-dark-300 to-dark-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 lg:gap-20">
          <AnimatedSection className="md:w-5/12 lg:w-5/12" animation="slideLeft">
            <span className="inline-block py-1 px-3 text-xs font-medium rounded-full mb-3 text-neon-cyan bg-neon-cyan/10">
              {t('our-advantages')}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('why-company').replace('{companyName}', companyName)}
            </h2>
            
            <p className="mb-8 text-gray-300">
              {t('company-description').replace('{companyName}', companyName)}
            </p>
            
            <Link to="/tentang">
              <Button className="group mb-8 bg-neon-cyan text-gray-900 hover:bg-neon-cyan/90">
                {t('learn-more-about')}
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>
          
          <AnimatedSection className="md:w-6/12" animation="slideRight">
            <div className="p-8 rounded-xl shadow-sm bg-dark-200 border border-dark-100">
              <ul className="space-y-5">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 shrink-0 mr-3 mt-0.5 text-neon-cyan" />
                    <div>
                      <p className="text-gray-200">
                        {benefit}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative mt-10 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-lg opacity-20 bg-neon-cyan"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-lg opacity-20 bg-neon-blue"></div>
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="Digital Transformation" 
                className="w-full h-auto rounded-lg relative z-10" 
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
