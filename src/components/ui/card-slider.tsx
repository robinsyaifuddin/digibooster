
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CardSliderProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  slidesPerView?: number;
}

const CardSlider = ({
  title,
  description,
  children,
  className,
  cardClassName,
  slidesPerView = 3,
}: CardSliderProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const slideContainerRef = React.useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);
  const isMobile = useIsMobile();
  
  // Adjust slidesPerView based on screen size
  const adjustedSlidesPerView = isMobile ? 1 : slidesPerView;
  
  const totalSlides = Math.max(0, childrenArray.length - (adjustedSlidesPerView - 1));

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(prev => prev + 1);
      setActiveSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setActiveSlide(prev => prev - 1);
    }
  };

  React.useEffect(() => {
    if (slideContainerRef.current) {
      const slideWidth = slideContainerRef.current.offsetWidth / adjustedSlidesPerView;
      slideContainerRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, adjustedSlidesPerView]);

  // Responsive slidesPerView
  React.useEffect(() => {
    const handleResize = () => {
      setActiveSlide(currentIndex);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  return (
    <div className={cn("w-full", className)}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">{title}</h2>
            {description && <p className="text-gray-400 max-w-2xl text-sm md:text-base">{description}</p>}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handlePrev} 
              disabled={currentIndex === 0} 
              size="icon" 
              variant="outline" 
              className="rounded-full border-gray-700 hover:bg-gray-800 w-8 h-8"
            >
              <ChevronLeft size={isMobile ? 14 : 18} />
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={currentIndex >= totalSlides - 1} 
              size="icon" 
              variant="outline" 
              className="rounded-full border-gray-700 hover:bg-gray-800 w-8 h-8"
            >
              <ChevronRight size={isMobile ? 14 : 18} />
            </Button>
          </div>
        </div>
        
        <div 
          ref={slideContainerRef}
          className="overflow-x-hidden relative"
        >
          <div 
            className="flex transition-transform duration-300 gap-4"
            style={{ 
              transform: `translateX(0)`,
              width: `calc(${100 / adjustedSlidesPerView * childrenArray.length}%)` 
            }}
          >
            {React.Children.map(children, (child, index) => (
              <div 
                className={cn("flex-shrink-0", cardClassName)}
                style={{ width: `calc(${100 / adjustedSlidesPerView}% - ${16 * (adjustedSlidesPerView - 1) / adjustedSlidesPerView}px)` }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-1 mt-4 md:mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index.toString()}
              onClick={() => {
                setCurrentIndex(index);
                setActiveSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                activeSlide === index ? "bg-sky-400 w-3 md:w-4" : "bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
