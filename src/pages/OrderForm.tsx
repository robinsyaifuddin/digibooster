
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Send, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { jasaDigitalServices } from '@/data/jasaDigitalData';

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [serviceTitle, setServiceTitle] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });

  // Extract service from URL parameters when component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    
    if (service) {
      setFormData(prev => ({ ...prev, service }));
      setServiceTitle(service);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, service: value }));
    setServiceTitle(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast.error("Mohon lengkapi form pemesanan");
      return;
    }
    
    // Format WhatsApp message
    const message = `
*Form Pemesanan DigiBooster*
----------------------------
*Layanan:* ${formData.service}
*Nama:* ${formData.name}
*Email:* ${formData.email}
*Telepon:* ${formData.phone}
*Perusahaan:* ${formData.company || '-'}
*Pesan:* ${formData.message || '-'}
    `;
    
    const encodedMessage = encodeURIComponent(message);
    // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/628123456789?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success toast
    toast.success("Terima kasih! Anda akan diarahkan ke WhatsApp untuk melanjutkan pemesanan.");
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark">
      <div className="container px-4 mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/program/jasa-digital')}
          className="mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Jasa Digital
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Form Pemesanan Layanan Digital
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Isi form di bawah ini untuk memesan layanan {serviceTitle}
          </p>
          
          <Card className="bg-dark-300/80 border-primary/20 shadow-lg mb-10">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Detail Pemesanan
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-white">
                    Pilih Layanan <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleServiceChange}
                    className="w-full p-3 bg-dark-400 border border-primary/20 rounded-md text-white"
                    required
                  >
                    <option value="">Pilih Layanan</option>
                    {jasaDigitalServices.map((service, index) => (
                      <option key={index} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className="bg-dark-400 border-primary/20 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Masukkan email"
                      className="bg-dark-400 border-primary/20 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Masukkan nomor telepon"
                      className="bg-dark-400 border-primary/20 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Nama Perusahaan / Bisnis
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Masukkan nama perusahaan (opsional)"
                      className="bg-dark-400 border-primary/20 text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Pesan / Kebutuhan
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Deskripsikan kebutuhan Anda secara detail (opsional)"
                    className="bg-dark-400 border-primary/20 text-white min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-dark font-medium group py-6 text-lg"
                >
                  Kirim Pemesanan via WhatsApp
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderForm;
