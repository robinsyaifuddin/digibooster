
import { useEffect, useRef } from 'react';

/**
 * Hook to make elements selectable for editing in the Lovable editor
 * @param selector CSS selector for elements to make editable (defaults to '*')
 * @param editorOnly Only apply in the Lovable editor environment
 */
export const useLovableEditable = (
  selector: string = '*',
  editorOnly: boolean = true
) => {
  const containerRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    // Only apply in Lovable editor environment if editorOnly is true
    const isEditor = 
      window.location.hostname.includes('lovable.dev') || 
      window.location.hostname.includes('localhost') || 
      window.location.hostname.includes('gpteng.co');
    
    if (editorOnly && !isEditor) return;
    
    // Function to add selectable behavior to elements
    const makeElementsSelectable = (root: HTMLElement) => {
      const elements = root.querySelectorAll(selector);
      
      elements.forEach(element => {
        // Skip if already processed or is a container with selectable children
        if (element.classList.contains('lovable-selectable')) return;
        
        // Add visual indicator class
        element.classList.add('lovable-selectable');
      });
    };
    
    // Process initial elements
    if (containerRef.current) {
      makeElementsSelectable(containerRef.current);
    }
    
    // Initialize global window properties if needed
    if (typeof window !== 'undefined' && isEditor) {
      // @ts-ignore - Adding custom properties to window
      window.lovableInitialized = true;
    }
    
    // Set up mutation observer for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && containerRef.current) {
          makeElementsSelectable(containerRef.current);
        }
      });
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, [selector, editorOnly]);
  
  return { ref: containerRef };
};

export default useLovableEditable;
