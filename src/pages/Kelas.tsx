
import React from 'react';
import ClassHero from '@/components/class/ClassHero';
import ClassGrid from '@/components/class/ClassGrid';
import CtaComponent from '@/components/common/CtaComponent';
import { classes } from '@/data/classData';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/animation/AnimatedSection';

const Kelas = () => {
  return (
    <div className="pt-24 md:pt-32 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <AnimatedSection animation="fadeIn">
          <ClassHero />
        </AnimatedSection>

        {/* Classes Grid with enhanced animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ClassGrid classes={classes} />
        </motion.div>

        {/* CTA Section with cyberpunk theme - updated colors to sky blue */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <CtaComponent
            title="Siap Meningkatkan Skill Digital Anda?"
            description="Kelas dan bootcamp kami dirancang untuk memberikan keterampilan praktis yang bisa langsung
              diimplementasikan untuk pengembangan karir dan bisnis Anda."
            buttonText="Tanyakan Jadwal"
            buttonLink="/kontak"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Kelas;
