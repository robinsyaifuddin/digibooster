
import React from 'react';
import { BookOpen, Coffee, Brain, Video, Award, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const MotivasiEdukasi = () => {
  const services = [
    {
      icon: <BookOpen className="h-8 w-8 text-digiblue-600" />,
      title: 'E-Book dan Modul Digital',
      description: 'Panduan dan modul pembelajaran digital untuk berbagai topik bisnis dan teknologi digital.',
      items: [
        'E-Book Strategi Digital Marketing',
        'Modul Pengembangan Website',
        'Panduan SEO dan SEM',
        'Handbook Branding Digital',
        'Tutorial Desain Grafis',
        'Modul Konten Kreatif'
      ]
    },
    {
      icon: <Video className="h-8 w-8 text-digiblue-600" />,
      title: 'Webinar dan Workshop Online',
      description: 'Sesi pembelajaran interaktif dengan pakar industri digital tentang berbagai topik terkini.',
      items: [
        'Webinar Tren Digital Terkini',
        'Workshop Pengembangan Konten',
        'Sesi Interaktif SEO',
        'Praktik Langsung UI/UX Design',
        'Pelatihan Analytics & Data',
        'Workshop Storytelling Digital'
      ]
    },
    {
      icon: <Brain className="h-8 w-8 text-digiblue-600" />,
      title: 'Podcast dan Audio Learning',
      description: 'Konten pembelajaran format audio yang bisa diakses kapan saja dan di mana saja.',
      items: [
        'Podcast Bisnis Digital',
        'Diskusi dengan Pakar Industri',
        'Tips dan Trik Digital Marketing',
        'Cerita Sukses Entrepreneur Digital',
        'Tren Teknologi Terkini',
        'Audio Learning untuk Skill Digital'
      ]
    },
    {
      icon: <Award className="h-8 w-8 text-digiblue-600" />,
      title: 'Sertifikasi Digital Skills',
      description: 'Program sertifikasi untuk memvalidasi keahlian digital dan meningkatkan kredibilitas profesional.',
      items: [
        'Sertifikasi Digital Marketing',
        'Sertifikasi Web Development',
        'Sertifikasi Design Thinking',
        'Sertifikasi Content Creation',
        'Sertifikasi SEO Specialist',
        'Sertifikasi Social Media Management'
      ]
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-digiblue-600" />,
      title: 'Motivasi Bisnis Digital',
      description: 'Konten inspiratif dan motivasi untuk membangun mindset sukses di era digital.',
      items: [
        'Kisah Inspiratif Entrepreneur Digital',
        'Tips Mengatasi Tantangan Bisnis',
        'Strategi Growth Mindset',
        'Membangun Resiliensi Digital',
        'Visi dan Misi Bisnis Digital',
        'Life-Work Balance di Era Digital'
      ]
    },
    {
      icon: <Coffee className="h-8 w-8 text-digiblue-600" />,
      title: 'Coffee Talk Digital',
      description: 'Diskusi santai namun mendalam tentang berbagai aspek bisnis dan karir digital.',
      items: [
        'Diskusi Informal Teknologi Terkini',
        'Network dengan Profesional Digital',
        'Sharing Session dengan Praktisi',
        'Q&A dengan Pakar Industri',
        'Diskusi Tantangan Bisnis Digital',
        'Brainstorming Ide Inovatif'
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 md:pt-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="inline-block py-1 px-3 text-xs font-medium text-digiblue-600 bg-digiblue-100 rounded-full mb-3">PROGRAM KAMI</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Motivasi & <span className="text-digiblue-600">Edukasi Digital</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tingkatkan pengetahuan dan keterampilan digital Anda melalui berbagai program motivasi dan edukasi
            yang dirancang untuk membantu Anda tumbuh dalam ekosistem digital.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-xl p-7 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="bg-digiblue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-5">{service.description}</p>
              
              <ul className="space-y-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-digiblue-600 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-digiblue-800 to-digiblue-600 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Tingkatkan Pengetahuan Digital Anda!</h2>
          <p className="text-digiblue-100 max-w-2xl mx-auto mb-8">
            Pelajari keterampilan digital terkini dari para ahli dan praktisi berpengalaman untuk 
            mengembangkan karir dan bisnis Anda di era digital.
          </p>
          <a 
            href="/kontak" 
            className="inline-flex items-center px-6 py-3 bg-white text-digiblue-700 rounded-full hover:bg-digiblue-50 transition-colors font-medium"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
};

export default MotivasiEdukasi;
