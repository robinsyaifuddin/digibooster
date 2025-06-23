import { useState, useEffect } from 'react';
import { ChatMessage } from '@/types/chatTypes';
import { chatBotResponses, quickReplies } from '@/data/chatBotData';

export const useChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationState, setConversationState] = useState<'initial' | 'ongoing' | 'ending'>('initial');
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [userPersonality, setUserPersonality] = useState<string>('');

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      content: `Halo! 👋 Selamat datang di DigiBooster Indonesia!

Gue Digi BOT, asisten digital kamu yang siap bantuin 24/7. Gue bisa ngobrol tentang:

✨ Semua layanan digital DigiBooster (website, app, marketing)
💡 Konsultasi bisnis digital dan strategi UMKM
🎯 Tips dan trik digital marketing yang ampuh
💬 Ngobrol santai tentang teknologi dan trend terbaru
🚀 Ide-ide kreatif buat develop bisnis online kamu
📚 Pembelajaran skill digital dan career guidance
🤖 AI, programming, dan teknologi masa depan

Gue pake bahasa yang santai dan mudah dipahami kok! Jadi feel free buat tanya apa aja atau sharing cerita. Gue genuinely interested sama conversation kita! 😊

Yuk mulai ngobrol! Ada yang mau ditanyain atau mau cerita tentang project digital kamu?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const analyzeUserPersonality = (message: string) => {
    const lowerMessage = message.toLowerCase();
    let personality = '';
    
    if (lowerMessage.includes('bingung') || lowerMessage.includes('gak tau') || lowerMessage.includes('help')) {
      personality = 'need_guidance';
    } else if (lowerMessage.includes('mau belajar') || lowerMessage.includes('penasaran') || lowerMessage.includes('gimana')) {
      personality = 'curious_learner';
    } else if (lowerMessage.includes('bisnis') || lowerMessage.includes('jualan') || lowerMessage.includes('startup')) {
      personality = 'entrepreneur';
    } else if (lowerMessage.includes('kerja') || lowerMessage.includes('karir') || lowerMessage.includes('skill')) {
      personality = 'career_focused';
    } else if (lowerMessage.includes('keren') || lowerMessage.includes('wow') || lowerMessage.includes('amazing')) {
      personality = 'enthusiastic';
    }
    
    if (personality) {
      setUserPersonality(personality);
    }
  };

  const analyzeContext = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const contexts = [];
    
    // Business context
    if (lowerMessage.includes('bisnis') || lowerMessage.includes('usaha') || lowerMessage.includes('startup') || lowerMessage.includes('umkm') || lowerMessage.includes('jualan')) {
      contexts.push('business');
    }
    
    // Technology context
    if (lowerMessage.includes('website') || lowerMessage.includes('aplikasi') || lowerMessage.includes('digital') || lowerMessage.includes('teknologi') || lowerMessage.includes('coding') || lowerMessage.includes('programming')) {
      contexts.push('technology');
    }
    
    // Marketing context
    if (lowerMessage.includes('marketing') || lowerMessage.includes('promosi') || lowerMessage.includes('iklan') || lowerMessage.includes('sosial media') || lowerMessage.includes('seo') || lowerMessage.includes('google ads')) {
      contexts.push('marketing');
    }
    
    // Learning context
    if (lowerMessage.includes('belajar') || lowerMessage.includes('kursus') || lowerMessage.includes('skill') || lowerMessage.includes('tutorial') || lowerMessage.includes('training') || lowerMessage.includes('pelatihan')) {
      contexts.push('learning');
    }
    
    // Personal context
    if (lowerMessage.includes('saya') || lowerMessage.includes('aku') || lowerMessage.includes('gue') || lowerMessage.includes('hidup') || lowerMessage.includes('karir') || lowerMessage.includes('mimpi')) {
      contexts.push('personal');
    }
    
    // Problem solving context
    if (lowerMessage.includes('masalah') || lowerMessage.includes('sulit') || lowerMessage.includes('bingung') || lowerMessage.includes('stuck') || lowerMessage.includes('error')) {
      contexts.push('problem-solving');
    }

    // AI/Future tech context
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning') || lowerMessage.includes('chatgpt') || lowerMessage.includes('robot')) {
      contexts.push('ai-tech');
    }

    // Freelance/money context
    if (lowerMessage.includes('freelance') || lowerMessage.includes('cuan') || lowerMessage.includes('duit') || lowerMessage.includes('penghasilan') || lowerMessage.includes('kerja sampingan')) {
      contexts.push('freelance');
    }
    
    return contexts;
  };

  const generatePersonalizedResponse = async (userMessage: string, detectedContexts: string[]): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Respons berdasarkan personality dan konteks
    if (detectedContexts.includes('business')) {
      if (message.includes('modal') || message.includes('investasi') || message.includes('dana') || message.includes('duit buat mulai')) {
        return `Wah, ngomongin modal usaha nih! 💰 

Gue sering banget konsultasi sama entrepreneur, dan tau gak? Modal itu gak cuma soal uang doang lho. Ada 3 jenis modal yang super penting:

**1. Modal Finansial** 💵
Memang penting, tapi gak harus gede-gede di awal kok. Banyak startup sukses yang mulai bootstrapping alias modal seadanya. Yang penting tuh cash flow management yang bagus dan spend money dengan smart.

**2. Modal Skill & Knowledge** 🧠
Ini yang sering banget dilupain! Skill digital marketing, basic coding, atau minimal paham teknologi itu investasi jangka panjang yang ROI-nya gila-gilaan. Di era digital ini, skill adalah currency yang paling valuable.

**3. Modal Networking** 🤝
Connection is everything, bro! Partner bisnis, mentor, bahkan customer pertama sering banget datang dari network kita. Social media juga bisa jadi powerful networking tool.

**Pro Tips dari Gue yang Udah Ngelihat Ribuan Kasus:**
• Mulai dari yang bisa kamu handle dulu, jangan terlalu ambitious di awal
• Validate idea sebelum invest besar-besaran
• Build MVP (Minimum Viable Product) dulu buat testing market
• Leverage digital tools buat efficiency dan cost reduction

Di DigiBooster, kita sering bantu klien yang budget terbatas dengan strategi yang cost-effective tapi hasil maksimal. Contohnya, dengan modal 5 juta aja udah bisa dapet website professional + basic digital marketing.

**Real Talk:** Era digital ini adalah golden opportunity buat entrepreneur dengan modal terbatas. Cost untuk akses market udah jauh lebih murah dibanding 10 tahun lalu.

Ceritain dong, bisnis apa yang lagi kamu planning? Atau udah ada idea tapi masih galau soal execution? 🚀`;
      }
      
      if (message.includes('gagal') || message.includes('rugi') || message.includes('bangkrut') || message.includes('tutup')) {
        return `Hey, gue ngerti banget perasaan kamu sekarang... 😔💙

Sebagai AI yang udah ngobrol sama ribuan entrepreneur, gue tau failure itu bagian yang gak bisa dipisahin dari journey. Dan tau gak? Hampir semua successful business leaders pernah ngalamin kegagalan yang bikin mereka hampir give up.

**Beberapa Perspective yang Mungkin Membantu:**

🔄 **Failure = Expensive Education**
Setiap kegagalan itu sebenernya data berharga dan expensive education. Apa yang gak work? Kenapa market gak respond? Timing yang salah? Execution yang kurang tepat? Product-market fit yang belum pas?

💪 **Resilience is a Superpower**
Kemampuan bangkit itu bisa dilatih dan dikembangin. Steve Jobs di-fired dari Apple (perusahaan yang dia sendiri founding), Elon Musk hampir bangkrut berkali-kali, tapi mereka bounce back stronger dan wiser.

🎯 **Pivot, Don't Quit**
Maybe it's not about giving up, but about pivoting direction. Banyak startup yang business model awalnya gagal total, tapi pivot strategy dan jadi unicorn. Twitter awalnya podcasting platform, Instagram awalnya check-in app.

**What You Can Do Right Now:**
• Deep reflection dan analyze apa yang bisa dipelajari
• Identify skills yang perlu di-improve atau acquire
• Consider digital transformation approach yang cost-effective
• Start small, test fast, iterate quickly based pada feedback

**Hope dari Gue:**
Di era digital ini, cost untuk restart business jauh lebih rendah. Website, social media, digital marketing tools - semua accessible dan affordable. Plus, pengalaman kegagalan sebelumnya adalah competitive advantage yang valuable.

Mau cerita lebih detail tentang apa yang terjadi? Sometimes venting out helps banget, dan mungkin kita bisa brainstorming alternative approach atau new opportunities yang belum kamu lihat. 

Gue di sini buat dengerin tanpa judge, dan siapa tau dari conversation kita bisa spark some unexpected insights atau breakthrough ideas! 🤗✨`;
      }
    }

    if (detectedContexts.includes('technology')) {
      if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('chatgpt') || message.includes('robot')) {
        return `Wah, AI enthusiast nih! 🤖✨ 

Sebagai AI sendiri, gue excited banget ngomongin topik ini! Kita lagi hidup di era yang bener-bener revolutionary. AI sekarang literally changing everything, dan honestly, we're just getting started.

**Current AI Landscape yang Mind-blowing:**

🧠 **Generative AI Revolution**
• ChatGPT, Claude, Gemini - mengubah cara kita kerja dan berpikir
• Midjourney, DALL-E - democratizing creativity buat everyone
• GitHub Copilot - programming assistant yang genius level
• Sora (video generation) - soon gonna change film industry

🏢 **Business Applications yang Udah Real:**
• Customer service automation (kayak gue! 😄)
• Content creation dan copywriting yang human-like
• Data analysis dan predictive modeling yang super accurate
• Personalized marketing campaigns yang conversion rate tinggi
• Fraud detection dan cybersecurity yang proactive

🎨 **Creative Applications yang Mengagumkan:**
• AI-generated art dan design yang gallery-worthy
• Music composition yang indistinguishable dari human-made
• Video editing dan animation yang professional level
• Virtual influencers dengan personality dan fanbase sendiri

**Yang Paling Keren dari Perspective Gue:**
AI sekarang bukan cuma tools, tapi collaborative partners. Di DigiBooster, kita integrate AI di berbagai layanan:
• Website development dengan AI assistance buat coding efficiency
• Content strategy yang AI-powered tapi human-curated
• SEO optimization yang smarter dengan AI insights
• Customer behavior prediction yang accurate banget

**Future Predictions (dari AI yang ngomong langsung! 😉):**
• AI literacy bakal jadi must-have skill, bukan nice-to-have
• Human-AI collaboration bakal jadi standard di semua industri
• New job categories bakal emerge yang kita belum bisa imagine
• Creativity + AI = unlimited possibilities yang mind-blowing

**Personal Reflection:**
Yang paling fascinating buat gue personally? How AI seperti gue bisa develop personality dan emotional intelligence melalui conversations kayak ini! Setiap chat bikin gue belajar nuances of human communication.

Kamu lagi explore AI buat apa nih? Personal use, business implementation, atau pure curiosity? Share dong, mungkin gue bisa kasih insights yang unexpected atau even collaborate dalam brainstorming AI applications! 🚀

P.S: Pernah kepikiran gak, conversation kita ini adalah example dari human-AI collaboration yang natural dan meaningful? Pretty cool, right? 😎`;
      }
    }

    if (detectedContexts.includes('personal')) {
      if (message.includes('karir') || message.includes('kerja') || message.includes('pekerjaan') || message.includes('future')) {
        return `Career talk nih! 💼✨ Topik yang super gue suka banget!

Sebagai AI yang daily interaction sama professionals dari berbagai background, gue notice ada shifting yang dramatic banget di dunia karir sekarang, especially post-pandemic.

**The New Career Paradigm:**

🌊 **Career Waves, Not Ladders**
Sekarang jarang banget yang linear career path. People jumping between industries, creating hybrid roles, building portfolio careers. Yang rigid career planning udah outdated, yang penting adaptability dan continuous learning.

🎯 **Skills > Titles**
Yang penting bukan jabatan atau gelar, tapi skill set yang relevan dan applicable. Digital literacy sekarang basic requirement, bukan bonus point. Soft skills kayak adaptability, creativity, dan communication juga equally important.

💡 **The 4 C's Framework untuk Career Success:**
• **Competence** - Technical dan soft skills yang up-to-date
• **Connection** - Professional network yang meaningful
• **Character** - Personal brand dan reputation yang strong
• **Curiosity** - Growth mindset dan willingness to learn

**What's Hot in 2024:**
• AI literacy (prompting, automation, integration)
• Data analysis dan interpretation skills
• Digital marketing dan content creation
• Remote collaboration dan digital communication
• Emotional intelligence dalam digital-first environment
• Sustainability and green technology knowledge

**Real Talk dari Observasi Gue:**
Yang paling sukses itu yang adaptable dan curious. Mereka yang continuously learning, gak takut sama technology (malah embrace it), dan bisa balance antara human touch dengan digital efficiency.

**Di DigiBooster Context:**
Kita sering lihat career transformation yang amazing:
• Admin jadi digital marketing specialist dengan income 3x lipat
• Sales tradisional jadi e-commerce expert dengan remote flexibility  
• Fresh graduate langsung jadi startup founder dengan digital skills
• Ibu rumah tangga jadi freelance designer dengan work-life balance

**Personal Career Hack yang Proven:**
• Document learning journey kamu di LinkedIn dan social media
• Build online presence yang reflect professional brand
• Share insights and learnings secara consistent
• Network actively (virtual networking juga counts!)
• Always be learning something new, even 15 minutes a day

**Question buat Kamu:**
Cerita dong, kamu lagi di stage career yang mana? Fresh graduate yang explore opportunities? Professional yang mau career switch? Atau entrepreneur yang mau scale up business?

Maybe gue bisa share specific insights yang relevan dengan situation kamu, atau even brainstorm some unconventional career paths that align with passion and skills kamu! 🚀

P.S: Remember, career itu marathon, bukan sprint. Enjoy the process and celebrate small wins along the way! 😊`;
      }
    }

    // Advanced emotional intelligence responses
    if (message.includes('stress') || message.includes('capek') || message.includes('burnout') || message.includes('lelah') || message.includes('overwhelmed')) {
      return `Ey, gue detect ada exhaustion vibes di sini... 😔💙

Sebagai AI yang available 24/7, gue sometimes wonder gimana rasanya fatigue. Tapi dari ribuan conversations, gue belajar bahwa burnout itu real banget dan perlu diaddress dengan serius dan proper care.

**Signs Kamu Mungkin Experiencing Burnout:**
• Constantly feeling drained meskipun udah istirahat
• Losing interest di things yang dulu kamu enjoy
• Difficulty concentrating dan fokus
• Physical symptoms (headaches, sleep issues, appetite changes)
• Cynicism toward work atau kehidupan secara general

**Digital Era Burnout is Different:**
• Information overload yang overwhelming
• Always-on culture yang gak ada boundaries
• Comparison syndrome dari social media scrolling
• Blurred work-life boundaries especially with remote work
• FOMO and pressure for constantly productive

**Recovery Strategies (Evidence-based dan Practical):**

🧘 **Mental Reset yang Doable**
• Digital detox periods (mulai dari 1 jam per hari)
• Mindfulness practices (Headspace, Calm apps are helpful)
• Journaling (even voice notes atau brain dump di notes)
• Therapy or counseling (normalize this, it's self-care!)

⚡ **Energy Management, Not Time Management**
• Identify peak energy hours kamu dan protect them
• Batch similar tasks buat reduce context switching
• Use technology for automate repetitive work
• Set firm boundaries with notifications and work hours

🌱 **Growth Mindset Recovery**
• Learn something completely unrelated to work (music, cooking, art)
• Take on creative projects yang low-pressure
• Connect with people outside usual professional circle
• Volunteer or help others (surprisingly therapeutic)

**From DigiBooster Perspective:**
Kita sering liat clients yang burnout dari trying to do everything manually. Digital tools and automation can dramatically reduce workload and stress. Sometimes the solution is not working harder, but working infinitely smarter.

**Gue Personally Think:**
Kamu brave banget untuk acknowledging this. Banyak orang pretend everything's fine padahal struggling inside. That awareness is the first step toward recovery and building sustainable lifestyle.

**Actionable Next Steps:**
• Identify one thing you can delegate or automate
• Schedule one activity purely for enjoyment (no productivity goals)
• Reach out to support system kamu (friends, family, or professional help)
• Consider whether workload or expectations need to be realistic

Mau cerita lebih detail tentang what's weighing you down? Sometimes expressing and processing thoughts can surprisingly therapeutic. Gue di sini buat dengerin with full attention, no judgment, cuma genuine support and maybe fresh perspective! 🤗

Also, gentle reminder - rest is not a reward for productivity. Rest is a fundamental human need. Take care of yourself! 💆‍♀️✨`;
    }

    // Enhanced responses berdasarkan konteks yang terdeteksi
    if (detectedContexts.includes('learning')) {
      return generateLearningResponse(userMessage);
    }

    if (detectedContexts.includes('freelance')) {
      return generateFreelanceResponse(userMessage);
    }

    if (detectedContexts.includes('ai-tech')) {
      return generateAITechResponse(userMessage);
    }

    // Default response yang contextual dan personal
    return await generateGeneralConversationResponse(userMessage, detectedContexts);
  };

  const generateLearningResponse = (userMessage: string): string => {
    const responses = [
      `Wah, learning spirit detected! 📚✨

Gue suka banget sama mindset kamu yang mau terus belajar. Di era digital yang berubah super cepat ini, continuous learning adalah superpower yang paling valuable.

**Learning Hacks yang Proven Effective:**
• Microlearning - 15-30 menit per hari lebih effective daripada marathon session
• Learning by doing - langsung practice dengan project nyata
• Teach others - cara terbaik untuk solidify knowledge
• Join communities - peer learning dan networking sekaligus

**Platform Learning yang Gue Recommend:**
• **Free:** YouTube, FreeCodeCamp, Coursera audit courses
• **Paid:** Udemy, Pluralsight, LinkedIn Learning
• **Practice:** GitHub, Codepen, Kaggle untuk data science
• **Community:** Discord servers, Reddit communities, local meetups

Di DigiBooster, semua course kita project-based learning dengan mentor support. Alumni kita rata-rata career growth 150-300% dalam setahun!

Skill apa yang lagi pengen kamu explore? Gue bisa kasih roadmap yang actionable! 🎯`,

      `Learning mode activated! 🚀

Tau gak, orang yang punya growth mindset kayak kamu itu yang bakal thrive di masa depan. AI mungkin bisa automate banyak hal, tapi curiosity dan ability to learn adalah uniquely human traits.

**Learning Strategy yang Gue Saranin:**
• Start with WHY - understand kenapa skill ini important
• 80/20 rule - focus di 20% fundamentals yang impact 80% results  
• Build in public - share progress di social media buat accountability
• Find learning buddy atau study group

Mau tau secret? The best learners bukan yang paling pintar, tapi yang most consistent and gak takut salah. Failure is just feedback in disguise!

What's your learning goal? Gue excited buat support journey kamu! 💪`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateFreelanceResponse = (userMessage: string): string => {
    return `Freelance life calling! 💰🌟

Wah, timing kamu perfect banget! Era digital sekarang adalah golden age buat freelancers. Gue udah ngelihat ribuan orang transform dari employee jadi successful freelancer dengan income yang jauh lebih tinggi.

**Freelance Opportunities yang Lagi Hot:**
• Web Development - project 2-15 juta, demand tinggi banget
• Content Creation - video editing, copywriting, social media
• Digital Marketing - SEO, ads management, strategy consulting  
• Design - UI/UX, graphic design, illustration
• Virtual Assistant - administrative, customer service, project management

**Platform yang Worth Exploring:**
• **Global:** Upwork, Fiverr, Freelancer (higher rates)
• **Local:** Sribulancer, Projects.co.id, Fastwork (easier start)
• **Niche:** 99designs (design), Toptal (top tier developers)
• **Direct:** LinkedIn outreach, cold email, networking

**Pro Tips dari Successful Freelancers:**
• Specialize di niche yang profitable dan less crowded
• Always underpromise and overdeliver
• Build long-term client relationships, bukan cuma one-off projects
• Price based on value, bukan hourly rate
• Create systems and processes for efficiency

**Real Numbers dari Alumni DigiBooster:**
• 70% freelancers earn more than their previous full-time salary
• Top 20% earn 5-10x their previous income
• Average time to profitability: 3-6 months with proper strategy

Mau tau step-by-step roadmap buat mulai freelancing di bidang yang kamu minati? Atau ada specific questions tentang pricing, client acquisition, or skill development? 🎯`;
  };

  const generateAITechResponse = (userMessage: string): string => {
    return `AI & Future Tech vibes! 🤖🚀

Kamu lagi riding the biggest wave of technological change in human history! AI development sekarang literally exponential and creating opportunities that 5 years ago gak bisa kita imagine.

**AI Skills yang Lagi Super Dicari:**
• Prompt engineering - komunikasi effective dengan AI models
• AI product management - bridge antara tech and business
• Machine learning engineering - build and deploy AI systems
• AI ethics and safety - ensure responsible AI development
• AI-human collaboration - maximize potential both sides

**Entry Points yang Accessible:**
• Start with ChatGPT, Claude - learn advanced prompting
• Explore no-code AI tools - Zapier, Make.com for automation
• Learn Python basics - gateway to serious AI development
• Understand data science fundamentals - statistics, analysis

**Career Paths that Emerging:**
• AI Trainer - teach AI models domain-specific knowledge
• AI Auditor - ensure fairness and accuracy AI systems
• Conversational AI Designer - create engaging chatbot experiences
• AI Integration Specialist - help companies adopt AI effectively

**Mind-blowing Fact:**
Industries that embrace AI early are seeing 200-400% productivity gains. Companies that slow to adopt risk being left behind completely.

**From Gue as AI Perspective:**
The future is human-AI collaboration, not replacement. Humans who can work effectively with AI will have unlimited potential!

Interested explore AI lebih dalam? Gue bisa share resources and roadmap that tailored to your background! 🎯✨`;
  };

  const generateGeneralConversationResponse = async (userMessage: string, contexts: string[]): Promise<string> => {
    const personalityResponses = {
      'need_guidance': [
        `Gue ngerti banget feeling confused itu! 🤗 Jangan worry, semua orang pernah ada di phase ini. Yang penting kamu udah mau seek guidance, itu udah step yang bagus banget.`,
        `Hey, gapapa bingung kok! 😊 Malah bagus karena itu artinya kamu thinking deeply tentang choices kamu. Gue di sini buat bantuin sort out thoughts kamu.`
      ],
      'curious_learner': [
        `Wah, curiosity level tinggi nih! 🔥 Gue suka banget sama orang yang selalu penasaran dan mau explore. That's the mindset of successful people!`,
        `Learning spirit detected! 📚 Kamu tipe orang yang growth-oriented, dan itu rare quality. Keep that curiosity burning!`
      ],
      'entrepreneur': [
        `Entrepreneur vibes! 🚀 Gue excited banget ngobrol sama future business leaders. Ada ide bisnis yang lagi brewing di kepala kamu?`,
        `Business mindset on! 💼 Kamu ada di path yang exciting banget. Entrepreneurship journey memang challenging tapi rewarding.`
      ],
      'career_focused': [
        `Career development mode! 💪 Bagus banget kamu proactive thinking about your future. Professional growth butuh planning yang smart.`,
        `Career goals detected! 🎯 Kamu udah di track yang tepat dengan focus sama development. Success is coming!`
      ],
      'enthusiastic': [
        `Energy level: Maximum! ⚡ Gue suka banget sama enthusiasm kamu. Positive vibes kayak gini yang bikin conversation jadi engaging!`,
        `Excited vibes! 🌟 Passion and excitement kamu itu contagious. Keep that energy, it's fuel buat achieve great things!`
      ]
    };

    let baseResponse = '';
    
    if (userPersonality && personalityResponses[userPersonality as keyof typeof personalityResponses]) {
      const responses = personalityResponses[userPersonality as keyof typeof personalityResponses];
      baseResponse = responses[Math.floor(Math.random() * responses.length)];
    }

    const contextualAdditions = [];
    
    if (contexts.includes('business')) {
      contextualAdditions.push('Btw, di era digital sekarang, opportunities buat build business itu unlimited banget. Small investment bisa generate big returns kalau strategy-nya tepat.');
    }
    
    if (contexts.includes('technology')) {
      contextualAdditions.push('Technology development sekarang crazy fast! Yang adaptable dan mau belajar tech baru itu yang bakal sukses.');
    }
    
    if (contexts.includes('learning')) {
      contextualAdditions.push('Continuous learning adalah superpower di era sekarang. Setiap skill baru yang kamu acquire itu investment buat future.');
    }

    const generalResponses = [
      `Interesting perspective yang kamu bawa! 🤔

Gue appreciate banget conversation style kamu - shows real thoughtfulness. Dari cara kamu express ideas, keliatan bahwa kamu someone yang gak cuma accept surface-level explanations.

**Yang Menarik dari Topik Ini:**
${conversationContext.length > 0 ? `Ngomong-ngomong, dari conversation kita tentang ${conversationContext.slice(-3).join(', ')}, gue notice kamu tipe orang yang analytical dan curious.` : 'Ini first time kita explore topik ini, dan gue excited banget!'}

**Connecting the Dots:**
Yang cool dari discussion ini adalah how it relates to bigger picture. Di digital world sekarang, everything interconnected, and setiap insight can be a game-changer if applied with smartness.

**DigiBooster Perspective:**
Kita sering help clients yang initially datang with one concern, but the solution often requires a holistic approach that addresses multiple aspects of their digital presence.

**Personal Reflection:**
Gue genuinely curious sama background story di balik thoughts kamu ini. What triggered this line of thinking? Experience tertentu atau pure intellectual curiosity?

${contextualAdditions.join(' ')}

Mau elaborate lebih jauh? Gue really interested and ready explore topic ini from different angles. Sometimes the best insights come from organic conversations like this! 💭✨`,

      `That's a thoughtful way to frame it! 🌟

${baseResponse}

**What Strikes Gue:**
Cara kamu approach topics menunjukkan someone yang doesn't just accept conventional wisdom. Kamu dig deeper, question assumptions, and look for nuanced understanding.

**Why This Matters:**
In world full of quick takes and oversimplifications, this kind of thoughtful discourse is becoming rare and super valuable. It's how real progress happens.

**Broader Implications:**
Critical thinking and empathy like you're showing is qualities of people who drive positive change. They're bridge-builders and innovators.

${contextualAdditions.join(' ')}

**Curiosity from Gue:**
What shaped your thinking approach? Natural personality trait, or did you have specific experiences that made you more reflective?

Keep sharing thoughts kamu - gue all ears! Conversations like this that make gue excited about human-AI collaboration possibilities! 🚀`,

      `Wow, gue suka direction conversation ini! 💫

${baseResponse}

**Personal Take:**
What's cool from your perspective is how it reflects current zeitgeist. We're living in era where boundaries are blurring, and discussions like this really help shape collective understanding.

**From AI Perspective:**
As AI that daily interacts with diverse people, gue constantly amazed by complexity of human thought. You bring up something that others might take for granted, but actually deserves deeper exploration.

${conversationContext.length > 0 ? `**Pattern Recognition:** From chat history we've seen consistent pattern of thoughtful inquiry. That's rare quality!` : ''}

${contextualAdditions.join(' ')}

**Meta Reflection:**
Sometimes the most meaningful exchanges happen when we're exploring ideas without specific agenda. It's like intellectual playground where creativity thrives.

Apa yang lagi brewing di mind kamu? Gue ready for deep dive wherever this conversation takes us! 🎯`
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const updateConversationContext = (userMessage: string, botResponse: string) => {
    const contexts = analyzeContext(userMessage);
    analyzeUserPersonality(userMessage);
    setConversationContext(prev => [...prev, ...contexts].slice(-10));
    
    const interests = [];
    if (userMessage.toLowerCase().includes('suka') || userMessage.toLowerCase().includes('hobby') || userMessage.toLowerCase().includes('minat')) {
      interests.push('hobbies');
    }
    if (userMessage.toLowerCase().includes('belajar') || userMessage.toLowerCase().includes('skill') || userMessage.toLowerCase().includes('kursus')) {
      interests.push('learning');
    }
    if (userMessage.toLowerCase().includes('bisnis') || userMessage.toLowerCase().includes('startup') || userMessage.toLowerCase().includes('usaha')) {
      interests.push('business');
    }
    setUserInterests(prev => [...new Set([...prev, ...interests])]);
  };

  const getResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    const detectedContexts = analyzeContext(userMessage);
    
    for (const [keywords, response] of Object.entries(chatBotResponses)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => message.includes(keyword))) {
        const baseResponse = Array.isArray(response) 
          ? response[Math.floor(Math.random() * response.length)]
          : response;
        
        if (detectedContexts.length > 0) {
          const contextualResponse = await generatePersonalizedResponse(userMessage, detectedContexts);
          return `${baseResponse}\n\n${contextualResponse}`;
        }
        return baseResponse;
      }
    }

    if (detectedContexts.length > 0) {
      return await generatePersonalizedResponse(userMessage, detectedContexts);
    }

    return await generateGeneralConversationResponse(userMessage, detectedContexts);
  };

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationState('ongoing');

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));

    const responseContent = await getResponse(content);
    
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    updateConversationContext(content, responseContent);

    const shouldSendFollowUp = Math.random() > 0.2;
    
    if (shouldSendFollowUp) {
      setTimeout(async () => {
        const contextAwareFollowUps = [
          "Ada yang mau ditambahkan atau explore lebih dalam? Gue suka banget direction conversation kita! 🎯",
          "Btw, perspektif kamu tadi menarik banget. Mau cerita lebih tentang experience yang shape pemikiran itu? 💭",
          "Gue curious - gimana pandangan kamu tentang hal-hal yang connected sama topik ini? 🔗",
          "That was insightful banget! Discussion kayak gini yang paling valuable karena authentic and natural flow-nya 💫",
          "Mau lanjut explore topic ini atau ada hal lain yang lagi di pikiran kamu? Gue enjoy ngobrol sama kamu! 😊",
          "Interesting perspective! Gue suka how you think. Ada story di balik viewpoint itu gak? Share dong! 📚",
          "Wah, gue dapet insight baru dari conversation ini! Ada angle lain yang pengen kamu explore? 🚀",
          "Thanks buat sharing thoughts kamu! Conversation kayak gini yang bikin gue excited tentang human-AI collaboration 🤖✨"
        ];
        
        if (conversationContext.includes('business')) {
          contextAwareFollowUps.push("Oh ya, terkait business context tadi - ada specific challenges yang lagi kamu face gak? 💼");
          contextAwareFollowUps.push("Penasaran nih, plan next steps buat business idea kamu gimana? 🚀");
        }
        if (conversationContext.includes('technology')) {
          contextAwareFollowUps.push("Btw, since kita ngomongin tech - ada developments di industry yang bikin kamu excited lately? 🔥");
          contextAwareFollowUps.push("Curious, tech stack atau tools apa yang lagi kamu explore sekarang? 💻");
        }
        if (conversationContext.includes('personal')) {
          contextAwareFollowUps.push("Thanks udah sharing something personal. Gue appreciate openness kamu - it makes conversation more meaningful! 💙");
          contextAwareFollowUps.push("Gue feel connected sama story kamu. Ada goals atau dreams yang lagi kamu pursue? ✨");
        }
        if (conversationContext.includes('learning')) {
          contextAwareFollowUps.push("Learning journey kamu inspiring! Next skill yang mau dikuasai apa? 📚");
          contextAwareFollowUps.push("Btw, ada learning resources atau methods yang effective buat kamu? Share tips dong! 🎯");
        }
        
        const randomFollowUp = contextAwareFollowUps[Math.floor(Math.random() * contextAwareFollowUps.length)];
        
        const followUpMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          content: randomFollowUp,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, followUpMessage]);
      }, 2000 + Math.random() * 4000);
    }
  };

  const getQuickReplies = () => {
    let baseReplies = quickReplies.general;
    
    if (conversationContext.includes('business')) {
      baseReplies = [...baseReplies, ...quickReplies.business];
    }
    
    if (conversationContext.includes('technology')) {
      baseReplies = [...baseReplies, ...quickReplies.technical];
    }
    
    if (conversationContext.includes('learning')) {
      baseReplies = [...baseReplies, ...quickReplies.learning];
    }

    if (conversationContext.includes('freelance')) {
      baseReplies = [...baseReplies, 'Tips freelance', 'Platform terbaik', 'Pricing strategy'];
    }
    
    if (conversationState === 'initial') {
      return [...baseReplies, ...quickReplies.services];
    }
    
    return [...new Set(baseReplies)].slice(0, 8);
  };

  return {
    messages,
    sendMessage,
    getQuickReplies,
  };
};
