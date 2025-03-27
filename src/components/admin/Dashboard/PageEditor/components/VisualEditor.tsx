
import React, { useRef } from 'react';
import { useEditor } from '../EditorContext';

interface VisualEditorProps {
  htmlContent: string;
  width: string;
  onEditorActivation: () => void;
}

const VisualEditor = ({ htmlContent, width, onEditorActivation }: VisualEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    draggedElement, 
    setDraggedElement, 
    addElement 
  } = useEditor();

  // Handle drag over to allow dropping
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // Show visual indication that drop is allowed
    if (containerRef.current) {
      containerRef.current.classList.add('bg-blue-50');
    }
  };

  // Remove highlight when drag leaves
  const handleDragLeave = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove('bg-blue-50');
    }
  };

  // Handle drop to add new element
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Remove highlight
    if (containerRef.current) {
      containerRef.current.classList.remove('bg-blue-50');
    }

    if (draggedElement) {
      console.log('Dropped element:', draggedElement);
      
      // Add the dragged element to the editor
      addElement(draggedElement);
      
      // Create HTML representation
      let newElementHtml = '';
      switch (draggedElement.type) {
        case 'heading':
          newElementHtml = `<h2 style="font-size: 24px; font-weight: bold; margin-bottom: 1rem;">${draggedElement.content}</h2>`;
          break;
        case 'paragraph':
          newElementHtml = `<p style="font-size: 16px; line-height: 1.5; margin-bottom: 1rem;">${draggedElement.content}</p>`;
          break;
        case 'button':
          newElementHtml = `<button style="background-color: #2563eb; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; border: none; cursor: pointer;">${draggedElement.content}</button>`;
          break;
        case 'image':
          newElementHtml = `<img src="${draggedElement.attributes.src}" alt="${draggedElement.attributes.alt}" style="width: 100%; height: auto; margin-bottom: 1rem;" />`;
          break;
        case 'container':
          newElementHtml = `<div style="display: flex; flex-direction: column; padding: 1rem; background-color: #f9fafb; border-radius: 0.5rem; margin-bottom: 1rem;"></div>`;
          break;
        case 'row':
          newElementHtml = `<div style="display: flex; flex-direction: row; gap: 1rem; margin-bottom: 1rem;"></div>`;
          break;
        case 'column':
          newElementHtml = `<div style="flex: 1; padding: 1rem; background-color: #f3f4f6; border-radius: 0.25rem;"></div>`;
          break;
        default:
          newElementHtml = `<div>${draggedElement.content}</div>`;
      }
      
      // Reset draggedElement
      setDraggedElement(null);
      
      // Return the new element HTML so PagePreview can handle the content update
      return newElementHtml;
    }
    
    return null;
  };

  return (
    <div
      ref={containerRef}
      className="bg-white border border-gray-300 overflow-auto shadow-sm transition-all"
      style={{ width, maxWidth: '100%', height: '100%' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className="min-h-full p-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onClick={onEditorActivation}
      />
    </div>
  );
};

export default VisualEditor;
