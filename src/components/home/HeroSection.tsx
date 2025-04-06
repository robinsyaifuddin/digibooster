
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { WebsiteData } from '@/stores/websiteDataStore';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import { motion, useAnimation } from 'framer-motion';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  generalInfo?: WebsiteData['generalInfo'];
  hero?: WebsiteData['homeContent']['hero'];
}

const HeroSection = ({ title, subtitle, ctaText, ctaLink, generalInfo, hero }: HeroSectionProps) => {
  const websiteStore = useWebsiteDataStore();
  const controls = useAnimation();
  
  // Use passed props or fallback to the store data
  const storeGeneralInfo = generalInfo || websiteStore.generalInfo;
  const storeHero = hero || websiteStore.homeContent.hero;
  
  const displayTitle = title || storeHero.title;
  const displaySubtitle = subtitle || storeHero.subtitle;
  const displayCtaText = ctaText || storeHero.ctaText;
  const displayCtaLink = ctaLink || storeHero.ctaLink;

  useEffect(() => {
    controls.start({
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
  }, [controls]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  // Create chess piece component for the background
  const ChessPiece = ({ className }: { className: string }) => (
    <motion.div 
      className={`absolute opacity-20 ${className}`}
      animate={controls}
    >
      <img 
        src="/lovable-uploads/b9e99a39-1bea-4a66-a055-a70e8d5ac4ab.png" 
        alt="Chess piece" 
        className="w-full h-full object-contain" 
      />
    </motion.div>
  );

  // Cyberpunk grid background animation component
  const CyberGrid = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Horizontal lines animation */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={`h-line-${i}`}
            className="absolute h-[1px] bg-neon-cyan/20 w-full left-0"
            style={{ top: `${i * 10}%` }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scaleX: [1, 1.05, 1],
              boxShadow: [
                "0 0 2px rgba(0, 216, 232, 0.2)",
                "0 0 8px rgba(0, 216, 232, 0.6)",
                "0 0 2px rgba(0, 216, 232, 0.2)"
              ]
            }}
            transition={{ 
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      
      {/* Vertical lines animation */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={`v-line-${i}`}
            className="absolute w-[1px] bg-neon-blue/20 h-full top-0"
            style={{ left: `${i * 10}%` }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scaleY: [1, 1.05, 1],
              boxShadow: [
                "0 0 2px rgba(11, 188, 209, 0.2)",
                "0 0 8px rgba(11, 188, 209, 0.6)",
                "0 0 2px rgba(11, 188, 209, 0.2)"
              ]
            }}
            transition={{ 
              duration: 4 + i,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>
    </div>
  );

  // Data circuit animation
  const DataCircuit = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div 
          key={`data-point-${i}`}
          className="absolute h-1 w-1 rounded-full bg-neon-cyan"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            opacity: 0
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            boxShadow: [
              "0 0 0px rgba(0, 216, 232, 0)",
              "0 0 10px rgba(0, 216, 232, 0.8)",
              "0 0 0px rgba(0, 216, 232, 0)"
            ]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.6
          }}
        />
      ))}
      
      {/* Data flow lines */}
      {[...Array(5)].map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        
        return (
          <motion.div 
            key={`data-line-${i}`}
            className="absolute h-[2px] bg-gradient-to-r from-neon-cyan/0 via-neon-cyan to-neon-cyan/0"
            style={{ 
              top: `${startY}%`,
              left: `${startX}%`,
              width: `${Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))}%`,
              transform: `rotate(${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)}deg)`,
              transformOrigin: 'left center',
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scaleX: [0, 1, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              delay: i * 2
            }}
          />
        );
      })}
    </div>
  );

  return (
    <section className="relative bg-dark text-white overflow-hidden pt-20 pb-32">
      {/* Background elements */}
      <CyberGrid />
      <DataCircuit />
      
      {/* Background pattern */}
      <div className="absolute inset-0 chess-bg opacity-5"></div>
      
      {/* Cyan gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-300/50 to-dark/90"></div>
      
      {/* Large blurred circles for abstract background */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-neon-cyan rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-neon-blue rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
      
      {/* Chess pieces in background */}
      <ChessPiece className="right-[5%] top-[15%] w-40 md:w-64" />
      <ChessPiece className="left-[8%] bottom-[10%] w-40 md:w-56" />
      
      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-24">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.div className="mb-6 md:mb-8" variants={fadeIn}>
            <span className="inline-block px-4 py-1 rounded-full bg-dark-300/80 backdrop-blur-sm text-neon-cyan font-medium text-sm mb-3 border border-neon-cyan/30 neon-border">
              {storeGeneralInfo.description}
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={fadeIn}
          >
            <span className="block mb-2 text-white">
              {displayTitle.split('with')[0]}
            </span>
            <span className="neon-text bg-gradient-to-r from-neon-cyan to-neon-blue">
              with <span className="text-neon-cyan">DigiBooster</span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl"
            variants={fadeIn}
          >
            {displaySubtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeIn}
          >
            <Link to={displayCtaLink}>
              <Button size="lg" className="bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-cyan text-white border-none shadow-lg shadow-neon-cyan/20 group">
                {displayCtaText}
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-neon-cyan/40 bg-dark-300/50 backdrop-blur-sm text-white hover:bg-dark-300 hover:border-neon-cyan/80 group transition-all duration-300">
                Mulai Sekarang
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#0c1425" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,266.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
