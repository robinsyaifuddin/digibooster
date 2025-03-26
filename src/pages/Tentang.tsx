
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Globe, ArrowRight, CheckCircle, Target, Star } from 'lucide-react';

const Tentang = () => {
  const teamMembers = [
    {
      name: 'Andi Wijaya',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Lebih dari 10 tahun pengalaman di industri digital dengan fokus pada pengembangan strategi bisnis digital.'
    },
    {
      name: 'Maya Sari',
      role: 'Creative Director',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Spesialis desain dan branding dengan portfolio internasional dan penghargaan di bidang desain kreatif.'
    },
    {
      name: 'Budi Santoso',
      role: 'Tech Lead',
      image: 'https://randomuser.me/api/portraits/men/68.jpg',
      bio: 'Pengembang senior dengan keahlian dalam teknologi web dan mobile, serta implementasi sistem terintegrasi.'
    },
    {
      name: 'Lina Oktaviani',
      role: 'Digital Marketing Strategist',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Ahli strategi pemasaran digital dengan fokus pada kampanye berbasis data dan pertumbuhan organik.'
    }
  ];

  const values = [
    {
      icon: <Target className="h-10 w-10 text-purple-600" />,
      title: 'Berorientasi Hasil',
      description: 'Kami fokus pada pencapaian hasil nyata yang terukur dan memberikan dampak positif bagi bisnis klien.'
    },
    {
      icon: <Star className="h-10 w-10 text-purple-600" />,
      title: 'Keunggulan Kualitas',
      description: 'Kami berkomitmen untuk memberikan layanan dan solusi dengan standar kualitas tertinggi tanpa kompromi.'
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-purple-600" />,
      title: 'Integritas',
      description: 'Kami menjalankan bisnis dengan kejujuran, transparansi, dan etika profesional yang tinggi.'
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: 'Kolaborasi',
      description: 'Kami percaya bahwa kerja sama yang baik antara tim dan klien menghasilkan solusi terbaik.'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Pendirian DigiBooster',
      description: 'Diawali sebagai konsultan digital untuk bisnis kecil dan menengah.'
    },
    {
      year: '2019',
      title: 'Ekspansi Layanan',
      description: 'Menambahkan layanan pengembangan website dan aplikasi mobile ke portofolio.'
    },
    {
      year: '2020',
      title: 'Program Edukasi Digital',
      description: 'Meluncurkan program pelatihan dan mentoring untuk pendidikan digital.'
    },
    {
      year: '2021',
      title: 'Penghargaan Industri',
      description: 'Menerima penghargaan sebagai Digital Agency Terbaik untuk UKM.'
    },
    {
      year: '2022',
      title: 'Ekspansi Tim',
      description: 'Mengembangkan tim menjadi 15+ spesialis digital di berbagai bidang.'
    },
    {
      year: '2023',
      title: 'Inovasi Layanan',
      description: 'Meluncurkan layanan baru dengan fokus pada integrasi AI dan automasi digital.'
    }
  ];

  const stats = [
    { icon: <Trophy />, value: '50+', label: 'Penghargaan' },
    { icon: <Users />, value: '300+', label: 'Klien Puas' },
    { icon: <Globe />, value: '100+', label: 'Proyek Selesai' },
    { icon: <Calendar />, value: '5+', label: 'Tahun Pengalaman' }
  ];

  return (
    <div className="pt-24 md:pt-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <span className="inline-block py-1 px-3 text-xs font-medium text-purple-600 bg-purple-100 rounded-full mb-3">TENTANG KAMI</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Tumbuh Bersama <span className="text-purple-600">DigiBooster</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami adalah agensi digital yang berdedikasi untuk membantu bisnis dan individu 
            berkembang di era digital melalui solusi kreatif dan teknologi inovatif.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Cerita Kami</h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              DigiBooster didirikan pada tahun 2018 dengan visi sederhana: membantu bisnis memanfaatkan teknologi digital 
              untuk pertumbuhan yang lebih cepat dan berkelanjutan. Diawali dengan tim kecil yang berfokus pada 
              konsultasi digital untuk UKM, kami terus berkembang menjadi agensi full-service dengan berbagai 
              layanan digital komprehensif.
            </p>
            
            <p>
              Perjalanan kami dipenuhi dengan pembelajaran, inovasi, dan kolaborasi dengan berbagai klien dari 
              beragam industri. Setiap tantangan telah membentuk pendekatan kami dalam memberikan solusi digital 
              yang tidak hanya kreatif, tetapi juga efektif dan terukur.
            </p>
            
            <p>
              Hari ini, DigiBooster telah berkembang menjadi partner digital terpercaya bagi lebih dari 300 klien, 
              mulai dari startup hingga perusahaan besar. Kami terus berinovasi dan mengadaptasi perkembangan teknologi 
              terbaru untuk memastikan klien kami selalu berada di garis depan transformasi digital.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Nilai-Nilai Kami</h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl p-10 md:p-16 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Perjalanan Kami</h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-100"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="flex-1"></div>
                  
                  {/* Timeline point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 border-4 border-white z-10"></div>
                  
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mx-6 md:mx-12">
                    <div className="text-purple-600 font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Tim Kami</h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kenali para ahli di balik DigiBooster yang membawa kreativitas, keahlian teknis, dan 
              dedikasi untuk setiap proyek yang kami tangani.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-purple-50 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Mari Berkolaborasi!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Kami siap membantu bisnis Anda berkembang di dunia digital. Hubungi kami untuk mendiskusikan
            kebutuhan dan tujuan bisnis Anda.
          </p>
          <a 
            href="/kontak" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-medium shadow-md"
          >
            Hubungi Kami Sekarang <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tentang;
