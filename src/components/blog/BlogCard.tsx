
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { BlogPost } from "@/types/blogTypes";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.div 
      className="bg-dark-300 rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="h-48 overflow-hidden">
        <Link to={`/blog/${post.id}`}>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <Badge className="bg-digicyan/20 text-digicyan hover:bg-digicyan/30">
            {post.category}
          </Badge>
        </div>
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:text-digicyan transition-colors">{post.title}</h3>
        </Link>
        <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4 mt-auto">
          <div className="flex items-center mr-4 mb-1">
            <Calendar className="h-4 w-4 mr-1 text-digicyan" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center mb-1">
            <Clock className="h-4 w-4 mr-1 text-digicyan" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.id}`} className="mt-auto">
          <Button 
            variant="ghost" 
            className="text-digicyan hover:text-digicyan-600 hover:bg-digicyan/10 p-0 flex items-center"
          >
            Baca Selengkapnya
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
