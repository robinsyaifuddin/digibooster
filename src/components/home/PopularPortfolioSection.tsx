
import React, { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Heart, Eye, CornerDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import type { PortfolioItemType } from '@/types/portfolioTypes';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface PopularPortfolioSectionProps {
  title?: string;
  portfolioItems: PortfolioItemType[];
}

const PopularPortfolioSection = ({ 
  portfolioItems 
}: PopularPortfolioSectionProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  // Only show the first 3 portfolio items
  const visibleItems = portfolioItems.slice(0, 3);
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-400 to-dark-300 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-dark-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-dark-300 to-transparent"></div>
      <div className="absolute top-40 -left-32 w-64 h-64 rounded-full bg-primary/5 filter blur-3xl"></div>
      <div className="absolute bottom-40 -right-32 w-64 h-64 rounded-full bg-primary/5 filter blur-3xl"></div>
      
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3"
          >
            SHOWCASE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            {t('popular-portfolio')}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary/80 to-primary/30 mt-4 rounded-full"
          />
        </div>
        
        <div className="mt-12 relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {visibleItems.map((item, index) => (
                <CarouselItem 
                  key={item.id}
                  className={cn(
                    "pl-2 md:pl-4",
                    isMobile ? "basis-full sm:basis-3/4" : "basis-full md:basis-1/2 lg:basis-1/3",
                    "transition-all duration-300 py-10"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <Link 
                      to={`/portofolio/${item.id}`}
                      className="block h-full"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Card className="h-[400px] md:h-[450px] border-0 bg-dark-400/50 rounded-xl overflow-hidden relative group cyberpunk-card">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        
                        <div className="relative h-full">
                          {/* Image container */}
                          <AspectRatio ratio={3/4} className="h-full">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                          </AspectRatio>
                          
                          {/* Top badges */}
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-dark-300/80 backdrop-blur-sm text-primary border border-primary/20 shadow-md">
                              {item.category}
                            </span>
                            <div className="flex space-x-2">
                              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-300/80 backdrop-blur-sm shadow-md">
                                <Eye className="w-4 h-4 text-white/70" />
                              </span>
                              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-300/80 backdrop-blur-sm shadow-md">
                                <Heart className="w-4 h-4 text-white/70 group-hover:text-primary transition-colors" />
                              </span>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-20 bg-black/70 backdrop-blur-sm shadow-lg">
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors mb-2 drop-shadow-lg">
                              {item.title}
                            </h3>
                            
                            <p className="text-sm text-white/70 mb-3 drop-shadow-lg">
                              {t('by')} <span className="text-primary/80">{item.client}</span>
                            </p>
                            
                            <div className="max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500 ease-in-out">
                              <p className="text-sm text-white/80 mb-4 line-clamp-3 drop-shadow-lg">
                                {item.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.services.map((service, i) => (
                                  <span 
                                    key={i} 
                                    className="px-2 py-1 rounded text-xs bg-dark-300/80 text-white/80 border border-primary/10 shadow-md"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="group/btn w-full border-primary/40 hover:border-primary hover:bg-primary/10"
                              >
                                <span>{t('view-details')}</span> 
                                <CornerDownRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute top-0 left-0 w-4 h-1 bg-primary/50 rounded-tr-md rounded-bl-md"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-1 bg-primary/50 rounded-tl-md rounded-br-md"></div>
                          <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-gradient-to-r from-primary/80 via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-dark-300/80 backdrop-blur-sm text-white border-primary/30 hover:bg-primary/10 hover:text-white" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-dark-300/80 backdrop-blur-sm text-white border-primary/30 hover:bg-primary/10 hover:text-white" />
          </Carousel>
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/portofolio">
            <Button 
              variant="outline" 
              className="border-primary/40 hover:border-primary hover:bg-primary/10 cyberpunk-glow"
            >
              {t('view-all-portfolio')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularPortfolioSection;
