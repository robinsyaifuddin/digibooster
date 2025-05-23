
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Send, ArrowLeft, CreditCard, Smartphone, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { jasaDigitalServices } from '@/data/jasaDigitalData';

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [serviceTitle, setServiceTitle] = useState<string>('');
  const [subcategoryTitle, setSubcategoryTitle] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });

  // Extract service info from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    const subcategory = params.get('subcategory');
    const price = params.get('priceRange');
    
    if (service) {
      setFormData(prev => ({ ...prev, service }));
      setServiceTitle(service);
    }
    if (subcategory) {
      setSubcategoryTitle(subcategory);
    }
    if (price) {
      setPriceRange(price);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateDP = (priceRange: string) => {
    // Extract numbers from price range and calculate 40% of minimum price
    const numbers = priceRange.match(/[\d,]+/g);
    if (numbers && numbers.length > 0) {
      const minPrice = parseInt(numbers[0].replace(/,/g, ''));
      const dp = minPrice * 0.4;
      return `Rp ${dp.toLocaleString('id-ID')}`;
    }
    return 'Rp 0';
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast.error("Mohon lengkapi form pemesanan");
      return;
    }
    
    setCurrentStep(2);
    toast.success("Data berhasil disimpan! Silakan pilih metode pembayaran.");
  };

  const handlePaymentConfirmation = () => {
    if (!selectedPaymentMethod) {
      toast.error("Mohon pilih metode pembayaran");
      return;
    }

    const dpAmount = calculateDP(priceRange);
    
    // Format WhatsApp message
    const message = `
*Konfirmasi Pemesanan DigiBooster*
=====================================

*DETAIL LAYANAN:*
• Kategori: ${serviceTitle}
• Sub Kategori: ${subcategoryTitle}
• Kisaran Harga: ${priceRange}
• DP (40%): ${dpAmount}

*DATA PEMESAN:*
• Nama: ${formData.name}
• Email: ${formData.email}
• Telepon: ${formData.phone}
• Perusahaan: ${formData.company || '-'}

*METODE PEMBAYARAN:*
• ${selectedPaymentMethod}

*PESAN:*
${formData.message || '-'}

=====================================
Mohon konfirmasi pemesanan dan kirimkan detail pembayaran untuk DP sebesar ${dpAmount}. Terima kasih!
    `;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285768192419?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("Anda akan diarahkan ke WhatsApp untuk konfirmasi pemesanan.");
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container px-4 mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-8 group border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              Form Pemesanan Layanan Digital
            </h1>
            <p className="text-lg text-gray-400">
              {currentStep === 1 ? 'Isi data pemesanan Anda' : 'Pilih metode pembayaran'}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-sky-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                1
              </div>
              <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-sky-500' : 'bg-gray-700'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-sky-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                2
              </div>
            </div>
          </div>
          
          {currentStep === 1 ? (
            <Card className="bg-gray-900/80 border-gray-800 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Detail Pemesanan - {subcategoryTitle}
                </CardTitle>
                <div className="text-sm text-gray-400">
                  <span className="text-sky-400">Layanan:</span> {serviceTitle} | 
                  <span className="text-sky-400"> Harga:</span> {priceRange}
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
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
                        className="bg-gray-800 border-gray-700 text-white"
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
                        className="bg-gray-800 border-gray-700 text-white"
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
                        className="bg-gray-800 border-gray-700 text-white"
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
                        className="bg-gray-800 border-gray-700 text-white"
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
                      className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-6 text-lg"
                  >
                    Ajukan Pembayaran
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900/80 border-gray-800 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Informasi Pembayaran
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Order Summary */}
                <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Ringkasan Pesanan</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Layanan:</span>
                      <span className="text-white">{serviceTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Kategori:</span>
                      <span className="text-white">{subcategoryTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Harga:</span>
                      <span className="text-white">{priceRange}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-sky-400">DP (40%):</span>
                        <span className="text-sky-400">{calculateDP(priceRange)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Pilih Metode Pembayaran</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'Transfer Bank' 
                          ? 'border-sky-500 bg-sky-500/10' 
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedPaymentMethod('Transfer Bank')}
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-6 w-6 text-sky-400" />
                        <div>
                          <div className="text-white font-medium">Transfer Bank</div>
                          <div className="text-gray-400 text-sm">Transfer ke rekening bank</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'QRIS' 
                          ? 'border-sky-500 bg-sky-500/10' 
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedPaymentMethod('QRIS')}
                    >
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-6 w-6 text-sky-400" />
                        <div>
                          <div className="text-white font-medium">QRIS</div>
                          <div className="text-gray-400 text-sm">Scan QR Code untuk bayar</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handlePaymentConfirmation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6 text-lg"
                  disabled={!selectedPaymentMethod}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Konfirmasi Via WhatsApp
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderForm;
