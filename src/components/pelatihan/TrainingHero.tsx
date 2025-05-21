
import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Users, Video, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TrainingHero: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-16"
    >
      <div className="bg-gradient-to-br from-dark-300 to-dark-500 rounded-xl py-16 px-6 md:px-10 shadow-lg border border-sky-500/30 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
            filter: ["blur(80px)", "blur(90px)", "blur(80px)"]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500 rounded-full"
        />
        
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.1, 1],
            filter: ["blur(80px)", "blur(95px)", "blur(80px)"]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full"
        />
        
        {/* Floating icons */}
        <motion.div
          className="absolute top-10 right-10 text-sky-500/60 hidden md:block"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Laptop size={40} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 right-16 text-purple-500/60 hidden md:block"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <BookOpen size={50} />
        </motion.div>
        
        <motion.div
          className="absolute left-10 top-1/2 text-amber-500/60 hidden md:block"
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Video size={35} />
        </motion.div>
        
        {/* Content */}
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-block py-1 px-3 text-xs font-medium text-white bg-sky-500/30 border border-sky-500/50 rounded-full mb-3 backdrop-blur-sm animate-pulse-light"
        >
          PELATIHAN DIGITAL
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
        >
          Tingkatkan <motion.span 
            className="text-sky-400 relative inline-block"
            animate={{ textShadow: ["0 0 5px rgba(56, 189, 248, 0.7)", "0 0 20px rgba(56, 189, 248, 0.9)", "0 0 5px rgba(56, 189, 248, 0.7)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Skill Digital
          </motion.span> Anda
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-white/80 max-w-3xl mx-auto mb-8"
        >
          Pilih program pelatihan yang sesuai dengan kebutuhan Anda, dari Short Class, Bootcamp, 
          hingga Webinar dengan instruktur berpengalaman.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="bg-sky-500 hover:bg-sky-600 rounded-full"
          >
            Lihat Semua Program
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full flex items-center gap-2 border-sky-500/50 hover:bg-sky-500/10"
          >
            Jadwal Pelatihan
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
        
        {/* Animated line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-amber-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default TrainingHero;
