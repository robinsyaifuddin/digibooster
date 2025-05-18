
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
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

  return (
    <div className="pt-24 md:pt-28 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Contact Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent leading-tight mb-6">
            Hubungi Kami
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Konsultasikan kebutuhan digital Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik untuk mengembangkan bisnis Anda.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-gray-900/30 border border-gray-800 rounded-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    placeholder="Nama Anda"
                    className="bg-gray-800 border-gray-700 text-white"
                    {...register('name', { required: 'Nama tidak boleh kosong' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message as string}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    placeholder="email@example.com"
                    className="bg-gray-800 border-gray-700 text-white"
                    {...register('email', { 
                      required: 'Email tidak boleh kosong',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Format email tidak valid'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message as string}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subjek
                </label>
                <Input
                  id="subject"
                  placeholder="Subjek pesan Anda"
                  className="bg-gray-800 border-gray-700 text-white"
                  {...register('subject', { required: 'Subjek tidak boleh kosong' })}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject.message as string}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Pesan
                </label>
                <Textarea
                  id="message"
                  placeholder="Tulis pesan Anda di sini..."
                  rows={6}
                  className="bg-gray-800 border-gray-700 text-white resize-none"
                  {...register('message', { required: 'Pesan tidak boleh kosong' })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message as string}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-md flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </Button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Card */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Info Kontak</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-sky-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Telepon</p>
                    <a href="tel:+6282279722417" className="text-white hover:text-sky-400 transition-colors">
                      +62 822-7972-2417
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-sky-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:hello.digibooster@gmail.com" className="text-white hover:text-sky-400 transition-colors">
                      hello.digibooster@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Kantor</p>
                    <p className="text-white">
                      Way Kandis, Kec. Tanjung Senang,<br />Bandar Lampung, Lampung 35143
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-sky-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Media Sosial</p>
                    <div className="flex gap-2 mt-2">
                      <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors" aria-label="Instagram">
                        <i className="icon-instagram text-white"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors" aria-label="Facebook">
                        <i className="icon-facebook text-white"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors" aria-label="Twitter">
                        <i className="icon-twitter text-white"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors" aria-label="LinkedIn">
                        <i className="icon-linkedin text-white"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Working Hours */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Jam Operasional</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-400">Senin - Jumat</span>
                  <span className="text-white">09:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Sabtu</span>
                  <span className="text-white">09:00 - 15:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Minggu</span>
                  <span className="text-white">Tutup</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="h-[400px] rounded-xl overflow-hidden border border-gray-800">
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <p className="text-gray-400">Google Maps akan dimuat di sini</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Kontak;
