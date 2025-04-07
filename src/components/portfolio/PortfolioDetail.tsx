
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tool, Calendar, User, Tag } from 'lucide-react';
import { portfolioItems } from '@/data/portfolioData';
import { motion } from 'framer-motion';

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '0');
  
  const project = portfolioItems.find(item => item.id === projectId);
  
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Proyek tidak ditemukan</h2>
        <Link 
          to="/portofolio" 
          className="inline-flex items-center text-digicyan hover:text-digicyan-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Portofolio
        </Link>
      </div>
    );
  }
  
  // Mock data for demo purposes
  const projectDetails = {
    timeline: "Juni 2023 - September 2023",
    tools: ["Figma", "React", "TailwindCSS", "TypeScript", "Framer Motion", "Node.js"],
    challenges: "Mengintegrasikan sistem pembayaran dengan berbagai gateway dan memastikan keamanan data transaksi.",
    solution: "Mengimplementasikan arsitektur microservice dengan enkripsi end-to-end dan sistem logging transaksi yang komprehensif.",
    galleryImages: [
      project.image,
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80"
    ]
  };
  
  return (
    <div className="pt-24 md:pt-32 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="mb-8">
          <Link 
            to="/portofolio" 
            className="inline-flex items-center text-digicyan hover:text-digicyan-300 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Portofolio
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
          <p className="text-xl text-digicyan mb-4">Klien: {project.client}</p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="bg-dark-300 text-white px-3 py-1 rounded-full text-sm">
              {project.category}
            </span>
          </div>
        </div>
        
        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden mb-10 cyberpunk-card"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-[300px] md:h-[500px] object-cover"
          />
        </motion.div>
        
        {/* Project Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="cyberpunk-card p-6"
          >
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 mr-2 text-digicyan" />
              <h3 className="text-lg font-semibold text-white">Timeline</h3>
            </div>
            <p className="text-white">{projectDetails.timeline}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cyberpunk-card p-6"
          >
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 mr-2 text-digicyan" />
              <h3 className="text-lg font-semibold text-white">Klien</h3>
            </div>
            <p className="text-white">{project.client}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="cyberpunk-card p-6"
          >
            <div className="flex items-center mb-4">
              <Tag className="h-5 w-5 mr-2 text-digicyan" />
              <h3 className="text-lg font-semibold text-white">Kategori</h3>
            </div>
            <p className="text-white">{project.category}</p>
          </motion.div>
        </div>
        
        {/* Project Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="cyberpunk-card p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Deskripsi Proyek</h2>
          <div className="prose prose-lg max-w-none text-white">
            <p>{project.description}</p>
            <p>
              Proyek ini dikembangkan untuk memenuhi kebutuhan {project.client} dalam mengoptimalkan
              proses bisnis digital mereka. Implementasi solusi ini telah meningkatkan efisiensi
              operasional dan meningkatkan pengalaman pengguna secara signifikan.
            </p>
          </div>
        </motion.div>
        
        {/* Tools Used */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="cyberpunk-card p-8 mb-12"
        >
          <div className="flex items-center mb-6">
            <Tool className="h-6 w-6 mr-2 text-digicyan" />
            <h2 className="text-2xl font-bold text-white">Tools & Teknologi</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {projectDetails.tools.map((tool, index) => (
              <span 
                key={index} 
                className="bg-dark-300 text-digicyan border border-digicyan/30 px-3 py-1 rounded-md"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
        
        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="cyberpunk-card p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">Tantangan</h3>
            <p className="text-white">{projectDetails.challenges}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="cyberpunk-card p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">Solusi</h3>
            <p className="text-white">{projectDetails.solution}</p>
          </motion.div>
        </div>
        
        {/* Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Galeri Proyek</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectDetails.galleryImages.map((image, index) => (
              <div key={index} className="cyberpunk-card overflow-hidden">
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-[200px] object-cover hover:scale-105 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Services Provided */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="cyberpunk-card p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Layanan yang Disediakan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.services.map((service, index) => (
              <div key={index} className="bg-dark-300 p-4 rounded-lg border border-digicyan/20">
                <p className="text-white">{service}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
