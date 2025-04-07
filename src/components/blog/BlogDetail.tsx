
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import RelatedArticles from './RelatedArticles';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const blogId = parseInt(id || '0');
  
  const post = blogPosts.find(post => post.id === blogId);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Artikel tidak ditemukan</h2>
        <Link 
          to="/blog" 
          className="inline-flex items-center text-digicyan hover:text-digicyan-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  // Calculate related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
  
  return (
    <div className="pt-24 md:pt-32 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-digicyan hover:text-digicyan-300 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Blog
          </Link>
        </div>
        
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Badge className="mb-4 bg-digicyan/20 text-digicyan hover:bg-digicyan/30">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6 text-white">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-digicyan" />
              <span>{post.date}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-digicyan" />
              <span>{post.readTime}</span>
            </div>
            
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-digicyan" />
              <span>{post.author || "Admin"}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Feature Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="rounded-xl overflow-hidden cyberpunk-card">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </motion.div>
        
        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none text-white mb-12"
        >
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-300">{paragraph}</p>
          ))}
          
          {/* Additional Images */}
          {post.relatedImages && post.relatedImages.length > 0 && (
            <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.relatedImages.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${post.title} - image ${index + 1}`} 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
        
        <Separator className="my-8 bg-gray-700" />
        
        {/* Tags and Share */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="bg-dark-300 border border-digicyan/30 text-digicyan px-3 py-1 rounded-md text-sm"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Bagikan</h3>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <Share2 className="h-4 w-4 text-digicyan" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <RelatedArticles posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
