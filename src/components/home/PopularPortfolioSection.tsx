
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
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import type { PortfolioItemType } from '@/types/portfolioTypes';
import { Link } from 'react-router-dom';

interface PopularPortfolioSectionProps {
  title?: string;
  portfolioItems: PortfolioItemType[];
}

const PopularPortfolioSection = ({ 
  title = "Portfolio Terpopuler Minggu Ini", 
  portfolioItems 
}: PopularPortfolioSectionProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  const visibleItems = portfolioItems.slice(0, 5);
  
  return (
    <section className="py-16 relative bg-gradient-to-b from-dark-400/50 to-dark-300">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-white">
          {title}
        </h2>
        
        <div className="mt-8 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {visibleItems.map((item, index) => {
                const isCenter = index === 2;
                
                return (
                  <CarouselItem 
                    key={item.id}
                    className={cn(
                      "pl-2 md:pl-4",
                      isMobile ? "basis-4/5" : isCenter ? "basis-1/3" : "basis-1/4",
                      "transition-all duration-300"
                    )}
                  >
                    <Link 
                      to={`/portofolio/${item.id}`}
                      className="block h-full"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div
                        className={cn(
                          "h-full rounded-lg overflow-hidden transition-all duration-500",
                          hoveredItem === item.id ? "scale-[1.03] shadow-lg shadow-cyan-500/20" : "",
                          isCenter && !isMobile ? "scale-110 z-10" : ""
                        )}
                      >
                        <Card className="h-[28rem] border-0 bg-transparent relative cyberpunk-card overflow-hidden group">
                          <div className="relative h-full">
                            <AspectRatio ratio={3/4} className="bg-gradient-to-tr from-purple-900/40 to-cyan-900/40 h-full">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="object-cover w-full h-full rounded-t-lg group-hover:scale-105 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/30 to-transparent" />
                            </AspectRatio>
                            
                            <div className="absolute top-2 right-2 bg-dark-300/80 backdrop-blur-sm p-2 rounded-full">
                              <Heart className="w-5 h-5 text-white hover:text-red-500 transition-colors cursor-pointer" />
                            </div>

                            <div className="absolute left-0 bottom-0 w-full p-4 text-white">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="text-xs text-cyan-400 uppercase tracking-wider">{item.category}</span>
                                <div className="bg-cyan-500/30 backdrop-blur-sm py-1 px-2 rounded text-xs font-medium text-white flex items-center">
                                  <span>{Math.floor(Math.random() * 50) + 10}k</span>
                                </div>
                              </div>
                              <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-300 opacity-80">by {item.client}</p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-dark-300/80 backdrop-blur-sm text-white border-cyan-500/30 hover:bg-cyan-900/50 hover:text-white" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-dark-300/80 backdrop-blur-sm text-white border-cyan-500/30 hover:bg-cyan-900/50 hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PopularPortfolioSection;
