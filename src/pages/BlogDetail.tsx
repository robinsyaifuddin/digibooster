
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogDetailComponent from '@/components/blog/BlogDetail';
import { blogPosts } from '@/data/blogData';
import { motion } from 'framer-motion';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const blogId = parseInt(id || '0');
  
  const post = blogPosts.find(post => post.id === blogId);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title with blog post title
    if (post) {
      document.title = `${post.title} | DigiBooster Blog`;
    }
    
    return () => {
      // Reset title on unmount
      document.title = 'DigiBooster';
    };
  }, [id, post]);
  
  if (!post) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Artikel tidak ditemukan</h2>
        <p className="text-gray-300">
          Maaf, artikel yang Anda cari tidak tersedia. Silakan kembali ke halaman blog.
        </p>
      </motion.div>
    );
  }

  return <BlogDetailComponent post={post} />;
};

export default BlogDetail;
