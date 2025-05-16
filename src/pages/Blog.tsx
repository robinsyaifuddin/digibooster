
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogPosts } from '@/data/blogData';
import { BlogCategory } from '@/types/blogTypes';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('all');
  
  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.some(paragraph => paragraph.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || post.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Categories
  const categories: BlogCategory[] = ['all', 'technology', 'design', 'business', 'marketing'];

  return (
    <div className="pt-16 bg-black min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-black to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog DigiBooster</h1>
            <p className="text-gray-300 mb-8">
              Temukan berbagai artikel dan tutorial seputar dunia digital untuk meningkatkan pengetahuan dan keterampilan Anda.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Cari artikel..."
                className="pl-10 bg-gray-900 border-gray-700 text-white rounded-full focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={activeCategory === category 
                ? "bg-sky-500 hover:bg-sky-600 text-white" 
                : "border-gray-700 text-gray-300 hover:bg-sky-500/20"}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'Semua' : category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Blog Posts Grid - Similar to movie cards in reference */}
      <div className="container mx-auto px-4 py-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Tidak ada artikel yang ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-sky-500/10 transition-all border border-gray-800 hover:border-sky-500/30"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  
                  <div className="absolute bottom-3 left-3 px-2 py-1 text-xs bg-sky-500 text-white rounded-md">
                    {post.category.toUpperCase()}
                  </div>
                </div>
                
                <div className="p-5">
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          {[1, 2, 3, '...', 5].map((page, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="icon"
              className={index === 0 ? "bg-sky-500 hover:bg-sky-600 w-8 h-8" : "border-gray-700 text-gray-300 w-8 h-8"}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="border-gray-700 w-8 h-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
