
import React from 'react';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { BlogPost } from '@/types/blogTypes';

interface BlogGridProps {
  posts: BlogPost[];
  resetFilters: () => void;
}

const BlogGrid = ({ posts, resetFilters }: BlogGridProps) => {
  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto text-digiblue-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Tidak ada artikel ditemukan</h3>
          <p className="text-gray-500 mb-4">Coba gunakan kata kunci pencarian yang berbeda</p>
          <Button onClick={resetFilters} 
                className="bg-digiblue-600 hover:bg-digiblue-700 text-white">
            Lihat Semua Artikel
          </Button>
        </div>
      )}
    </>
  );
};

export default BlogGrid;
