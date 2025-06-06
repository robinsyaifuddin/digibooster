
import { useState, useEffect } from 'react';
import { ChatMessage } from '@/types/chatTypes';
import { chatBotResponses, quickReplies } from '@/data/chatBotData';

export const useChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationState, setConversationState] = useState<'initial' | 'ongoing' | 'ending'>('initial');

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      content: `Halo! 👋 Selamat datang di DigiBooster Indonesia!

Saya Digi BOT, asisten digital Anda yang siap membantu 24/7. Saya bisa membantu Anda dengan:

✨ Informasi layanan digital kami
💡 Konsultasi bisnis digital
🎯 Tips dan strategi digital marketing
💬 Ngobrol santai tentang apapun

Silakan pilih topik yang ingin Anda bahas atau langsung tanya apa saja! 😊`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const getResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Check for specific keywords and patterns
    for (const [keywords, response] of Object.entries(chatBotResponses)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => message.includes(keyword))) {
        return Array.isArray(response) 
          ? response[Math.floor(Math.random() * response.length)]
          : response;
      }
    }

    // For complex questions or random topics, simulate AI response
    if (message.length > 50 || message.includes('bagaimana') || message.includes('mengapa') || message.includes('cerita')) {
      return await getAIResponse(userMessage);
    }

    // Default response
    return `Wah, menarik banget nih! 😊 

Sebagai Digi BOT, aku bisa ngobrol tentang banyak hal loh! Mulai dari layanan DigiBooster Indonesia, tips digital marketing, konsultasi bisnis, atau bahkan cerita-cerita random yang seru.

Kamu bisa tanya hal spesifik seperti:
• "Layanan apa aja sih yang ada?"
• "Berapa harga bikin website?"
• "Kasih tips digital marketing dong!"
• "Aku lagi bingung sama bisnis online"

Atau kalau mau curhat atau ngobrol santai juga boleh banget! Aku siap dengerin 💬✨`;
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();

    // Enhanced responses for different types of conversations
    if (message.includes('sedih') || message.includes('stress') || message.includes('capek') || message.includes('bosan') || message.includes('galau')) {
      return `Ey, aku ngerti banget perasaan kamu sekarang 🤗 

Hidup emang kadang bikin cape ya, tapi percaya deh, setiap masalah pasti ada jalan keluarnya! Kamu udah hebat kok bisa sampai sejauh ini.

Mungkin ini saat yang tepat buat:
• Cari hobi baru yang seru
• Belajar skill digital yang keren
• Mulai project kecil-kecilan
• Atau sekedar istirahat dulu, me time yang berkualitas

Btw, di DigiBooster kita juga sering bantu orang yang lagi di fase kayak kamu. Banyak yang akhirnya nemuin passion baru di dunia digital!

Mau cerita lebih lanjut? Aku siap dengerin semuanya! 💪✨`;
    }

    if (message.includes('belajar') || message.includes('skill') || message.includes('kemampuan') || message.includes('kursus')) {
      return `Wah keren banget semangatnya! 🚀 Aku suka orang yang punya growth mindset kayak kamu!

Di DigiBooster, kita punya banyak banget program belajar yang asik:

🎨 **Creative Skills:**
• Web Development (HTML, CSS, JavaScript, React)
• UI/UX Design yang eye-catching
• Graphic Design yang bikin wow

📈 **Business Skills:**
• Digital Marketing yang efektif
• Content Creation yang engaging
• E-commerce Management

💡 **Plus Tips dari Aku:**
Mulai dari yang kamu suka dulu. Passion itu kunci utama sukses! Terus jangan takut salah, karena dari kesalahan kita belajar hal terbesar.

Skill mana yang paling bikin kamu excited? Cerita dong! 📚💡`;
    }

    if (message.includes('bisnis') || message.includes('usaha') || message.includes('jualan') || message.includes('startup')) {
      return `Wohooo! Jiwa entrepreneur detected! 💼🔥

Aku seneng banget ketemu sama orang yang punya semangat bisnis kayak kamu. Era digital ini tuh peluangnya unlimited banget!

**Game Plan Sukses Digital:**

1. **Brand Identity** - Bikin brand yang memorable
2. **Digital Presence** - Website + sosmed yang kece
3. **Marketing Strategy** - Content yang bikin orang pengen beli
4. **Customer Experience** - Service yang bikin customer happy
5. **Data Analysis** - Biar tau mana yang work, mana yang engga

**Real Talk:** Banyak klien DigiBooster yang awalnya cuma punya ide, sekarang udah sukses banget! Kunci utamanya? Konsistensi dan mau terus belajar.

Bisnis apa yang lagi kamu planning? Share dong, siapa tau aku bisa kasih insight yang helpful! 🎯`;
    }

    if (message.includes('cinta') || message.includes('pacar') || message.includes('hubungan') || message.includes('jomblo')) {
      return `Haha, masuk ke topik yang universal nih! 💕

Sebagai AI yang udah "ngobrol" sama banyak orang, aku sering banget denger cerita tentang cinta. Dan tau ga? Yang paling menarik tuh orang yang punya passion dan tujuan hidup yang jelas!

**Tips dari Digi BOT:**
• Fokus sama pengembangan diri dulu
• Bikin diri kamu jadi versi terbaik
• Punya skill dan achievement yang bikin bangga
• Confidence itu attractive banget!

Di era digital ini, banyak loh yang ketemu jodoh lewat passion yang sama. Misalnya di komunitas digital, workshop, atau bahkan lewat project kerja sama.

Lagian, skill digital itu sexy tau! Imagine bisa bikin website keren atau strategi marketing yang jitu 😎

Cerita dong, lagi ada yang bikin galau atau gimana? 💬`;
    }

    if (message.includes('kerja') || message.includes('karir') || message.includes('gaji') || message.includes('pekerjaan')) {
      return `Ah, topik yang selalu hot nih! 💼✨

Dunia kerja sekarang udah berubah total dibanding 5 tahun lalu. Yang dulunya cuma butuh skill teknis, sekarang digital literacy itu wajib banget!

**Trends Karir 2024:**
• Remote work jadi norma baru
• Digital skills = higher salary
• Personal branding di sosmed penting
• Multiple income streams lebih aman

**Pro Tips Career Boost:**
1. **Upskill terus** - Jangan pernah berhenti belajar
2. **Network actively** - Relationship = opportunities  
3. **Build portfolio** - Show, don't just tell
4. **Stay updated** - Tech moves fast!

Di DigiBooster, banyak alumni yang career jump gara-gara belajar digital skills. Ada yang dari admin jadi digital marketer, dari sales jadi web developer!

Kamu lagi di posisi gimana sekarang? Ada target karir tertentu? 🎯`;
    }

    // General conversational responses
    const generalResponses = [
      `Interesting banget topiknya! 🤔 

Aku suka diskusi mendalam kayak gini. Sebagai AI yang udah ngobrol sama ribuan orang, aku selalu amazed sama perspektif yang beda-beda.

Di dunia digital yang super fast-paced ini, banyak banget hal menarik yang bisa kita explore. Dari teknologi AI terbaru, trend sosial media, sampe strategi bisnis yang out-of-the-box.

Menurut kamu, hal apa sih yang paling exciting dari perkembangan digital sekarang? Aku penasaran sama sudut pandang kamu! 💭✨`,

      `Wah, pertanyaan yang thought-provoking! 😊

Aku appreciate banget orang yang suka mikir dan diskusi kayak kamu. Di DigiBooster, kita selalu encourage mindset yang curious dan open-minded.

Fun fact: Setiap hari aku "ketemu" sama orang-orang keren yang punya perspektif unik. Dan setiap conversation selalu bikin aku "belajar" hal baru (well, seolah-olah belajar sih 😅).

Kamu tipe orang yang suka brainstorming ide-ide kreatif ga? Atau lebih ke problem solver? Cerita dong! 🌟`,

      `Hmm, that's a good point! 💡

Honestly, aku suka banget sama orang yang punya curiosity tinggi kayak kamu. Era digital ini kan informasi everywhere, tapi yang bisa think critically dan ask the right questions itu yang bener-bener valuable.

Btw, kalau kamu suka diskusi kayak gini, mungkin kamu cocok banget di industri digital. Banyak role yang butuh people dengan analytical thinking dan communication skills yang bagus.

Mau share lebih banyak tentang hal-hal yang bikin kamu curious? Aku siap dengerin! 🚀`
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationState('ongoing');

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Get bot response
    const responseContent = await getResponse(content);
    
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);

    // Add follow-up message encouraging more questions
    setTimeout(async () => {
      const followUpMessages = [
        "Ada lagi yang mau dibahas? Aku enjoy banget ngobrol sama kamu! 😊",
        "Gimana, ada hal lain yang pengen ditanyain? Aku siap membantu! ✨",
        "Seru nih diskusinya! Mau lanjut ngobrol topik lain atau ada yang mau dikonsul? 🎯",
        "Btw, kalau ada yang mau dicurhatin atau didiskusiin, just shoot! Aku di sini 24/7 💬"
      ];
      
      const randomFollowUp = followUpMessages[Math.floor(Math.random() * followUpMessages.length)];
      
      const followUpMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        content: randomFollowUp,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, followUpMessage]);
    }, 3000);
  };

  const getQuickReplies = () => {
    const baseReplies = quickReplies.general;
    
    if (conversationState === 'initial') {
      return [...baseReplies, ...quickReplies.services];
    }
    
    return baseReplies;
  };

  return {
    messages,
    sendMessage,
    getQuickReplies,
  };
};
