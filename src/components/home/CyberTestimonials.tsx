
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Lania",
    role: "Owner zenboard.id",
    content: "DigiBooster recommended banget, menurut saya itu jasa paling clex sih. Dijamin pek rapi hasilnya memuaskan!!!!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Alvin Rahman",
    role: "Owner sixtwogkarta.com",
    content: "Pelayananya cepat, hasil bagusss, udah bikin 5 bulanan yang lalu terus minta tolong ada yg di edit masih bisa dibanggiin!!!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "John Smith",
    role: "Marketing rentalspace.web.id",
    content: "DigiBooster sangat membantu dlm membuat website, kerja dengan cepat, dan hasil website memuaskan banget!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const CyberTestimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 60 }
    }
  };

  return (
    <section className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyber-primary/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyber-accent/5 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 cyber-heading">
            What Our Clients Say
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Hear from those who have experienced the DigiBooster difference and achieved success with our services.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="cyber-card overflow-hidden relative group"
            >
              {/* Testimonial content */}
              <div className="p-8">
                <Quote className="h-8 w-8 text-cyber-accent/30 mb-4" />
                <p className="text-white/80 mb-6 relative">
                  "{testimonial.content}"
                </p>
                
                {/* Testimonial author */}
                <div className="flex items-center">
                  <div className="mr-4 relative">
                    <div className="w-12 h-12 rounded overflow-hidden border-2 border-cyber-primary">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyber-accent"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-cyber-primary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary to-cyber-accent"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8">
                <div className="absolute bottom-0 right-0 w-16 h-1 bg-cyber-accent transform -rotate-45 origin-bottom-right"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CyberTestimonials;
