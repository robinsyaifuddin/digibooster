
import React from 'react';
import { Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface CtaSectionProps {
  companyName: string;
}

const CtaSection = ({ companyName }: CtaSectionProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <section className={cn(
      "py-20 relative overflow-hidden",
      theme === 'light' 
        ? "bg-gradient-to-r from-digicyan-100 to-digicyan-50" 
        : "bg-gradient-to-r from-dark-400 to-dark-500"
    )}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full filter blur-3xl opacity-5"></div>
      <div className={cn(
        "absolute bottom-0 left-0 w-64 h-64 rounded-full filter blur-3xl opacity-10",
        theme === 'light' ? "bg-digicyan-300" : "bg-neon-cyan"
      )}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center scroll-animation">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6",
            theme === 'light' ? "bg-digicyan-300/30" : "bg-white/10"
          )}>
            <Zap className={cn(
              "h-8 w-8",
              theme === 'light' ? "text-digicyan-500" : "text-white"
            )} />
          </div>
          
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            theme === 'light' ? "text-gray-800" : "text-white"
          )}>
            {t('ready-to-improve')}
          </h2>
          <p className={cn(
            "text-lg mb-8",
            theme === 'light' ? "text-gray-600" : "text-gray-100"
          )}>
            {t('join-thousands').replace('{companyName}', companyName)}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className={cn(
                "shadow-lg group",
                theme === 'light'
                  ? "bg-gradient-to-r from-digicyan-500 to-digicyan-600 hover:from-digicyan-600 hover:to-digicyan-700 text-white"
                  : "bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-cyan text-gray-900"
              )}>
                {t('register-now')}
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/program/kelas">
              <Button size="lg" variant="outline" className={cn(
                "group transition-all duration-300",
                theme === 'light'
                  ? "border-digicyan-300 bg-white/50 text-digicyan-700 hover:bg-white/80 hover:border-digicyan-400"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
              )}>
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
