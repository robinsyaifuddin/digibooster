
import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Star, Info, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { classes } from '@/data/classData';
import AnimatedSection from '@/components/animation/AnimatedSection';

const Kelas = () => {
  // Featured class (similar to featured movie in the reference)
  const featuredClass = classes[0];
  
  return (
    <div className="pt-16 bg-black min-h-screen overflow-x-hidden">
      {/* Hero Section - Similar to movie hero in reference */}
      <div className="relative min-h-[80vh] w-full overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
            alt="DigiBooster Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-sky-500/80 rounded-full">
                <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
                PROGRAM UNGGULAN
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            >
              Short Class & Mini Bootcamp
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? "text-yellow-500" : "text-gray-400"}`}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
                <span className="ml-2 text-white">4.5</span>
              </div>
              
              <span className="text-gray-400">2023</span>
              
              <span className="px-2 py-1 text-xs rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300">
                Premium
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-gray-300 mb-8 max-w-2xl"
            >
              Tingkatkan keterampilan digital Anda melalui kelas intensif dan bootcamp yang dirancang
              untuk memberikan pengetahuan praktis dalam waktu singkat.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 rounded-full text-white">
                <Play className="mr-2 h-5 w-5" />
                Daftar Sekarang
              </Button>
              
              <Button size="lg" variant="outline" className="rounded-full border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                <Info className="mr-2 h-5 w-5" />
                Info Jadwal
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Movie Screenshots - like in the reference */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-4 z-10">
          {[1, 2, 3, 4].map((item) => (
            <motion.div 
              key={item}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + item * 0.1 }}
              className="w-32 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-sky-500 transition-all cursor-pointer"
            >
              <img 
                src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=400&auto=format&fit=crop`} 
                alt={`Preview ${item}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommendations Section - Similar to movies grid in reference */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Kelas Rekomendasi</h2>
          
          <div className="flex gap-2">
            {["Semua", "Terbaru", "Populer"].map((filter, index) => (
              <Button 
                key={index}
                variant={index === 0 ? "default" : "outline"} 
                size="sm"
                className={index === 0 ? "bg-sky-500 hover:bg-sky-600" : "border-gray-700 text-gray-300 hover:bg-sky-500/20"}
              >
                {filter}
              </Button>
            ))}
            
            <Button variant="outline" size="icon" className="border-gray-700">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {classes.map((classItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl overflow-hidden group relative"
            >
              {/* Top Image */}
              <div className="h-40 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                  alt={classItem.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                
                <div className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full backdrop-blur-sm group-hover:bg-sky-500/50 transition-colors">
                  <Play className="w-3 h-3 text-white" fill="currentColor" />
                </div>
                
                {/* Rating */}
                <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                  <span className="text-xs font-medium text-white">4.{index + 5}</span>
                </div>
                
                {/* Year */}
                <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-300">
                  2023
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-white truncate">{classItem.title}</h3>
                
                <div className="flex items-center text-xs text-gray-400 mt-2 mb-4">
                  <CalendarDays className="w-3 h-3 mr-1" />
                  <span>{classItem.details.duration}</span>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full bg-sky-500 hover:bg-sky-600 font-medium text-xs"
                >
                  Detail Kelas
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination - Like in the reference */}
        <div className="flex justify-center mt-10 gap-2">
          {[1, 2, 3, 4, '...', 20].map((page, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="icon"
              className={index === 0 ? "bg-sky-500 hover:bg-sky-600 w-8 h-8" : "border-gray-700 text-gray-300 w-8 h-8"}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="border-gray-700 w-8 h-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Pricing Section - Similar to plans in reference */}
      <div className="bg-black py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pilih Paket Kelas Anda</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Maksimalkan pembelajaran Anda dengan memilih paket kelas yang sesuai dengan kebutuhan dan 
              tingkat keahlian Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-sky-500/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2">Paket Dasar</h3>
              <div className="text-3xl font-bold text-sky-500 mb-6">Rp199K<span className="text-sm text-gray-400 font-normal">/bulan</span></div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Akses 5 kelas dasar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Sertifikat kelulusan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Forum komunitas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Akses 30 hari</span>
                </li>
              </ul>
              
              <Button className="w-full bg-sky-500 hover:bg-sky-600">Pilih Paket</Button>
            </motion.div>
            
            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-b from-gray-900 to-sky-950 rounded-xl p-6 border border-sky-500/50 shadow-lg shadow-sky-500/20 transform scale-105"
            >
              <div className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">TERPOPULER</div>
              <h3 className="text-xl font-bold text-white mb-2">Paket Professional</h3>
              <div className="text-3xl font-bold text-sky-500 mb-6">Rp499K<span className="text-sm text-gray-400 font-normal">/bulan</span></div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Akses 15 kelas lengkap</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Semua sertifikat kelulusan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Forum premium dan konsultasi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Akses 90 hari</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Project review dari mentor</span>
                </li>
              </ul>
              
              <Button className="w-full bg-sky-500 hover:bg-sky-600">Pilih Paket</Button>
            </motion.div>
            
            {/* Elite Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-sky-500/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2">Paket Enterprise</h3>
              <div className="text-3xl font-bold text-sky-500 mb-6">Rp999K<span className="text-sm text-gray-400 font-normal">/bulan</span></div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Akses semua kelas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Semua sertifikat dan badge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Konsultasi 1-on-1 dengan mentor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Akses seumur hidup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-500 mr-2">•</span>
                  <span className="text-gray-300 text-sm">Career coaching & placement</span>
                </li>
              </ul>
              
              <Button className="w-full bg-sky-500 hover:bg-sky-600">Pilih Paket</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kelas;
