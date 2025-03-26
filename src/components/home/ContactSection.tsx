
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ContactSectionProps {
  companyName: string;
}

const ContactSection = ({ companyName }: ContactSectionProps) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center scroll-animation">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ada pertanyaan?</h2>
          <p className="text-gray-600 mb-8">
            Tim kami siap membantu Anda dengan segala pertanyaan tentang layanan {companyName}.
          </p>
          <Link to="/kontak">
            <Button size="lg" className="bg-diginavy text-white hover:bg-diginavy-800">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
