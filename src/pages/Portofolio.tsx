
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioItems, portfolioFilters } from '@/data/portfolioData';
import { PortfolioItemType } from '@/types/portfolioTypes';
import { Link } from 'react-router-dom';

const Portofolio = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<PortfolioItemType[]>(portfolioItems);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

  // Featured portfolio item
  const featuredItem = portfolioItems[0];

  return (
    <div className="pt-16 bg-black min-h-screen">
      {/* Hero Section - Similar to movie hero in reference */}
      <div className="relative min-h-[70vh] w-full overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredItem.images[0]} 
            alt={featuredItem.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
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
                PORTOFOLIO TERBARU
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            >
              {featuredItem.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? "text-yellow-500" : "text-gray-400"}`}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
                <span className="ml-2 text-white">4.8</span>
              </div>
              
              <span className="text-gray-400">{featuredItem.year}</span>
              
              <span className="px-2 py-1 text-xs rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300">
                {featuredItem.category}
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-gray-300 mb-8 max-w-2xl"
            >
              {featuredItem.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Link to={`/portofolio/${featuredItem.id}`}>
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600 rounded-full text-white">
                  <Play className="mr-2 h-5 w-5" />
                  Lihat Detail
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="rounded-full border-gray-600 text-white hover:bg-sky-500/20 hover:border-sky-500">
                <Info className="mr-2 h-5 w-5" />
                Info Proyek
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Portfolio Screenshots - like in the reference */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-4 z-10">
          {featuredItem.images.slice(0, 4).map((image, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="w-32 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-sky-500 transition-all cursor-pointer"
            >
              <img 
                src={image} 
                alt={`${featuredItem.title} preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Portfolio Grid - Similar to movies grid in reference */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Portfolio Proyek</h2>
          
          <div className="flex flex-wrap gap-2">
            {portfolioFilters.map((filter, index) => (
              <Button 
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"} 
                size="sm"
                className={activeFilter === filter ? 
                  "bg-sky-500 hover:bg-sky-600" : 
                  "border-gray-700 text-gray-300 hover:bg-sky-500/20"}
                onClick={() => handleFilterChange(filter)}
              >
                {filter === "All" ? "Semua" : filter}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Portfolio Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl overflow-hidden group relative border border-gray-800 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/10 transition-all"
            >
              {/* Item Image */}
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                
                <Link to={`/portofolio/${item.id}`} className="absolute inset-0">
                  <div className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3 h-3 text-white" fill="currentColor" />
                  </div>
                </Link>
                
                {/* Rating */}
                <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                  <span className="text-xs font-medium text-white">4.{index + 5}</span>
                </div>
                
                {/* Year */}
                <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-300">
                  {item.year}
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-sky-500 text-white rounded-md">
                  {item.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <Link to={`/portofolio/${item.id}`}>
                  <h3 className="font-bold text-white truncate group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="inline-block px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="inline-block px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          {[1, 2, 3, '...', 5].map((page, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="icon"
              className={index === 0 ? "bg-sky-500 hover:bg-sky-600 w-8 h-8" : "border-gray-700 text-gray-300 w-8 h-8"}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="border-gray-700 w-8 h-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Portofolio;
