
import React from 'react';
import { TestimonialItem } from '@/types/websiteTypes';

interface TestimonialsSectionProps {
  companyName: string;
  testimonials: TestimonialItem[];
}

const TestimonialsSection = ({ companyName, testimonials }: TestimonialsSectionProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-animation">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cerita sukses dari para pengguna {companyName} yang telah meningkatkan kemampuan digital mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="glass-card rounded-lg shadow-lg p-6 scroll-animation"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
