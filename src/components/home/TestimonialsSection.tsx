
import React from 'react';
import { TestimonialItem } from '@/types/websiteTypes';
import { Quote, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface TestimonialsSectionProps {
  companyName: string;
  testimonials: TestimonialItem[];
}

const TestimonialsSection = ({ companyName, testimonials }: TestimonialsSectionProps) => {
  // Duplicate testimonials for continuous flow
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-digiblue-900 to-digiblue-800 text-white overflow-hidden">
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
                  <div className="bg-gradient-to-br from-digiblue-700 to-digiblue-900 rounded-xl p-6 border border-digiblue-600/30 h-full shadow-lg">
                    <Quote className="text-digiblue-300 w-8 h-8 mb-3 opacity-50" />
                    
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
                          className="w-10 h-10 rounded-full mr-3 border border-digiblue-400/30 shadow-sm"
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
