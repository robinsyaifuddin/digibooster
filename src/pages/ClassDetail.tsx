
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, Users, BookOpen, Star, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedSection from '@/components/animation/AnimatedSection';

// We'll use a dummy data array for now, in a real app this would come from an API or context
// This could be moved to a separate data file later
const classData = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development",
    description: "Pelajari pengembangan website lengkap dari front-end hingga back-end dengan teknologi terkini seperti React, Node.js, dan database modern.",
    longDescription: "Program komprehensif untuk mempelajari pengembangan web full-stack, mulai dari dasar HTML/CSS/JavaScript hingga framework modern React untuk front-end dan Node.js untuk back-end. Anda akan belajar cara membuat aplikasi web yang responsif, mengintegrasikan database, mengimplementasikan autentikasi pengguna, dan men-deploy aplikasi ke server produksi.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1",
    duration: "10 minggu",
    schedule: "Setiap Senin & Rabu, 19:00-21:00 WIB",
    participants: "Maksimal 20 peserta",
    level: "Intermediate",
    rating: 4.8,
    price: "Rp4.500.000",
    instructor: "Ahmad Fauzi",
    instructorRole: "Senior Web Developer",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1",
    featured: true,
    syllabus: [
      "Minggu 1-2: Dasar HTML, CSS, dan JavaScript",
      "Minggu 3-4: Framework Front-end dengan React.js",
      "Minggu 5-6: Back-end dengan Node.js dan Express",
      "Minggu 7-8: Database dan integrasi API",
      "Minggu 9-10: Deployment dan project akhir"
    ],
    requirements: [
      "Laptop dengan minimal RAM 8GB",
      "Pengetahuan dasar pemrograman",
      "Koneksi internet stabil",
      "Software code editor (VSCode direkomendasikan)"
    ],
    benefits: [
      "Sertifikat kelulusan resmi",
      "Portofolio proyek nyata",
      "Akses kelas rekaman seumur hidup",
      "Konsultasi karir pasca program",
      "Jaringan dengan alumni dan perusahaan partner"
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design Mastery",
    description: "Pelajari teknik desain antarmuka dan pengalaman pengguna profesional untuk membuat produk digital yang user-friendly dan menarik.",
    longDescription: "Program intensif untuk mempelajari prinsip-prinsip desain UI/UX yang efektif dan modern. Anda akan mempelajari proses desain dari riset pengguna, wireframing, prototyping, hingga implementasi desain final. Kelas ini mencakup penggunaan tools desain populer seperti Figma dan teknik-teknik desain interaksi terkini.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1",
    duration: "8 minggu",
    schedule: "Setiap Selasa & Kamis, 19:00-21:00 WIB",
    participants: "Maksimal 15 peserta",
    level: "Intermediate",
    rating: 4.8,
    price: "Rp3.200.000",
    instructor: "Dian Sastrowardoyo",
    instructorRole: "Senior UI/UX Designer",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1",
    featured: true,
    syllabus: [
      "Minggu 1: Prinsip Dasar UI/UX Design",
      "Minggu 2: User Research & Personas",
      "Minggu 3-4: Wireframing & Prototyping",
      "Minggu 5-6: Visual Design & Design Systems",
      "Minggu 7-8: Usability Testing & Project Akhir"
    ],
    requirements: [
      "Laptop dengan spesifikasi menengah",
      "Pengetahuan dasar desain (tidak wajib)",
      "Koneksi internet stabil",
      "Software desain (Figma - gratis)"
    ],
    benefits: [
      "Sertifikat kelulusan resmi",
      "Portofolio proyek UI/UX",
      "Akses kelas rekaman seumur hidup",
      "Feedback personal dari instruktur",
      "Jaringan dengan komunitas desainer"
    ]
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description: "Kuasai strategi pemasaran di platform media sosial untuk meningkatkan brand awareness dan konversi bisnis Anda.",
    longDescription: "Program pelatihan yang dirancang untuk membantu Anda memahami dan menguasai strategi pemasaran di berbagai platform media sosial. Anda akan mempelajari cara membuat konten yang menarik, merencanakan kalender konten, menganalisis performa kampanye, dan mengoptimalkan strategi untuk meningkatkan engagement dan konversi.",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1",
    duration: "6 minggu",
    schedule: "Setiap Sabtu, 10:00-13:00 WIB",
    participants: "Maksimal 25 peserta",
    level: "Beginner to Intermediate",
    rating: 4.7,
    price: "Rp2.800.000",
    instructor: "Ratna Dewi",
    instructorRole: "Digital Marketing Specialist",
    instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1",
    featured: true,
    syllabus: [
      "Minggu 1: Fundamental Digital Marketing",
      "Minggu 2: Content Strategy & Planning",
      "Minggu 3: Instagram & TikTok Marketing",
      "Minggu 4: Facebook & LinkedIn Strategy",
      "Minggu 5: Analisis Data & Optimisasi Kampanye",
      "Minggu 6: Project Akhir Kampanye Sosial Media"
    ],
    requirements: [
      "Akses ke smartphone dan laptop",
      "Akun di platform media sosial utama",
      "Koneksi internet stabil",
      "Basic understanding of social media"
    ],
    benefits: [
      "Sertifikat kelulusan resmi",
      "Template strategi media sosial",
      "Akses grup diskusi eksklusif",
      "Konsultasi kampanye digital",
      "Materi dan update terbaru"
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing Masterclass",
    description: "Pelajari teknik editing video profesional untuk membuat konten yang menarik dan berkualitas tinggi untuk berbagai platform.",
    longDescription: "Kelas intensif untuk mempelajari teknik editing video dari dasar hingga tingkat lanjut. Anda akan mempelajari cara menggunakan software editing profesional, teknik cutting dan transisi, color grading, sound design, hingga visual effects sederhana. Kelas ini dirancang untuk membantu Anda membuat konten video yang menarik untuk berbagai platform digital.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-1.2.1",
    duration: "8 minggu",
    schedule: "Setiap Minggu, 13:00-16:00 WIB",
    participants: "Maksimal 15 peserta",
    level: "Intermediate",
    rating: 4.9,
    price: "Rp3.500.000",
    instructor: "Budi Prasetyo",
    instructorRole: "Professional Video Editor",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1",
    featured: true,
    syllabus: [
      "Minggu 1: Pengenalan Software Editing",
      "Minggu 2: Basic Cutting & Timeline Editing",
      "Minggu 3-4: Transisi & Visual Effects",
      "Minggu 5-6: Color Grading & Sound Design",
      "Minggu 7-8: Advanced Techniques & Project Akhir"
    ],
    requirements: [
      "Laptop dengan RAM minimal 8GB",
      "Software editing (Premier Pro/Final Cut/DaVinci)",
      "Storage eksternal minimal 500GB",
      "Pengetahuan dasar penggunaan komputer"
    ],
    benefits: [
      "Sertifikat kelulusan resmi",
      "Portofolio video project",
      "Template transisi dan effects",
      "Lisensi plugin premium (1 tahun)",
      "Akses exclusive ke stock footage"
    ]
  }
];

const ClassDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  
  // Find the class data based on the ID from URL parameters
  const classInfo = classData.find(c => c.id === classId);
  
  // If class not found, show error or redirect
  if (!classInfo) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Kelas tidak ditemukan</h1>
        <p className="mb-6">Maaf, kelas yang Anda cari tidak tersedia.</p>
        <Button onClick={() => navigate('/kelas')}>Kembali ke Daftar Kelas</Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={classInfo.image} 
            alt={classInfo.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-8">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4 w-fit" 
            onClick={() => navigate('/kelas')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Kelas
          </Button>
          
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge className="bg-sky-500 hover:bg-sky-600">
              {classInfo.level}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              <span className="ml-1 text-sm">{classInfo.rating} rating</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold">{classInfo.title}</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Class Details */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <h2 className="text-2xl font-bold mb-4">Tentang Kelas</h2>
              <p className="text-gray-300 mb-6">{classInfo.longDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-900/80 p-4 rounded-lg flex items-start">
                  <Clock className="h-5 w-5 text-sky-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Durasi</h3>
                    <p className="text-gray-300 text-sm">{classInfo.duration}</p>
                  </div>
                </div>
                
                <div className="bg-gray-900/80 p-4 rounded-lg flex items-start">
                  <CalendarDays className="h-5 w-5 text-sky-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Jadwal</h3>
                    <p className="text-gray-300 text-sm">{classInfo.schedule}</p>
                  </div>
                </div>
                
                <div className="bg-gray-900/80 p-4 rounded-lg flex items-start">
                  <Users className="h-5 w-5 text-sky-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Peserta</h3>
                    <p className="text-gray-300 text-sm">{classInfo.participants}</p>
                  </div>
                </div>
                
                <div className="bg-gray-900/80 p-4 rounded-lg flex items-start">
                  <BookOpen className="h-5 w-5 text-sky-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Level</h3>
                    <p className="text-gray-300 text-sm">{classInfo.level}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1}>
              <Tabs defaultValue="syllabus" className="my-8">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="syllabus">Silabus</TabsTrigger>
                  <TabsTrigger value="requirements">Persyaratan</TabsTrigger>
                  <TabsTrigger value="benefits">Manfaat</TabsTrigger>
                </TabsList>
                
                <TabsContent value="syllabus" className="mt-0">
                  <div className="bg-gray-900/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Silabus Kelas</h3>
                    <div className="space-y-4">
                      {classInfo.syllabus.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-sky-500/20 text-sky-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="requirements" className="mt-0">
                  <div className="bg-gray-900/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Persyaratan Kelas</h3>
                    <div className="space-y-3">
                      {classInfo.requirements.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-sky-400 mr-3 shrink-0" />
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="benefits" className="mt-0">
                  <div className="bg-gray-900/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Manfaat Kelas</h3>
                    <div className="space-y-3">
                      {classInfo.benefits.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-sky-400 mr-3 shrink-0" />
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">Instruktur</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 flex items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src={classInfo.instructorImage} 
                    alt={classInfo.instructor} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{classInfo.instructor}</h3>
                  <p className="text-sky-400">{classInfo.instructorRole}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-white mb-2">{classInfo.price}</h2>
              <p className="text-gray-400 mb-6">Investasi untuk karir masa depan Anda</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-sky-400 mr-3" />
                  <span className="text-gray-300">Akses seumur hidup</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-sky-400 mr-3" />
                  <span className="text-gray-300">Sertifikat resmi</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-sky-400 mr-3" />
                  <span className="text-gray-300">Materi premium</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-sky-400 mr-3" />
                  <span className="text-gray-300">Konsultasi & mentoring</span>
                </div>
              </div>
              
              <Button className="w-full mb-3 text-white bg-sky-500 hover:bg-sky-600">
                Daftar Sekarang
              </Button>
              
              <Button variant="outline" className="w-full mb-6">
                Tanya Informasi Lebih Lanjut
              </Button>
              
              <div className="text-center text-sm text-gray-400">
                <p>Butuh bantuan? Hubungi kami di</p>
                <p className="font-medium text-sky-400">info@digibooster.id</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
