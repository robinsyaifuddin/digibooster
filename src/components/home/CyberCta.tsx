
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CyberCta = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-cyber-gradient z-0"></div>
      <div className="absolute inset-0 cyber-grid-bg opacity-30 z-10"></div>
      
      {/* Glowing elements */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyber-accent/10 blur-3xl rounded-full z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyber-primary/10 blur-3xl rounded-full z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-white">Ready to </span>
            <span className="text-gradient-cyber animate-cyber-glitch">Power Up</span>
            <span className="text-white"> Your Digital Skills?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/80 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join DigiBooster today and transform your digital journey. Our expert-led programs 
            will equip you with the skills and knowledge needed to thrive in today's digital landscape.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-block"
          >
            <Button asChild className="cyber-btn text-lg px-10 py-6 group relative">
              <Link to="/register">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            No commitments. Start your digital transformation journey now.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-primary"></div>
    </section>
  );
};

export default CyberCta;
