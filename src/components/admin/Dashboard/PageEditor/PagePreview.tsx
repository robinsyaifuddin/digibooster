
import React, { useRef, useEffect, useState } from 'react';
import { useEditor } from './EditorContext';
import { useToast } from '@/hooks/use-toast';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';

interface PagePreviewProps {
  content: string;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  onContentUpdate: (content: string) => void;
}

const PagePreview = ({ content, viewMode, onContentUpdate }: PagePreviewProps) => {
  const { toast } = useToast();
  const { 
    draggedElement, 
    setDraggedElement, 
    setSelectedElement, 
    selectedElement,
    elements,
    addElement
  } = useEditor();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState('100%');
  const [editorActive, setEditorActive] = useState(false);
  const [isHtmlView, setIsHtmlView] = useState(false);
  const [htmlContent, setHtmlContent] = useState(content);
  const websiteData = useWebsiteDataStore();

  // Set width based on viewMode
  useEffect(() => {
    switch (viewMode) {
      case 'desktop':
        setWidth('100%');
        break;
      case 'tablet':
        setWidth('768px');
        break;
      case 'mobile':
        setWidth('375px');
        break;
      default:
        setWidth('100%');
    }
  }, [viewMode]);

  // Update HTML content when content prop changes
  useEffect(() => {
    setHtmlContent(content);
  }, [content]);

  // Handle HTML content change
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
  };

  // Save HTML content when switch back from HTML view
  const toggleHtmlView = () => {
    if (isHtmlView) {
      // If switching from HTML view to visual, save the changes
      onContentUpdate(htmlContent);
    }
    setIsHtmlView(!isHtmlView);
  };

  // Fungsi untuk menyinkronkan perubahan dengan tampilan sebenarnya
  const syncWithLiveView = () => {
    try {
      // Dispatch event untuk memberi tahu bahwa konten sudah diperbarui
      const contentUpdateEvent = new CustomEvent('pageContentUpdated', { 
        detail: {
          content: htmlContent,
          isPermanent: false
        }
      });
      
      window.dispatchEvent(contentUpdateEvent);
      
      toast({
        title: "Pratinjau diperbarui",
        description: "Perubahan telah disinkronkan dengan tampilan pratinjau website.",
      });
    } catch (error) {
      console.error('Error syncing with live view:', error);
      toast({
        variant: "destructive",
        title: "Gagal menyinkronkan",
        description: "Terjadi kesalahan saat menyinkronkan dengan tampilan langsung.",
      });
    }
  };

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
      
      // Update the HTML
      const updatedContent = htmlContent + newElementHtml;
      setHtmlContent(updatedContent);
      onContentUpdate(updatedContent);
      
      // Reset draggedElement
      setDraggedElement(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-200 overflow-auto">
      <div className="p-2 bg-white border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Preview</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={syncWithLiveView}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
          >
            Sinkronkan Pratinjau
          </button>
          <button
            onClick={toggleHtmlView}
            className={`px-2 py-1 text-xs rounded ${isHtmlView ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {isHtmlView ? 'Visual Editor' : 'HTML Editor'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        {isHtmlView ? (
          // HTML Editor View
          <div className="w-full h-full">
            <textarea
              className="w-full h-full p-4 border border-gray-300 font-mono text-sm"
              value={htmlContent}
              onChange={handleHtmlChange}
            />
          </div>
        ) : (
          // Visual Editor View
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
              onClick={() => setEditorActive(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PagePreview;
