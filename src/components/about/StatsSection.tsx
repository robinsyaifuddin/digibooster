
import React from 'react';
import { Trophy, Users, Globe, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    { icon: <Trophy className="h-8 w-8" />, value: '50+', label: 'Penghargaan' },
    { icon: <Users className="h-8 w-8" />, value: '300+', label: 'Klien Puas' },
    { icon: <Globe className="h-8 w-8" />, value: '100+', label: 'Proyek Selesai' },
    { icon: <Calendar className="h-8 w-8" />, value: '5+', label: 'Tahun Pengalaman' }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="bg-gradient-to-br from-digiblue-800 to-digiblue-600 rounded-3xl p-12 md:p-16 mb-20 shadow-2xl transform hover:scale-[1.01] transition-all duration-500 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-white blur-3xl"></div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Pencapaian Kami</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            className="text-white"
          >
            <div className="bg-white/10 backdrop-blur-md w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/20 transform hover:rotate-3 hover:scale-110 transition-all duration-300">
              {stat.icon}
            </div>
            <div className="text-5xl font-bold mb-2 font-heading tracking-tight">{stat.value}</div>
            <div className="text-digiblue-100 text-lg">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
