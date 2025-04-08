
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay = 0) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.6,
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };
};

export const staggerChildren = (delayChildren = 0.1) => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delayChildren
      }
    }
  };
};

export const zoomIn = (delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        duration: 0.5,
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };
};

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', delay = 0) => {
  return {
    hidden: {
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      opacity: 0
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        delay: delay,
        duration: 0.8
      }
    },
    exit: {
      y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        duration: 0.6
      }
    }
  };
};
