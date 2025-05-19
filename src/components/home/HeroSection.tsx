
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GeneralInfo, HeroSection as HeroSectionType } from '@/types/websiteTypes';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  rating?: number;
  year?: string;
  ctaText?: string;
  ctaLink?: string;
  hero?: HeroSectionType;
  generalInfo?: GeneralInfo;
}

const HeroSection = ({
  title = "Skill Up, Stand Out with DigiBooster",
  subtitle = "Membantu masyarakat Indonesia mengoptimalkan digitalisasi untuk peningkatan kualitas hidup dan bisnis",
  description = "Layanan jasa digital terpercaya untuk mengembangkan bisnis Anda dengan solusi digital yang inovatif dan efektif",
  image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  rating = 4.5,
  year = "2023",
  ctaText = "Explore Services",
  ctaLink = "/services",
  hero,
  generalInfo
}: HeroSectionProps) => {
  // If hero prop is provided, use its values
  if (hero) {
    title = hero.title;
    subtitle = hero.subtitle;
    ctaText = hero.ctaText;
    ctaLink = hero.ctaLink;
  }

  const formattedRating = rating.toFixed(1);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="w-full relative overflow-hidden min-h-[90vh] mb-8 md:mb-16">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="h-full w-full"
        >
          <img src={image} alt="DigiBooster Hero" className="w-full h-full object-cover object-center" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
        
        {/* Animated overlay gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-sky-500/10 filter blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 rounded-full bg-sky-500/10 filter blur-3xl"></div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center py-20">
        <div className="max-w-3xl">
          <motion.div
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-sky-500/80 rounded-full">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
              {subtitle}
            </span>
          </motion.div>
          
          <motion.h1
            custom={2}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            {title}
          </motion.h1>
          
          <motion.div
            custom={3}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 mb-4 flex-wrap"
          >
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  custom={i + 4}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-500" : "text-gray-400"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
              <span className="ml-2 text-white">{formattedRating}</span>
            </div>
            
            <span className="text-gray-400">{year}</span>
            
            <span className="px-2 py-1 text-xs rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300">
              Premium
            </span>
          </motion.div>
          
          <motion.p
            custom={4}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-gray-300 mb-8 max-w-2xl text-lg"
          >
            {description}
          </motion.p>
          
          <motion.div
            custom={5}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <Link to={ctaLink}>
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 rounded-full text-white group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {ctaText}
              </Button>
            </Link>
            
            <Link to="/about">
              <Button size="lg" variant="outline" className="rounded-full border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500 group">
                Learn More
                <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
