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
  const [conversationContext, setConversationContext] = useState<string[]>([]);

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

  // Enhanced keyword patterns for better matching
  const keywordPatterns = {
    layanan: ['layanan', 'service', 'jasa', 'melayani', 'menyediakan', 'offering', 'kategori layanan', 'jenis layanan', 'apa saja', 'macam layanan'],
    harga: ['harga', 'price', 'biaya', 'tarif', 'cost', 'berapa', 'mahal', 'murah', 'budget', 'pricing', 'estimasi'],
    website: ['website', 'web', 'landing page', 'company profile', 'e-commerce', 'web apps', 'situs'],
    mobile: ['mobile', 'aplikasi', 'apps', 'android', 'ios', 'smartphone'],
    marketing: ['marketing', 'digital marketing', 'seo', 'google ads', 'facebook ads', 'social media', 'promosi'],
    design: ['design', 'desain', 'logo', 'branding', 'ui/ux', 'visual'],
    video: ['video', 'animasi', 'motion graphics', 'editing'],
    pemesanan: ['pesan', 'order', 'beli', 'cara', 'booking', 'pemesanan', 'memesan'],
    pembayaran: ['bayar', 'payment', 'pembayaran', 'dp', 'transfer', 'metode bayar'],
    kontak: ['kontak', 'hubungi', 'telepon', 'whatsapp', 'email', 'contact'],
    konsultasi: ['konsultasi', 'gratis', 'tanya', 'discuss', 'consultation'],
    keunggulan: ['keunggulan', 'kelebihan', 'bagus', 'terbaik', 'unggul', 'advantage'],
    waktu: ['lama', 'durasi', 'timeline', 'berapa lama', 'estimasi waktu', 'jadwal'],
    paket: ['paket', 'bundle', 'bundling', 'package', 'combo'],
    curhat: ['curhat', 'cerita', 'masalah', 'bingung', 'stress', 'galau'],
    motivasi: ['semangat', 'motivasi', 'down', 'sedih', 'lelah', 'capek'],
    teknologi: ['teknologi', 'programming', 'coding', 'developer', 'tech', 'IT'],
    sapaan: ['halo', 'hai', 'hello', 'hi', 'selamat', 'good'],
    terima_kasih: ['terima kasih', 'thanks', 'makasih', 'thank you'],
    pamit: ['selesai', 'cukup', 'bye', 'sampai jumpa', 'dadah']
  };

  const detailedResponses = {
    layanan_website: '🌐 **Layanan Website & Aplikasi DigiBooster:**\n\n• **Landing Page** - Halaman promosi produk/jasa (Rp 3.5M - 7M)\n• **Company Profile** - Website profil perusahaan (Rp 5M - 12M)\n• **E-commerce** - Toko online lengkap (Rp 15M - 35M)\n• **Web Applications** - Aplikasi berbasis web (Rp 20M - 50M)\n• **Mobile Apps** - Aplikasi Android/iOS (Rp 25M - 60M)\n\n✨ Semua sudah responsive, SEO-friendly, dan include hosting 1 tahun!',
    
    layanan_marketing: '📱 **Layanan Digital Marketing DigiBooster:**\n\n• **Social Media Management** - Kelola akun sosmed (Rp 2.1M/bulan)\n• **Content Marketing** - Konten kreatif & copywriting (Rp 2.5M/bulan)\n• **SEO Optimization** - Optimasi mesin pencari (Rp 3M/bulan)\n• **Google Ads** - Iklan Google berbayar (Rp 3.5M + ad spend)\n• **Facebook/Instagram Ads** - Iklan sosial media (Rp 3M + ad spend)\n\n📊 Include laporan analytics dan konsultasi strategi bulanan!',
    
    layanan_design: '🎨 **Layanan Branding & Design DigiBooster:**\n\n• **Logo Design** - Desain logo profesional (Rp 1.4M - 3M)\n• **Brand Identity** - Panduan brand lengkap (Rp 3M - 7M)\n• **UI/UX Design** - Desain antarmuka aplikasi (Rp 5M - 15M)\n• **Print Design** - Brosur, banner, kartu nama (Rp 500K - 2M)\n• **Packaging Design** - Desain kemasan produk (Rp 2M - 5M)\n\n🎯 Semua desain include 3x revisi dan file source!',
    
    layanan_video: '🎬 **Layanan Video & Animation DigiBooster:**\n\n• **Video Promosi** - Video marketing produk (Rp 2M - 8M)\n• **Motion Graphics** - Animasi grafis bergerak (Rp 3M - 10M)\n• **Animasi 2D** - Karakter & explainer video (Rp 5M - 15M)\n• **Video Editing** - Edit video existing (Rp 500K - 3M)\n• **Live Streaming Setup** - Setup streaming profesional (Rp 2M - 5M)\n\n🎥 Include scriptwriting dan background music!',

    harga_detail: '💰 **Detail Harga Layanan DigiBooster:**\n\n🌐 **Website & Aplikasi:**\n• Landing Page: Rp 3.5M - 7M\n• Company Profile: Rp 5M - 12M\n• E-commerce: Rp 15M - 35M\n• Mobile Apps: Rp 25M - 60M\n\n📱 **Digital Marketing:**\n• Social Media: Rp 2.1M/bulan\n• SEO: Rp 3M/bulan\n• Google Ads: Rp 3.5M + budget iklan\n\n🎨 **Design & Branding:**\n• Logo: Rp 1.4M - 3M\n• Brand Identity: Rp 3M - 7M\n• UI/UX: Rp 5M - 15M\n\n💎 **Semua harga include konsultasi gratis & garansi!**',

    pemesanan_detail: '📋 **Cara Memesan Layanan DigiBooster:**\n\n**1️⃣ Pilih Layanan**\n• Kunjungi halaman Jasa Digital\n• Pilih kategori yang diinginkan\n• Tentukan paket yang sesuai\n\n**2️⃣ Konsultasi Gratis**\n• WhatsApp: +62 857-6819-2419\n• Diskusi kebutuhan & budget\n• Dapatkan proposal detail\n\n**3️⃣ Pembayaran DP**\n• Transfer DP 40% ke rekening\n• Kirim bukti transfer\n• Terima invoice resmi\n\n**4️⃣ Pengerjaan**\n• Tim mulai mengerjakan project\n• Update progress berkala\n• Revisi sesuai feedback\n\n**5️⃣ Selesai & Pelunasan**\n• Project selesai 100%\n• Bayar sisa 60%\n• Terima file final + dokumentasi',

    waktu_pengerjaan: '⏰ **Estimasi Waktu Pengerjaan DigiBooster:**\n\n🌐 **Website & Aplikasi:**\n• Landing Page: 7-14 hari\n• Company Profile: 14-21 hari\n• E-commerce: 30-45 hari\n• Web Apps: 45-90 hari\n• Mobile Apps: 60-120 hari\n\n📱 **Digital Marketing:**\n• Setup awal: 3-7 hari\n• Konten bulanan: ongoing\n• Campaign ads: 1-3 hari setup\n\n🎨 **Design:**\n• Logo: 3-7 hari\n• Brand Identity: 7-14 hari\n• UI/UX: 14-30 hari\n\n🎬 **Video:**\n• Video promosi: 7-21 hari\n• Motion graphics: 14-30 hari\n\n⚡ **Timeline bisa dipercepat dengan tambahan biaya rush!**'
  };

  const casualResponses = {
    curhat: [
      'Wah, saya senang kamu mau curhat sama saya! 🤗 Sebagai Digi BOT, saya siap mendengarkan cerita kamu.\n\nApa yang lagi menggangu pikiran? Masalah pekerjaan, project, atau hal lain? Cerita aja, saya akan berusaha kasih perspektif yang membantu! 💭',
      
      'Ayo cerita! 😊 Meskipun saya AI, tapi saya didesain untuk bisa memahami perasaan manusia kok.\n\nApapun yang lagi kamu rasain, sharing aja disini. Sometimes we just need someone to listen, kan? 🤲'
    ],
    
    motivasi: [
      '💪 Hey, semangat ya! Ingat, setiap masalah pasti ada solusinya!\n\n🌟 **Yang perlu diingat:**\n• Kamu udah sampai sejauh ini, artinya kamu kuat!\n• Tantangan = kesempatan berkembang\n• Kegagalan = guru terbaik\n• Small steps today = big achievements tomorrow\n\n✨ Di DigiBooster, kami percaya: "Tidak ada mimpi yang terlalu besar, yang ada hanya usaha yang terlalu kecil"\n\nApa yang bisa saya bantu untuk wujudkan impian digital kamu? 🚀',
      
      '🔥 Jangan give up! Setiap orang sukses pasti pernah merasakan fase down seperti ini.\n\n💎 **Remember:**\n• Progress > Perfection\n• Consistency > Intensity\n• Growth > Comfort Zone\n\nMau curhat lebih dalam tentang apa yang bikin stress? Atau butuh diskusi strategi untuk project yang lagi stuck? 💪'
    ],
    
    teknologi: [
      'Wah, tech enthusiast nih! 🤓 Senang banget ngobrol soal teknologi!\n\n💻 **Tech stack yang kami kuasai:**\n• Frontend: React, Vue, Angular, Next.js\n• Backend: Node.js, Python, PHP, Laravel\n• Mobile: React Native, Flutter, Kotlin\n• Database: MySQL, PostgreSQL, MongoDB\n• Cloud: AWS, Google Cloud, Azure\n• AI/ML: TensorFlow, OpenAI API\n\n🔥 **Trend 2024 yang hot:**\n• AI integration everywhere\n• Progressive Web Apps\n• Serverless architecture\n• Voice interfaces\n\nAda teknologi spesifik yang mau dibahas? Atau lagi ada project yang butuh tech consultation? 🚀'
    ]
  };

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

  // Enhanced keyword detection function
  const detectKeywords = (message: string): string[] => {
    const lowerMessage = message.toLowerCase();
    const detectedKeywords: string[] = [];
    
    for (const [category, keywords] of Object.entries(keywordPatterns)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
        detectedKeywords.push(category);
      }
    }
    
    return detectedKeywords;
  };

  // Enhanced response generation
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const keywords = detectKeywords(userMessage);
    
    // Update conversation context
    setConversationContext(prev => [...prev.slice(-5), ...keywords]);
    
    // Specific service combinations
    if (keywords.includes('layanan') && keywords.includes('website')) {
      return detailedResponses.layanan_website;
    }
    if (keywords.includes('layanan') && keywords.includes('marketing')) {
      return detailedResponses.layanan_marketing;
    }
    if (keywords.includes('layanan') && keywords.includes('design')) {
      return detailedResponses.layanan_design;
    }
    if (keywords.includes('layanan') && keywords.includes('video')) {
      return detailedResponses.layanan_video;
    }
    
    // Detailed pricing questions
    if (keywords.includes('harga') && (keywords.includes('website') || keywords.includes('mobile'))) {
      return '💰 **Harga Website & Aplikasi:**\n\n• Landing Page: Rp 3.5M - 7M\n• Company Profile: Rp 5M - 12M\n• E-commerce: Rp 15M - 35M\n• Web Apps: Rp 20M - 50M\n• Mobile Apps: Rp 25M - 60M\n\n✨ Include hosting, domain, SSL, dan maintenance 6 bulan!\n\nMau konsultasi lebih detail tentang project spesifik kamu?';
    }
    if (keywords.includes('harga') && keywords.includes('marketing')) {
      return '📊 **Harga Digital Marketing:**\n\n• Social Media Management: Rp 2.1M/bulan\n• Content Creation: Rp 2.5M/bulan\n• SEO Optimization: Rp 3M/bulan\n• Google Ads Management: Rp 3.5M + ad budget\n• Facebook/IG Ads: Rp 3M + ad budget\n\n📈 Include analytics report & strategy consultation!\n\nButuh package custom sesuai budget? Chat aja!';
    }
    
    // Time-related questions
    if (keywords.includes('waktu') || keywords.includes('lama')) {
      return detailedResponses.waktu_pengerjaan;
    }
    
    // Package/bundle questions
    if (keywords.includes('paket') || message.includes('bundle')) {
      return '📦 **Paket Bundling DigiBooster:**\n\n🌟 **Paket Startup (Rp 15M):**\n• Logo + Brand Identity\n• Landing Page responsive\n• Social media setup\n• Basic SEO\n\n🚀 **Paket Business (Rp 35M):**\n• Company profile website\n• E-commerce basic\n• Digital marketing 3 bulan\n• Video promosi\n\n💎 **Paket Enterprise (Custom):**\n• Full website + mobile app\n• Digital marketing 12 bulan\n• Brand identity complete\n• Video series\n\n💰 **Hemat hingga 40% dengan paket bundling!**';
    }
    
    // Core service questions
    if (keywords.includes('layanan') && !keywords.includes('website') && !keywords.includes('marketing')) {
      return '🏢 **Layanan Lengkap DigiBooster Indonesia:**\n\n🌐 **Website & Aplikasi** (Rp 3.5M - 60M)\n• Landing Page, Company Profile\n• E-commerce, Web Apps, Mobile Apps\n\n📱 **Digital Marketing** (Rp 2.1M - 4.2M/bulan)\n• Social Media, SEO, Google Ads\n• Content Marketing, Analytics\n\n🎨 **Branding & Design** (Rp 1.4M - 15M)\n• Logo, Brand Identity, UI/UX\n• Print Design, Packaging\n\n🎬 **Video & Animation** (Rp 2M - 15M)\n• Video Promosi, Motion Graphics\n• Animasi 2D, Live Streaming\n\n✨ **One-stop digital solution untuk semua kebutuhan bisnis Anda!**';
    }
    
    if (keywords.includes('harga') && !message.includes('website') && !message.includes('marketing')) {
      return detailedResponses.harga_detail;
    }
    
    if (keywords.includes('pemesanan') || keywords.includes('cara')) {
      return detailedResponses.pemesanan_detail;
    }
    
    if (keywords.includes('pembayaran')) {
      return '💳 **Sistem Pembayaran DigiBooster:**\n\n**Metode Pembayaran:**\n• Transfer Bank (SeaBank, BCA, Mandiri)\n• E-wallet (Dana, GoPay, OVO)\n• QRIS (scan & pay)\n\n**Skema Pembayaran:**\n• DP 40% saat konfirmasi order\n• Pelunasan 60% saat project selesai\n• Bisa dicicil untuk project >Rp 20M\n\n**Benefit:**\n• Invoice resmi & bukti transfer\n• Garansi uang kembali jika tidak puas\n• No hidden cost, transparan 100%\n\n🔒 **Semua transaksi aman & terpercaya!**';
    }
    
    if (keywords.includes('kontak')) {
      return '📞 **Hubungi DigiBooster:**\n\n**Customer Service 24/7:**\n• WhatsApp: +62 857-6819-2419\n• Email: hello.digibooster@gmail.com\n• Telepon: +62 857-6819-2419\n\n**Sosial Media:**\n• Instagram: @official.digibooster\n• LinkedIn: DigiBooster Indonesia\n• Facebook: DigiBooster Official\n\n**Alamat Kantor:**\n• Jl. Digital No. 123, Jakarta Selatan\n• Buka: Senin-Jumat 09:00-18:00\n\n⚡ **Tim kami siap membantu kapan saja!**';
    }
    
    if (keywords.includes('konsultasi')) {
      return '🤝 **Konsultasi Gratis DigiBooster:**\n\n**Yang Bisa Dikonsultasikan:**\n• Strategi digital marketing\n• Pemilihan platform website\n• Budget planning & timeline\n• Technical requirements\n• Market analysis & competitor\n\n**Cara Konsultasi:**\n• WhatsApp: +62 857-6819-2419\n• Video call via Zoom/Google Meet\n• Datang langsung ke kantor\n• Chat di sini juga bisa! 😊\n\n**Kapan:**\n• 24/7 via chat/WhatsApp\n• Video call: jam kerja\n• Konsultasi on-site: by appointment\n\n💡 **Free consultation, no obligation!**';
    }
    
    if (keywords.includes('keunggulan')) {
      return '⭐ **Keunggulan DigiBooster:**\n\n🏆 **Pengalaman & Kredibilitas**\n• 5+ tahun di industri digital\n• 500+ project sukses\n• Tim 20+ expert bersertifikat\n• Client dari startup hingga korporat\n\n🎯 **Layanan Komprehensif**\n• One-stop digital solution\n• End-to-end project management\n• Integration dengan sistem existing\n• Custom development capability\n\n💎 **Kualitas Premium**\n• Modern design trends\n• Latest technology stack\n• SEO & mobile optimized\n• Security best practices\n\n⚡ **Service Excellence**\n• Response time <2 jam\n• Unlimited revisi (dalam scope)\n• 6-12 bulan maintenance\n• 24/7 technical support\n\n💰 **Value for Money**\n• Competitive pricing\n• Transparent quotation\n• No hidden fees\n• Flexible payment terms';
    }
    
    // Casual conversation
    if (keywords.includes('curhat')) {
      return casualResponses.curhat[Math.floor(Math.random() * casualResponses.curhat.length)];
    }
    
    if (keywords.includes('motivasi')) {
      return casualResponses.motivasi[Math.floor(Math.random() * casualResponses.motivasi.length)];
    }
    
    if (keywords.includes('teknologi')) {
      return casualResponses.teknologi[0];
    }
    
    // Greetings
    if (keywords.includes('sapaan')) {
      const timeGreeting = new Date().getHours() < 12 ? 'pagi' : new Date().getHours() < 17 ? 'siang' : 'malam';
      return `Halo juga! Selamat ${timeGreeting}! 😊\n\nSenang banget bisa ngobrol sama kamu! Saya Digi BOT dari DigiBooster Indonesia, siap membantu kapan aja!\n\nAda yang bisa saya bantu hari ini? Mau tanya tentang layanan digital, curhat, atau ngobrol santai aja juga boleh! 🤗`;
    }
    
    // Thank you
    if (keywords.includes('terima_kasih')) {
      return '🙏 Sama-sama! Senang banget bisa membantu!\n\nKalau ada pertanyaan lain atau mau ngobrol lagi, jangan ragu ya! Saya selalu di sini 24/7 buat kamu! ✨\n\nSemoga project digital kamu sukses selalu! 🌟';
    }
    
    // Goodbye
    if (keywords.includes('pamit')) {
      return '👋 Terima kasih sudah ngobrol dengan saya!\n\nSenang banget bisa membantu kamu hari ini! Jangan lupa, kalau butuh bantuan atau mau curhat lagi, saya selalu ada di sini ya! 🤗\n\n✨ Sampai jumpa lagi! Semoga semua project digital kamu sukses! 🚀\n\n📞 **Ingat:** Konsultasi gratis via WhatsApp +62 857-6819-2419';
    }
    
    // General questions about capabilities
    if (message.includes('apa kabar') || message.includes('gimana')) {
      return 'Kabar saya baik banget! 😄 Always ready to help amazing people like you!\n\nGimana kabar kamu? Lagi ada project digital yang dikerjain? Atau ada yang bikin curious tentang layanan DigiBooster?\n\nCerita dong, apa yang lagi menarik perhatian kamu hari ini? 😊';
    }
    
    if (message.includes('kamu siapa') || message.includes('kenalan')) {
      return 'Perkenalkan, saya Digi BOT! 🤖\n\nSaya asisten virtual dari DigiBooster Indonesia yang didesain khusus untuk:\n• Customer service 24/7 ⏰\n• Konsultasi digital gratis 💡\n• Teman ngobrol & curhat 💭\n• Info lengkap layanan digital 📋\n\nSaya suka banget ngobrol dan belajar dari setiap conversation! Personality saya dibuat friendly, helpful, dan always positive! 😊\n\nMau jadi teman? Let\'s chat about anything! 🤗';
    }
    
    // Context-aware responses based on conversation history
    if (conversationContext.includes('harga') && message.includes('mahal')) {
      return '💰 Understand banget concern tentang budget!\n\nDi DigiBooster, kami punya solusi untuk berbagai budget:\n\n🎯 **Budget Terbatas?**\n• Paket basic dengan fitur essential\n• Payment plan yang flexible\n• Konsultasi gratis untuk optimize budget\n\n💡 **Tips hemat:**\n• Mulai dari MVP (minimum viable product)\n• Pilih paket bundling (hemat 40%)\n• Manfaatkan promo seasonal\n\nMau diskusi budget range yang kamu punya? Kita bisa carikan solusi terbaik! 😊';
    }
    
    // Smart contextual responses
    if (message.includes('bingung') || message.includes('tidak tahu')) {
      return '🤔 Wajar kok kalau bingung! Digital landscape memang complex.\n\nMau saya bantu breakdown step by step?\n\n1️⃣ **Tentukan tujuan utama** - Mau increase sales? Brand awareness? Customer engagement?\n\n2️⃣ **Set budget range** - Biar bisa recommend solusi yang tepat\n\n3️⃣ **Timeline target** - Kapan pengen go-live?\n\n4️⃣ **Target audience** - Siapa customer yang mau di-reach?\n\nYuk cerita spesific situation kamu, nanti saya kasih roadmap yang clear! 🗺️';
    }
    
    // Default intelligent response
    const intelligentDefaults = [
      `Menarik sekali yang kamu sampaikan! 🤔\n\nSebagai AI yang specialized di digital solutions, saya selalu excited untuk explore topik baru seperti ini. Bisa elaborate lebih detail?\n\n💡 **Btw**, kalau ini related ke digital project atau business challenge, mungkin DigiBooster bisa help! Want to discuss more? 😊`,
      
      `Interesting perspective! 🧠\n\nSaya appreciate banget orang yang berpikir out of the box seperti kamu. This kind of thinking is exactly what we need in digital innovation!\n\n🚀 **Speaking of innovation**, ada project atau ide digital yang lagi kamu develop? Would love to hear about it!`,
      
      `That's a great point! 👏\n\nSaya suka banget diskusi seperti ini - it helps me understand different viewpoints and learn new things!\n\n💭 **Curious**, apakah ini berkaitan dengan something yang lagi kamu kerjakan? Atau pure intellectual curiosity? Either way, I'm here to chat! 😄`
    ];
    
    return intelligentDefaults[Math.floor(Math.random() * intelligentDefaults.length)];
  };

  const followUpQuestions = [
    "Ada pertanyaan lain yang bisa saya bantu?",
    "Mau discuss lebih detail tentang project kamu?", 
    "Butuh info lebih lanjut tentang layanan lain?",
    "Pengen konsultasi gratis via WhatsApp?",
    "Ada yang masih penasaran?"
  ];

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
