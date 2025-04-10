
import React from 'react';
import { TestimonialItem } from '@/types/websiteTypes';
import { Quote, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface TestimonialsSectionProps {
  companyName: string;
  testimonials: TestimonialItem[];
}

const TestimonialsSection = ({ companyName, testimonials }: TestimonialsSectionProps) => {
  const { theme } = useTheme();
  // Duplicate testimonials for continuous flow
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className={cn(
      "py-16 md:py-24 overflow-hidden",
      theme === 'light' 
        ? "bg-gradient-to-b from-digicyan-900 to-digicyan-800 text-white" 
        : "bg-gradient-to-b from-dark-300 to-dark-400 text-white"
    )}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14 scroll-animation">
          <span className="inline-block py-1 px-3 text-xs font-medium text-white bg-white/10 rounded-full mb-3">TESTIMONI</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Apa Kata Mereka?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Cerita sukses dari para pengguna {companyName} yang telah meningkatkan kemampuan digital mereka.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {extendedTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className={cn(
                    "rounded-xl p-6 h-full shadow-lg border",
                    theme === 'light'
                      ? "bg-gradient-to-br from-digicyan-700 to-digicyan-900 border-digicyan-600/30"
                      : "bg-gradient-to-br from-dark-200 to-dark-300 border-neon-cyan/20"
                  )}>
                    <Quote className={cn(
                      "w-8 h-8 mb-3 opacity-50",
                      theme === 'light' ? "text-digicyan-300" : "text-neon-cyan/70"
                    )} />
                    
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-gray-300 mb-6 text-sm md:text-base line-clamp-4">{testimonial.content}</p>
                    
                    <div className="flex items-center mt-auto">
                      {testimonial.image && (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className={cn(
                            "w-10 h-10 rounded-full mr-3 shadow-sm border",
                            theme === 'light' ? "border-digicyan-400/30" : "border-neon-cyan/30"
                          )}
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-white text-sm md:text-base">{testimonial.name}</h4>
                        <p className="text-gray-400 text-xs md:text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
