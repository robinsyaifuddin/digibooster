
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Send, ArrowLeft, CreditCard, Smartphone, MessageCircle, Download, QrCode, Copy } from 'lucide-react';
import { toast } from 'sonner';

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [serviceTitle, setServiceTitle] = useState<string>('');
  const [subcategoryTitle, setSubcategoryTitle] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
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

    // Generate invoice number
    const generateInvoiceNumber = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `INV-DB-${year}${month}${day}-${random}`;
    };
    
    setInvoiceNumber(generateInvoiceNumber());
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateDP = (priceRange: string) => {
    const numbers = priceRange.match(/[\d,]+/g);
    if (numbers && numbers.length > 0) {
      const minPrice = parseInt(numbers[0].replace(/,/g, ''));
      const dp = minPrice * 0.4;
      return {
        amount: dp,
        formatted: `Rp ${dp.toLocaleString('id-ID')}`
      };
    }
    return { amount: 0, formatted: 'Rp 0' };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast.error("Mohon lengkapi form pemesanan");
      return;
    }
    
    setShowPayment(true);
    toast.success("Data berhasil disimpan! Silakan pilih metode pembayaran.");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} berhasil disalin!`);
  };

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = qrCodeRef.current.querySelector('img') as HTMLImageElement;
      
      if (img && ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = `QRIS-${invoiceNumber}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        toast.success("QRIS berhasil didownload!");
      }
    }
  };

  const generateInvoiceData = () => {
    const dpData = calculateDP(priceRange);
    const currentDate = new Date();
    
    return {
      invoiceNumber,
      date: currentDate.toLocaleDateString('id-ID'),
      time: currentDate.toLocaleTimeString('id-ID'),
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '-'
      },
      service: {
        category: serviceTitle,
        subcategory: subcategoryTitle,
        priceRange: priceRange,
        dpAmount: dpData.formatted,
        dpPercentage: '40%'
      },
      payment: {
        method: selectedPaymentMethod,
        status: 'Pending'
      }
    };
  };

  const handlePaymentConfirmation = () => {
    if (!selectedPaymentMethod) {
      toast.error("Mohon pilih metode pembayaran");
      return;
    }

    const invoice = generateInvoiceData();
    
    // Format WhatsApp message with invoice
    const message = `
*🧾 KONFIRMASI PEMBAYARAN DIGIBOOSTER*
=============================================

*📋 DETAIL INVOICE:*
• No. Invoice: ${invoice.invoiceNumber}
• Tanggal: ${invoice.date}
• Jam: ${invoice.time}

*👤 DATA PEMESAN:*
• Nama: ${invoice.customer.name}
• Email: ${invoice.customer.email}
• Telepon: ${invoice.customer.phone}
• Perusahaan: ${invoice.customer.company}

*🎯 DETAIL LAYANAN:*
• Kategori: ${invoice.service.category}
• Sub Kategori: ${invoice.service.subcategory}
• Kisaran Harga: ${invoice.service.priceRange}
• DP (${invoice.service.dpPercentage}): ${invoice.service.dpAmount}

*💳 METODE PEMBAYARAN:*
• ${invoice.payment.method}
• Status: ${invoice.payment.status}

*📋 PESAN:*
${formData.message || 'Tidak ada pesan tambahan'}

=============================================

*💰 INFORMASI PEMBAYARAN DP:*
${selectedPaymentMethod === 'QRIS' ? 
  '• Scan QRIS yang telah diberikan\n• Upload bukti pembayaran' : 
  '• Transfer ke rekening yang diberikan\n• Upload bukti transfer'
}

${selectedPaymentMethod === 'Dana' ? 
  '📱 *DANA ACCOUNT INFO:*\n• Nama: DigiBooster Official\n• No. Dana: 0857-6819-2419\n• Atas Nama: Digital Booster Indonesia' : ''
}

*📞 Mohon konfirmasi pembayaran dan kirimkan bukti transfer untuk DP sebesar ${invoice.service.dpAmount}*

Terima kasih telah mempercayai DigiBooster! 🚀
    `;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285768192419?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("Invoice telah dibuat! Anda akan diarahkan ke WhatsApp untuk konfirmasi pembayaran.");
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
              Lengkapi data pemesanan dan lakukan pembayaran DP
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {!showPayment ? (
              // Biodata Form
              <Card className="bg-gray-900/80 border-gray-800 shadow-lg">
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
                      Lanjut ke Pembayaran
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              // Payment Section
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary & Payment Methods */}
                <Card className="bg-gray-900/80 border-gray-800 shadow-lg">
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
                          <span className="text-gray-400">Invoice:</span>
                          <span className="text-white font-mono">{invoiceNumber}</span>
                        </div>
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
                            <span className="text-sky-400">{calculateDP(priceRange).formatted}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Pilih Metode Pembayaran</h3>
                      <div className="space-y-3">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedPaymentMethod === 'QRIS' 
                              ? 'border-sky-500 bg-sky-500/10' 
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                          onClick={() => setSelectedPaymentMethod('QRIS')}
                        >
                          <div className="flex items-center space-x-3">
                            <QrCode className="h-6 w-6 text-sky-400" />
                            <div>
                              <div className="text-white font-medium">QRIS</div>
                              <div className="text-gray-400 text-sm">Scan QR Code untuk bayar</div>
                            </div>
                          </div>
                        </div>

                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedPaymentMethod === 'Dana' 
                              ? 'border-sky-500 bg-sky-500/10' 
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                          onClick={() => setSelectedPaymentMethod('Dana')}
                        >
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-6 w-6 text-sky-400" />
                            <div>
                              <div className="text-white font-medium">Dana</div>
                              <div className="text-gray-400 text-sm">Transfer via Dana</div>
                            </div>
                          </div>
                        </div>

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
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Details */}
                {selectedPaymentMethod && (
                  <Card className="bg-gray-900/80 border-gray-800 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">
                        Detail Pembayaran - {selectedPaymentMethod}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {selectedPaymentMethod === 'QRIS' && (
                        <div className="text-center">
                          <div ref={qrCodeRef} className="bg-white p-4 rounded-lg inline-block mb-4">
                            <img 
                              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021226580012ID.DANA.WWW0118936085768192419030303UME51440014ID.CO.QRIS.WWW0215ID10200001084560303UME5204542653033605406${calculateDP(priceRange).amount}5802ID5909DigiBooster6009Surakarta61055745062060107081234563041234"
                              alt="QRIS Code"
                              className="w-48 h-48"
                            />
                          </div>
                          <p className="text-gray-400 text-sm mb-4">
                            Scan QRIS di atas dengan aplikasi pembayaran digital Anda
                          </p>
                          <div className="flex gap-3 justify-center">
                            <Button 
                              onClick={downloadQRCode}
                              variant="outline"
                              className="border-gray-700 text-white hover:bg-sky-500/20"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download QRIS
                            </Button>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === 'Dana' && (
                        <div className="space-y-4">
                          <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
                            <h4 className="text-white font-semibold mb-3">Informasi Akun Dana</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Nama:</span>
                                <div className="flex items-center">
                                  <span className="text-white mr-2">DigiBooster Official</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => copyToClipboard('DigiBooster Official', 'Nama')}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">No. Dana:</span>
                                <div className="flex items-center">
                                  <span className="text-white mr-2 font-mono">0857-6819-2419</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => copyToClipboard('085768192419', 'Nomor Dana')}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Atas Nama:</span>
                                <span className="text-white">Digital Booster Indonesia</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm text-center">
                            Transfer sejumlah {calculateDP(priceRange).formatted} ke akun Dana di atas
                          </p>
                        </div>
                      )}

                      {selectedPaymentMethod === 'Transfer Bank' && (
                        <div className="space-y-4">
                          <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
                            <h4 className="text-white font-semibold mb-3">Informasi Rekening Bank</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Bank:</span>
                                <span className="text-white">BCA</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">No. Rekening:</span>
                                <div className="flex items-center">
                                  <span className="text-white mr-2 font-mono">1234567890</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => copyToClipboard('1234567890', 'Nomor Rekening')}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400">Atas Nama:</span>
                                <span className="text-white">Digital Booster Indonesia</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm text-center">
                            Transfer sejumlah {calculateDP(priceRange).formatted} ke rekening di atas
                          </p>
                        </div>
                      )}

                      <Button 
                        onClick={handlePaymentConfirmation}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6 text-lg"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Proses & Konfirmasi via WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderForm;
