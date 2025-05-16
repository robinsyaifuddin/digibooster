
import React from 'react';
import MotivationHero from '@/components/motivation/MotivationHero';
import ProgramsGrid from '@/components/motivation/ProgramsGrid';
import CtaComponent from '@/components/common/CtaComponent';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Lightbulb, Target, Award } from 'lucide-react';

// Sample program data
const motivationPrograms = [
  {
    icon: <Lightbulb className="h-8 w-8 text-sky-400" />,
    title: "Digital Mindset",
    description: "Mengembangkan pola pikir digital untuk beradaptasi dengan perubahan teknologi terkini",
    features: [
      "Workshop interaktif",
      "Studi kasus nyata",
      "Sertifikat pelatihan",
      "Akses materi seumur hidup"
    ],
    duration: "2 hari"
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-sky-400" />,
    title: "Digital Entrepreneur",
    description: "Program intensif untuk membangun bisnis digital dari awal hingga sukses",
    features: [
      "Mentoring one-on-one",
      "Networking session",
      "Business plan review",
      "Pitch deck preparation"
    ],
    duration: "8 minggu"
  },
  {
    icon: <Users className="h-8 w-8 text-sky-400" />,
    title: "Leadership in Digital Era",
    description: "Pelatihan kepemimpinan di era digital untuk para manager dan executives",
    features: [
      "Case study discussion",
      "Leadership assessment",
      "Digital transformation roadmap",
      "Executive coaching"
    ],
    duration: "3 hari"
  },
  {
    icon: <Target className="h-8 w-8 text-sky-400" />,
    title: "Digital Marketing Mastery",
    description: "Kuasai strategi pemasaran digital untuk meningkatkan awareness dan penjualan bisnis",
    features: [
      "Social media strategy",
      "SEO & SEM tactics",
      "Content marketing",
      "Analytics & optimization"
    ],
    duration: "6 minggu"
  },
  {
    icon: <BookOpen className="h-8 w-8 text-sky-400" />,
    title: "UI/UX Design Fundamentals",
    description: "Pelajari dasar-dasar desain pengalaman pengguna dan antarmuka yang efektif",
    features: [
      "Design thinking process",
      "User research methods",
      "Wireframing & prototyping",
      "Usability testing"
    ],
    duration: "4 minggu"
  },
  {
    icon: <Award className="h-8 w-8 text-sky-400" />,
    title: "Data Analytics Bootcamp",
    description: "Bootcamp intensif untuk analisis data dan pengambilan keputusan berbasis data",
    features: [
      "Data visualization",
      "Statistical analysis",
      "Business intelligence tools",
      "Data-driven decision making"
    ],
    duration: "10 minggu"
  }
];

const MotivasiEdukasi = () => {
  return (
    <div className="pt-24 md:pt-28 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <MotivationHero />
        
        {/* Programs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 mb-16"
        >
          <ProgramsGrid programs={motivationPrograms} />
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">
              Manfaat <span className="text-sky-400">Program Kami</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Materi Terstruktur",
                  description: "Materi pembelajaran yang terstruktur dan mudah untuk diikuti"
                },
                {
                  title: "Mentor Berpengalaman",
                  description: "Dibimbing oleh mentor yang ahli dan berpengalaman di bidangnya"
                },
                {
                  title: "Projek Nyata",
                  description: "Menerapkan ilmu melalui pengerjaan projek nyata yang bisa dipraktikkan"
                },
                {
                  title: "Jaringan Luas",
                  description: "Kesempatan membangun jaringan dengan praktisi dan sesama peserta"
                },
                {
                  title: "Sertifikat Resmi",
                  description: "Dapatkan sertifikat resmi yang diakui industri setelah menyelesaikan program"
                },
                {
                  title: "Konsultasi Seumur Hidup",
                  description: "Akses konsultasi dengan mentor seumur hidup setelah program selesai"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section with updated style */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <CtaComponent
            title="Siap Meningkatkan Skill Digital Anda?"
            description="Daftarkan diri Anda dalam program motivasi dan edukasi kami untuk mempersiapkan karir di era digital."
            buttonText="Daftar Sekarang"
            buttonLink="/kontak"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MotivasiEdukasi;
