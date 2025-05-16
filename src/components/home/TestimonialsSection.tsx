
import React from 'react';
import { TestimonialItem } from '@/types/websiteTypes';
import { Quote, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import TestimonialMarquee from './TestimonialMarquee';

interface TestimonialsSectionProps {
  companyName: string;
  testimonials: TestimonialItem[];
}

const TestimonialsSection = ({ companyName, testimonials }: TestimonialsSectionProps) => {
  // Duplicate testimonials for continuous flow
  const extendedTestimonials = [...testimonials, ...testimonials];

  // Create the title with DigiBooster specific text
  const testimonialTitle = (
    <>
      <span className="text-white">Apa Kata </span>
      <span className="text-neon-cyan">Klien </span>
      <span className="text-white">DigiBooster?</span>
    </>
  );

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-gradient-to-b from-dark-300 to-dark-400 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14 scroll-animation">
          <span className="inline-block py-1 px-3 text-xs font-medium text-white bg-white/10 rounded-full mb-3">TESTIMONI</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Apa Kata Mereka?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Cerita sukses dari para pengguna {companyName} yang telah meningkatkan kemampuan digital mereka.
          </p>
        </div>

        {/* Use the Testimonial Marquee on larger screens */}
        <div className="hidden md:block">
          <TestimonialMarquee 
            testimonials={testimonials} 
            title={testimonialTitle}
            description="Pengalaman nyata dari klien yang telah bekerjasama dengan DigiBooster Indonesia"
            speed="medium"
            bgColor="transparent"
          />
        </div>

        {/* Use the original carousel on mobile */}
        <div className="block md:hidden relative">
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
                  <div className="rounded-xl p-6 h-full shadow-lg border bg-gradient-to-br from-dark-200 to-dark-300 border-neon-cyan/20">
                    <Quote className="w-8 h-8 mb-3 opacity-50 text-neon-cyan/70" />
                    
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
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-3 shadow-sm border border-neon-cyan/30"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-white text-xs md:text-sm">{testimonial.name}</h4>
                        <p className="text-gray-400 text-xs">{testimonial.role}</p>
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
