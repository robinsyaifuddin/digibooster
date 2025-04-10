
import React from 'react';
import { Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CtaSectionProps {
  companyName: string;
}

const CtaSection = ({ companyName }: CtaSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-r from-dark-400 to-dark-300">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full filter blur-3xl opacity-10 bg-neon-cyan"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center scroll-animation">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/10">
            <Zap className="h-8 w-8 text-neon-cyan" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('ready-to-improve')}
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            {t('join-thousands').replace('{companyName}', companyName)}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="shadow-lg group bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-cyan text-gray-900">
                {t('register-now')}
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/program/kelas">
              <Button size="lg" variant="outline" className="group transition-all duration-300 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60">
                {t('view-classes')}
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
