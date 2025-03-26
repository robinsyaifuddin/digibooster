
import React from 'react';
import { Users, MessageCircle, Briefcase, Globe, LineChart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const SharingKonsultasi = () => {
  const services = [
    {
      icon: <MessageCircle className="h-8 w-8 text-digiblue-600" />,
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
      icon: <LineChart className="h-8 w-8 text-digiblue-600" />,
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
      icon: <Globe className="h-8 w-8 text-digiblue-600" />,
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
      icon: <Briefcase className="h-8 w-8 text-digiblue-600" />,
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
      icon: <Users className="h-8 w-8 text-digiblue-600" />,
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
      icon: <Clock className="h-8 w-8 text-digiblue-600" />,
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
    <div className="pt-24 md:pt-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="inline-block py-1 px-3 text-xs font-medium text-digiblue-600 bg-digiblue-100 rounded-full mb-3">PROGRAM KAMI</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Sharing & <span className="text-digiblue-600">Konsultasi</span> Bisnis
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dapatkan panduan dan solusi dari para ahli untuk mengembangkan bisnis digital Anda
            melalui program konsultasi dan sharing session yang kami tawarkan.
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Butuh Solusi untuk Bisnis Digital Anda?</h2>
          <p className="text-digiblue-100 max-w-2xl mx-auto mb-8">
            Konsultasikan masalah dan tantangan digital Anda dengan tim ahli kami dan dapatkan
            solusi terbaik untuk pengembangan bisnis Anda.
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

export default SharingKonsultasi;
