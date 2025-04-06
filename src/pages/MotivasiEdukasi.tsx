
import React from 'react';
import { BookOpen, Coffee, Brain, Video, Award, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import CtaComponent from '@/components/common/CtaComponent';

const MotivasiEdukasi = () => {
  const services = [
    {
      icon: <BookOpen className="h-8 w-8 text-neon-purple" />,
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
      icon: <Video className="h-8 w-8 text-neon-purple" />,
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
      icon: <Brain className="h-8 w-8 text-neon-purple" />,
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
      icon: <Award className="h-8 w-8 text-neon-purple" />,
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
      icon: <Lightbulb className="h-8 w-8 text-neon-purple" />,
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
      icon: <Coffee className="h-8 w-8 text-neon-purple" />,
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
    <div className="pt-24 md:pt-32 bg-dark">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <div className="bg-gradient-to-br from-dark-300 to-dark-500 rounded-xl py-16 px-6 shadow-lg border border-neon-purple/30 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-purple rounded-full filter blur-[80px] opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-violet rounded-full filter blur-[80px] opacity-20"></div>
            
            <span className="inline-block py-1 px-3 text-xs font-medium text-white bg-neon-purple/30 border border-neon-purple/50 rounded-full mb-3 backdrop-blur-sm animate-pulse-light">
              PROGRAM KAMI
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Motivasi & <span className="text-neon-purple animate-glow">Edukasi Digital</span>
            </h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Tingkatkan pengetahuan dan keterampilan digital Anda melalui berbagai program motivasi dan edukasi
              yang dirancang untuk membantu Anda tumbuh dalam ekosistem digital.
            </p>
          </div>
        </motion.div>

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
              className="bg-dark-200 rounded-xl p-7 shadow-lg hover:shadow-xl transition-shadow border border-dark-400 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="bg-dark-300 w-16 h-16 rounded-lg flex items-center justify-center mb-6 border border-neon-purple/30 group-hover:border-neon-purple/60 transition-colors">
                <div className="text-neon-purple group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-5">{service.description}</p>
              
              <ul className="space-y-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-neon-purple mr-2">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <CtaComponent
          title="Tingkatkan Pengetahuan Digital Anda!"
          description="Pelajari keterampilan digital terkini dari para ahli dan praktisi berpengalaman untuk mengembangkan karir dan bisnis Anda di era digital."
          buttonText="Hubungi Kami"
          buttonLink="/kontak"
          theme="blue"
        />
      </div>
    </div>
  );
};

export default MotivasiEdukasi;
