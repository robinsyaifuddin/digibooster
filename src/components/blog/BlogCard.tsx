
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    date: string;
    author: {
      name: string;
      avatar?: string;
    };
    category: string;
    tags: string[];
    excerpt: string;
    image: string;
    slug: string;
  };
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="cyber-card overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-transparent to-transparent"></div>
        <Badge className="absolute top-4 right-4 bg-cyber-accent hover:bg-cyber-accent/90">
          {post.category}
        </Badge>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-sm text-white/60 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author.name}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 leading-tight text-white hover:text-cyber-accent transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        
        <p className="text-white/70 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-cyber-primary/30 text-white/70">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-cyber-accent hover:text-cyber-highlight font-medium text-sm transition-colors cyber-link"
        >
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
