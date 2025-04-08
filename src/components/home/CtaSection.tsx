
import React from 'react';
import { Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface CtaSectionProps {
  companyName: string;
}

const CtaSection = ({ companyName }: CtaSectionProps) => {
  const { theme } = useTheme();
  
  return (
    <section className={cn(
      "py-20 relative overflow-hidden",
      theme === 'dark' 
        ? "bg-gradient-to-r from-dark-400 to-dark-500" 
        : "bg-gradient-to-r from-digicyan-700 to-digicyan-600"
    )}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full filter blur-3xl opacity-5"></div>
      <div className={cn(
        "absolute bottom-0 left-0 w-64 h-64 rounded-full filter blur-3xl opacity-10",
        theme === 'dark' ? "bg-neon-cyan" : "bg-digicyan-300"
      )}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center scroll-animation">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6",
            theme === 'dark' ? "bg-white/10" : "bg-white/20"
          )}>
            <Zap className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Siap Tingkatkan Keterampilan Digital Anda?</h2>
          <p className="text-lg text-gray-100 mb-8">
            Bergabunglah dengan ribuan orang yang telah meningkatkan kemampuan digitalnya bersama {companyName}.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className={cn(
                "shadow-lg group",
                theme === 'dark'
                  ? "bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-cyan text-dark-500"
                  : "bg-gradient-to-r from-white to-slate-100 hover:from-slate-100 hover:to-white text-digicyan-700 shadow-digicyan-800/20"
              )}>
                Daftar Sekarang
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/program/kelas">
              <Button size="lg" variant="outline" className={cn(
                "group transition-all duration-300",
                theme === 'dark'
                  ? "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
                  : "border-white/60 bg-white/20 text-white hover:bg-white/30 hover:border-white/80"
              )}>
                Lihat Kelas
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
