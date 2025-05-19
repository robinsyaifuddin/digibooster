
import React from 'react';
import { Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CtaSectionProps {
  companyName: string;
}

const CtaSection = ({ companyName }: CtaSectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-dark-300 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-300/50 to-transparent"></div>
      <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-sky-500/10 filter blur-3xl"></div>
      <div className="absolute bottom-40 -left-32 w-96 h-96 rounded-full bg-sky-500/10 filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl border border-gray-800/50 backdrop-blur-sm bg-gray-900/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-sky-400 to-sky-600">
            <Zap className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">
            Siap untuk Bertransformasi Digital?
          </h2>
          
          <p className="text-lg mb-8 text-gray-300 text-center max-w-2xl mx-auto">
            Mulai perjalanan digital Anda bersama {companyName} dan rasakan perbedaan nyata untuk pertumbuhan bisnis Anda. Ratusan bisnis telah berkembang dengan bantuan layanan kami.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/kontak">
              <Button size="lg" className="w-full sm:w-auto shadow-lg group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white">
                Konsultasi Gratis
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/portofolio">
              <Button size="lg" variant="outline" className="w-full sm:w-auto group border-gray-500 text-white hover:bg-sky-500/20 hover:border-sky-500">
                Lihat Portfolio
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
