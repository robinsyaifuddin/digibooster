
import React from 'react';
import { Users, MessageCircle, Briefcase, Globe, LineChart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import CtaComponent from '@/components/common/CtaComponent';

const SharingKonsultasi = () => {
  const services = [
    {
      icon: <MessageCircle className="h-8 w-8 text-neon-purple" />,
      title: 'Konsultasi Bisnis Digital',
      description: 'Konsultasi one-on-one dengan pakar bisnis digital untuk solusi permasalahan spesifik bisnis Anda.',
      items: [
        'Analisis Model Bisnis Digital',
        'Strategi Monetisasi Online',
        'Peningkatan Konversi Website',
        'Optimasi Proses Bisnis Digital',
        'Analisis Kompetitor',
        'Risk Management Digital'
      ]
    },
    {
      icon: <LineChart className="h-8 w-8 text-neon-purple" />,
      title: 'Analisis Performa Digital',
      description: 'Analisis mendalam tentang performa digital bisnis Anda dan rekomendasi untuk peningkatan.',
      items: [
        'Audit Website & SEO',
        'Analisis Media Sosial',
        'Performance Marketing Review',
        'User Experience Analysis',
        'Conversion Rate Optimization',
        'Traffic Analysis & Improvement'
      ]
    },
    {
      icon: <Globe className="h-8 w-8 text-neon-purple" />,
      title: 'Strategi Go Digital',
      description: 'Pendampingan transformasi digital untuk bisnis tradisional yang ingin merambah pasar online.',
      items: [
        'Roadmap Transformasi Digital',
        'Strategi Omnichannel',
        'Implementasi Teknologi Baru',
        'Digital Readiness Assessment',
        'Integrasi Sistem Online-Offline',
        'Training Team untuk Digital'
      ]
    },
    {
      icon: <Briefcase className="h-8 w-8 text-neon-purple" />,
      title: 'Mentoring Startup Digital',
      description: 'Program mentoring khusus untuk startup digital dengan pendampingan berkelanjutan.',
      items: [
        'Validasi Ide & Model Bisnis',
        'Strategi Go-to-Market',
        'Fundraising & Pitching',
        'Scaling Strategy',
        'Product Development',
        'Team Building'
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-neon-purple" />,
      title: 'Sharing Session Komunitas',
      description: 'Forum diskusi dan sharing knowledge antar pelaku bisnis digital dalam komunitas eksklusif.',
      items: [
        'Diskusi Trend Digital Terkini',
        'Problem Solving Bersama',
        'Case Study Sukses & Gagal',
        'Networking Antar Pelaku Bisnis',
        'Kolaborasi Antar Bisnis',
        'Sharing Best Practices'
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-neon-purple" />,
      title: 'Sesi Quick Consultation',
      description: 'Konsultasi singkat namun efektif untuk masalah spesifik yang membutuhkan solusi cepat.',
      items: [
        'Troubleshooting Digital',
        'Review Cepat Strategi Digital',
        'Solusi untuk Masalah Spesifik',
        'Second Opinion untuk Keputusan',
        'Brainstorming Ide & Solusi',
        'Quick Tips & Hacks'
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
              Sharing & <span className="text-neon-purple animate-glow">Konsultasi</span> Bisnis
            </h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Dapatkan panduan dan solusi dari para ahli untuk mengembangkan bisnis digital Anda
              melalui program konsultasi dan sharing session yang kami tawarkan.
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
          title="Butuh Solusi untuk Bisnis Digital Anda?"
          description="Konsultasikan masalah dan tantangan digital Anda dengan tim ahli kami dan dapatkan solusi terbaik untuk pengembangan bisnis Anda."
          buttonText="Hubungi Kami"
          buttonLink="/kontak"
          theme="blue"
        />
      </div>
    </div>
  );
};

export default SharingKonsultasi;
