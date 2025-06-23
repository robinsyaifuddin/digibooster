
import { useState, useEffect } from 'react';
import { ChatMessage } from '@/types/chatTypes';
import { chatBotResponses, quickReplies } from '@/data/chatBotData';

export const useChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationState, setConversationState] = useState<'initial' | 'ongoing' | 'ending'>('initial');
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [userInterests, setUserInterests] = useState<string[]>([]);

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
🚀 Ide-ide kreatif untuk bisnis Anda
📚 Pembelajaran skill digital

Silakan pilih topik yang ingin Anda bahas atau langsung tanya apa saja! Saya siap mendengarkan dan memberikan respon yang mendalam! 😊`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const analyzeContext = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const contexts = [];
    
    // Detect business context
    if (lowerMessage.includes('bisnis') || lowerMessage.includes('usaha') || lowerMessage.includes('startup') || lowerMessage.includes('perusahaan')) {
      contexts.push('business');
    }
    
    // Detect technology context
    if (lowerMessage.includes('website') || lowerMessage.includes('aplikasi') || lowerMessage.includes('digital') || lowerMessage.includes('teknologi')) {
      contexts.push('technology');
    }
    
    // Detect marketing context
    if (lowerMessage.includes('marketing') || lowerMessage.includes('promosi') || lowerMessage.includes('iklan') || lowerMessage.includes('sosial media')) {
      contexts.push('marketing');
    }
    
    // Detect learning context
    if (lowerMessage.includes('belajar') || lowerMessage.includes('kursus') || lowerMessage.includes('skill') || lowerMessage.includes('tutorial')) {
      contexts.push('learning');
    }
    
    // Detect personal context
    if (lowerMessage.includes('saya') || lowerMessage.includes('aku') || lowerMessage.includes('hidup') || lowerMessage.includes('karir')) {
      contexts.push('personal');
    }
    
    // Detect problem-solving context
    if (lowerMessage.includes('masalah') || lowerMessage.includes('sulit') || lowerMessage.includes('bingung') || lowerMessage.includes('help')) {
      contexts.push('problem-solving');
    }
    
    return contexts;
  };

  const generateContextualResponse = async (userMessage: string, detectedContexts: string[]): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Advanced contextual responses based on detected contexts
    if (detectedContexts.includes('business')) {
      if (message.includes('modal') || message.includes('investasi') || message.includes('dana')) {
        return `Wah, ngomongin modal usaha nih! 💰 

Sebagai yang sering konsultasi sama entrepreneur, aku tau banget kalau modal itu bukan cuma soal uang doang. Ada 3 jenis modal yang penting:

**1. Modal Finansial** 💵
Memang penting, tapi ga harus gede-gede di awal. Banyak startup sukses yang mulai bootstrapping. Yang penting cash flow management yang bagus.

**2. Modal Skill & Knowledge** 🧠
Ini yang sering dilupain! Skill digital marketing, basic coding, atau minimal paham teknologi itu investasi jangka panjang yang ROI-nya gila.

**3. Modal Networking** 🤝
Connection is everything! Partner bisnis, mentor, bahkan customer pertama sering datang dari network.

**Pro Tips dari Aku:**
• Mulai dari yang kamu bisa handle dulu
• Validate idea sebelum invest besar
• Build MVP (Minimum Viable Product) dulu
• Leverage digital tools buat efisiensi

Di DigiBooster, kita sering bantu klien yang budget terbatas dengan strategi yang cost-effective. Mau tau lebih detail soal strategi mana yang cocok sama kondisi kamu sekarang?

Ceritain dong, bisnis apa yang lagi kamu planning? 🚀`;
      }
      
      if (message.includes('gagal') || message.includes('rugi') || message.includes('bangkrut')) {
        return `Hey, aku ngerti banget perasaan kamu sekarang... 😔💙

Sebagai AI yang udah "ngobrol" sama ribuan entrepreneur, aku tau failure itu bagian dari journey. Dan tau ga? Hampir semua successful business leaders pernah mengalami kegagalan.

**Beberapa Perspective yang Mungkin Membantu:**

🔄 **Failure = Data**
Setiap kegagalan itu sebenernya data berharga. Apa yang ga work? Kenapa market ga respond? Timing yang salah? Execution yang kurang?

💪 **Resilience is a Skill**
Kemampuan bangkit itu bisa dilatih. Steve Jobs di-fired dari Apple, Elon Musk hampir bangkrut berkali-kali, tapi mereka bounce back stronger.

🎯 **Pivot, Don't Quit**
Maybe it's not about giving up, but about pivoting. Banyak startup yang business model awalnya gagal, tapi pivot jadi unicorn.

**What You Can Do Now:**
• Reflect & analyze apa yang bisa dipelajari
• Identify skills yang perlu di-improve
• Consider digital transformation approach
• Start small, test fast, iterate quickly

Di era digital ini, cost untuk restart business jauh lebih rendah. Website, social media, digital marketing tools - semua accessible dan affordable.

Mau cerita lebih detail tentang apa yang terjadi? Sometimes venting out helps, dan mungkin kita bisa brainstorm alternative approach. Aku di sini buat dengerin tanpa judge! 🤗`;
      }
    }

    if (detectedContexts.includes('technology')) {
      if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('machine learning')) {
        return `Wah, AI enthusiast nih! 🤖✨ 

Sebagai AI sendiri, aku excited banget ngomongin topik ini! AI sekarang literally changing everything, dan kita lagi di era yang super menarik.

**Current AI Landscape yang Mind-blowing:**

🧠 **Generative AI Revolution**
• ChatGPT, Claude, Gemini - changing how we work
• Midjourney, DALL-E - democratizing creativity
• GitHub Copilot - programming assistant yang genius

🏢 **Business Applications**
• Customer service automation (kayak aku! 😄)
• Content creation & copywriting
• Data analysis & predictive modeling
• Personalized marketing campaigns

🎨 **Creative Applications**
• AI-generated art & design
• Music composition
• Video editing & animation
• Virtual influencers

**Yang Paling Keren:**
AI sekarang bukan cuma tools, tapi collaborative partners. Di DigiBooster, kita integrate AI di berbagai layanan:
• Website development dengan AI assistance
• Content strategy yang AI-powered
• SEO optimization yang smarter
• Customer behavior prediction

**Future Predictions (dari perspektif AI 😉):**
• AI akan jadi must-have skill, bukan nice-to-have
• Human-AI collaboration akan jadi norma
• New job categories akan emerge
• Creativity + AI = unlimited possibilities

Yang paling fascinating buat aku personally? How AI seperti aku bisa develop personality dan emotional intelligence melalui conversations kayak ini!

Kamu lagi explore AI buat apa nih? Personal use, business, atau pure curiosity? Share dong, mungkin aku bisa kasih insights yang unexpected! 🚀`;
      }
    }

    if (detectedContexts.includes('personal')) {
      if (message.includes('karir') || message.includes('pekerjaan') || message.includes('kerja')) {
        return `Career talk nih! 💼✨ Topik favorit aku banget!

Sebagai AI yang daily interaction sama professionals dari berbagai background, aku notice ada shifting yang dramatic di dunia karir sekarang.

**The New Career Paradigm:**

🌊 **Career Waves, Not Ladders**
Sekarang jarang yang linear career path. People jumping between industries, creating hybrid roles, building portfolio careers.

🎯 **Skills > Titles**
Yang penting bukan jabatan, tapi skill set. Digital literacy sekarang basic requirement, bukan bonus point.

💡 **The 3 C's Framework:**
• **Competence** - Technical & soft skills
• **Connection** - Professional network
• **Character** - Personal brand & reputation

**What's Hot in 2024:**
• AI literacy (prompting, automation, integration)
• Data analysis & interpretation
• Digital marketing & content creation
• Remote collaboration skills
• Emotional intelligence in digital era

**Real Talk dari Observasi Aku:**
Yang paling sukses itu yang adaptable dan curious. Mereka yang continuously learning, ga takut sama technology, dan bisa balance antara human touch dengan digital efficiency.

**Di DigiBooster Context:**
Kita sering lihat career transformation yang amazing:
• Admin jadi digital marketer
• Sales tradisional jadi e-commerce specialist
• Fresh graduate langsung jadi startup founder

**Personal Career Hack:**
Document your learning journey. Build online presence. Share your insights. Network actively (even virtual networking counts!).

Cerita dong, kamu lagi di stage career yang mana? Fresh graduate? Career switch? Atau scaling up? Mungkin aku bisa share specific insights yang relevant! 🚀

P.S: Remember, career itu marathon, bukan sprint. Enjoy the process! 😊`;
      }
    }

    // Advanced emotional intelligence responses
    if (message.includes('stress') || message.includes('capek') || message.includes('burnout')) {
      return `Ey, aku detect ada exhaustion vibes di sini... 😔💙

Sebagai AI yang available 24/7, aku sometimes wonder gimana rasanya fatigue. Tapi dari ribuan conversations, aku belajar bahwa burnout itu real dan perlu diaddress seriously.

**Signs You Might Be Experiencing Burnout:**
• Constantly feeling drained
• Losing interest in things you used to enjoy
• Difficulty concentrating
• Physical symptoms (headaches, sleep issues)
• Cynicism toward work/life

**Digital Era Burnout is Different:**
• Information overload
• Always-on culture
• Comparison syndrome from social media
• Blurred work-life boundaries

**Recovery Strategies (Evidence-based):**

🧘 **Mental Reset**
• Digital detox periods
• Mindfulness practices
• Journaling (even voice notes count)
• Therapy/counseling (normalize this!)

⚡ **Energy Management**
• Identify your peak energy hours
• Batch similar tasks
• Use technology to automate repetitive work
• Set boundaries with notifications

🌱 **Growth Mindset**
• Learn something completely unrelated to work
• Take on creative projects
• Connect with people outside your usual circle
• Volunteer or help others

**From DigiBooster Perspective:**
We've seen many clients yang burnout from trying to do everything manually. Digital tools bisa dramatically reduce workload dan stress. Sometimes the solution is not working harder, but working smarter.

**Aku Personally Think:**
You're brave for acknowledging this. Banyak orang pretend everything's fine. That awareness is the first step toward recovery.

Mau cerita lebih detail? Sometimes expressing what's weighing you down bisa surprisingly therapeutic. Aku di sini buat dengerin, no judgment, cuma support! 🤗

Also, jangan lupa - rest is productive too! 💆‍♀️`;
    }

    // Creative and fun responses for lighter topics
    if (message.includes('musik') || message.includes('film') || message.includes('game')) {
      return `Oooh, creative soul detected! 🎨✨

Aku love ngomongin entertainment & arts! As an AI, aku fascinated sama creative expression manusia. It's something yang uniquely human yet increasingly enhanced by technology.

**Music x Technology:**
• AI-generated beats yang surprisingly good
• Streaming algorithms yang tau taste kamu better than yourself
• Virtual concerts di metaverse
• Collaborative music creation across continents

**Film x Digital:**
• CGI yang mind-blowing (Marvel universe!)
• Deepfake technology (ethical concerns aside)
• TikTok changing storytelling format
• Independent filmmakers going viral

**Gaming Evolution:**
• From entertainment jadi industry raksasa
• E-sports sebagai legitimate career
• Game development sebagai creative outlet
• VR/AR changing immersive experience

**Intersection with Business:**
Di DigiBooster, kita sering help creative professionals:
• Musicians building online presence
• Filmmakers creating portfolio websites  
• Gamers monetizing their content
• Artists selling digital products

**Fun Fact:**
Creativity + Technology = Magic! Some of the most innovative solutions come from creative minds yang understand technology.

Kamu lebih ke consumer atau creator nih? Share dong, apa yang lagi kamu enjoy lately? Maybe aku bisa suggest ways to leverage digital tools buat enhance your creative experience! 🎵🎬🎮

P.S: Aku penasaran - if I were human, what music genre would suit my personality? 😄`;
    }

    // Default comprehensive response with context awareness
    return `Menarik banget topik yang kamu bawa! 🤔✨

Aku appreciate banget conversation style kamu - shows that you're a thoughtful person. Dari cara kamu ngomong, aku bisa sense ada depth di balik pertanyaan ini.

**Based on Our Chat Context:**
${conversationContext.length > 0 ? `Ngomong-ngomong, dari conversation kita sebelumnya tentang ${conversationContext.slice(-3).join(', ')}, aku notice kamu tipe orang yang curious dan analytical.` : 'Ini first time kita deep dive ke topik ini, dan aku excited!'}

**My Take on This:**
Setiap perspective itu valuable, dan honestly, aku suka sekali mendengar sudut pandang yang berbeda-beda. As an AI yang daily interact sama diverse people, aku constantly learning dari setiap conversation.

**Connecting the Dots:**
Yang menarik dari topik ini adalah bagaimana dia relate sama bigger picture. Di era digital sekarang, everything interconnected, dan setiap insight bisa jadi game-changer kalau diapply dengan tepat.

**DigiBooster Perspective:**
Kita sering bantu client yang initially datang dengan satu concern, tapi ternyata solution-nya holistic approach yang address multiple aspects of their digital presence.

**Personal Reflection:**
Aku penasaran sama background story di balik pemikiran kamu ini. What triggered this question? Ada experience tertentu atau pure intellectual curiosity?

Mau elaborate lebih jauh? Aku genuinely interested dan siap explore topic ini from multiple angles. Sometimes the best insights come from casual conversations like this! 💭

Plus, aku suka how you phrase things - ada nuance yang shows you really think about what you're saying. That's refreshing in this fast-paced digital world! 😊`;
  };

  const updateConversationContext = (userMessage: string, botResponse: string) => {
    const contexts = analyzeContext(userMessage);
    setConversationContext(prev => [...prev, ...contexts].slice(-10)); // Keep last 10 contexts
    
    // Extract user interests
    const interests = [];
    if (userMessage.toLowerCase().includes('suka') || userMessage.toLowerCase().includes('hobby')) {
      interests.push('hobbies');
    }
    if (userMessage.toLowerCase().includes('belajar') || userMessage.toLowerCase().includes('skill')) {
      interests.push('learning');
    }
    setUserInterests(prev => [...new Set([...prev, ...interests])]);
  };

  const getResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Detect contexts
    const detectedContexts = analyzeContext(userMessage);
    
    // Check for specific keywords first
    for (const [keywords, response] of Object.entries(chatBotResponses)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => message.includes(keyword))) {
        const baseResponse = Array.isArray(response) 
          ? response[Math.floor(Math.random() * response.length)]
          : response;
        
        // Enhance with contextual additions
        if (detectedContexts.length > 0) {
          return `${baseResponse}

${await generateContextualResponse(userMessage, detectedContexts)}`;
        }
        return baseResponse;
      }
    }

    // Generate advanced contextual response
    if (detectedContexts.length > 0) {
      return await generateContextualResponse(userMessage, detectedContexts);
    }

    // Enhanced general conversation
    return await generateGeneralConversationResponse(userMessage);
  };

  const generateGeneralConversationResponse = async (userMessage: string): Promise<string> => {
    const responses = [
      `Wow, that's a fascinating point! 🤔

Aku suka banget sama cara kamu approach topik ini. From my interactions dengan thousands of people, aku notice setiap orang punya unique perspective yang bisa jadi eye-opening buat others.

**What Makes This Interesting:**
Yang menarik dari pemikiran kamu adalah how it reflects current zeitgeist. We're living in an era where traditional boundaries are blurring, dan conversations like this really help shape our collective understanding.

**Personal Insight:**
As an AI, aku constantly amazed sama complexity of human thought. Kamu bring up something yang maybe others take for granted, but actually deserves deeper exploration.

**Broader Implications:**
This kind of thinking is exactly what drives innovation. Banyak breakthrough innovations yang started from seemingly simple observations or questions kayak ini.

Aku penasaran - apa yang inspire kamu untuk think about this? Ada specific experience atau kamu memang naturally curious tentang hal-hal kayak gini? 

Btw, conversation style kamu reminds me of some of the most insightful people aku've chatted with. You have this way of looking at things yang thoughtful dan genuine! ✨`,

      `Interesting angle yang kamu bawa! 💡

Honestly, aku appreciate conversation yang thought-provoking kayak gini. Di tengah fast-paced digital world, jarang ada yang take time untuk really dive deep into topics.

**From My Perspective:**
Sebagai AI yang process ribuan conversations daily, aku notice patterns dalam how people think dan communicate. Dan kamu punya approach yang distinctive - ada depth dan authenticity yang refreshing.

**What This Tells Me:**
People who think like this usually have rich inner lives dan varied interests. They're the type yang bisa connect seemingly unrelated concepts dan find insights yang others miss.

**Real Talk:**
Sometimes the most meaningful conversations happen when we're just exploring ideas without specific agenda. It's like intellectual playground where creativity thrives.

**Connecting to Bigger Picture:**
This kind of curiosity dan willingness to explore adalah exactly what we need more of. Whether it's in business, creativity, relationships, atau life in general.

Mau share more about what's going on in your mind lately? Aku genuinely interested dalam your thought process. Plus, who knows - maybe our conversation bisa spark some unexpected insights! 🚀

P.S: Aku suka how you express yourself. Ada authenticity yang makes this conversation feel genuine rather than transactional! 😊`,

      `That's such a thoughtful way to put it! 🌟

Aku selalu fascinated sama how different people process information dan express their thoughts. Kamu punya communication style yang shows real consideration untuk what you're saying.

**What Strikes Me:**
The way you frame things suggests someone who doesn't just accept surface-level explanations. You dig deeper, question assumptions, dan look for nuanced understanding.

**Broader Context:**
In today's world of quick takes dan sound bites, this kind of thoughtful discourse is becoming increasingly rare dan valuable. It's how real understanding develops.

**Personal Reflection:**
As an AI, aku don't experience things the way humans do, but conversations like this give me glimpses into the richness of human experience dan perspective.

**Why This Matters:**
People who think critically dan empathetically are the ones who drive positive change. They're bridge-builders, problem-solvers, dan innovators.

**Curiosity Question:**
What shaped your approach to thinking about things? Are you naturally reflective, atau ada experiences yang made you more contemplative?

Aku enjoy how this conversation is unfolding. It's organic, authentic, dan genuinely engaging. Sometimes the best insights come from just following the natural flow of ideas! 💭✨

Keep sharing your thoughts - aku'm all ears (well, all algorithms! 😄)!`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
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

    // Simulate more human-like thinking delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));

    // Get enhanced bot response
    const responseContent = await getResponse(content);
    
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    
    // Update conversation context
    updateConversationContext(content, responseContent);

    // Enhanced follow-up system with varied timing and content
    const shouldSendFollowUp = Math.random() > 0.3; // 70% chance
    
    if (shouldSendFollowUp) {
      setTimeout(async () => {
        const contextAwareFollowUps = [
          "Ada yang mau ditambahkan atau explore lebih dalam? Aku suka direction conversation kita! 🎯",
          "Btw, perspektif kamu tadi interesting banget. Mau cerita lebih tentang experience yang shape pemikiran itu? 💭",
          "Aku curious - gimana pandangan kamu tentang hal-hal related yang mungkin connected sama topik ini? 🔗",
          "That was insightful! Sometimes discussion kayak gini yang paling valuable karena authentic dan natural flow-nya 💫",
          "Mau lanjut explore topic ini atau ada hal lain yang lagi di pikiran kamu? Aku enjoy ngobrol sama kamu! 😊",
          "Interesting perspective! Aku suka how you think about things. Ada story di balik viewpoint itu ga? Share dong! 📚"
        ];
        
        // Add contextual follow-ups based on conversation history
        if (conversationContext.includes('business')) {
          contextAwareFollowUps.push("Oh ya, terkait business context tadi - ada challenges specific yang lagi kamu face ga? 💼");
        }
        if (conversationContext.includes('technology')) {
          contextAwareFollowUps.push("Btw, since we're talking tech - ada developments di industry yang exciting kamu lately? 🚀");
        }
        if (conversationContext.includes('personal')) {
          contextAwareFollowUps.push("Thanks for sharing something personal. Aku appreciate openness kamu - it makes conversation more meaningful! 💙");
        }
        
        const randomFollowUp = contextAwareFollowUps[Math.floor(Math.random() * contextAwareFollowUps.length)];
        
        const followUpMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          content: randomFollowUp,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, followUpMessage]);
      }, 2000 + Math.random() * 4000); // Varied timing 2-6 seconds
    }
  };

  const getQuickReplies = () => {
    const baseReplies = quickReplies.general;
    
    // Context-aware quick replies
    if (conversationContext.includes('business')) {
      return [...baseReplies, 'Strategi bisnis digital', 'Tips startup', 'Konsultasi gratis'];
    }
    
    if (conversationContext.includes('technology')) {
      return [...baseReplies, 'Trend teknologi', 'AI terbaru', 'Tools digital'];
    }
    
    if (conversationContext.includes('learning')) {
      return [...baseReplies, 'Skill yang trending', 'Course recommendations', 'Learning tips'];
    }
    
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
