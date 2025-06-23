
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Star, 
  Phone, 
  Mail, 
  Calendar, 
  Check, 
  Package, 
  Globe, 
  Palette, 
  TrendingUp, 
  Camera, 
  GraduationCap,
  Target,
  CheckCircle,
  Clock,
  Shield,
  Award,
  Users,
  Zap
} from 'lucide-react';

const BundleUmkmDetail = () => {
  const navigate = useNavigate();

  const facilities = [
    {
      category: "🌐 Website Profil",
      icon: <Globe className="h-5 w-5 text-sky-400" />,
      items: [
        "4–5 halaman: Beranda, Tentang Kami, Produk/Jasa, Galeri, Kontak",
        "Domain .com + hosting 1 tahun",
        "Desain responsif & SEO dasar",
        "Formulir kontak WhatsApp"
      ]
    },
    {
      category: "🎨 Desain Brand",
      icon: <Palette className="h-5 w-5 text-sky-400" />,
      items: [
        "Logo sederhana (2 konsep + 2 revisi)",
        "Kartu Nama Digital + Kop Surat",
        "Feed Media Sosial awal (5 template)"
      ]
    },
    {
      category: "📢 Digital Marketing",
      icon: <TrendingUp className="h-5 w-5 text-sky-400" />,
      items: [
        "Setup Google Maps Business (verifikasi)",
        "Copywriting konten profil & produk",
        "Konsultasi strategi pemasaran digital (1x meeting)"
      ]
    },
    {
      category: "📸 Foto Produk Basic",
      icon: <Camera className="h-5 w-5 text-sky-400" />,
      items: [
        "Foto 5–10 produk utama (Flatlay / Lifestyle)",
        "Editing dasar & siap upload marketplace"
      ]
    },
    {
      category: "🛠️ Pelatihan Singkat",
      icon: <GraduationCap className="h-5 w-5 text-sky-400" />,
      items: [
        "Panduan penggunaan website (admin)",
        "Materi dasar branding digital & tips promosi online"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-sky-400" />,
      title: "Langsung punya \"toko digital\" yang profesional",
      description: "Website siap pakai dengan tampilan modern dan fungsional"
    },
    {
      icon: <Shield className="h-6 w-6 text-sky-400" />,
      title: "Meningkatkan kepercayaan pelanggan",
      description: "Identitas digital yang konsisten membangun kredibilitas bisnis"
    },
    {
      icon: <Award className="h-6 w-6 text-sky-400" />,
      title: "Siap digunakan untuk promosi online & menerima order",
      description: "Sistem terintegrasi untuk kemudahan bertransaksi"
    },
    {
      icon: <Users className="h-6 w-6 text-sky-400" />,
      title: "Terhubung langsung ke WhatsApp dan Google Maps",
      description: "Memudahkan customer menghubungi dan menemukan lokasi"
    },
    {
      icon: <Target className="h-6 w-6 text-sky-400" />,
      title: "Cocok untuk pitching proposal, tender, atau pameran",
      description: "Portfolio digital yang siap dipresentasikan"
    }
  ];

  return (
    <div className="bg-black min-h-screen pt-16 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent z-0"></div>
        
        {/* Service image */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="relative h-full w-full">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Paket Digitalisasi UMKM & Lembaga" 
              className="object-cover h-full w-full opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-black/70 to-black"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="text-sky-400 font-medium mb-2 inline-block">
              LAYANAN SPESIAL
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              📦 Paket Digitalisasi UMKM & Lembaga
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i.toString()} 
                    size={16} 
                    className="text-yellow-400 fill-yellow-400" 
                  />
                ))}
                <span className="ml-2 text-white">4.9</span>
              </div>
              <span className="mx-3 text-gray-400">•</span>
              <span className="bg-sky-500/20 text-sky-400 text-xs py-1 px-2 rounded">
                Paket Spesial
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 text-base md:text-lg">
              Paket lengkap khusus untuk UMKM, sekolah, organisasi komunitas, yayasan, koperasi, dan lembaga lokal lainnya 
              agar memiliki identitas digital yang kuat dan mudah diakses pelanggan atau publik secara online.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate('/order-form?service=' + encodeURIComponent('Paket Digitalisasi UMKM & Lembaga'))}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Pesan Sekarang
              </Button>
              
              <Button 
                size="lg"
                variant="outline" 
                className="border-sky-500 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500"
                onClick={() => navigate('/kontak?service=' + encodeURIComponent('Paket Digitalisasi UMKM & Lembaga'))}
              >
                <Phone className="mr-2 h-4 w-4" />
                Konsultasi Gratis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
              🎯 Target Pengguna
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "UMKM baru yang belum punya website dan branding",
                "Sekolah kecil / lembaga pendidikan nonformal",
                "Yayasan, komunitas sosial, organisasi desa/RT/RW",
                "Koperasi atau bisnis lokal"
              ].map((target, index) => (
                <motion.div 
                  key={index.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start bg-black/40 p-4 rounded-xl"
                >
                  <div className="mr-4 bg-sky-500/20 p-2 rounded-full mt-1">
                    <Target className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{target}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
              ✅ Fasilitas yang Didapatkan
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {facilities.map((facility, index) => (
                <motion.div 
                  key={index.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-900/80 to-black border border-gray-800 p-6 rounded-xl"
                >
                  <div className="flex items-center mb-4">
                    {facility.icon}
                    <h3 className="text-lg font-semibold text-white ml-2">{facility.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {facility.items.map((item, itemIndex) => (
                      <div key={itemIndex.toString()} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-sky-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              💰 Harga Paket
            </h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-sky-900/30 to-black border border-sky-500/30 p-8 rounded-2xl"
            >
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 line-through text-lg">Harga Asli:</span>
                  <span className="text-gray-400 line-through text-lg">Rp 6.500.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-xl">Harga Promo UMKM:</span>
                  <span className="text-sky-400 font-bold text-3xl">Rp 4.500.000</span>
                </div>
              </div>
              
              <div className="bg-green-500/20 text-green-400 text-center py-3 px-6 rounded-xl text-lg font-medium">
                💰 Hemat Rp 2.000.000
              </div>
            </motion.div>

            {/* Additional Notes */}
            <div className="mt-8 text-left bg-black/40 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">📌 Catatan Tambahan</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-start">
                  <Clock className="h-4 w-4 text-sky-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Lama pengerjaan: 14–30 hari kerja</span>
                </div>
                <div className="flex items-start">
                  <Shield className="h-4 w-4 text-sky-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Harga sudah termasuk domain web.id, SSL, dan hosting 1 tahun</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-sky-400 mt-1 mr-2 flex-shrink-0" />
                  <span>Tambahan produk foto/video atau revisi besar dikenakan biaya tambahan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
              🔥 Manfaat untuk UMKM / Lembaga
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start bg-black/40 p-6 rounded-xl"
                >
                  <div className="mr-4 bg-sky-500/20 p-3 rounded-full">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-sky-900/30 to-black rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                Siap Digitalisasi UMKM atau Lembaga Anda?
              </h2>
              <p className="text-gray-300 mb-8">
                Dapatkan paket lengkap digitalisasi dengan harga spesial untuk UMKM dan lembaga. 
                Konsultasikan kebutuhan Anda dengan tim ahli kami sekarang.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => navigate('/order-form?service=' + encodeURIComponent('Paket Digitalisasi UMKM & Lembaga'))}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Pesan Sekarang
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-sky-500 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500"
                  onClick={() => navigate('/kontak?service=' + encodeURIComponent('Paket Digitalisasi UMKM & Lembaga'))}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Konsultasi Gratis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BundleUmkmDetail;
