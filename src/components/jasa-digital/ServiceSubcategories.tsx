
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

const ServiceSubcategories = ({ subcategories, serviceName }: ServiceSubcategoriesProps) => {
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Kategori Layanan {serviceName}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pilih kategori layanan yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {subcategories.map((subcategory, index) => (
            <motion.div
              key={subcategory.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-900/90 to-black border border-gray-800 rounded-xl p-6 h-full hover:border-sky-500/30 transition-all duration-300 hover:transform hover:scale-105">
                {/* Popular badge */}
                {subcategory.popular && (
                  <div className="absolute -top-3 -right-3 bg-sky-500 text-white text-xs py-1 px-3 rounded-full font-medium shadow-lg">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    Popular
                  </div>
                )}

                {/* Icon */}
                <div className="bg-sky-500/20 p-3 rounded-xl mb-4 w-fit">
                  {subcategory.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                  {subcategory.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {subcategory.description}
                </p>

                {/* Price and Duration */}
                <div className="bg-sky-500/10 p-4 rounded-lg mb-4">
                  <div className="text-sky-400 text-sm font-medium mb-1">Kisaran Harga</div>
                  <div className="text-white text-lg font-bold mb-2">{subcategory.priceRange}</div>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {subcategory.duration}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Fitur Utama:</h4>
                  <ul className="space-y-1">
                    {subcategory.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-400">
                        <span className="inline-block w-1 h-1 rounded-full bg-sky-400 mt-1.5 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                    {subcategory.features.length > 3 && (
                      <li className="text-xs text-sky-300">
                        +{subcategory.features.length - 3} fitur lainnya
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-sky-500/50 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500 text-xs"
                    onClick={() => handleConsultation(subcategory)}
                  >
                    <Phone className="h-3 w-3 mr-2" />
                    Konsultasi Gratis
                  </Button>
                  
                  <Button
                    size="sm"
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-xs"
                    onClick={() => handleOrder(subcategory)}
                  >
                    <Calendar className="h-3 w-3 mr-2" />
                    Pesan Sekarang
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSubcategories;
