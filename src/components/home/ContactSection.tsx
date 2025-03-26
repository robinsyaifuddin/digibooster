
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  companyName: string;
}

const ContactSection = ({ companyName }: ContactSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center scroll-animation">
          <div className="bg-diginavy/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-10 w-10 text-diginavy" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ada pertanyaan?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Tim kami siap membantu Anda dengan segala pertanyaan tentang layanan {companyName}.
          </p>
          <Link to="/kontak">
            <Button size="lg" className="bg-diginavy text-white hover:bg-diginavy-800 group">
              Hubungi Kami
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
