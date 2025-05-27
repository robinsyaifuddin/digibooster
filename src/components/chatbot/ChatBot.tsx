
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    "Apa saja layanan yang ditawarkan DigiBooster?",
    "Berapa harga pembuatan website?",
    "Bagaimana cara memesan layanan digital marketing?",
    "Apakah ada paket bundling untuk layanan?",
    "Berapa lama proses pembuatan aplikasi mobile?",
    "Bagaimana sistem pembayaran di DigiBooster?"
  ];

  const botResponses: { [key: string]: string } = {
    'layanan': 'DigiBooster menyediakan 4 kategori layanan utama:\n\n🌐 Website & Aplikasi (Landing Page, Company Profile, E-commerce, Web Apps, Mobile Apps)\n\n📱 Digital Marketing (Social Media Management, Content Marketing, SEO, Google Ads, Facebook Ads)\n\n🎨 Branding & Design (Logo Design, Brand Identity, UI/UX Design, Print Design, Packaging Design)\n\n🎬 Video & Animation (Video Promosi, Motion Graphics, Animasi 2D, Video Editing, Live Streaming)',
    
    'harga': 'Berikut range harga layanan kami:\n\n💻 Website & Aplikasi: Rp 3.5M - 35M\n📱 Digital Marketing: Rp 2.1M - 4.2M\n🎨 Branding & Design: Rp 1.4M - 4.2M\n🎬 Video & Animation: Rp 1.4M - 5.6M\n\nSemua harga sudah termasuk konsultasi gratis dan revisi. Untuk detail lebih lanjut, silakan hubungi tim kami!',
    
    'pemesanan': 'Cara memesan layanan DigiBooster sangat mudah:\n\n1️⃣ Pilih layanan yang diinginkan di halaman Jasa Digital\n2️⃣ Isi form pemesanan dengan lengkap\n3️⃣ Bayar DP 40% dari total harga\n4️⃣ Tim kami akan menghubungi Anda untuk konsultasi\n5️⃣ Proses pengerjaan dimulai\n\nAnda juga bisa langsung konsultasi via WhatsApp di +62 857-6819-2419',
    
    'pembayaran': 'Sistem pembayaran di DigiBooster:\n\n💳 Metode: Transfer Bank (SeaBank), Dana, QRIS\n💰 DP: 40% dari total harga\n💰 Pelunasan: 60% saat project selesai\n📋 Bukti: Invoice otomatis dan bukti transfer\n\nSemua transaksi aman dan terpercaya!',
    
    'kontak': 'Hubungi DigiBooster:\n\n📞 Telepon: +62 857-6819-2419\n📧 Email: hello.digibooster@gmail.com\n🌐 Website: digibooster.web.id\n📱 Instagram: @official.digibooster\n\nTim customer service kami siap membantu 24/7!',
    
    'default': 'Terima kasih atas pertanyaan Anda! 😊\n\nSaya adalah Digi BOT, asisten virtual DigiBooster Indonesia yang siap membantu Anda 24/7. Untuk pertanyaan yang lebih spesifik atau konsultasi mendalam, silakan hubungi tim ahli kami di:\n\n📱 WhatsApp: +62 857-6819-2419\n📧 Email: hello.digibooster@gmail.com\n\nApakah ada hal lain yang ingin Anda tanyakan? 🚀'
  };

  const welcomeMessage: Message = {
    id: 'welcome',
    text: '👋 Halo! Selamat datang di DigiBooster Indonesia!\n\nSaya Digi BOT, asisten virtual Anda yang siap membantu 24/7! 🤖✨\n\nSaya dapat membantu Anda dengan informasi tentang:\n• Layanan digital kami\n• Harga dan paket\n• Cara pemesanan\n• Dan pertanyaan lainnya!\n\nAda yang bisa saya bantu hari ini? 😊',
    sender: 'bot',
    timestamp: new Date()
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('layanan') || message.includes('service') || message.includes('jasa')) {
      return botResponses.layanan;
    } else if (message.includes('harga') || message.includes('price') || message.includes('biaya') || message.includes('tarif')) {
      return botResponses.harga;
    } else if (message.includes('pesan') || message.includes('order') || message.includes('beli') || message.includes('cara')) {
      return botResponses.pemesanan;
    } else if (message.includes('bayar') || message.includes('payment') || message.includes('dp') || message.includes('transfer')) {
      return botResponses.pembayaran;
    } else if (message.includes('kontak') || message.includes('hubungi') || message.includes('telepon') || message.includes('whatsapp')) {
      return botResponses.kontak;
    } else if (message.includes('terima kasih') || message.includes('thanks') || message.includes('selesai') || message.includes('cukup')) {
      return '🙏 Terima kasih telah menghubungi DigiBooster Indonesia!\n\nSemoga informasi yang saya berikan bermanfaat. Jika Anda memiliki pertanyaan lebih lanjut atau ingin konsultasi lebih mendalam, jangan ragu untuk menghubungi tim ahli kami!\n\n💬 Saya akan selalu di sini untuk membantu Anda 24/7. Sampai jumpa lagi! 🚀✨';
    } else {
      return botResponses.default;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mb-4 w-80 sm:w-96"
          >
            <Card className="bg-gray-900 border-gray-700 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-sky-600 to-sky-500 rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Bot className="h-6 w-6 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Digi BOT</h3>
                    <p className="text-xs text-sky-100">Customer Service 24/7</p>
                  </div>
                </div>
                <Button
                  onClick={toggleChat}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            message.sender === 'user'
                              ? 'bg-sky-500 text-white'
                              : 'bg-gray-800 text-gray-100 border border-gray-700'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.text}</div>
                          <div className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-sky-100' : 'text-gray-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString('id-ID', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Sample Questions */}
                {messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4"
                  >
                    <p className="text-xs text-gray-400 mb-2">Contoh pertanyaan:</p>
                    <div className="space-y-2">
                      {sampleQuestions.slice(0, 3).map((question, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          onClick={() => handleQuestionClick(question)}
                          className="w-full text-left p-2 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
                        >
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ketik pesan Anda..."
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button
                    onClick={sendMessage}
                    size="sm"
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                    disabled={!inputMessage.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleChat}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="h-6 w-6" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};

export default ChatBot;
