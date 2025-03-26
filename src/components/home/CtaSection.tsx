
import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CtaSectionProps {
  companyName: string;
}

const CtaSection = ({ companyName }: CtaSectionProps) => {
  return (
    <section className="bg-gradient-to-r from-diginavy to-digiblue-800 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center scroll-animation">
          <Zap className="h-16 w-16 mx-auto mb-6 text-digiblue-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Tingkatkan Keterampilan Digital Anda?</h2>
          <p className="text-lg text-gray-100 mb-8">
            Bergabunglah dengan ribuan orang yang telah meningkatkan kemampuan digitalnya bersama {companyName}.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-diginavy hover:bg-gray-100">
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/layanan/kelas">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Lihat Kelas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
