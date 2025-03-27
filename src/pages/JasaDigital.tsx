import React from 'react';
import { Code, PenTool, Megaphone, FileText, Camera, FileCog, DatabaseIcon, Server, LineChart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import CtaComponent from '@/components/common/CtaComponent';

const JasaDigital = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8 text-digiblue-600" />,
      title: 'Pengembangan Website & Aplikasi',
      description: 'Kami mengembangkan website dan aplikasi yang responsif, cepat, dan SEO-friendly untuk berbagai kebutuhan bisnis.',
      items: [
        'Website Perusahaan & Landing Page',
        'Toko Online & E-commerce',
        'Aplikasi Web Custom',
        'Aplikasi Mobile (Android & iOS)',
        'Sistem Informasi & Database',
        'Integrasi API & Sistem Third-party'
      ]
    },
    {
      icon: <PenTool className="h-8 w-8 text-digiblue-600" />,
      title: 'Desain Grafis',
      description: 'Tim desainer kami akan membuat visual menarik yang mencerminkan identitas brand Anda.',
      items: [
        'Desain Logo & Branding',
        'UI/UX Design',
        'Desain Media Sosial',
        'Infografis & Presentasi',
        'Desain Kemasan Produk',
        'Desain Marketing Materials'
      ]
    },
    {
      icon: <Megaphone className="h-8 w-8 text-digiblue-600" />,
      title: 'Digital Marketing & Branding',
      description: 'Strategi pemasaran digital yang efektif untuk meningkatkan brand awareness dan penjualan.',
      items: [
        'Social Media Marketing',
        'Search Engine Optimization (SEO)',
        'Google Ads & Facebook Ads',
        'Email Marketing',
        'Content Marketing',
        'Brand Strategy & Development'
      ]
    },
    {
      icon: <FileText className="h-8 w-8 text-digiblue-600" />,
      title: 'Manajemen Konten',
      description: 'Pembuatan dan pengelolaan konten berkualitas untuk website dan media sosial Anda.',
      items: [
        'Copywriting & Blog Writing',
        'Konten Media Sosial',
        'Pengelolaan Konten Website',
        'Strategi Konten',
        'Penerbitan Konten Berkala',
        'Optimasi Konten untuk SEO'
      ]
    },
    {
      icon: <Camera className="h-8 w-8 text-digiblue-600" />,
      title: 'Edit Video dan Fotografi',
      description: 'Layanan profesional untuk kebutuhan visual media dan marketing Anda.',
      items: [
        'Foto Produk & Corporate',
        'Videografi Produk & Promosi',
        'Editing Video Profesional',
        'Motion Graphics & Animation',
        'Live Streaming Setup',
        'Podcast Production'
      ]
    },
    {
      icon: <FileCog className="h-8 w-8 text-digiblue-600" />,
      title: 'Administrasi Digital',
      description: 'Pengelolaan sistem digital dan automasi untuk efisiensi operasional bisnis.',
      items: [
        'Document Management System',
        'Workflow Automation',
        'Data Entry & Processing',
        'Cloud Storage Setup',
        'Digital Asset Management',
        'System Integration'
      ]
    },
    {
      icon: <DatabaseIcon className="h-8 w-8 text-digiblue-600" />,
      title: 'Database Management',
      description: 'Pengelolaan dan optimasi database untuk kebutuhan bisnis dan aplikasi Anda.',
      items: [
        'Perancangan & Implementasi Database',
        'Migrasi Database',
        'Database Optimization',
        'Data Backup & Recovery',
        'Data Warehouse Solutions',
        'Big Data Processing'
      ]
    },
    {
      icon: <Server className="h-8 w-8 text-digiblue-600" />,
      title: 'Hosting & Domain Management',
      description: 'Layanan hosting dan pengelolaan domain yang handal untuk website dan aplikasi.',
      items: [
        'Web Hosting Setup',
        'Domain Registration & Management',
        'Server Configuration',
        'SSL Certificate Setup',
        'Website Maintenance',
        'Performance Optimization'
      ]
    },
    {
      icon: <LineChart className="h-8 w-8 text-digiblue-600" />,
      title: 'Analytics & Reporting',
      description: 'Analisis data dan pembuatan laporan untuk mengukur performa digital Anda.',
      items: [
        'Google Analytics Setup',
        'Performance Dashboards',
        'Competitive Analysis',
        'Custom Reports',
        'User Behavior Analysis',
        'Conversion Tracking'
      ]
    },
    {
      icon: <Share2 className="h-8 w-8 text-digiblue-600" />,
      title: 'Social Media Management',
      description: 'Pengelolaan media sosial untuk meningkatkan engagement dan brand awareness.',
      items: [
        'Content Planning & Calendar',
        'Community Management',
        'Social Media Audit',
        'Influencer Collaboration',
        'Social Media Advertising',
        'Performance Analysis'
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
            Layanan Jasa <span className="text-digiblue-600">Digital</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan berbagai layanan jasa digital komprehensif untuk membantu bisnis Anda tumbuh dan berkembang di era digital. 
            Tim ahli kami siap memberikan solusi terbaik sesuai kebutuhan Anda.
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
        <CtaComponent
          title="Siap Meningkatkan Bisnis Digital Anda?"
          description="Konsultasikan kebutuhan digital Anda dengan tim ahli kami dan dapatkan solusi yang sesuai dengan bisnis Anda."
          buttonText="Hubungi Kami"
          buttonLink="/kontak"
          theme="blue"
        />
      </div>
    </div>
  );
};

export default JasaDigital;
