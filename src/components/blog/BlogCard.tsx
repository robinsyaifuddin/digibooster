
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock } from 'lucide-react';
import { BlogPost } from '@/types/blogTypes';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium bg-digiblue/10 text-digiblue-700 px-2 py-1 rounded">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-digiblue-700 hover:text-digiblue-800 transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">
          {post.excerpt}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-digiblue-50 text-digiblue-600 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <div className="text-sm text-gray-500">{post.date}</div>
        <Button variant="ghost" className="text-digiblue-600 hover:text-digiblue-800 p-0">
          Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
