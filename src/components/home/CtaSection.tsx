
import React from 'react';
import { Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CtaSectionProps {
  companyName: string;
}

const CtaSection = ({ companyName }: CtaSectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-diginavy to-digiblue-800"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-digiblue-300 rounded-full filter blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center scroll-animation">
          <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Siap Tingkatkan Keterampilan Digital Anda?</h2>
          <p className="text-lg text-gray-100 mb-8">
            Bergabunglah dengan ribuan orang yang telah meningkatkan kemampuan digitalnya bersama {companyName}.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white border-none shadow-lg shadow-blue-700/20 group">
                Daftar Sekarang
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/layanan/kelas">
              <Button size="lg" variant="outline" className="border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 group transition-all duration-300">
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
