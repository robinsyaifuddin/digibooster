
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AboutHeroSection from '@/components/about/HeroSection';
import OurStorySection from '@/components/about/OurStorySection';
import ValuesSection from '@/components/about/ValuesSection';
import StatsSection from '@/components/about/StatsSection';
import TimelineSection from '@/components/about/TimelineSection';
import TeamSection from '@/components/about/TeamSection';
import CtaComponent from '@/components/common/CtaComponent';

const Tentang = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8 
      }
    }
  };

  return (
    <div className="pt-28 md:pt-36 bg-gradient-to-b from-white to-gray-50 min-h-screen font-['Playfair_Display',_serif]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.6, 0.05, -0.01, 0.9]
          }}
          className="mb-24"
        >
          <AboutHeroSection />
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mb-32"
        >
          <motion.div variants={itemVariants}>
            <OurStorySection />
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut" 
          }}
          className="mb-32"
        >
          <ValuesSection />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut" 
          }}
          className="mb-32"
        >
          <StatsSection />
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut" 
          }}
          className="mb-32"
        >
          <TimelineSection />
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut" 
          }}
          className="mb-32"
        >
          <TeamSection />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut" 
          }}
          className="mb-24"
        >
          <CtaComponent
            title="Mari Berkolaborasi!"
            description="Kami siap membantu bisnis Anda berkembang di dunia digital. Hubungi kami untuk mendiskusikan kebutuhan dan tujuan bisnis Anda."
            buttonText="Hubungi Kami Sekarang"
            buttonLink="/kontak"
            theme="blue"
            size="large"
            className="shadow-2xl transform hover:scale-[1.01] transition-all duration-300"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Tentang;
