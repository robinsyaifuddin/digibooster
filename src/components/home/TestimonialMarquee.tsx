
import React, { ReactNode, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TestimonialItem } from '@/types/websiteTypes';
import { Star } from 'lucide-react';

interface TestimonialMarqueeProps {
  testimonials: TestimonialItem[];
  title: ReactNode;
  description?: string;
  speed?: 'slow' | 'medium' | 'fast';
  bgColor?: string;
  direction?: 'left' | 'right';
}

const TestimonialMarquee = ({ 
  testimonials, 
  title, 
  description, 
  speed = 'medium',
  bgColor = 'bg-dark-300',
  direction = 'left'
}: TestimonialMarqueeProps) => {
  // Speed mapping
  const speedMap = {
    slow: direction === 'left' ? 'animate-marquee-slow-left' : 'animate-marquee-slow-right',
    medium: direction === 'left' ? 'animate-marquee-medium-left' : 'animate-marquee-medium-right',
    fast: direction === 'left' ? 'animate-marquee-fast-left' : 'animate-marquee-fast-right'
  };
  
  const animationClass = speedMap[speed];
  
  // Duplicate testimonials for infinite scroll effect - using useMemo to avoid unnecessary recalculations
  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], [testimonials]);
  
  // Only render if we have testimonials
  if (testimonials.length === 0) return null;
  
  return (
    <section className={cn("py-12 md:py-16 overflow-hidden", bgColor)}>
      <div className="container mx-auto px-4 mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{title}</h3>
        {description && (
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className={cn("flex space-x-6 md:space-x-8 whitespace-nowrap", animationClass)}>
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card 
              key={`${testimonial.id}-${index}`} 
              className="inline-flex flex-col min-w-[260px] md:min-w-[300px] bg-gradient-to-b from-gray-900/40 to-black/80 border border-gray-800 p-4 md:p-5 rounded-xl shadow-md"
            >
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-4 text-xs md:text-sm line-clamp-3">"{testimonial.content}"</p>
              
              <div className="flex items-center mt-auto">
                {testimonial.image && (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 border border-neon-cyan/30"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-white text-xs md:text-sm">{testimonial.name}</h4>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;
