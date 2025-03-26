
import React from 'react';
import { BookOpen, Users, Monitor, Calendar, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Kelas = () => {
  const classes = [
    {
      icon: <Monitor className="h-8 w-8 text-purple-600" />,
      title: 'Digital Marketing Essentials',
      description: 'Kelas intensif 3 hari untuk memahami dasar-dasar digital marketing yang efektif.',
      details: {
        duration: '3 hari (6 jam/hari)',
        participants: 'Maksimal 20 orang',
        level: 'Pemula',
        schedule: 'Fleksibel (Online/Offline)'
      },
      topics: [
        'Dasar-dasar Digital Marketing',
        'SEO & SEM Fundamentals',
        'Social Media Marketing',
        'Content Marketing Strategy',
        'Email Marketing',
        'Analytics & Measurement'
      ]
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: 'Web Development Bootcamp',
      description: 'Bootcamp intensif pengembangan website dari dasar hingga mampu membangun website sendiri.',
      details: {
        duration: '5 hari (8 jam/hari)',
        participants: 'Maksimal 15 orang',
        level: 'Pemula hingga Menengah',
        schedule: 'Batch Bulanan'
      },
      topics: [
        'HTML, CSS Fundamentals',
        'JavaScript Essentials',
        'Responsive Web Design',
        'Website Optimization',
        'Basic Backend Integration',
        'Project Development'
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Social Media Management',
      description: 'Kelas pengelolaan media sosial profesional untuk meningkatkan engagement dan konversi.',
      details: {
        duration: '2 hari (7 jam/hari)',
        participants: 'Maksimal 25 orang',
        level: 'Semua Level',
        schedule: 'Bulanan'
      },
      topics: [
        'Content Planning & Calendar',
        'Visual Content Creation',
        'Community Management',
        'Advertising on Social Media',
        'Analytics & Reporting',
        'Crisis Management'
      ]
    },
    {
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      title: 'Content Creation Masterclass',
      description: 'Kelas pembuatan konten berkualitas tinggi untuk berbagai platform digital.',
      details: {
        duration: '3 hari (5 jam/hari)',
        participants: 'Maksimal 20 orang',
        level: 'Menengah',
        schedule: 'Kuartalan'
      },
      topics: [
        'Content Strategy Development',
        'Copywriting for Digital',
        'Visual Content Creation',
        'Video Content Production',
        'SEO Content Optimization',
        'Content Distribution'
      ]
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: 'UX/UI Design Workshop',
      description: 'Workshop desain pengalaman pengguna untuk menciptakan produk digital yang user-friendly.',
      details: {
        duration: '4 hari (6 jam/hari)',
        participants: 'Maksimal 15 orang',
        level: 'Menengah hingga Lanjutan',
        schedule: 'Per Kuartal'
      },
      topics: [
        'User Research Methods',
        'Information Architecture',
        'Wireframing & Prototyping',
        'Visual Design Principles',
        'Usability Testing',
        'Design Systems'
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: 'E-commerce Business Class',
      description: 'Kelas komprehensif untuk memulai dan mengembangkan bisnis e-commerce yang sukses.',
      details: {
        duration: '3 hari (7 jam/hari)',
        participants: 'Maksimal 20 orang',
        level: 'Semua Level',
        schedule: 'Tiap 2 Bulan'
      },
      topics: [
        'E-commerce Business Model',
        'Platform Selection & Setup',
        'Product Photography',
        'Inventory & Fulfillment',
        'Customer Service Excellence',
        'Growth & Scaling Strategies'
      ]
    },
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
          <span className="inline-block py-1 px-3 text-xs font-medium text-purple-600 bg-purple-100 rounded-full mb-3">PROGRAM KAMI</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Short Class & <span className="text-purple-600">Mini Bootcamp</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tingkatkan keterampilan digital Anda melalui kelas intensif dan bootcamp yang dirancang
            untuk memberikan pengetahuan praktis dalam waktu singkat.
          </p>
        </div>

        {/* Classes Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {classes.map((classItem, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="bg-purple-50 p-6">
                <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center mb-4">
                  {classItem.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{classItem.title}</h3>
                <p className="text-gray-600">{classItem.description}</p>
              </div>
              
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Detail Kelas</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Durasi</p>
                    <p className="text-sm font-medium">{classItem.details.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Peserta</p>
                    <p className="text-sm font-medium">{classItem.details.participants}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Level</p>
                    <p className="text-sm font-medium">{classItem.details.level}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Jadwal</p>
                    <p className="text-sm font-medium">{classItem.details.schedule}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Materi Kelas</h4>
                <ul className="space-y-2">
                  {classItem.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="mt-6 w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
                  Daftar Kelas
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Siap Meningkatkan Skill Digital Anda?</h2>
          <p className="text-purple-100 max-w-2xl mx-auto mb-8">
            Kelas dan bootcamp kami dirancang untuk memberikan keterampilan praktis yang bisa langsung
            diimplementasikan untuk pengembangan karir dan bisnis Anda.
          </p>
          <a 
            href="/kontak" 
            className="inline-flex items-center px-6 py-3 bg-white text-purple-700 rounded-full hover:bg-purple-50 transition-colors font-medium"
          >
            Tanyakan Jadwal
          </a>
        </div>
      </div>
    </div>
  );
};

export default Kelas;
