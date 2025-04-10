
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ContactSectionProps {
  companyName: string;
}

const ContactSection = ({ companyName }: ContactSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-dark-300 to-dark-200">
      {/* Background with gradient */}
      <div className="absolute inset-0 z-0 opacity-70 bg-gradient-to-r from-dark-300 to-dark-200"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full filter blur-3xl bg-neon-cyan/5"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full filter blur-3xl bg-neon-cyan/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto p-12 rounded-2xl shadow-xl border bg-dark-200 border-dark-100">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transform transition-transform hover:scale-110 duration-300 bg-neon-cyan/10">
              <MessageCircle className="h-10 w-10 text-neon-cyan" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
              {t('questions')}
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              {t('team-ready').replace('{companyName}', companyName)}
            </p>
            <Link to="/kontak">
              <Button size="lg" className="group transition-all duration-300 transform hover:-translate-y-1 bg-neon-cyan text-gray-900 hover:bg-neon-cyan/90">
                {t('contact-us')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
