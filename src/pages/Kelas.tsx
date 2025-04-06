
import React from 'react';
import ClassHero from '@/components/class/ClassHero';
import ClassGrid from '@/components/class/ClassGrid';
import CtaComponent from '@/components/common/CtaComponent';
import { classes } from '@/data/classData';

const Kelas = () => {
  return (
    <div className="pt-24 md:pt-32 bg-dark">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <ClassHero />

        {/* Classes Grid */}
        <ClassGrid classes={classes} />

        {/* CTA Section */}
        <CtaComponent
          title="Siap Meningkatkan Skill Digital Anda?"
          description="Kelas dan bootcamp kami dirancang untuk memberikan keterampilan praktis yang bisa langsung
            diimplementasikan untuk pengembangan karir dan bisnis Anda."
          buttonText="Tanyakan Jadwal"
          buttonLink="/kontak"
          theme="blue"
        />
      </div>
    </div>
  );
};

export default Kelas;
