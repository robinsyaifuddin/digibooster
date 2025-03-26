
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "../hooks/use-mobile";
import { Search, ChevronRight, BookOpen, Clock, Tag, Filter } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const Blog = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "7 Tips Optimasi Website untuk Pemula",
      excerpt: "Pelajari cara sederhana untuk meningkatkan performa website Anda agar lebih cepat dan ramah pengguna.",
      category: "Website",
      author: "Admin DigiBooster",
      date: "20 Jul 2023",
      readTime: "5 menit",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["SEO", "Website", "Optimasi"]
    },
    {
      id: 2,
      title: "Cara Membuat Konten Digital yang Menarik",
      excerpt: "Temukan rahasia membuat konten digital yang tidak hanya menarik tetapi juga bisa meningkatkan engagement.",
      category: "Content",
      author: "Tim DigiBooster",
      date: "15 Jul 2023",
      readTime: "8 menit",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Content", "Digital Marketing", "Engagement"]
    },
    {
      id: 3,
      title: "Strategi Marketing Digital di Era 2023",
      excerpt: "Update terbaru tentang strategi marketing digital yang efektif di tahun 2023.",
      category: "Marketing",
      author: "Admin DigiBooster",
      date: "10 Jul 2023",
      readTime: "10 menit",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Marketing", "Digital Strategy", "Trends"]
    },
    {
      id: 4,
      title: "Tren Digital Marketing 2023",
      excerpt: "Pelajari tren digital marketing terbaru yang perlu Anda ketahui untuk tetap relevan di tahun 2023.",
      category: "Marketing",
      author: "Tim DigiBooster",
      date: "5 Jul 2023",
      readTime: "7 menit",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Marketing", "Trends", "Digital"]
    },
    {
      id: 5,
      title: "Pentingnya Website untuk Bisnis",
      excerpt: "Mengapa bisnis Anda membutuhkan website yang profesional di era digital saat ini.",
      category: "Website",
      author: "Admin DigiBooster",
      date: "1 Jul 2023",
      readTime: "6 menit",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Website", "Business", "Digital Presence"]
    },
    {
      id: 6,
      title: "Panduan SEO untuk Pemula",
      excerpt: "Panduan lengkap SEO untuk pemula yang ingin meningkatkan peringkat website di mesin pencari.",
      category: "SEO",
      author: "Tim DigiBooster",
      date: "25 Jun 2023",
      readTime: "12 menit",
      image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["SEO", "Website", "Search Engine"]
    }
  ];
  
  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || post.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter - ensure each category has a valid string value
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category.toLowerCase())))];

  return (
    <div className="py-24 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Blog Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 text-diginavy">DigiBooster Blog</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Temukan berbagai artikel informatif tentang dunia digital untuk membantu Anda berkembang
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Cari artikel..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="md:w-1/3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full overflow-x-auto flex whitespace-nowrap scrollbar-none">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="capitalize"
                  >
                    {category === 'all' ? 'Semua' : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium bg-diginavy/10 text-diginavy px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-diginavy hover:text-diginavy-800 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {post.excerpt}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-2 border-t">
                <div className="text-sm text-gray-500">{post.date}</div>
                <Button variant="ghost" className="text-diginavy hover:text-diginavy-800 p-0">
                  Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Tidak ada artikel ditemukan</h3>
          <p className="text-gray-500 mb-4">Coba gunakan kata kunci pencarian yang berbeda</p>
          <Button onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
            Lihat Semua Artikel
          </Button>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <Button variant="outline" className="mr-2" disabled>
          Sebelumnya
        </Button>
        <Button variant="outline" className="bg-diginavy text-white">
          1
        </Button>
        <Button variant="outline" className="ml-2">
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};

export default Blog;
