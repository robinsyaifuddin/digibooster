
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, BookOpen } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BlogPost } from '@/types/blogTypes';
import RelatedArticles from './RelatedArticles';
import CommentSection from './CommentSection';
import SourcesSection from './SourcesSection';

interface BlogDetailProps {
  post: BlogPost;
}

const BlogDetail = ({ post }: BlogDetailProps) => {
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
  
  // Mock comments data
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
    }
  ];

  // Mock sources data
  const demoSources = [
    {
      id: 1,
      text: 'Laporan Teknologi Digital Indonesia 2023',
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
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </motion.div>
        
        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 bg-dark-300 p-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
            <BookOpen className="mr-2 h-4 w-4 text-digicyan" />
            Daftar Isi
          </h2>
          <ol className="list-decimal list-inside pl-4 space-y-1 text-gray-300">
            <li className="hover:text-digicyan cursor-pointer">Pendahuluan</li>
            <li className="hover:text-digicyan cursor-pointer">Pembahasan Utama</li>
            <li className="hover:text-digicyan cursor-pointer">Studi Kasus</li>
            <li className="hover:text-digicyan cursor-pointer">Analisis Mendalam</li>
            <li className="hover:text-digicyan cursor-pointer">Kesimpulan</li>
          </ol>
        </motion.div>
        
        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg max-w-none text-white mb-12"
        >
          {post.content.map((paragraph, index) => {
            // Add subheadings for the first few paragraphs
            if (index === 0) {
              return (
                <React.Fragment key={index}>
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Pendahuluan</h2>
                  <p className="mb-6 text-gray-300">{paragraph}</p>
                </React.Fragment>
              );
            } else if (index === 1) {
              return (
                <React.Fragment key={index}>
                  <h2 className="text-2xl font-bold text-white mt-10 mb-4">Pembahasan Utama</h2>
                  <p className="mb-6 text-gray-300">{paragraph}</p>
                  
                  {/* Interactive element - Quote */}
                  <blockquote className="border-l-4 border-digicyan pl-4 py-2 my-6 italic bg-dark-300 rounded-r-lg">
                    <p className="mb-2 text-gray-200">
                      "Transformasi digital bukan hanya tentang teknologi, tetapi juga tentang bagaimana kita beradaptasi dan mengubah cara kerja untuk menghasilkan nilai yang lebih besar."
                    </p>
                    <cite className="text-sm text-digicyan">- Pakar Teknologi Digital</cite>
                  </blockquote>
                </React.Fragment>
              );
            } else if (index === 2) {
              return (
                <React.Fragment key={index}>
                  <h2 className="text-2xl font-bold text-white mt-10 mb-4">Studi Kasus</h2>
                  <p className="mb-6 text-gray-300">{paragraph}</p>
                  
                  {/* Interactive element - Statistic Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
                    <div className="bg-dark-300 p-4 rounded-lg border border-digicyan/30">
                      <h4 className="text-digicyan text-lg mb-1">85%</h4>
                      <p className="text-sm text-gray-300">Peningkatan efisiensi kerja</p>
                    </div>
                    <div className="bg-dark-300 p-4 rounded-lg border border-digicyan/30">
                      <h4 className="text-digicyan text-lg mb-1">3.5x</h4>
                      <p className="text-sm text-gray-300">Peningkatan ROI</p>
                    </div>
                    <div className="bg-dark-300 p-4 rounded-lg border border-digicyan/30">
                      <h4 className="text-digicyan text-lg mb-1">62%</h4>
                      <p className="text-sm text-gray-300">Pengurangan biaya operasional</p>
                    </div>
                  </div>
                </React.Fragment>
              );
            } else if (index === 3) {
              return (
                <React.Fragment key={index}>
                  <h2 className="text-2xl font-bold text-white mt-10 mb-4">Analisis Mendalam</h2>
                  <p className="mb-6 text-gray-300">{paragraph}</p>
                  
                  {/* Interactive element - Image with caption */}
                  {post.relatedImages && post.relatedImages[0] && (
                    <figure className="my-8">
                      <div className="rounded-lg overflow-hidden">
                        <img 
                          src={post.relatedImages[0]} 
                          alt="Ilustrasi analisis data" 
                          className="w-full h-auto"
                        />
                      </div>
                      <figcaption className="text-sm text-center mt-2 text-gray-400">
                        Gambar 1: Visualisasi data dari implementasi teknologi terkini
                      </figcaption>
                    </figure>
                  )}
                  
                  {/* Interactive element - Key points */}
                  <div className="bg-dark-300 p-5 rounded-lg my-8 border-l-4 border-digicyan">
                    <h3 className="font-semibold text-white mb-3">Poin-poin Penting:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Transformasi digital memerlukan perubahan budaya organisasi</li>
                      <li>Teknologi cloud menjadi tulang punggung inovasi di era digital</li>
                      <li>Keamanan data tetap menjadi prioritas utama dalam adopsi teknologi baru</li>
                      <li>Kolaborasi lintas departemen sangat penting untuk kesuksesan implementasi</li>
                    </ul>
                  </div>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={index}>
                  <h2 className="text-2xl font-bold text-white mt-10 mb-4">Kesimpulan</h2>
                  <p className="mb-6 text-gray-300">{paragraph}</p>
                  
                  {/* Interactive element - Call to action */}
                  <div className="bg-gradient-to-r from-digicyan/20 to-dark-300 p-6 rounded-lg my-8 border border-digicyan/40">
                    <h3 className="text-xl font-bold text-white mb-2">Mulai Perjalanan Digital Anda Sekarang</h3>
                    <p className="text-gray-300 mb-4">Ingin mengetahui lebih lanjut tentang bagaimana kami dapat membantu transformasi digital Anda?</p>
                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-digicyan hover:bg-digicyan-600">Konsultasi Gratis</Button>
                      <Button variant="outline" className="border-digicyan text-digicyan hover:bg-digicyan/20">Pelajari Layanan Kami</Button>
                    </div>
                  </div>
                </React.Fragment>
              );
            }
          })}
          
          {/* Sources Section */}
          <SourcesSection sources={demoSources} />
        </motion.div>
        
        <Separator className="my-8 bg-gray-700" />
        
        {/* Tags and Share */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="bg-dark-300 border border-digicyan/30 text-digicyan px-3 py-1 rounded-md text-sm"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Bagikan</h3>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-digicyan/30 text-digicyan hover:bg-digicyan/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-digicyan/30 text-digicyan hover:bg-digicyan/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-digicyan/30 text-digicyan hover:bg-digicyan/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9 border-digicyan/30 text-digicyan hover:bg-digicyan/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <CommentSection comments={demoComments} postId={post.id} />
        
        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <RelatedArticles posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
