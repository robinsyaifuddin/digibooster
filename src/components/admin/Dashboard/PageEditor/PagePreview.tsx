
import React, { useEffect, useState } from 'react';
import { useEditor } from './EditorContext';
import { useToast } from '@/hooks/use-toast';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import PreviewHeader from './components/PreviewHeader';
import HtmlEditor from './components/HtmlEditor';
import VisualEditor from './components/VisualEditor';

interface PagePreviewProps {
  content: string;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  onContentUpdate: (content: string) => void;
}

const PagePreview = ({ content, viewMode, onContentUpdate }: PagePreviewProps) => {
  const { toast } = useToast();
  const { draggedElement } = useEditor();
  const [width, setWidth] = useState('100%');
  const [editorActive, setEditorActive] = useState(false);
  const [isHtmlView, setIsHtmlView] = useState(false);
  const [htmlContent, setHtmlContent] = useState(content);

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

  // Handle HTML content change from HtmlEditor
  const handleHtmlChange = (newContent: string) => {
    setHtmlContent(newContent);
  };

  // Save HTML content when switch back from HTML view
  const toggleHtmlView = () => {
    if (isHtmlView) {
      // If switching from HTML view to visual, save the changes
      onContentUpdate(htmlContent);
    }
    setIsHtmlView(!isHtmlView);
  };

  // Function to sync with live view
  const syncWithLiveView = () => {
    try {
      // Dispatch event to notify that content has been updated
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

  // Handle element dropped in the visual editor
  const handleElementDrop = (newElementHtml: string | null) => {
    if (newElementHtml) {
      // Update the HTML content with the new element
      const updatedContent = htmlContent + newElementHtml;
      setHtmlContent(updatedContent);
      onContentUpdate(updatedContent);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-200 overflow-auto">
      <PreviewHeader 
        viewMode={viewMode}
        isHtmlView={isHtmlView}
        onToggleHtmlView={toggleHtmlView}
        onSyncPreview={syncWithLiveView}
      />
      
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        {isHtmlView ? (
          // HTML Editor View
          <HtmlEditor 
            htmlContent={htmlContent} 
            onChange={handleHtmlChange} 
          />
        ) : (
          // Visual Editor View
          <VisualEditor 
            htmlContent={htmlContent}
            width={width}
            onEditorActivation={() => setEditorActive(true)}
          />
        )}
      </div>
    </div>
  );
};

export default PagePreview;
