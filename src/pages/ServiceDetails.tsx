
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight, Play, Heart, Share, Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

// Mock data - in a real app this would come from an API
const serviceData = {
  id: 'service-1',
  title: 'Jasa Pengembangan Website & Aplikasi',
  description: 'Layanan pembuatan website dan aplikasi mobile dengan teknologi terkini untuk berbagai kebutuhan bisnis Anda. Kami membantu mewujudkan visi digital Anda dengan solusi yang terukur, handal, dan user-friendly.',
  longDescription: `
    DigiBooster menyediakan layanan pengembangan website dan aplikasi yang komprehensif untuk memenuhi kebutuhan bisnis Anda. Tim developer profesional kami berpengalaman dalam merancang dan mengembangkan solusi digital yang inovatif, responsif, dan sesuai dengan standar industri terkini.
    
    Kami memahami bahwa setiap bisnis memiliki kebutuhan unik, itulah mengapa kami menawarkan solusi yang disesuaikan dengan kebutuhan spesifik Anda. Mulai dari website perusahaan yang elegan hingga aplikasi mobile yang kompleks, kami siap mewujudkan visi digital Anda.
    
    Dengan pendekatan yang berfokus pada pengguna dan teknologi terkini, kami memastikan bahwa setiap proyek yang kami kerjakan menghasilkan produk yang tidak hanya menarik secara visual, tetapi juga fungsional, mudah digunakan, dan memberikan nilai tambah bagi bisnis Anda.
  `,
  features: [
    'Website Development',
    'Mobile Apps Development',
    'Custom CMS',
    'E-Commerce Solutions',
    'Progressive Web Apps',
    'API Integration',
    'Responsive Design',
    'UI/UX Design',
    'Website Maintenance',
    'Performance Optimization'
  ],
  technologies: [
    'React', 'Next.js', 'Vue', 'Angular',
    'Node.js', 'PHP', 'Laravel', 'Django',
    'WordPress', 'Shopify', 'WooCommerce',
    'React Native', 'Flutter', 'Swift', 'Kotlin'
  ],
  includedServices: [
    'Konsultasi dan analisis kebutuhan',
    'Wireframing dan prototyping',
    'Desain UI/UX',
    'Development dan coding',
    'Testing dan quality assurance',
    'Deployment dan konfigurasi server',
    'Training dan dokumentasi',
    'Support dan maintenance'
  ],
  faqs: [
    {
      question: 'Berapa lama waktu yang diperlukan untuk membuat website?',
      answer: 'Waktu pengembangan website bervariasi tergantung pada kompleksitas proyek. Website sederhana dapat selesai dalam 2-4 minggu, sedangkan website yang lebih kompleks atau aplikasi dapat membutuhkan waktu 2-6 bulan.'
    },
    {
      question: 'Apakah saya bisa mengupdate konten website sendiri?',
      answer: 'Ya, kami mengembangkan website dengan sistem manajemen konten yang user-friendly sehingga Anda dapat dengan mudah mengupdate konten tanpa pengetahuan coding.'
    },
    {
      question: 'Bagaimana dengan hosting dan domain?',
      answer: 'Kami menyediakan layanan hosting dan domain sebagai bagian dari paket pengembangan website kami. Kami juga dapat membantu Anda memilih dan mengonfigurasi hosting yang sesuai dengan kebutuhan Anda.'
    }
  ],
  image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  ],
  rating: 4.8,
  reviews: 124,
  year: '2023',
  category: 'Development',
  duration: '2-12 weeks',
  startingPrice: 'Rp 5,000,000'
};

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the service based on the ID
  // For this example, we'll use the mock data directly
  const service = serviceData;

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-sky-400">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/services" className="hover:text-sky-400">Services</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-white">{service.title}</span>
        </div>
        
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 flex flex-col min-h-[400px] justify-end">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="category-badge">{service.category}</span>
                <span className="text-sm text-gray-300">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {service.duration}
                </span>
                <span className="text-sm text-gray-300">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {service.year}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{service.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(service.rating) ? "fill-yellow-500" : "text-gray-500"} 
                    />
                  ))}
                  <span className="ml-2 text-white">{service.rating}</span>
                  <span className="text-gray-400 ml-2">({service.reviews} reviews)</span>
                </div>
                
                <span className="text-xl text-sky-400 font-bold">
                  From {service.startingPrice}
                </span>
              </div>
              
              <p className="text-gray-300 mb-8 max-w-3xl">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white">
                  <Play className="mr-2 h-5 w-5" />
                  Order Now
                </Button>
                
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                  Consultation
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full border-gray-600 text-gray-300 hover:text-white hover:bg-sky-500/20 hover:border-sky-500"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full border-gray-600 text-gray-300 hover:text-white hover:bg-sky-500/20 hover:border-sky-500"
                >
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <motion.div 
              className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Description</h2>
              <div className="text-gray-300 space-y-4">
                {service.longDescription.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
            
            {/* Features */}
            <motion.div 
              className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-sky-400 mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Technologies */}
            <motion.div 
              className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
            
            {/* Gallery */}
            <motion.div 
              className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Project Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden">
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* FAQs */}
            <motion.div 
              className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-800 pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Order Card */}
            <motion.div 
              className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-800 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-4 text-white">Order Service</h2>
              <div className="text-2xl font-bold text-sky-400 mb-4">
                From {service.startingPrice}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Included Services:</h3>
                <ul className="space-y-2">
                  {service.includedServices.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-sky-400 mr-2 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white mb-3">
                Order Now
              </Button>
              
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                Request Custom Quote
              </Button>
              
              <div className="mt-6 text-center text-gray-400 text-sm flex items-center justify-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Satisfaction guaranteed or money back
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Related Services */}
        <div className="mt-12">
          <h2 className="section-heading">You May Also Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div 
                key={item}
                className="relative rounded-xl overflow-hidden h-72"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0">
                  <img 
                    src={`https://source.unsplash.com/random/300x400?tech=${item}`} 
                    alt={`Related Service ${item}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>
                </div>
                
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-white ml-1">4.{item + 4}</span>
                    </div>
                    <span className="category-badge">Design</span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">UI/UX Design</h3>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      Professional design services for web and mobile applications.
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">2023</span>
                      <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-3 py-0 h-8">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
