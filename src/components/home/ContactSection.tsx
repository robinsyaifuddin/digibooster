
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  companyName: string;
}

const ContactSection = ({ companyName }: ContactSectionProps) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50 to-blue-50 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-digiblue/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-digiblue-100/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-xl border border-blue-100 scroll-animation">
          <div className="flex flex-col items-center text-center">
            <div className="bg-digiblue/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 transform transition-transform hover:scale-110 duration-300">
              <MessageCircle className="h-10 w-10 text-digiblue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-digiblue to-digiblue-400 bg-clip-text text-transparent">Ada pertanyaan?</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Tim kami siap membantu Anda dengan segala pertanyaan tentang layanan {companyName}.
            </p>
            <Link to="/kontak">
              <Button size="lg" className="bg-digiblue text-white hover:bg-digiblue-700 group transition-all duration-300 transform hover:-translate-y-1">
                Hubungi Kami
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
