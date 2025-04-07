
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blogTypes';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

const RelatedArticles = ({ posts }: RelatedArticlesProps) => {
  if (!posts.length) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">Artikel Terkait</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id}>
            <Card className="bg-dark-300 border-gray-700 hover:border-digicyan transition-all duration-300">
              <div className="h-40 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-xs text-digicyan mb-2 uppercase">{post.category}</div>
                <h3 className="font-semibold text-white mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center mt-3 text-digicyan text-sm">
                  Baca selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
