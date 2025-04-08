
export const initScrollEffects = () => {
  const handleScroll = () => {
    // Reveal animations when scrolled into view
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
    
    // Generic animation triggers based on viewport
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 100;
      
      if (elementTop < windowHeight - elementVisible) {
        const animationType = element.getAttribute('data-animate');
        if (animationType) {
          element.classList.add(`animate-${animationType}`);
        }
      }
    });
    
    // Parallax effects
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
      const scrollY = window.scrollY;
      const speed = element.getAttribute('data-speed') || '0.1';
      
      if (element instanceof HTMLElement) {
        element.style.transform = `translateY(${scrollY * parseFloat(speed)}px)`;
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
  
  return () => window.removeEventListener('scroll', handleScroll);
};

// Initialize intersection observer for elements
export const initIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation classes based on data attributes
        const el = entry.target;
        const animType = el.getAttribute('data-anim');
        const delay = el.getAttribute('data-delay');
        
        if (animType) {
          el.classList.add(`animate-${animType}`);
        }
        
        if (delay && el instanceof HTMLElement) {
          el.style.animationDelay = `${delay}ms`;
        }
        
        el.classList.add('in-view');
      }
    });
  }, options);
  
  // Observe all elements with animation attributes
  document.querySelectorAll('[data-anim]').forEach(element => {
    observer.observe(element);
  });
  
  return observer;
};

// Helper function to apply sequential animations to children
export const applySequentialAnimations = (selector: string, animationClass: string, delayBetween = 100) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((parent) => {
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      if (child instanceof HTMLElement) {
        child.style.opacity = '0';
        child.style.animationDelay = `${index * delayBetween}ms`;
        child.classList.add(animationClass);
      }
    });
  });
};
