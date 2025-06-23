
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, Clock, TrendingUp } from 'lucide-react';
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
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Pilihan Layanan {serviceName}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pilih kategori layanan yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subcategories.map((subcategory, index) => (
            <motion.div
              key={index.toString()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-gray-900/40 to-black border border-gray-800 rounded-xl p-6 hover:border-sky-500/30 transition-all duration-300"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">{subcategory.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{subcategory.description}</p>
                
                <div className="bg-sky-500/10 p-4 rounded-lg mb-4">
                  <div className="flex items-center text-sky-400 text-sm font-medium mb-1">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Kisaran Harga
                  </div>
                  <div className="text-white text-lg font-bold">{subcategory.priceRange}</div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-sky-400" />
                    Fitur yang Tersedia
                  </h4>
                  <ul className="space-y-2">
                    {subcategory.features.map((feature, idx) => (
                      <li key={idx.toString()} className="text-gray-300 text-sm flex items-start">
                        <span className="w-1 h-1 bg-sky-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => handleConsultation(subcategory)}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Konsultasi Gratis
                </Button>
                
                <Button 
                  onClick={() => handleOrder(subcategory)}
                  variant="outline" 
                  className="w-full border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Pesan Sekarang
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSubcategories;
