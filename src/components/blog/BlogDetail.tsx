
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, MessageSquare, ThumbsUp, Heart } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BlogPost } from '@/types/blogTypes';
import RelatedArticles from './RelatedArticles';
import CommentSection from './CommentSection';
import SourcesSection from './SourcesSection';
import SharingSection from './SharingSection';
import { useToast } from '@/hooks/use-toast';

interface BlogDetailProps {
  post: BlogPost;
}

const BlogDetail = ({ post }: BlogDetailProps) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [post.id]);

  // Calculate related posts based on tags and category similarity
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .sort((a, b) => {
      // Calculate relevance score based on shared tags and same category
      const aScore = a.tags.filter(tag => post.tags.includes(tag)).length + (a.category === post.category ? 2 : 0);
      const bScore = b.tags.filter(tag => post.tags.includes(tag)).length + (b.category === post.category ? 2 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  // Handle liking the post
  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Suka dibatalkan" : "Artikel disukai!",
      description: liked ? "Anda telah membatalkan suka pada artikel ini" : "Terima kasih atas apresiasi Anda",
    });
  };

  // Handle bookmarking the post
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark dihapus" : "Artikel disimpan!",
      description: bookmarked ? "Artikel dihapus dari bookmark Anda" : "Artikel telah disimpan ke bookmark Anda",
    });
  };
  
  // Mock comments data with structured content
  const demoComments = [
    {
      id: 1,
      userId: 'user1',
      userName: 'Andi Prasetyo',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      content: 'Artikel ini sangat informatif dan membantu saya untuk memahami teknologi terkini. Terima kasih atas penjelasannya yang detail!',
      date: '2023-06-15T10:30:00',
      likes: 5,
      replies: [
        {
          id: 1,
          userId: 'user2',
          userName: 'Dewi Septiani',
          userAvatar: 'https://i.pravatar.cc/150?img=5',
          content: 'Saya setuju! Penjelasannya sangat jelas dan mudah dipahami.',
          date: '2023-06-15T11:45:00',
          likes: 2
        },
        {
          id: 2,
          userId: 'user3',
          userName: 'Budi Santoso',
          userAvatar: 'https://i.pravatar.cc/150?img=3',
          content: 'Saya juga merasa artikel ini sangat bermanfaat untuk project saya saat ini.',
          date: '2023-06-15T13:20:00',
          likes: 1
        }
      ]
    },
    {
      id: 2,
      userId: 'user4',
      userName: 'Rini Wulandari',
      userAvatar: 'https://i.pravatar.cc/150?img=9',
      content: 'Saya punya pertanyaan tentang penerapan teknologi ini di perusahaan kecil. Apakah ada rekomendasi langkah awal yang bisa diambil?',
      date: '2023-06-16T09:15:00',
      likes: 3,
      replies: []
    },
    {
      id: 3,
      userId: 'user5',
      userName: 'Ahmad Rizki',
      userAvatar: 'https://i.pravatar.cc/150?img=8',
      content: 'Poin-poin yang disampaikan sangat relevan dengan kondisi industri saat ini. Saya tertarik untuk mengimplementasikan beberapa ide yang disebutkan dalam artikel.',
      date: '2023-06-17T14:20:00',
      likes: 7,
      replies: [
        {
          id: 3,
          userId: 'user6',
          userName: 'Siti Rahma',
          userAvatar: 'https://i.pravatar.cc/150?img=6',
          content: 'Betul sekali, saya sudah mencoba beberapa teknik yang disebutkan dan hasilnya sangat memuaskan.',
          date: '2023-06-17T16:05:00',
          likes: 4
        }
      ]
    }
  ];

  // Mock sources data with complete references
  const demoSources = [
    {
      id: 1,
      text: 'Laporan Teknologi Digital Indonesia 2023, Asosiasi Digital Indonesia',
      url: 'https://example.com/report2023'
    },
    {
      id: 2,
      text: 'Alim, F. (2022). Perkembangan Teknologi di Era Digital. Jurnal Teknologi Informasi, 15(2), 45-60.',
      url: 'https://example.com/jurnal'
    },
    {
      id: 3,
      text: 'Kementerian Komunikasi dan Informatika RI (2023). Strategi Nasional Transformasi Digital.',
      url: 'https://example.com/kominfo'
    },
    {
      id: 4,
      text: 'Putri, D. & Santoso, B. (2023). Implementasi Artificial Intelligence dalam Bisnis UMKM. Jurnal Ekonomi Digital, 8(3), 112-128.',
      url: 'https://example.com/ai-umkm'
    },
    {
      id: 5,
      text: 'World Economic Forum (2023). Future of Jobs Report 2023.',
      url: 'https://example.com/wef-jobs'
    }
  ];
  
  return (
    <div className="pt-24 md:pt-32 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-digicyan hover:text-digicyan-300 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Blog
          </Link>
        </div>
        
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Badge className="mb-4 bg-digicyan/20 text-digicyan hover:bg-digicyan/30">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6 text-white">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-digicyan" />
              <span>{post.date}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-digicyan" />
              <span>{post.readTime}</span>
            </div>
            
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-digicyan" />
              <span>{post.author || "Admin"}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Action Buttons for Desktop */}
        <div className="hidden md:flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-2 ${liked ? 'bg-digicyan/20 text-digicyan border-digicyan/50' : 'border-gray-600 text-gray-300'}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-digicyan text-digicyan' : ''}`} />
            {liked ? 'Disukai' : 'Suka'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-2 ${bookmarked ? 'bg-digicyan/20 text-digicyan border-digicyan/50' : 'border-gray-600 text-gray-300'}`}
            onClick={handleBookmark}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill={bookmarked ? "currentColor" : "none"}
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            {bookmarked ? 'Tersimpan' : 'Simpan'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 flex items-center gap-2"
            onClick={() => document.getElementById("comment-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            <MessageSquare className="h-4 w-4" />
            Komentar
          </Button>
        </div>
        
        {/* Feature Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="rounded-xl overflow-hidden cyberpunk-card">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-[250px] md:h-[400px] object-cover"
            />
          </div>
        </motion.div>
        
        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg max-w-none text-white mb-12"
        >
          <div className="space-y-6">
            {/* Introduction with enhanced styling */}
            <div className="text-lg text-gray-300 leading-relaxed">
              <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-digicyan first-letter:mr-1 first-letter:float-left first-letter:leading-tight">
                {post.excerpt || post.content[0]}
              </p>
            </div>
            
            {/* First section with quote */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center">
              <span className="w-1 h-8 bg-digicyan rounded-full mr-3"></span>
              Transformasi Digital dalam Bisnis Modern
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {post.content[1] || "Transformasi digital telah menjadi kebutuhan vital bagi setiap bisnis yang ingin tetap relevan di era digital. Ini bukan sekadar tentang mengadopsi teknologi baru, tetapi tentang mengubah model bisnis dan proses untuk mengoptimalkan operasi dan memberikan nilai lebih kepada pelanggan. Perusahaan yang berhasil dalam transformasi digital tidak hanya melihat teknologi sebagai alat, tetapi sebagai pendorong inovasi yang terintegrasi dalam setiap aspek bisnis."}
            </p>
            
            {/* Interactive element - Quote with enhanced styling */}
            <blockquote className="border-l-4 border-digicyan pl-4 py-4 my-8 italic bg-gradient-to-r from-dark-300 to-transparent rounded-r-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-digicyan/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <p className="mb-3 text-xl text-gray-200">
                "Transformasi digital bukan hanya tentang teknologi, tetapi juga tentang bagaimana kita beradaptasi dan mengubah cara kerja untuk menghasilkan nilai yang lebih besar."
              </p>
              <cite className="text-sm text-digicyan flex items-center">
                <span className="w-5 h-px bg-digicyan mr-2"></span>
                Pakar Teknologi Digital
              </cite>
            </blockquote>
            
            {/* Second section with interactive stats */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center">
              <span className="w-1 h-8 bg-digicyan rounded-full mr-3"></span>
              Dampak Konkret dalam Bisnis
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {post.content[2] || "Implementasi transformasi digital telah menunjukkan hasil yang signifikan di berbagai sektor industri. Dari peningkatan efisiensi operasional hingga pengalaman pelanggan yang lebih baik, manfaatnya sangat nyata. Studi kasus menunjukkan bagaimana perusahaan yang mengadopsi pendekatan digital-first mampu meningkatkan produktivitas karyawan, mengurangi biaya operasional, dan membuka aliran pendapatan baru."}
            </p>
            
            {/* Enhanced interactive statistic cards with animations */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <motion.div 
                className="bg-gradient-to-br from-dark-300 to-dark-300/60 p-5 rounded-lg border border-digicyan/30 shadow-lg"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(3, 213, 235, 0.2)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h4 className="text-digicyan text-3xl font-bold mb-1">85%</h4>
                <p className="text-sm text-gray-300">Peningkatan efisiensi kerja melalui automasi proses bisnis</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-dark-300 to-dark-300/60 p-5 rounded-lg border border-digicyan/30 shadow-lg"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(3, 213, 235, 0.2)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h4 className="text-digicyan text-3xl font-bold mb-1">3.5x</h4>
                <p className="text-sm text-gray-300">Peningkatan ROI dibandingkan dengan metode tradisional</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-dark-300 to-dark-300/60 p-5 rounded-lg border border-digicyan/30 shadow-lg"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(3, 213, 235, 0.2)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <h4 className="text-digicyan text-3xl font-bold mb-1">62%</h4>
                <p className="text-sm text-gray-300">Pengurangan biaya operasional dengan teknologi cloud</p>
              </motion.div>
            </div>
            
            {/* Third section with enhanced image */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center">
              <span className="w-1 h-8 bg-digicyan rounded-full mr-3"></span>
              Strategi Implementasi yang Efektif
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {post.content[3] || "Mengimplementasikan transformasi digital memerlukan pendekatan strategis dan terencana. Penting untuk mengidentifikasi area prioritas yang akan memberikan dampak terbesar pada bisnis. Melibatkan semua pemangku kepentingan dan memastikan dukungan dari manajemen senior sangat penting untuk kesuksesan. Perubahan budaya organisasi menjadi salah satu tantangan terbesar, oleh karena itu komunikasi dan pelatihan menjadi komponen penting dalam proses transformasi."}
            </p>
            
            {/* Interactive element - Image with enhanced caption */}
            {post.relatedImages && post.relatedImages[0] && (
              <figure className="my-8">
                <div className="rounded-lg overflow-hidden border border-digicyan/20 shadow-lg shadow-digicyan/10">
                  <img 
                    src={post.relatedImages[0]} 
                    alt="Ilustrasi analisis data dalam transformasi digital" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <figcaption className="text-sm text-center mt-3 text-gray-400 flex flex-col items-center">
                  <span className="w-8 h-0.5 bg-digicyan/50 mb-2"></span>
                  Gambar 1: Visualisasi data dari implementasi teknologi dalam proses transformasi digital
                </figcaption>
              </figure>
            )}
            
            {/* Enhanced key points box */}
            <div className="bg-gradient-to-r from-dark-300 to-dark-300/60 p-6 rounded-lg my-8 border-l-4 border-digicyan shadow-lg">
              <h3 className="font-semibold text-white text-lg mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-digicyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Poin-poin Penting:
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-digicyan/20 text-digicyan text-xs mr-3 mt-0.5">1</span>
                  <span>Transformasi digital memerlukan perubahan budaya organisasi yang didukung dari level manajemen tertinggi</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-digicyan/20 text-digicyan text-xs mr-3 mt-0.5">2</span>
                  <span>Teknologi cloud menjadi tulang punggung inovasi di era digital, memungkinkan skalabilitas dan fleksibilitas</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-digicyan/20 text-digicyan text-xs mr-3 mt-0.5">3</span>
                  <span>Keamanan data tetap menjadi prioritas utama dalam adopsi teknologi baru untuk menjaga kepercayaan pelanggan</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-digicyan/20 text-digicyan text-xs mr-3 mt-0.5">4</span>
                  <span>Kolaborasi lintas departemen sangat penting untuk kesuksesan implementasi transformasi digital menyeluruh</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-digicyan/20 text-digicyan text-xs mr-3 mt-0.5">5</span>
                  <span>Mengukur hasil dan ROI secara berkala membantu memastikan transformasi digital berjalan sesuai tujuan bisnis</span>
                </li>
              </ul>
            </div>
            
            {/* Conclusion section with enhanced styling */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center">
              <span className="w-1 h-8 bg-digicyan rounded-full mr-3"></span>
              Kesimpulan
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {post.content[4] || "Transformasi digital bukan lagi pilihan, tetapi keharusan dalam lanskap bisnis yang terus berubah. Organisasi yang dapat mengadaptasi teknologi dengan cepat dan mengintegrasikannya secara efektif ke dalam operasi mereka akan memiliki keunggulan kompetitif yang signifikan. Namun, penting untuk diingat bahwa transformasi digital adalah perjalanan, bukan tujuan akhir. Perlu ada komitmen untuk terus belajar, berkembang, dan beradaptasi dengan perkembangan teknologi terbaru."}
            </p>
            
            {/* Enhanced call to action box */}
            <div className="bg-gradient-to-r from-digicyan/10 via-digicyan/5 to-transparent p-8 rounded-xl my-10 border border-digicyan/40 shadow-lg shadow-digicyan/5">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-digicyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                Mulai Perjalanan Digital Anda Sekarang
              </h3>
              <p className="text-gray-300 mb-5 ml-8">
                Ingin mengetahui lebih lanjut tentang bagaimana kami dapat membantu transformasi digital Anda? 
                DigiBooster menyediakan layanan konsultasi dan implementasi yang dapat disesuaikan dengan kebutuhan bisnis Anda.
              </p>
              <div className="flex flex-wrap gap-4 ml-8">
                <Button className="bg-digicyan hover:bg-digicyan-600 text-black font-medium">
                  Konsultasi Gratis
                </Button>
                <Button variant="outline" className="border-digicyan text-digicyan hover:bg-digicyan/20">
                  Pelajari Layanan Kami
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sources Section with improved styling */}
          <SourcesSection sources={demoSources} />
        </motion.div>
        
        <Separator className="my-8 bg-gray-700" />
        
        {/* Article Reaction Section */}
        <div className="flex justify-center my-10">
          <div className="bg-dark-300/80 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-6 border border-gray-800">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center ${liked ? 'text-digicyan' : 'text-gray-400'}`}
              onClick={handleLike}
            >
              <Heart className={`h-6 w-6 mb-1 ${liked ? 'fill-digicyan text-digicyan' : ''}`} />
              <span className="text-xs">Suka</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center text-gray-400"
              onClick={() => document.getElementById("comment-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              <MessageSquare className="h-6 w-6 mb-1" />
              <span className="text-xs">Komentar</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center ${bookmarked ? 'text-digicyan' : 'text-gray-400'}`}
              onClick={handleBookmark}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill={bookmarked ? "currentColor" : "none"}
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mb-1"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              <span className="text-xs">Simpan</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center text-gray-400"
              onClick={() => document.getElementById("share-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Share2 className="h-6 w-6 mb-1" />
              <span className="text-xs">Bagikan</span>
            </motion.button>
          </div>
        </div>
        
        {/* Tags and Share Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 bg-dark-300/50 p-6 rounded-xl border border-gray-800/50">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="bg-dark-300 border border-digicyan/30 text-digicyan px-3 py-1 rounded-md text-sm hover:bg-digicyan/20 transition-colors cursor-pointer"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Sharing section (placeholder - will be replaced by SharingSection component) */}
          <div id="share-section">
            <SharingSection title={post.title} url={window.location.href} />
          </div>
        </div>
        
        {/* Comments Section with improved styling */}
        <div id="comment-section">
          <CommentSection comments={demoComments} postId={post.id} />
        </div>
        
        {/* Related Articles with improved styling */}
        {relatedPosts.length > 0 && (
          <RelatedArticles posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
