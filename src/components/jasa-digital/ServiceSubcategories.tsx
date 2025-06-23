
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, Clock, TrendingUp, Star, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceSubcategoryProps } from '@/data/jasaDigitalData';

interface ServiceSubcategoriesProps {
  subcategories: ServiceSubcategoryProps[];
  serviceName: string;
}

const ServiceSubcategories = ({
  subcategories,
  serviceName
}: ServiceSubcategoriesProps) => {
  const navigate = useNavigate();

  const handleConsultation = (subcategory: ServiceSubcategoryProps) => {
    const message = `
*Konsultasi Gratis DigiBooster*
----------------------------
Halo, saya tertarik untuk konsultasi mengenai:

*Layanan:* ${serviceName}
*Kategori:* ${subcategory.title}
*Kisaran Harga:* ${subcategory.priceRange}

Mohon informasi lebih lanjut mengenai layanan ini. Terima kasih!
    `;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285768192419?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOrder = (subcategory: ServiceSubcategoryProps) => {
    navigate(`/order-form?service=${encodeURIComponent(serviceName)}&subcategory=${encodeURIComponent(subcategory.title)}&priceRange=${encodeURIComponent(subcategory.priceRange)}`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sky-400 font-medium mb-2 inline-block">
            KATEGORI LAYANAN
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            {serviceName} - Pilihan Paket
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan budget Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.map((subcategory, index) => (
            <motion.div
              key={index.toString()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-gray-900/80 to-black border border-gray-800 rounded-xl p-6 hover:border-sky-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                  {subcategory.title}
                </h3>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-white">4.8</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {subcategory.description}
              </p>

              <div className="flex items-center mb-4">
                <DollarSign className="h-4 w-4 text-sky-400 mr-1" />
                <span className="text-sky-400 font-semibold">
                  {subcategory.priceRange}
                </span>
              </div>

              <div className="flex items-center text-xs text-gray-500 mb-6">
                <Clock className="h-3 w-3 mr-1" />
                <span>Estimasi: {subcategory.estimatedTime || '1-2 minggu'}</span>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => handleOrder(subcategory)}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                  size="sm"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Pesan Sekarang
                </Button>

                <Button 
                  onClick={() => handleConsultation(subcategory)}
                  variant="outline" 
                  className="w-full border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500"
                  size="sm"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Konsultasi Gratis
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Tidak menemukan paket yang sesuai? Hubungi kami untuk solusi custom
          </p>
          <Button 
            onClick={() => navigate('/kontak?service=' + encodeURIComponent(serviceName))}
            variant="outline" 
            className="border-sky-500 text-sky-400 hover:bg-sky-500/20"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Konsultasi Custom
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSubcategories;
