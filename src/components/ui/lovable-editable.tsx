
import React, { useEffect, useRef } from 'react';

interface LovableEditableProps {
  children: React.ReactNode;
  editorOnly?: boolean;
  selector?: string;
}

/**
 * A wrapper component that makes its children selectable for editing in the Lovable editor.
 * This only applies the interactive editing features when running in the Lovable editor.
 */
const LovableEditable: React.FC<LovableEditableProps> = ({ 
  children,
  editorOnly = true,
  selector = '*'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only apply in Lovable editor environment if editorOnly is true
    const isEditor = 
      window.location.hostname.includes('lovable.dev') || 
      window.location.hostname.includes('localhost') || 
      window.location.hostname.includes('gpteng.co');
    
    if (editorOnly && !isEditor) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Add visual indication on hover for selectability
    const addSelectableClasses = () => {
      // Find all elements within the container that match the selector
      const elements = container.querySelectorAll(selector);
      
      elements.forEach(element => {
        element.classList.add('lovable-selectable');
      });
    };
    
    // Initialize
    addSelectableClasses();
    
    // Setup mutation observer to handle dynamically added elements
    const observer = new MutationObserver(() => {
      addSelectableClasses();
    });
    
    observer.observe(container, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
    };
  }, [editorOnly, selector]);
  
  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default LovableEditable;
