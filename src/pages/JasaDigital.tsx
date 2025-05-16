
import React from 'react';
import JasaDigitalHero from '@/components/jasa-digital/JasaDigitalHero';
import ServicesGrid from '@/components/jasa-digital/ServicesGrid';
import CtaComponent from '@/components/common/CtaComponent';
import { jasaDigitalServices } from '@/data/jasaDigitalData';
import { motion } from 'framer-motion';

const JasaDigital = () => {
  return (
    <div className="pt-24 md:pt-28 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <JasaDigitalHero />
        
        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 mb-16"
        >
          <ServicesGrid services={jasaDigitalServices} />
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
              Mengapa Memilih <span className="text-red-500">DigiBooster</span>?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Tim Profesional",
                  description: "Didukung oleh tim ahli yang berpengalaman dalam industri digital"
                },
                {
                  title: "Solusi Komprehensif",
                  description: "Layanan digital lengkap untuk memenuhi semua kebutuhan bisnis Anda"
                },
                {
                  title: "Hasil Terukur",
                  description: "Menyediakan laporan dan analitik untuk mengukur keberhasilan proyek"
                },
                {
                  title: "Dukungan Responsif",
                  description: "Tim support yang siap membantu kapanpun Anda membutuhkan"
                },
                {
                  title: "Teknologi Terkini",
                  description: "Menggunakan teknologi dan trend digital terbaru untuk hasil optimal"
                },
                {
                  title: "Harga Transparan",
                  description: "Penawaran harga yang jelas tanpa biaya tersembunyi"
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
            title="Siap Meningkatkan Bisnis Digital Anda?"
            description="Konsultasikan kebutuhan digital Anda dengan tim ahli kami dan dapatkan solusi yang sesuai dengan bisnis Anda."
            buttonText="Hubungi Kami"
            buttonLink="/kontak"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default JasaDigital;
