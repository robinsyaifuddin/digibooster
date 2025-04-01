
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Star, Users, Layers, Target } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-cyber-accent" />,
      title: "Digital Services",
      description: "Professional web development, design & marketing solutions for businesses of all sizes.",
      delay: 0
    },
    {
      icon: <Zap className="h-8 w-8 text-cyber-accent" />,
      title: "Rapid Skill Development",
      description: "Accelerated learning programs for mastering high-demand digital skills.",
      delay: 0.1
    },
    {
      icon: <Star className="h-8 w-8 text-cyber-accent" />,
      title: "Expert Mentorship",
      description: "Guidance from industry professionals with proven track records.",
      delay: 0.2
    },
    {
      icon: <Users className="h-8 w-8 text-cyber-accent" />,
      title: "Community Learning",
      description: "Collaborative environment to network and grow with like-minded individuals.",
      delay: 0.3
    },
    {
      icon: <Layers className="h-8 w-8 text-cyber-accent" />,
      title: "Comprehensive Programs",
      description: "Structured courses covering everything from basics to advanced techniques.",
      delay: 0.4
    },
    {
      icon: <Target className="h-8 w-8 text-cyber-accent" />,
      title: "Results-Oriented",
      description: "Focus on practical skills and measurable outcomes for real-world success.",
      delay: 0.5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-20 bg-cyber-gradient relative">
      <div className="absolute inset-0 cyber-grid-bg opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 cyber-heading">
            Our Key Features
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            DigiBooster provides comprehensive solutions to accelerate your digital journey
            through our unique combination of education and application.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              className="cyber-card p-8 backdrop-blur-sm relative group"
            >
              <div className="bg-cyber-darker/70 rounded-lg p-4 inline-block mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyber-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.description}
              </p>
              
              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-1 bg-cyber-accent transform rotate-45 origin-top-right"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-cyber-primary"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
