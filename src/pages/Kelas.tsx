
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Star, Info, CalendarDays, Code, PenTool, TrendingUp, Video, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { ClassCard } from '@/components/class/ClassCard';

// Define course categories
const courseCategories = [
  {
    id: "web-app",
    name: "Website & Aplikasi",
    icon: <Code className="h-5 w-5" />,
    description: "Belajar pengembangan website dan aplikasi dengan teknologi terkini",
    courses: [
      {
        id: 1,
        title: "Full-Stack Web Development",
        duration: "10 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1",
        rating: 4.8,
        price: "Rp4.500.000",
        featured: true
      },
      {
        id: 2,
        title: "React JS Fundamentals",
        duration: "4 minggu",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1",
        rating: 4.7,
        price: "Rp2.200.000"
      },
      {
        id: 3,
        title: "Mobile App Development",
        duration: "8 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1",
        rating: 4.5,
        price: "Rp3.800.000"
      },
      {
        id: 4,
        title: "Backend Engineering",
        duration: "6 minggu",
        level: "Advanced",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1",
        rating: 4.9,
        price: "Rp3.500.000"
      },
      {
        id: 5,
        title: "HTML & CSS Basics",
        duration: "2 minggu",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1",
        rating: 4.6,
        price: "Rp1.200.000"
      }
    ]
  },
  {
    id: "design",
    name: "Desain Grafis",
    icon: <PenTool className="h-5 w-5" />,
    description: "Pelajari teknik desain grafis profesional untuk berbagai kebutuhan media",
    courses: [
      {
        id: 6,
        title: "UI/UX Design Mastery",
        duration: "8 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1",
        rating: 4.8,
        price: "Rp3.200.000",
        featured: true
      },
      {
        id: 7,
        title: "Adobe Photoshop Advanced",
        duration: "5 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1",
        rating: 4.5,
        price: "Rp2.500.000"
      },
      {
        id: 8,
        title: "Logo Design Workshop",
        duration: "3 minggu",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1",
        rating: 4.7,
        price: "Rp1.800.000"
      },
      {
        id: 9,
        title: "Brand Identity Design",
        duration: "6 minggu",
        level: "Advanced",
        image: "https://images.unsplash.com/photo-1634942537034-2531766a4dba?ixlib=rb-1.2.1",
        rating: 4.9,
        price: "Rp2.800.000"
      },
      {
        id: 10,
        title: "Digital Illustration",
        duration: "4 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1",
        rating: 4.6,
        price: "Rp2.200.000"
      }
    ]
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    icon: <TrendingUp className="h-5 w-5" />,
    description: "Kuasai strategi marketing di era digital untuk meningkatkan bisnis",
    courses: [
      {
        id: 11,
        title: "Social Media Marketing",
        duration: "6 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1",
        rating: 4.7,
        price: "Rp2.800.000",
        featured: true
      },
      {
        id: 12,
        title: "SEO Fundamentals",
        duration: "4 minggu",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1571715681292-6b880a7ebdeb?ixlib=rb-1.2.1",
        rating: 4.5,
        price: "Rp2.200.000"
      },
      {
        id: 13,
        title: "Content Marketing Strategy",
        duration: "5 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1",
        rating: 4.6,
        price: "Rp2.500.000"
      },
      {
        id: 14,
        title: "Google Ads Mastery",
        duration: "6 minggu",
        level: "Advanced",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1",
        rating: 4.8,
        price: "Rp3.000.000"
      },
      {
        id: 15,
        title: "Email Marketing",
        duration: "3 minggu",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1",
        rating: 4.4,
        price: "Rp1.800.000"
      }
    ]
  },
  {
    id: "photo-video",
    name: "Foto dan Videografi",
    icon: <Video className="h-5 w-5" />,
    description: "Pelajari teknik profesional dalam dunia fotografi dan videografi",
    courses: [
      {
        id: 16,
        title: "Video Editing Masterclass",
        duration: "8 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-1.2.1",
        rating: 4.9,
        price: "Rp3.500.000",
        featured: true
      },
      {
        id: 17,
        title: "Photography Basics",
        duration: "4 minggu",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1",
        rating: 4.6,
        price: "Rp2.000.000"
      },
      {
        id: 18,
        title: "Cinematography Techniques",
        duration: "6 minggu",
        level: "Advanced",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1",
        rating: 4.8,
        price: "Rp3.200.000"
      },
      {
        id: 19,
        title: "Adobe Premiere Pro",
        duration: "5 minggu",
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1",
        rating: 4.7,
        price: "Rp2.500.000"
      },
      {
        id: 20,
        title: "Product Photography",
        duration: "3 minggu",
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1",
        rating: 4.5,
        price: "Rp1.800.000"
      }
    ]
  }
];

// Find a featured course for the hero section
const featuredCourse = courseCategories.flatMap(category => 
  category.courses.filter(course => course.featured)
)[0] || courseCategories[0].courses[0];

const Kelas = () => {
  const [selectedTab, setSelectedTab] = useState(courseCategories[0].id);
  
  return (
    <div className="pt-16 bg-black min-h-screen overflow-x-hidden">
      {/* Hero Section */}
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
              className="flex flex-wrap items-center gap-4 mb-4"
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? "text-yellow-500" : "text-gray-400"}`}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
                <span className="ml-2 text-white">4.7</span>
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
              untuk memberikan pengetahuan praktis dari instruktur berpengalaman.
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
        
        {/* Preview Screenshots */}
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

      {/* Category Tabs Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Kategori Kursus</h2>
          
          <Tabs 
            defaultValue={courseCategories[0].id} 
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-900/50 p-2 mb-8">
              {courseCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-sky-500 data-[state=active]:text-white flex items-center gap-2"
                >
                  {category.icon}
                  <span className="hidden md:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {courseCategories.map((category) => (
              <TabsContent 
                key={category.id} 
                value={category.id}
                className="bg-transparent border-none p-0 mt-0"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>
                
                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {category.courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-900 rounded-xl overflow-hidden group relative"
                    >
                      {/* Course Image */}
                      <div className="h-40 overflow-hidden relative">
                        <img 
                          src={course.image}
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                        
                        <div className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full backdrop-blur-sm group-hover:bg-sky-500/50 transition-colors">
                          <Play className="w-3 h-3 text-white" fill="currentColor" />
                        </div>
                        
                        {/* Rating */}
                        <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                          <span className="text-xs font-medium text-white">{course.rating}</span>
                        </div>
                        
                        {/* Level */}
                        <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-300">
                          {course.level}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-bold text-white truncate">{course.title}</h3>
                        
                        <div className="flex items-center text-xs text-gray-400 mt-2 mb-1">
                          <CalendarDays className="w-3 h-3 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        
                        <div className="text-sky-400 font-medium text-sm mb-3">
                          {course.price}
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
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>

      {/* Pricing Section */}
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

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pertanyaan yang sering ditanyakan tentang kelas dan bootcamp kami
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: "Bagaimana cara mendaftar kelas?",
              answer: "Anda dapat mendaftar kelas dengan memilih kelas yang diinginkan, kemudian klik tombol 'Daftar Sekarang' dan ikuti instruksi pembayaran."
            },
            {
              question: "Apakah saya bisa mengakses materi setelah kelas selesai?",
              answer: "Ya, Anda akan mendapatkan akses ke materi kelas sesuai dengan durasi paket yang Anda pilih. Untuk paket Enterprise, Anda mendapatkan akses seumur hidup."
            },
            {
              question: "Apakah ada sertifikat setelah menyelesaikan kelas?",
              answer: "Ya, semua kelas kami menyediakan sertifikat penyelesaian yang dapat Anda gunakan untuk portofolio atau CV Anda."
            },
            {
              question: "Berapa lama saya bisa menyelesaikan kelas?",
              answer: "Setiap kelas memiliki durasi yang berbeda, mulai dari 2 minggu hingga 10 minggu. Anda dapat belajar dengan kecepatan sendiri dalam jangka waktu tersebut."
            },
            {
              question: "Apakah ada persyaratan khusus untuk mengikuti kelas?",
              answer: "Setiap kelas memiliki persyaratan yang berbeda. Kelas untuk pemula tidak memerlukan pengetahuan sebelumnya, sementara kelas tingkat lanjut mungkin memerlukan beberapa pengetahuan dasar."
            }
          ].map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-lg p-6 hover:border-sky-500/20 hover:shadow-sky-500/5 transition-all border border-gray-800"
            >
              <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kelas;
