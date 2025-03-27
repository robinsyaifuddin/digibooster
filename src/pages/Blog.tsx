
import { useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import BlogHeader from '@/components/blog/BlogHeader';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogPagination from '@/components/blog/BlogPagination';
import { blogPosts } from '@/data/blogData';

const Blog = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
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

  // Reset filters function
  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="py-24 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Blog Header */}
      <BlogHeader />

      {/* Search and Filter */}
      <BlogSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Blog Posts Grid */}
      <BlogGrid posts={filteredPosts} resetFilters={resetFilters} />

      {/* Pagination */}
      <BlogPagination />
    </div>
  );
};

export default Blog;
