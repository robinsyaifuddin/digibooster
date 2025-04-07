
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blogTypes';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

const RelatedArticles = ({ posts }: RelatedArticlesProps) => {
  if (!posts.length) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">Artikel Yang Mungkin Relevan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id}>
            <Card className="bg-dark-300 border-gray-700 hover:border-digicyan transition-all duration-300 h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-grow">
                <Badge className="self-start mb-2 bg-digicyan/20 text-digicyan hover:bg-digicyan/30">{post.category}</Badge>
                <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-3 flex-grow">{post.excerpt}</p>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="mr-1">{post.readTime}</span> • 
                    <span className="ml-1">{post.date}</span>
                  </div>
                  <div className="flex items-center text-digicyan text-sm font-medium">
                    Baca <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
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
