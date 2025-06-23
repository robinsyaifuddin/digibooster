import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { jasaDigitalData } from '@/data/jasaDigitalData';
import { Star, Play, Phone, Mail, Calendar, Check, Info, DollarSign } from 'lucide-react';
import ServiceSubcategories from '@/components/jasa-digital/ServiceSubcategories';

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the service by slug - convert title to slug format for matching
  const service = jasaDigitalData.find(service => 
    service.title.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  // If service not found, redirect to services page
  if (!service) {
    React.useEffect(() => {
      navigate('/program/jasa-digital');
    }, [navigate]);
    return null;
  }

  // Create service image based on service title
  const getServiceImage = (title: string) => {
    const imageMap: { [key: string]: string } = {
      'Website & Aplikasi': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'Desain Grafis': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'Digital Marketing': 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'Foto & Videografi': 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    };
    return imageMap[title] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
  };

  return (
    <div className="bg-black min-h-screen pt-16 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent z-0"></div>
        
        {/* Service image */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="relative h-full w-full">
            <img 
              src={getServiceImage(service.title)} 
              alt={service.title} 
              className="object-cover h-full w-full opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-black/70 to-black"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="text-sky-400 font-medium mb-2 inline-block">
              LAYANAN DIGITAL
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              {service.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i.toString()} 
                    size={16} 
                    className="text-yellow-400 fill-yellow-400" 
                  />
                ))}
                <span className="ml-2 text-white">4.9</span>
              </div>
              <span className="mx-3 text-gray-400">•</span>
              <span className="bg-sky-500/20 text-sky-400 text-xs py-1 px-2 rounded">
                Premium Service
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 text-base md:text-lg">
              {service.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 text-white"
                onClick={() => navigate('/kontak?service=' + encodeURIComponent(service.title))}
              >
                <Phone className="mr-2 h-4 w-4" />
                Konsultasi Gratis
              </Button>
              
              <Button 
                size="lg"
                variant="outline" 
                className="border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500"
                onClick={() => navigate('/order-form?service=' + encodeURIComponent(service.title))}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Pesan Sekarang
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories Section */}
      {service.subcategories && service.subcategories.length > 0 && (
        <ServiceSubcategories 
          subcategories={service.subcategories} 
          serviceName={service.title}
        />
      )}
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
              Apa yang Anda Dapatkan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.items.map((item, index) => (
                <motion.div 
                  key={index.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="mr-4 bg-sky-500/20 p-2 rounded-full mt-1">
                    <Check className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{item}</h3>
                    <p className="text-gray-400">
                      Layanan profesional dengan standar kualitas tinggi
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services */}
      {jasaDigitalData.filter(s => s.title !== service.title).length > 0 && (
        <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              Layanan Terkait
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jasaDigitalData.filter(s => s.title !== service.title).slice(0, 3).map((relatedService, index) => (
                <motion.div
                  key={index.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-b from-gray-900/40 to-black border border-gray-800 rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/layanan/${relatedService.title.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={getServiceImage(relatedService.title)} 
                      alt={relatedService.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                      {relatedService.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {relatedService.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-sky-500/20 text-sky-400 py-1 px-2 rounded">
                        Premium
                      </span>
                      <Button 
                        size="sm" 
                        variant="link" 
                        className="text-sky-400 p-0 hover:text-sky-300"
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-sky-900/30 to-black rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                Butuh Solusi Custom untuk Bisnis Anda?
              </h2>
              <p className="text-gray-300 mb-6">
                Tim ahli DigiBooster siap membantu Anda merancang solusi digital yang sesuai dengan kebutuhan spesifik bisnis Anda. Konsultasikan kebutuhan Anda dengan kami sekarang.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                  onClick={() => navigate('/kontak?service=' + encodeURIComponent(service.title))}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Hubungi Kami
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500"
                  onClick={() => navigate('/portofolio')}
                >
                  Lihat Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
