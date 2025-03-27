
import { useState } from "react";

export const usePublishProgress = () => {
  const [publishProgress, setPublishProgress] = useState(0);
  
  const simulateProgressStep = (start: number, end: number, duration: number) => {
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = (end - start) / steps;
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setPublishProgress(current);
    }, interval);
    
    return new Promise<void>(resolve => {
      setTimeout(() => {
        clearInterval(timer);
        setPublishProgress(end);
        resolve();
      }, duration);
    });
  };
  
  const resetProgress = () => {
    setPublishProgress(0);
  };
  
  return {
    publishProgress,
    simulateProgressStep,
    resetProgress
  };
};
