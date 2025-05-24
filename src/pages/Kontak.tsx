
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Kontak = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Simulate form submission
      console.log('Form submitted:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
      reset();
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-sky-500/10"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative pt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Konsultasi Gratis
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent leading-tight mb-6"
              >
                Hubungi Kami
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Konsultasikan kebutuhan digital Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik untuk mengembangkan bisnis Anda dengan teknologi terkini.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
              >
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mr-2" />
                  Konsultasi 100% Gratis
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mr-2" />
                  Respon dalam 24 Jam
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 mr-2" />
                  Tim Ahli Berpengalaman
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl"></div>
              <div className="relative backdrop-blur-sm bg-gray-900/40 border border-gray-800/50 rounded-2xl p-8 md:p-12 shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3">Kirim Pesan</h2>
                  <p className="text-gray-400">Ceritakan kebutuhan proyek Anda dan kami akan memberikan solusi terbaik.</p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Nama Lengkap
                      </label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap Anda"
                        className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-sky-500/50 focus:ring-sky-500/20 rounded-xl h-12 transition-all duration-200"
                        {...register('name', { required: 'Nama tidak boleh kosong' })}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-400 flex items-center mt-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                          {errors.name.message as string}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-sky-500/50 focus:ring-sky-500/20 rounded-xl h-12 transition-all duration-200"
                        {...register('email', { 
                          required: 'Email tidak boleh kosong',
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Format email tidak valid'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400 flex items-center mt-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                          {errors.email.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                      Subjek
                    </label>
                    <Input
                      id="subject"
                      placeholder="Topik konsultasi Anda"
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-sky-500/50 focus:ring-sky-500/20 rounded-xl h-12 transition-all duration-200"
                      {...register('subject', { required: 'Subjek tidak boleh kosong' })}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-400 flex items-center mt-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                        {errors.subject.message as string}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Pesan
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Jelaskan kebutuhan dan tujuan proyek Anda secara detail..."
                      rows={6}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-sky-500/50 focus:ring-sky-500/20 rounded-xl resize-none transition-all duration-200"
                      {...register('message', { required: 'Pesan tidak boleh kosong' })}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400 flex items-center mt-1">
                        <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                        {errors.message.message as string}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-xl h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Mengirim Pesan...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Send className="w-5 h-5" />
                        <span>Kirim Pesan</span>
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Details */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl"></div>
              <div className="relative backdrop-blur-sm bg-gray-900/40 border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Info Kontak</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group hover:bg-sky-500/5 p-4 rounded-xl transition-all duration-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center group-hover:bg-sky-500/30 transition-colors">
                      <Phone className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Telepon</p>
                      <a href="tel:+6282279722417" className="text-white hover:text-sky-400 transition-colors font-medium">
                        +62 822-7972-2417
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group hover:bg-sky-500/5 p-4 rounded-xl transition-all duration-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center group-hover:bg-sky-500/30 transition-colors">
                      <Mail className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <a href="mailto:hello.digibooster@gmail.com" className="text-white hover:text-sky-400 transition-colors font-medium break-all">
                        hello.digibooster@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group hover:bg-sky-500/5 p-4 rounded-xl transition-all duration-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center group-hover:bg-sky-500/30 transition-colors">
                      <MapPin className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Alamat</p>
                      <p className="text-white leading-relaxed">
                        Way Kandis, Kec. Tanjung Senang,<br />
                        Bandar Lampung, Lampung 35143
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Working Hours */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl"></div>
              <div className="relative backdrop-blur-sm bg-gray-900/40 border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Clock className="w-6 h-6 text-sky-400 mr-3" />
                  Jam Operasional
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400">Senin - Jumat</span>
                    <span className="text-white font-medium">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400">Sabtu</span>
                    <span className="text-white font-medium">09:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Minggu</span>
                    <span className="text-red-400 font-medium">Tutup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl"></div>
              <div className="relative backdrop-blur-sm bg-gray-900/40 border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Mengapa Memilih Kami?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-300">4.9/5 Rating Kepuasan Klien</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">100+ Proyek Selesai</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">5+ Tahun Pengalaman</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Support 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 max-w-7xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl"></div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-sky-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-300 font-medium">Google Maps</p>
                  <p className="text-gray-500">Lokasi kantor akan ditampilkan di sini</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Kontak;
