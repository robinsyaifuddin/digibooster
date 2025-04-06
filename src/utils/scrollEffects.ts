
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
    
    // Parallax effects
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
      const scrollY = window.scrollY;
      const speed = element.getAttribute('data-speed') || '0.1';
      
      if (element instanceof HTMLElement) {
        element.style.transform = `translateY(${scrollY * parseFloat(speed)}px)`;
      }
    });
    
    // Sticky header effect
    const header = document.querySelector('header');
    if (header && window.scrollY > 100) {
      header.classList.add('sticky-active');
    } else if (header) {
      header.classList.remove('sticky-active');
    }
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
        entry.target.classList.add('in-view');
      }
    });
  }, options);
  
  // Observe all elements with the 'observe-element' class
  document.querySelectorAll('.observe-element').forEach(element => {
    observer.observe(element);
  });
  
  return observer;
};
