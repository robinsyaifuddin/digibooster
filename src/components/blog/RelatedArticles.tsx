
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blogTypes';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

const RelatedArticles = ({ posts }: RelatedArticlesProps) => {
  if (!posts || posts.length === 0) return null;
  
  return (
    <motion.div 
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Artikel Terkait</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link to={`/blog/${post.id}`} key={post.id}>
            <div className="bg-dark-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="h-40 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="mt-auto">
                  <span className="text-digicyan text-sm flex items-center">
                    Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedArticles;
