
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '@/data/blogData';

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
  
  // Mock content for blog post
  const paragraphs = [
    post.excerpt,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nisl, vitae aliquam nisl nisl vitae nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nisl, vitae aliquam nisl nisl vitae nisl.",
    "Proin consectetur, nibh vel ultricies ultricies, nisl nisl ultricies nisl, vitae aliquam nisl nisl vitae nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultricies nisl, vitae aliquam nisl nisl vitae nisl.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  ];
  
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
            
            <div className="flex items-center">
              <span className="bg-digicyan/10 text-digicyan px-2 py-0.5 rounded text-sm">
                {post.category}
              </span>
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
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-6">{paragraph}</p>
          ))}
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Kesimpulan</h2>
          <p>
            {post.excerpt} Penerapan strategi digital yang tepat dapat memberikan dampak
            signifikan pada pertumbuhan bisnis di era digital saat ini.
          </p>
        </motion.div>
        
        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-dark-300 border border-digicyan/30 text-digicyan px-3 py-1 rounded-md text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
