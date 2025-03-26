
import React from 'react';
import { ArrowRight, Code, Lightbulb, Users, PenTool, DollarSign, Shield, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '@/types/websiteTypes';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="h-6 w-6 text-white" />;
      case 'Lightbulb': return <Lightbulb className="h-6 w-6 text-white" />;
      case 'Users': return <Users className="h-6 w-6 text-white" />;
      case 'PenTool': return <PenTool className="h-6 w-6 text-white" />;
      case 'DollarSign': return <DollarSign className="h-6 w-6 text-white" />;
      case 'Shield': return <Shield className="h-6 w-6 text-white" />;
      case 'Gift': return <Gift className="h-6 w-6 text-white" />;
      default: return <Code className="h-6 w-6 text-white" />;
    }
  };

  // Modern service titles that match the reference image
  const getModernTitle = (originalTitle: string, index: number) => {
    const modernTitles = [
      "Layanan All in Request",
      "Harga Bisa Request",
      "Ready to Customs",
      "Alur Pekerjaan Jelas",
      "Garansi Selamanya",
      "Ada Bonus Gratis"
    ];
    
    return modernTitles[index % modernTitles.length];
  };

  // Modern descriptions that match the reference image
  const getModernDescription = (originalDesc: string, index: number) => {
    const modernDescriptions = [
      "Tak hanya website, DigiBooster juga bisa membuatkan kamu video promosi & sekalian iklan di Google",
      "Suka sama DigiBooster tapi harga belum cocok? Santai, kamu bisa tentukan harga websitemu sendiri",
      "Selain web company & toko online, DigiBooster juga siap untuk membuat website kompleks / custom",
      "Kami memiliki cara kerja yang efisien dan profesional untuk membuat websitemu go-online dengan sangat baik",
      "Tak perlu khawatir soal support atau maintenance, DigiBooster siap beri garansi website seumur hidup",
      "Dapatkan paket website, DigiBooster akan memberikan bonus yang sangat berguna buat bisnismu"
    ];
    
    return modernDescriptions[index % modernDescriptions.length];
  };

  return (
    <div 
      className="bg-purple-600 rounded-xl p-6 text-white transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 scroll-animation"
      style={{ 
        animationDelay: `${index * 100}ms`,
        background: "linear-gradient(145deg, rgba(147, 51, 234, 0.9), rgba(126, 34, 206, 0.95))" 
      }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-5">
          <div className="bg-purple-800/50 w-14 h-14 rounded-full flex items-center justify-center">
            {getIconComponent(service.icon)}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3">{getModernTitle(service.title, index)}</h3>
        
        <p className="text-purple-100 mb-6 flex-grow">{getModernDescription(service.description, index)}</p>
        
        <Link to={service.link} className="text-white font-medium flex items-center hover:underline group mt-auto">
          Selengkapnya 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
