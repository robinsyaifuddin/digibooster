
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const Portofolio = () => {
  const portfolioItems = [
    {
      id: 1,
      title: 'Website E-commerce Fashion',
      client: 'FashionStyle Boutique',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Pengembangan website e-commerce modern dengan fitur katalog produk, keranjang belanja, pembayaran terintegrasi, dan sistem manajemen inventori.',
      services: ['Web Development', 'UI/UX Design', 'Payment Integration']
    },
    {
      id: 2,
      title: 'Rebranding Digital Agency',
      client: 'CreativePulse Agency',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Proses rebranding menyeluruh meliputi logo baru, guidelines brand, stationery design, dan implementasi identitas pada seluruh aset digital.',
      services: ['Brand Strategy', 'Logo Design', 'Brand Guidelines', 'Marketing Collateral']
    },
    {
      id: 3,
      title: 'Kampanye Digital Marketing',
      client: 'NutriHealth Products',
      category: 'Digital Marketing',
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Kampanye pemasaran digital terintegrasi untuk meluncurkan produk baru dengan strategi konten, social media, dan paid advertising.',
      services: ['Content Strategy', 'Social Media Management', 'Google & Facebook Ads', 'Analytics & Reporting']
    },
    {
      id: 4,
      title: 'Aplikasi Mobile Fintech',
      client: 'EasyPay Solutions',
      category: 'App Development',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Pengembangan aplikasi mobile untuk layanan keuangan digital dengan fitur pembayaran, transfer, dan manajemen keuangan pribadi.',
      services: ['Mobile App Development', 'UI/UX Design', 'Backend Integration', 'Security Implementation']
    },
    {
      id: 5,
      title: 'Produksi Video Korporat',
      client: 'IndustrialTech Corporation',
      category: 'Video Production',
      image: 'https://images.unsplash.com/photo-1579165466949-3180a0d950f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Produksi video perusahaan untuk memperkenalkan visi, misi, dan layanan dengan teknik storytelling yang menarik dan profesional.',
      services: ['Script Writing', 'Videography', 'Animation', 'Post-Production', 'Sound Design']
    },
    {
      id: 6,
      title: 'Sistem Manajemen Konten',
      client: 'EduLearn Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Pengembangan sistem manajemen konten khusus untuk platform pembelajaran online dengan fitur kursus, materi, dan penilaian terintegrasi.',
      services: ['Custom CMS Development', 'Learning Management System', 'User Authentication', 'Content Delivery']
    }
  ];

  const filters = [
    "All",
    "Web Development",
    "Branding",
    "Digital Marketing",
    "App Development",
    "Video Production"
  ];

  const [activeFilter, setActiveFilter] = React.useState("All");
  const [filteredItems, setFilteredItems] = React.useState(portfolioItems);

  const filterItems = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

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
          <span className="inline-block py-1 px-3 text-xs font-medium text-purple-600 bg-purple-100 rounded-full mb-3">KARYA KAMI</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Portofolio <span className="text-purple-600">Proyek Digital</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kumpulan karya dan proyek digital yang telah kami kerjakan untuk berbagai klien
            di berbagai industri dengan hasil yang memuaskan.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => filterItems(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {filteredItems.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="text-xs font-medium text-purple-300 bg-purple-900/40 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm">{project.client}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
                  Lihat Detail 
                  <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Siap Mewujudkan Proyek Digital Anda?</h2>
          <p className="text-purple-100 max-w-2xl mx-auto mb-8">
            Kami siap membantu mewujudkan ide dan kebutuhan digital Anda dengan solusi kreatif
            dan profesional sesuai standar industri.
          </p>
          <a 
            href="/kontak" 
            className="inline-flex items-center px-6 py-3 bg-white text-purple-700 rounded-full hover:bg-purple-50 transition-colors font-medium"
          >
            Diskusikan Proyek Anda <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Portofolio;
