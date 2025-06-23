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
  return;
};
export default ServiceSubcategories;