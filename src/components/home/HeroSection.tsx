
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating?: number;
  year?: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection = ({
  title,
  subtitle,
  description,
  image,
  rating = 4.5,
  year = "2023",
  ctaText = "Explore Services",
  ctaLink = "/services"
}: HeroSectionProps) => {
  const formattedRating = rating.toFixed(1);

  return (
    <div className="w-full relative overflow-hidden min-h-[80vh] rounded-xl mb-16">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={image} alt="DigiBooster Hero" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-sky-500/80 rounded-full">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
              {subtitle}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-500" : "text-gray-400"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-white">{formattedRating}</span>
            </div>
            
            <span className="text-gray-400">{year}</span>
            
            <span className="px-2 py-1 text-xs rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300">
              Premium
            </span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-300 mb-8 max-w-2xl"
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <Link to={ctaLink}>
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 rounded-full text-white">
                <Play className="mr-2 h-5 w-5" />
                {ctaText}
              </Button>
            </Link>
            
            <Link to="/about">
              <Button size="lg" variant="outline" className="rounded-full border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                <Info className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom indicator */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.div 
          className="h-1 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
