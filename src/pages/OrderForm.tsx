import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Send, ArrowLeft, CreditCard, Smartphone, MessageCircle, Download, QrCode, Copy, FileText } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [serviceTitle, setServiceTitle] = useState<string>('');
  const [subcategoryTitle, setSubcategoryTitle] = useState<string>('');
  const [fixedPrice, setFixedPrice] = useState<number>(0);
  const [formattedPrice, setFormattedPrice] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });

  // Service price mapping with 40% markup
  const servicePrices: { [key: string]: { [key: string]: number } } = {
    'Website & Aplikasi': {
      'Landing Page': 3500000, // Base: 2.5M, +40% = 3.5M
      'Company Profile': 7000000, // Base: 5M, +40% = 7M
      'E-commerce': 14000000, // Base: 10M, +40% = 14M
      'Web Aplikasi': 21000000, // Base: 15M, +40% = 21M
      'Mobile Apps': 35000000 // Base: 25M, +40% = 35M
    },
    'Digital Marketing': {
      'Social Media Management': 2100000, // Base: 1.5M, +40% = 2.1M
      'Content Marketing': 2800000, // Base: 2M, +40% = 2.8M
      'SEO Optimization': 4200000, // Base: 3M, +40% = 4.2M
      'Google Ads': 3500000, // Base: 2.5M, +40% = 3.5M
      'Facebook Ads': 2800000 // Base: 2M, +40% = 2.8M
    },
    'Branding & Design': {
      'Logo Design': 1400000, // Base: 1M, +40% = 1.4M
      'Brand Identity': 2800000, // Base: 2M, +40% = 2.8M
      'UI/UX Design': 4200000, // Base: 3M, +40% = 4.2M
      'Print Design': 2100000, // Base: 1.5M, +40% = 2.1M
      'Packaging Design': 3500000 // Base: 2.5M, +40% = 3.5M
    },
    'Video & Animation': {
      'Video Promosi': 2800000, // Base: 2M, +40% = 2.8M
      'Motion Graphics': 4200000, // Base: 3M, +40% = 4.2M
      'Animasi 2D': 5600000, // Base: 4M, +40% = 5.6M
      'Video Editing': 2100000, // Base: 1.5M, +40% = 2.1M
      'Live Streaming': 1400000 // Base: 1M, +40% = 1.4M
    }
  };

  // Extract service info from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    const subcategory = params.get('subcategory');
    
    if (service && subcategory) {
      setFormData(prev => ({ ...prev, service }));
      setServiceTitle(service);
      setSubcategoryTitle(subcategory);
      
      // Get fixed price from mapping
      const price = servicePrices[service]?.[subcategory] || 0;
      setFixedPrice(price);
      setFormattedPrice(`Rp ${price.toLocaleString('id-ID')}`);
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

  const calculateDP = (price: number) => {
    const dp = price * 0.4;
    return {
      amount: dp,
      formatted: `Rp ${dp.toLocaleString('id-ID')}`
    };
  };

  const generateInvoiceData = () => {
    const dpData = calculateDP(fixedPrice);
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
        price: formattedPrice,
        dpAmount: dpData.formatted,
        dpPercentage: '40%'
      },
      payment: {
        method: selectedPaymentMethod,
        status: 'Pending'
      }
    };
  };

  // Generate QR code data URL based on invoice number
  const generateQRCodeDataURL = (invoiceNum: string): string => {
    // Create a simple QR-like data pattern based on invoice number
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return '';
    
    canvas.width = 100;
    canvas.height = 100;
    
    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 100, 100);
    
    // Black QR pattern based on invoice number
    ctx.fillStyle = '#000000';
    
    // Generate pattern based on invoice number hash
    const hash = invoiceNum.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Create QR-like pattern
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const shouldFill = (hash + i * j) % 3 === 0;
        if (shouldFill) {
          ctx.fillRect(i * 10, j * 10, 10, 10);
        }
      }
    }
    
    // Add corner markers
    ctx.fillRect(0, 0, 30, 30);
    ctx.fillRect(70, 0, 30, 30);
    ctx.fillRect(0, 70, 30, 30);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(10, 10, 10, 10);
    ctx.fillRect(80, 10, 10, 10);
    ctx.fillRect(10, 80, 10, 10);
    
    return canvas.toDataURL();
  };

  const generateInvoicePDF = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const invoice = generateInvoiceData();
      const pdf = new jsPDF();
      
      // Colors
      const primaryBlue = [66, 153, 225];
      const darkBlue = [45, 55, 72];
      const lightGray = [247, 250, 252];
      const darkGray = [45, 55, 72];
      const mediumGray = [113, 128, 150];
      
      // Header with company branding
      pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.roundedRect(20, 20, 75, 30, 3, 3, 'F');
      
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('DIGIBOOSTER', 25, 32);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text('DESIGN STUDIO', 25, 38);
      pdf.text('Platform Layanan Jasa Digital Indonesia', 25, 43);
      
      // Invoice header
      pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.roundedRect(105, 20, 75, 30, 3, 3, 'F');
      
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('INVOICE', 120, 32);
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`No. ${invoice.invoiceNumber}`, 110, 40);
      pdf.text(`${invoice.date}`, 110, 45);
      
      // Customer info section
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text('INVOICE TO', 25, 65);
      
      pdf.setFontSize(12);
      pdf.text(invoice.customer.name, 25, 75);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(invoice.customer.email, 25, 82);
      pdf.text(invoice.customer.phone, 25, 87);
      if (invoice.customer.company !== '-') {
        pdf.text(invoice.customer.company, 25, 92);
      }
      
      // Invoice details box
      pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.roundedRect(105, 60, 75, 35, 2, 2, 'F');
      pdf.setDrawColor(200, 200, 200);
      pdf.roundedRect(105, 60, 75, 35, 2, 2);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
      pdf.text('Invoice Date', 110, 68);
      pdf.text('Due Date', 145, 68);
      
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text(invoice.date, 110, 73);
      
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);
      pdf.text(dueDate.toLocaleDateString('id-ID'), 145, 73);
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
      pdf.text('Total Due:', 110, 83);
      
      pdf.setFontSize(14);
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text(invoice.service.dpAmount, 110, 91);
      
      // Table header
      const tableY = 110;
      pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.roundedRect(25, tableY, 150, 10, 1, 1, 'F');
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('SL.', 28, tableY + 7);
      pdf.text('DESCRIPTION', 40, tableY + 7);
      pdf.text('PRICE', 100, tableY + 7);
      pdf.text('QUANTITY', 125, tableY + 7);
      pdf.text('TOTAL', 155, tableY + 7);
      
      // Table content
      pdf.setFillColor(255, 255, 255);
      pdf.rect(25, tableY + 10, 150, 15);
      
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      
      pdf.text('1.', 28, tableY + 18);
      pdf.text(invoice.service.subcategory, 40, tableY + 18);
      pdf.text(`Layanan ${invoice.service.category}`, 40, tableY + 22);
      pdf.text(invoice.service.price, 100, tableY + 18);
      pdf.text('1', 130, tableY + 18);
      pdf.text(invoice.service.price, 150, tableY + 18);
      
      // Calculation section
      const calcY = tableY + 35;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text('Sub Total', 105, calcY);
      pdf.text(invoice.service.price, 150, calcY);
      
      pdf.text(`DP (${invoice.service.dpPercentage})`, 105, calcY + 6);
      pdf.text(`-${((fixedPrice - calculateDP(fixedPrice).amount)).toLocaleString('id-ID')}`, 145, calcY + 6);
      
      // Grand total
      pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.roundedRect(100, calcY + 10, 75, 10, 1, 1, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('Grand Total:', 105, calcY + 17);
      pdf.text(invoice.service.dpAmount, 150, calcY + 17);
      
      // Payment methods
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text('Payment Methods', 25, calcY + 35);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      
      if (selectedPaymentMethod === 'Dana') {
        pdf.text('Dana - 085768192419', 25, calcY + 43);
        pdf.text('A/N: Robin Syaifudin', 25, calcY + 48);
      } else if (selectedPaymentMethod === 'Transfer Bank') {
        pdf.text('SeaBank - 9011 2236 4979', 25, calcY + 43);
        pdf.text('A/N: Robin Syaifuddin', 25, calcY + 48);
      } else if (selectedPaymentMethod === 'QRIS') {
        pdf.text('QRIS Payment Available', 25, calcY + 43);
      }
      
      // Terms & Conditions
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text('Terms & Conditions', 25, calcY + 58);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text('• Pembayaran DP 40% diperlukan untuk memulai project', 25, calcY + 65);
      pdf.text('• Sisa pembayaran 60% dilakukan setelah project selesai', 25, calcY + 69);
      pdf.text('• Project dimulai setelah konfirmasi pembayaran DP', 25, calcY + 73);
      
      // QR Code section
      const qrY = calcY + 85;
      
      // Generate QR code based on invoice number
      const qrDataURL = generateQRCodeDataURL(invoice.invoiceNumber);
      
      if (qrDataURL) {
        pdf.addImage(qrDataURL, 'PNG', 25, qrY, 20, 20);
      }
      
      pdf.setFontSize(7);
      pdf.text('QR CODE', 25, qrY + 25);
      pdf.text(`Invoice: ${invoice.invoiceNumber}`, 25, qrY + 29);
      
      // Digital signature
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.text('Digitally Signed by:', 105, qrY + 5);
      pdf.text('Robin Syaifuddin', 105, qrY + 12);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text('CEO DigiBooster Indonesia', 105, qrY + 17);
      pdf.text(`Signed: ${invoice.date} ${invoice.time}`, 105, qrY + 22);
      
      // Footer
      pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.roundedRect(25, 250, 150, 25, 2, 2, 'F');
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('THANK YOU FOR YOUR BUSINESS', 65, 260);
      
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'normal');
      pdf.text('+62 857-6819-2419', 30, 267);
      pdf.text('hello.digibooster@gmail.com', 85, 267);
      pdf.text('digibooster.web.id', 30, 271);
      pdf.text('Indonesia', 85, 271);
      
      const blob = pdf.output('blob');
      resolve(blob);
    });
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

  const handlePaymentConfirmation = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Mohon pilih metode pembayaran");
      return;
    }

    try {
      // Generate and download PDF
      const pdfBlob = await generateInvoicePDF();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Invoice-DigiBooster-${invoiceNumber}.pdf`;
      link.click();
      
      // Clean up the URL
      URL.revokeObjectURL(pdfUrl);
      
      toast.success("Invoice berhasil didownload!");

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
• Harga: ${invoice.service.price}
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
  selectedPaymentMethod === 'Dana' ?
  '• Transfer via Dana ke nomor yang diberikan\n• Upload bukti transfer' :
  '• Transfer ke rekening SeaBank yang diberikan\n• Upload bukti transfer'
}

${selectedPaymentMethod === 'Dana' ? 
  '📱 *DANA ACCOUNT INFO:*\n• Nama: Robin Syaifudin\n• No. Dana: 085768192419\n• Atas Nama: Robin Syaifudin' : ''
}

${selectedPaymentMethod === 'Transfer Bank' ? 
  '🏦 *SEABANK ACCOUNT INFO:*\n• Bank: SeaBank\n• No. Rekening: 9011 2236 4979\n• Atas Nama: Robin Syaifuddin' : ''
}

*📞 Mohon konfirmasi pembayaran dan kirimkan bukti transfer untuk DP sebesar ${invoice.service.dpAmount}*

*📎 Invoice telah didownload secara otomatis. Silakan lampirkan file invoice di chat ini.*

Terima kasih telah mempercayai DigiBooster! 🚀
      `;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/6285768192419?text=${encodedMessage}`;
      
      // Small delay to ensure download completes before opening WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        toast.success("Invoice telah didownload! Silakan lampirkan file di WhatsApp yang akan terbuka.");
      }, 1000);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Terjadi kesalahan saat membuat invoice. Silakan coba lagi.");
    }
  };

  const downloadInvoicePDF = async () => {
    try {
      const pdfBlob = await generateInvoicePDF();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Invoice-DigiBooster-${invoiceNumber}.pdf`;
      link.click();
      
      URL.revokeObjectURL(pdfUrl);
      toast.success("Invoice berhasil didownload!");
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error("Terjadi kesalahan saat mendownload invoice.");
    }
  };

  return (
    <div className="pt-20 sm:pt-32 pb-12 sm:pb-24 min-h-screen bg-black">
      <div className="container px-4 mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6 sm:mb-8 group border-gray-700 text-white hover:bg-sky-500/20 hover:border-sky-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white px-2">
              Form Pemesanan Layanan Digital
            </h1>
            <p className="text-base sm:text-lg text-gray-400 px-4">
              Lengkapi data pemesanan dan lakukan pembayaran DP
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Combined Form and Payment Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Biodata Form */}
              <Card className="bg-gray-900/80 border-gray-800 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl text-white">
                    Detail Pemesanan - {subcategoryTitle}
                  </CardTitle>
                  <div className="text-xs sm:text-sm text-gray-400 space-y-1">
                    <div><span className="text-sky-400">Layanan:</span> {serviceTitle}</div>
                    <div><span className="text-sky-400">Harga:</span> {formattedPrice}</div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white text-sm">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Masukkan nama lengkap"
                          className="bg-gray-800 border-gray-700 text-white h-10"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white text-sm">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Masukkan email"
                          className="bg-gray-800 border-gray-700 text-white h-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white text-sm">
                          Nomor Telepon <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Masukkan nomor telepon"
                          className="bg-gray-800 border-gray-700 text-white h-10"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white text-sm">
                          Nama Perusahaan / Bisnis
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Masukkan nama perusahaan (opsional)"
                          className="bg-gray-800 border-gray-700 text-white h-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white text-sm">
                        Pesan / Kebutuhan
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Deskripsikan kebutuhan Anda secara detail (opsional)"
                        className="bg-gray-800 border-gray-700 text-white min-h-[100px] sm:min-h-[120px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-4 sm:py-6 text-base sm:text-lg"
                    >
                      Lanjut ke Pembayaran
                      <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Payment Section - Always Visible */}
              <Card className="bg-gray-900/80 border-gray-800 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl text-white">
                    Informasi Pembayaran
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Order Summary */}
                  <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Ringkasan Pesanan</h3>
                      <Button 
                        onClick={downloadInvoicePDF}
                        size="sm"
                        variant="outline"
                        className="border-sky-500 text-sky-400 hover:bg-sky-500/20 text-xs"
                        disabled={!formData.name || !formData.email || !formData.phone}
                      >
                        <FileText className="mr-1 h-3 w-3" />
                        Download Invoice
                      </Button>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Invoice:</span>
                        <span className="text-white font-mono text-xs">{invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Layanan:</span>
                        <span className="text-white text-right">{serviceTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Kategori:</span>
                        <span className="text-white text-right">{subcategoryTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Harga:</span>
                        <span className="text-white text-right">{formattedPrice}</span>
                      </div>
                      <div className="border-t border-gray-700 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-sky-400">DP (40%):</span>
                          <span className="text-sky-400 text-right">{calculateDP(fixedPrice).formatted}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Pilih Metode Pembayaran</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div 
                        className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                          selectedPaymentMethod === 'QRIS' 
                            ? 'border-sky-500 bg-sky-500/10' 
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedPaymentMethod('QRIS')}
                      >
                        <div className="flex items-center space-x-3">
                          <QrCode className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
                          <div>
                            <div className="text-white font-medium text-sm sm:text-base">QRIS</div>
                            <div className="text-gray-400 text-xs sm:text-sm">Scan QR Code untuk bayar</div>
                          </div>
                        </div>
                      </div>

                      <div 
                        className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                          selectedPaymentMethod === 'Dana' 
                            ? 'border-sky-500 bg-sky-500/10' 
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedPaymentMethod('Dana')}
                      >
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
                          <div>
                            <div className="text-white font-medium text-sm sm:text-base">Dana</div>
                            <div className="text-gray-400 text-xs sm:text-sm">Transfer via Dana</div>
                          </div>
                        </div>
                      </div>

                      <div 
                        className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                          selectedPaymentMethod === 'Transfer Bank' 
                            ? 'border-sky-500 bg-sky-500/10' 
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedPaymentMethod('Transfer Bank')}
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
                          <div>
                            <div className="text-white font-medium text-sm sm:text-base">Transfer Bank</div>
                            <div className="text-gray-400 text-xs sm:text-sm">Transfer ke rekening SeaBank</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  {selectedPaymentMethod && (
                    <div className="border-t border-gray-700 pt-4 sm:pt-6">
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                        Detail Pembayaran - {selectedPaymentMethod}
                      </h4>
                      
                      {selectedPaymentMethod === 'QRIS' && (
                        <div className="text-center">
                          <div ref={qrCodeRef} className="bg-white p-3 sm:p-4 rounded-lg inline-block mb-3 sm:mb-4">
                            <img 
                              src={generateQRCodeDataURL(invoiceNumber)}
                              alt="QRIS Code"
                              className="w-48 sm:w-64 h-auto"
                            />
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 px-2">
                            Scan QRIS di atas dengan aplikasi pembayaran digital Anda
                          </p>
                          <div className="flex gap-2 sm:gap-3 justify-center">
                            <Button 
                              onClick={downloadQRCode}
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-white hover:bg-sky-500/20 text-xs"
                            >
                              <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Download QRIS
                            </Button>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === 'Dana' && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3 sm:p-4">
                            <h5 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Informasi Akun Dana</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-xs sm:text-sm">Nama:</span>
                                <div className="flex items-center">
                                  <span className="text-white mr-2 text-xs sm:text-sm">Robin Syaifudin</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => copyToClipboard('Robin Syaifudin', 'Nama')}
                                    className="h-5 w-5 sm:h-6 sm:w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-xs sm:text-sm">No. Dana:</span>
                                <div className="flex items-center">
                                  <span className="text-white mr-2 font-mono text-xs sm:text-sm">085768192419</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => copyToClipboard('085768192419', 'Nomor Dana')}
                                    className="h-5 w-5 sm:h-6 sm:w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-xs sm:text-sm">Atas Nama:</span>
                                <span className="text-white text-xs sm:text-sm">Robin Syaifudin</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm text-center">
                            Transfer sejumlah {calculateDP(fixedPrice).formatted} ke akun Dana di atas
                          </p>
                        </div>
                      )}

                      {selectedPaymentMethod === 'Transfer Bank' && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3 sm:p-4">
                            <h5 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Informasi Rekening SeaBank</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-xs sm:text-sm">Bank:</span>
                                <span className="text-white text-xs sm:text-sm">SeaBank</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-xs sm:text-sm">No. Rekening:</span>
                                <div className="flex items-center">
                                  <span className="text-white mr-2 font-mono text-xs sm:text-sm">9011 2236 4979</span>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => copyToClipboard('9011 2236 4979', 'Nomor Rekening')}
                                    className="h-5 w-5 sm:h-6 sm:w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-xs sm:text-sm">Atas Nama:</span>
                                <span className="text-white text-xs sm:text-sm">Robin Syaifuddin</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm text-center">
                            Transfer sejumlah {calculateDP(fixedPrice).formatted} ke rekening SeaBank di atas
                          </p>
                        </div>
                      )}

                      <Button 
                        onClick={handlePaymentConfirmation}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 sm:py-6 text-sm sm:text-lg mt-4 sm:mt-6"
                      >
                        <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Konfirmasi Pembayaran
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderForm;
