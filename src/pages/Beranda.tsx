import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Lightbulb, Users, Laptop, Zap, Sparkles, Share2 } from 'lucide-react';

const Beranda = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.2 } 
    }
  };

  return (
    <main className="overflow-x-hidden pt-0">
      {/* Hero Section */}
      <section className="min-h-screen bg-dark relative overflow-hidden flex items-center pt-16">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated Background Lines */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={`h-line-${i}`}
              className="absolute h-[1px] bg-neon-purple/20 w-full left-0"
              style={{ top: `${i * 10}%` }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                boxShadow: [
                  "0 0 2px rgba(166, 51, 255, 0.2)",
                  "0 0 8px rgba(166, 51, 255, 0.6)",
                  "0 0 2px rgba(166, 51, 255, 0.2)"
                ]
              }}
              transition={{ 
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
          
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={`v-line-${i}`}
              className="absolute w-[1px] bg-neon-violet/20 h-full top-0"
              style={{ left: `${i * 10}%` }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                boxShadow: [
                  "0 0 2px rgba(114, 9, 183, 0.2)",
                  "0 0 8px rgba(114, 9, 183, 0.6)",
                  "0 0 2px rgba(114, 9, 183, 0.2)"
                ]
              }}
              transition={{ 
                duration: 4 + i,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        {/* Glow Orbs */}
        <motion.div 
          className="absolute top-20 -right-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-20 w-96 h-96 bg-neon-violet/20 rounded-full blur-[100px]"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="lg:w-1/2" variants={itemVariants}>
              <span className="inline-block px-4 py-1 rounded-full bg-dark-300/80 backdrop-blur-sm text-neon-purple text-sm mb-5 border border-neon-purple/30 neon-border">
                Platform Solusi Digital Terlengkap
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                Transformasi Digital <span className="text-neon-purple animate-glow">Untuk Semua</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                DigiBooster menyediakan berbagai layanan digital dan edukasi untuk membantu Anda dan bisnis Anda berkembang di era digital dengan pendekatan inovatif.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/program/jasa-digital">
                  <Button size="lg" className="bg-gradient-to-r from-neon-purple to-neon-violet hover:from-neon-violet hover:to-neon-purple text-white shadow-lg shadow-neon-purple/20 group">
                    Mulai Sekarang
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/program">
                  <Button size="lg" variant="outline" className="border-neon-purple/40 bg-dark-300/50 backdrop-blur-sm text-white hover:bg-dark-300 hover:border-neon-purple/80">
                    Jelajahi Program
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 to-neon-violet/20 rounded-xl blur-lg transform scale-95 -z-10"></div>
                <div className="glass-card p-8 rounded-xl border-neon-purple/10 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-violet/10 rounded-full blur-3xl"></div>
                  
                  <h2 className="text-2xl font-bold mb-6 text-white">Layanan Digital <span className="text-neon-purple">Premium</span></h2>
                  
                  <div className="space-y-4">
                    {[
                      { icon: Code, text: "Web & Mobile Development" },
                      { icon: Lightbulb, text: "Digital Marketing Strategy" },
                      { icon: Users, text: "UI/UX Design" },
                      { icon: Share2, text: "Social Media Management" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-dark-300/50 flex items-center justify-center text-neon-purple">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="text-gray-200">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-dark-300/50">
                    <Link to="/program/jasa-digital" className="text-neon-purple hover:text-neon-violet flex items-center">
                      Pelajari Lebih Lanjut
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-100 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-neon-purple/10 text-neon-purple px-4 py-1 rounded-full text-sm inline-block mb-4">FITUR UNGGULAN</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Solusi <span className="text-neon-purple">Digital</span> Komprehensif
            </h2>
            <p className="text-gray-300 text-lg">
              Kami menyediakan berbagai layanan untuk membantu bisnis Anda bertransformasi di dunia digital dengan strategi yang inovatif dan berkelanjutan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Laptop,
                title: "Web & Mobile Development",
                description: "Kembangkan aplikasi web dan mobile yang responsif, cepat, dan modern dengan teknologi terkini."
              },
              {
                icon: Zap,
                title: "Digital Marketing",
                description: "Tingkatkan brand awareness dan konversi dengan strategi digital marketing yang targetted dan efektif."
              },
              {
                icon: Sparkles,
                title: "UI/UX Design",
                description: "Desain antarmuka yang menarik dan pengalaman pengguna yang intuitif untuk aplikasi Anda."
              },
              {
                icon: Share2,
                title: "Social Media Management",
                description: "Kelola dan tingkatkan kehadiran brand Anda di berbagai platform media sosial."
              },
              {
                icon: Users,
                title: "Training & Workshop",
                description: "Tingkatkan kemampuan digital tim Anda melalui pelatihan dan workshop yang interaktif."
              },
              {
                icon: Lightbulb,
                title: "Konsultasi Bisnis Digital",
                description: "Dapatkan insight dan strategi untuk mengembangkan bisnis digital Anda."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="dark-card p-6 group hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-neon-purple/10 flex items-center justify-center text-neon-purple mb-5 group-hover:bg-neon-purple/20 transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            boxShadow: [
              "0 0 5px rgba(166, 51, 255, 0.3)",
              "0 0 20px rgba(166, 51, 255, 0.7)",
              "0 0 5px rgba(166, 51, 255, 0.3)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-neon-violet to-transparent"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            boxShadow: [
              "0 0 5px rgba(114, 9, 183, 0.3)",
              "0 0 20px rgba(114, 9, 183, 0.7)",
              "0 0 5px rgba(114, 9, 183, 0.3)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Siap untuk <span className="text-neon-purple">Meningkatkan</span> Bisnis Digital Anda?
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Kami siap membantu Anda memulai perjalanan transformasi digital. Hubungi tim kami sekarang untuk mendapatkan konsultasi gratis.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-neon-purple to-neon-violet hover:from-neon-violet hover:to-neon-purple text-white shadow-lg shadow-neon-purple/20 group">
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/program">
                <Button size="lg" variant="outline" className="border-neon-purple/40 bg-dark-300/50 backdrop-blur-sm text-white hover:bg-dark-300 hover:border-neon-purple/80">
                  Lihat Program Kami
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Beranda;
