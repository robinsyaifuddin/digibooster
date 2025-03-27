
import React from 'react';
import ClassHero from '@/components/class/ClassHero';
import ClassGrid from '@/components/class/ClassGrid';
import { classes } from '@/data/classData';

const Kelas = () => {
  return (
    <div className="pt-24 md:pt-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <ClassHero />

        {/* Classes Grid */}
        <ClassGrid classes={classes} />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-digiblue-800 to-digiblue-600 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Siap Meningkatkan Skill Digital Anda?</h2>
          <p className="text-digiblue-100 max-w-2xl mx-auto mb-8">
            Kelas dan bootcamp kami dirancang untuk memberikan keterampilan praktis yang bisa langsung
            diimplementasikan untuk pengembangan karir dan bisnis Anda.
          </p>
          <a 
            href="/kontak" 
            className="inline-flex items-center px-6 py-3 bg-white text-digiblue-700 rounded-full hover:bg-digiblue-50 transition-colors font-medium"
          >
            Tanyakan Jadwal
          </a>
        </div>
      </div>
    </div>
  );
};

export default Kelas;
