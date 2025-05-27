
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
    return `Terima kasih atas pertanyaan Anda! 😊 

Sebagai Digi BOT, saya bisa membantu Anda dengan berbagai hal terkait DigiBooster Indonesia dan topik digital lainnya. 

Coba tanyakan hal yang lebih spesifik seperti:
• Layanan apa saja yang tersedia?
• Berapa harga pembuatan website?
• Tips digital marketing
• Konsultasi bisnis

Atau kita bisa ngobrol santai tentang hal lainnya! 💬`;
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();

    // Enhanced responses for different types of conversations
    if (message.includes('sedih') || message.includes('stress') || message.includes('capek')) {
      return `Saya mengerti perasaan Anda. 🤗 Hidup memang kadang terasa berat, tapi ingat bahwa setiap masalah pasti ada solusinya.

Di era digital ini, banyak peluang baru yang bisa Anda jelajahi. Mungkin saatnya untuk:
• Mengembangkan skill digital
• Memulai bisnis online
• Belajar hal baru yang menarik

DigiBooster bisa membantu Anda berkembang di dunia digital. Mau cerita lebih lanjut? Saya siap mendengarkan! 💪✨`;
    }

    if (message.includes('belajar') || message.includes('skill') || message.includes('kemampuan')) {
      return `Wah, semangat belajar yang luar biasa! 🚀

Di DigiBooster, kami menyediakan berbagai program pelatihan digital:
• Web Development
• Digital Marketing
• UI/UX Design
• Content Creation
• E-commerce Management

Setiap skill digital yang Anda pelajari adalah investasi untuk masa depan. Era digital memberikan peluang tak terbatas!

Mau tahu lebih detail tentang program pelatihan tertentu? 📚💡`;
    }

    if (message.includes('bisnis') || message.includes('usaha') || message.includes('jualan')) {
      return `Excellent! Jiwa entrepreneur yang hebat! 💼✨

Untuk sukses di bisnis digital, Anda perlu:

1. **Online Presence** - Website & media sosial yang kuat
2. **Digital Marketing** - SEO, Google Ads, social media marketing
3. **E-commerce** - Platform jualan online yang efektif
4. **Branding** - Identitas visual yang menarik
5. **Analytics** - Data untuk mengoptimalkan strategi

DigiBooster bisa membantu mewujudkan semua itu! Dari pembuatan website hingga strategi marketing yang tepat sasaran.

Bisnis apa yang sedang Anda rencanakan? 🚀`;
    }

    // General conversational responses
    const generalResponses = [
      `Itu pertanyaan yang menarik! 🤔 Sebagai Digi BOT, saya suka diskusi yang mendalam seperti ini.

Di dunia digital yang terus berkembang, ada banyak hal menarik untuk dibahas. Apakah Anda tertarik dengan teknologi terbaru, strategi bisnis digital, atau mungkin tips produktivitas?

DigiBooster selalu update dengan tren digital terkini. Kita bisa ngobrol tentang apapun yang Anda minati! 💬✨`,

      `Wah, topik yang bagus untuk dibahas! 😊

Saya senang bisa ngobrol dengan Anda. Sebagai bagian dari DigiBooster Indonesia, saya punya banyak insight tentang dunia digital dan bisnis online.

Mau sharing pengalaman Anda? Atau ada hal spesifik yang ingin Anda ketahui? Saya siap membantu dengan tips, saran, atau bahkan hanya sekedar ngobrol santai! 🌟`,

      `Interesting! 💡 Saya appreciate pertanyaan seperti ini.

Di era digital sekarang, semua serba terhubung dan berkembang cepat. DigiBooster hadir untuk membantu orang-orang seperti Anda yang ingin berkembang di dunia digital.

Ceritakan lebih banyak tentang perspektif Anda! Saya penasaran dengan pemikiran Anda. 🚀`
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
      const followUpMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        content: "Ada yang lain ingin Anda tanyakan? Saya siap membantu! 😊",
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
