
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Laptop } from 'lucide-react';

const TrainingStats: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-sky-400" />,
      value: "5,000+",
      label: "Alumni",
      description: "Bergabung bersama ribuan alumni sukses"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-400" />,
      value: "30+",
      label: "Program",
      description: "Ragam pilihan program pelatihan digital"
    },
    {
      icon: <Award className="h-8 w-8 text-amber-400" />,
      value: "15+",
      label: "Mentor Ahli",
      description: "Dipandu oleh instruktur profesional"
    },
    {
      icon: <Laptop className="h-8 w-8 text-green-400" />,
      value: "100%",
      label: "Praktis",
      description: "Fokus pada pembelajaran praktis & relevan"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Kenapa Memilih DigiBooster?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Program pelatihan kami dirancang untuk membekali Anda dengan keterampilan digital 
            yang relevan dengan kebutuhan industri saat ini.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/80 p-6 rounded-xl border border-gray-800 hover:border-sky-500/30 transition-all text-center"
            >
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sky-400 font-medium mb-2">{stat.label}</div>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingStats;
