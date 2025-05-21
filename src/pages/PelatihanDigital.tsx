
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { trainingPrograms } from '@/data/pelatihanData';
import TrainingHero from '@/components/pelatihan/TrainingHero';
import TrainingGrid from '@/components/pelatihan/TrainingGrid';
import TrainingStats from '@/components/pelatihan/TrainingStats';
import CtaComponent from '@/components/common/CtaComponent';

const PelatihanDigital = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Pelatihan Digital | DigiBooster";
    return () => {
      document.title = "DigiBooster";
    };
  }, []);
  
  return (
    <div className="pt-16 md:pt-20 bg-dark min-h-screen overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <TrainingHero />
        
        {/* Main Content with training cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Program Pelatihan Digital</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Pilih program pelatihan yang sesuai dengan kebutuhan dan minat Anda untuk 
              mengembangkan keterampilan digital.
            </p>
          </div>
          
          <TrainingGrid programs={trainingPrograms} />
        </motion.div>
        
        {/* Statistics Section */}
        <TrainingStats />
        
        {/* Testimonials Section would go here */}
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="my-16"
        >
          <CtaComponent
            title="Siap Meningkatkan Skill Digital Anda?"
            description="Pilih program pelatihan yang sesuai dan mulai perjalanan transformasi digital Anda bersama DigiBooster."
            buttonText="Daftar Sekarang"
            buttonLink="/register"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PelatihanDigital;
