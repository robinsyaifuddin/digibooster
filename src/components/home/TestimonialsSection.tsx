
import React from 'react';
import { TestimonialItem } from '@/types/websiteTypes';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  companyName: string;
  testimonials: TestimonialItem[];
}

const TestimonialsSection = ({ companyName, testimonials }: TestimonialsSectionProps) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 scroll-animation">
          <span className="inline-block py-1 px-3 text-xs font-medium text-diginavy bg-diginavy/10 rounded-full mb-3">TESTIMONI</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cerita sukses dari para pengguna {companyName} yang telah meningkatkan kemampuan digital mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all scroll-animation relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Quote className="text-gray-200 w-12 h-12 absolute -top-2 -left-2" />
              <div className="relative">
                <p className="text-gray-700 mb-6 italic">{testimonial.content}</p>
              
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
