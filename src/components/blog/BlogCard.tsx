
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock } from 'lucide-react';
import { BlogPost } from '@/types/blogTypes';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-700 hover:border-digicyan">
      <div className="h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium bg-digicyan/10 text-digicyan px-2 py-1 rounded capitalize">
            {post.category}
          </span>
          <div className="flex items-center text-white text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-white hover:text-digicyan transition-colors">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-white">
          {post.excerpt}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-digicyan/10 text-digicyan px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t border-gray-700">
        <div className="text-sm text-white">{post.date}</div>
        <Link to={`/blog/${post.id}`}>
          <Button variant="ghost" className="text-digicyan hover:text-digicyan-300 p-0">
            Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
