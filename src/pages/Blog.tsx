
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Calendar, Filter, Search, Tag, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Cara Memulai Bisnis Digital dari Nol',
    excerpt: 'Panduan lengkap untuk memulai bisnis digital Anda dari nol, termasuk strategi pemasaran dan tips mengelola bisnis online.',
    category: 'Bisnis Digital',
    author: 'Tim DigiBooster',
    date: '12 Agustus 2023',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    premium: false,
    readTime: '8 menit',
  },
  {
    id: 2,
    title: 'Strategi SEO Terbaru untuk Meningkatkan Peringkat Website',
    excerpt: 'Pelajari teknik SEO terbaru yang dapat membantu meningkatkan peringkat website Anda di mesin pencari Google.',
    category: 'SEO',
    author: 'Ahmad Fauzi',
    date: '5 Agustus 2023',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    premium: true,
    readTime: '12 menit',
  },
  {
    id: 3,
    title: 'Tips Membuat Konten yang Menarik untuk Media Sosial',
    excerpt: 'Panduan praktis untuk membuat konten yang menarik dan viral di berbagai platform media sosial populer saat ini.',
    category: 'Media Sosial',
    author: 'Siti Nurhaliza',
    date: '28 Juli 2023',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    premium: false,
    readTime: '5 menit',
  },
  {
    id: 4,
    title: 'Pentingnya Data Analytics dalam Pengembangan Bisnis',
    excerpt: 'Bagaimana data analytics dapat membantu Anda membuat keputusan bisnis yang lebih baik dan meningkatkan profitabilitas.',
    category: 'Data Analytics',
    author: 'Budi Santoso',
    date: '20 Juli 2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    premium: true,
    readTime: '10 menit',
  },
  {
    id: 5,
    title: 'Membangun Brand yang Kuat di Era Digital',
    excerpt: 'Langkah-langkah praktis untuk membangun dan memperkuat brand Anda di era digital yang kompetitif.',
    category: 'Branding',
    author: 'Tim DigiBooster',
    date: '15 Juli 2023',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    premium: false,
    readTime: '7 menit',
  },
  {
    id: 6,
    title: 'Teknik Copywriting yang Efektif untuk Meningkatkan Konversi',
    excerpt: 'Pelajari teknik copywriting yang terbukti efektif untuk meningkatkan konversi dan penjualan pada website Anda.',
    category: 'Copywriting',
    author: 'Rina Wijaya',
    date: '8 Juli 2023',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=2673&ixlib=rb-4.0.3',
    premium: true,
    readTime: '9 menit',
  },
];

const Blog = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  useEffect(() => {
    // Set page title
    document.title = "Blog | DigiBooster";
  }, []);
  
  // Filter and search posts
  const filteredPosts = blogPosts.filter(post => {
    // Filter by premium status
    if (filter === 'premium' && !post.premium) return false;
    if (filter === 'free' && post.premium) return false;
    
    // Filter by category
    if (categoryFilter && post.category !== categoryFilter) return false;
    
    // Search by title or excerpt
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchTermLower) ||
        post.excerpt.toLowerCase().includes(searchTermLower)
      );
    }
    
    return true;
  });
  
  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  // Handle premium content access
  const handlePremiumAccess = (post: typeof blogPosts[0]) => {
    if (!user) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login untuk membaca konten premium.",
        variant: "destructive",
      });
      return;
    }
    
    // If user is logged in but not admin or premium user
    if (user.role !== 'admin' && user.email !== 'digibooster@123') {
      toast({
        title: "Konten Premium",
        description: "Anda perlu berlangganan untuk mengakses konten premium.",
        variant: "destructive",
      });
      return;
    }
    
    // If admin or premium user, allow access
    toast({
      title: "Akses diberikan",
      description: `Anda sekarang dapat membaca artikel ${post.title}.`,
    });
  };
  
  return (
    <div className="container mx-auto py-16 px-4 md:px-6 lg:px-8 mt-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog DigiBooster</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Dapatkan informasi terbaru, tips, dan trik seputar dunia digital untuk mengembangkan bisnis dan keterampilan Anda.
        </p>
      </div>
      
      {/* Filters and search */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10 w-full sm:w-80"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua Kategori</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-diginavy text-white' : ''}
            onClick={() => setFilter('all')}
          >
            Semua
          </Button>
          <Button
            variant={filter === 'free' ? 'default' : 'outline'}
            className={filter === 'free' ? 'bg-diginavy text-white' : ''}
            onClick={() => setFilter('free')}
          >
            Gratis
          </Button>
          <Button
            variant={filter === 'premium' ? 'default' : 'outline'}
            className={filter === 'premium' ? 'bg-diginavy text-white' : ''}
            onClick={() => setFilter('premium')}
          >
            Premium
          </Button>
        </div>
      </div>
      
      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {post.premium && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-xs font-bold">
                    PREMIUM
                  </div>
                )}
              </div>
              
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <Tag className="h-3 w-3 mr-1" />
                  <span>{post.category}</span>
                </div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <CardDescription className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center p-4 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <User className="h-3 w-3 mr-1" />
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <BookOpen className="h-3 w-3 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </CardFooter>
              
              {post.premium ? (
                <div className="px-4 pb-4">
                  <Button 
                    className="w-full bg-diginavy text-white hover:bg-diginavy-800"
                    onClick={() => handlePremiumAccess(post)}
                  >
                    Baca Artikel Premium
                  </Button>
                </div>
              ) : (
                <div className="px-4 pb-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-diginavy text-diginavy"
                  >
                    Baca Selengkapnya
                  </Button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Tidak ada artikel yang ditemukan</h3>
            <p className="text-gray-600">
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
            <Button 
              className="mt-4 bg-diginavy text-white"
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
                setCategoryFilter('');
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
      
      {/* Newsletter signup - visible to all but with different messaging based on auth status */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {user ? 'Dapatkan Update Terbaru' : 'Daftar Newsletter Kami'}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {user 
            ? 'Kami akan mengirimkan artikel terbaru dan tips digital marketing ke email Anda.' 
            : 'Dapatkan artikel terbaru dan tips digital marketing langsung ke inbox Anda. Daftar sekarang!'}
        </p>
        
        {user ? (
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input value={user.email} disabled className="bg-gray-100" />
              <Button className="bg-diginavy text-white">Berlangganan</Button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Anda akan menerima newsletter dengan email {user.email}
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input placeholder="Masukkan email Anda" />
              <Button 
                className="bg-diginavy text-white"
                onClick={() => {
                  toast({
                    title: "Silakan login terlebih dahulu",
                    description: "Untuk berlangganan newsletter, Anda perlu login ke akun Anda.",
                  });
                }}
              >
                Berlangganan
              </Button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              <Link to="/login" className="text-diginavy hover:underline">Login</Link> atau <Link to="/register" className="text-diginavy hover:underline">daftar</Link> untuk berlangganan newsletter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
