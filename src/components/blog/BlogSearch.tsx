
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { blogCategories } from '@/data/blogData';
import { BlogCategory } from '@/types/blogTypes';

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: BlogCategory;
  setActiveCategory: (category: BlogCategory) => void;
}

const BlogSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory 
}: BlogSearchProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Cari artikel..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="overflow-x-auto pb-2">
          <div className="flex flex-nowrap gap-2 min-w-max">
            {blogCategories.map((category) => (
              <Badge 
                key={category} 
                variant={activeCategory === category ? "default" : "outline"}
                className={`px-4 py-2 cursor-pointer capitalize text-sm transition-all ${
                  activeCategory === category 
                    ? "bg-digicyan text-white hover:bg-digicyan/90"
                    : "hover:bg-digicyan/10 border-digicyan/30 text-digicyan"
                }`}
                onClick={() => setActiveCategory(category as BlogCategory)}
              >
                {category === 'all' ? 'Semua' : category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSearch;
