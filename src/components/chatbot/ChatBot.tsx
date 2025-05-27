
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
    "Bagaimana sistem pembayaran di DigiBooster?",
    "Bisakah saya konsultasi gratis dulu?",
    "Apa keunggulan DigiBooster dibanding yang lain?"
  ];

  const botResponses: { [key: string]: string } = {
    'layanan': 'DigiBooster menyediakan 4 kategori layanan utama:\n\n🌐 **Website & Aplikasi**\n• Landing Page\n• Company Profile\n• E-commerce\n• Web Apps\n• Mobile Apps\n\n📱 **Digital Marketing**\n• Social Media Management\n• Content Marketing\n• SEO\n• Google Ads\n• Facebook Ads\n\n🎨 **Branding & Design**\n• Logo Design\n• Brand Identity\n• UI/UX Design\n• Print Design\n• Packaging Design\n\n🎬 **Video & Animation**\n• Video Promosi\n• Motion Graphics\n• Animasi 2D\n• Video Editing\n• Live Streaming',
    
    'harga': 'Berikut range harga layanan kami:\n\n💻 **Website & Aplikasi:** Rp 3.5M - 35M\n📱 **Digital Marketing:** Rp 2.1M - 4.2M\n🎨 **Branding & Design:** Rp 1.4M - 4.2M\n🎬 **Video & Animation:** Rp 1.4M - 5.6M\n\n✨ Semua harga sudah termasuk konsultasi gratis dan revisi. Untuk detail lebih lanjut, silakan hubungi tim kami!',
    
    'pemesanan': 'Cara memesan layanan DigiBooster sangat mudah:\n\n1️⃣ Pilih layanan yang diinginkan di halaman Jasa Digital\n2️⃣ Isi form pemesanan dengan lengkap\n3️⃣ Bayar DP 40% dari total harga\n4️⃣ Tim kami akan menghubungi Anda untuk konsultasi\n5️⃣ Proses pengerjaan dimulai\n\n📞 Anda juga bisa langsung konsultasi via WhatsApp di +62 857-6819-2419',
    
    'pembayaran': 'Sistem pembayaran di DigiBooster:\n\n💳 **Metode:** Transfer Bank (SeaBank), Dana, QRIS\n💰 **DP:** 40% dari total harga\n💰 **Pelunasan:** 60% saat project selesai\n📋 **Bukti:** Invoice otomatis dan bukti transfer\n\n🔒 Semua transaksi aman dan terpercaya!',
    
    'kontak': 'Hubungi DigiBooster:\n\n📞 **Telepon:** +62 857-6819-2419\n📧 **Email:** hello.digibooster@gmail.com\n🌐 **Website:** digibooster.web.id\n📱 **Instagram:** @official.digibooster\n\n⏰ Tim customer service kami siap membantu setiap saat!',
    
    'konsultasi': 'Tentu saja! 😊 Konsultasi gratis adalah salah satu keunggulan DigiBooster.\n\n✅ **Yang bisa dikonsultasikan:**\n• Strategi digital marketing\n• Desain website yang cocok\n• Pilihan paket layanan\n• Timeline pengerjaan\n• Budget yang sesuai\n\n📞 **Cara konsultasi:**\n• WhatsApp: +62 857-6819-2419\n• Email: hello.digibooster@gmail.com\n• Atau chat langsung dengan saya di sini!\n\nJangan ragu untuk bertanya apapun ya! 🚀',

    'keunggulan': 'Keunggulan DigiBooster yang membedakan kami:\n\n⭐ **Pengalaman & Kredibilitas**\n• Tim berpengalaman 5+ tahun\n• Sudah menangani 500+ project\n• Klien dari berbagai industri\n\n🎯 **Layanan Komprehensif**\n• One-stop digital solution\n• Terintegrasi semua kebutuhan digital\n• Konsultasi gratis tanpa batas\n\n💎 **Kualitas Premium**\n• Desain modern & profesional\n• Teknologi terkini\n• After-sales service terjamin\n\n⚡ **Pelayanan Terbaik**\n• Respon cepat 24/7\n• Revisi unlimited\n• Garansi kepuasan\n\nMakanya banyak klien yang balik lagi ke kami! 😎',

    'curhat': 'Wah, saya senang kalau kamu mau curhat! 😊\n\nSebagai Digi BOT, saya siap mendengarkan keluh kesah kamu. Meskipun saya AI, tapi saya didesain untuk bisa memahami perasaan manusia kok.\n\n💭 **Mau curhat tentang apa?**\n• Masalah pekerjaan?\n• Kebingungan memilih layanan digital?\n• Stress karena project?\n• Atau hal lain yang mengganggु pikiran?\n\nSaya akan berusaha memberikan perspektif yang membantu. Cerita aja, saya dengarkan dengan baik! 🤗',

    'motivasi': 'Semangat! 💪 Setiap masalah pasti ada solusinya kok!\n\n🌟 **Ingat ya:**\n• Setiap tantangan adalah kesempatan untuk berkembang\n• Kamu sudah sampai sejauh ini, artinya kamu kuat!\n• Jangan takut gagal, karena kegagalan adalah guru terbaik\n• Satu langkah kecil hari ini, akan jadi pencapaian besar besok\n\n✨ **Di DigiBooster, kami percaya:**\n"Tidak ada mimpi yang terlalu besar, yang ada hanya usaha yang terlalu kecil"\n\nApapun project digital yang kamu impikan, kami siap bantu wujudkan! Yuk konsultasi gratis dulu! 🚀',

    'teknologi': 'Wah, senang banget ngobrol soal teknologi! 🤓\n\n💻 **Teknologi yang kami kuasai:**\n• **Frontend:** React, Vue.js, Angular, Next.js\n• **Backend:** Node.js, Python, PHP, Laravel\n• **Mobile:** React Native, Flutter, Kotlin\n• **Database:** MySQL, PostgreSQL, MongoDB\n• **Cloud:** AWS, Google Cloud, Azure\n• **AI/ML:** TensorFlow, OpenAI API\n\n🔥 **Trend teknologi 2024:**\n• AI integration di semua platform\n• Progressive Web Apps (PWA)\n• Serverless architecture\n• Voice user interface\n\nAda teknologi spesifik yang mau kamu bahas? Atau mau tau implementasinya untuk bisnis kamu? 🚀',

    'default': 'Halo! 😊 Terima kasih sudah chat dengan saya!\n\nSaya Digi BOT, asisten virtual DigiBooster Indonesia yang siap membantu setiap saat! 🤖✨\n\nSaya bisa diajak ngobrol tentang apapun kok:\n• Layanan DigiBooster\n• Konsultasi digital\n• Curhat & motivasi\n• Teknologi terkini\n• Atau hal random lainnya!\n\nAda yang bisa saya bantu hari ini? 🚀'
  };

  const followUpQuestions = [
    "Apakah ada hal lain yang ingin ditanyakan?",
    "Ada pertanyaan lain tentang layanan kami?", 
    "Mau konsultasi lebih detail tentang project kamu?",
    "Butuh info lebih lanjut tentang yang lain?",
    "Masih ada yang mau didiskusikan?"
  ];

  const welcomeMessage: Message = {
    id: 'welcome',
    text: '👋 Halo! Selamat datang di DigiBooster Indonesia!\n\nSaya Digi BOT, asisten virtual yang siap membantu setiap saat! 🤖✨\n\nSaya bisa diajak ngobrol tentang apapun:\n• Layanan digital kami 💻\n• Konsultasi & curhat 💭\n• Teknologi terkini 🚀\n• Atau hal random lainnya! 😄\n\nAda yang bisa saya bantu hari ini? 😊',
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
    
    // Respon untuk layanan DigiBooster
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
    } else if (message.includes('konsultasi') || message.includes('gratis') || message.includes('tanya')) {
      return botResponses.konsultasi;
    } else if (message.includes('keunggulan') || message.includes('kelebihan') || message.includes('bagus') || message.includes('terbaik')) {
      return botResponses.keunggulan;
    }
    
    // Respon untuk percakapan casual
    else if (message.includes('curhat') || message.includes('cerita') || message.includes('masalah') || message.includes('bingung')) {
      return botResponses.curhat;
    } else if (message.includes('semangat') || message.includes('motivasi') || message.includes('down') || message.includes('sedih') || message.includes('stress')) {
      return botResponses.motivasi;
    } else if (message.includes('teknologi') || message.includes('programming') || message.includes('coding') || message.includes('developer')) {
      return botResponses.teknologi;
    }
    
    // Sapaan
    else if (message.includes('halo') || message.includes('hai') || message.includes('hello') || message.includes('hi')) {
      return 'Halo juga! 😊 Senang banget bisa ngobrol sama kamu! Ada yang bisa saya bantu hari ini? Atau mau ngobrol santai aja juga boleh kok! 🤗';
    }
    
    // Terima kasih
    else if (message.includes('terima kasih') || message.includes('thanks') || message.includes('makasih')) {
      return '🙏 Sama-sama! Senang banget bisa membantu! \n\nKalau ada pertanyaan lain atau mau ngobrol lagi, jangan ragu ya! Saya selalu di sini 24/7 buat kamu! ✨\n\nSemoga hari kamu menyenangkan! 🌟';
    }
    
    // Selesai/pamit
    else if (message.includes('selesai') || message.includes('cukup') || message.includes('bye') || message.includes('sampai jumpa')) {
      return '👋 Terima kasih sudah ngobrol dengan saya!\n\nSenang banget bisa membantu kamu hari ini! Jangan lupa, kalau butuh bantuan atau mau curhat lagi, saya selalu ada di sini ya! 🤗\n\n✨ Sampai jumpa lagi! Semoga project digital kamu sukses selalu! 🚀';
    }
    
    // Random chat
    else if (message.includes('apa kabar') || message.includes('gimana') || message.includes('bagaimana')) {
      return 'Kabar saya baik banget! 😄 Selalu semangat buat bantu orang-orang keren kayak kamu!\n\nGimana kabar kamu? Hari ini ada project menarik yang dikerjain? Atau lagi ada yang bikin pusing? Cerita dong! 😊';
    } else if (message.includes('kamu siapa') || message.includes('kenalan') || message.includes('perkenalkan')) {
      return 'Perkenalkan, saya Digi BOT! 🤖\n\nSaya adalah asisten virtual dari DigiBooster Indonesia yang didesain untuk:\n• Membantu customer service 24/7\n• Ngobrol santai & jadi teman curhat\n• Memberikan info lengkap tentang layanan digital\n• Motivasi & support untuk project kamu!\n\nSaya suka banget ngobrol dan selalu siap membantu! Gimana, mau jadi teman? 😊';
    }
    
    // Default response untuk hal random
    else {
      const randomResponses = [
        `Wah menarik banget nih yang kamu bilang! 😊\n\nSebagai AI, saya selalu excited buat belajar hal baru dari obrolan kita. Mau cerita lebih detail ga? Atau ada hal lain yang pengen didiskusikan?\n\n💡 Btw, kalau kamu lagi ada project digital, jangan lupa DigiBooster siap bantu ya!`,
        
        `Seru juga nih topiknya! 🤔\n\nSaya suka banget diajak ngobrol hal-hal baru kayak gini. Bikin saya jadi lebih pinter! Hehe 😄\n\n🚀 Oh ya, kalau ada yang bisa saya bantu terkait layanan digital atau mau konsultasi project, langsung aja ya!`,
        
        `Interesting! 🧠 Sebagai Digi BOT, saya appreciate banget sama orang yang suka ngobrol topik beragam kayak kamu!\n\nAda perspektif lain yang mau kamu share? Atau mau ganti topik juga boleh kok! 😊`,
      ];
      
      return randomResponses[Math.floor(Math.random() * randomResponses.length)];
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

      // Auto follow-up question after bot response
      setTimeout(() => {
        const followUp = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
        const followUpMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: followUp,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, followUpMessage]);
      }, 2000);

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
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
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
                    <p className="text-xs text-sky-100">Siap membantu setiap saat</p>
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
                      {sampleQuestions.slice(0, 4).map((question, index) => (
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

                {/* Follow-up Questions */}
                {messages.length > 2 && messages[messages.length - 1].sender === 'bot' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <p className="text-xs text-gray-400 mb-2">Pertanyaan lainnya:</p>
                    <div className="space-y-2">
                      {sampleQuestions.slice(4, 6).map((question, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
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

      {/* Floating Chat Button - Perfect Circle */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center p-0"
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
