
import React, { useState, useEffect } from 'react';
import { WebsitePage } from '@/types/websiteTypes';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import { useToast } from '@/hooks/use-toast';
import { EditorProvider } from './EditorContext';
import PagesList from './PagesList';
import PageEditorWorkspace from './PageEditorWorkspace';

const PageEditorContainer = () => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore(state => state);
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [activePage, setActivePage] = useState<WebsitePage | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load pages from store on mount
  useEffect(() => {
    if (websiteData.pages) {
      setPages(websiteData.pages);
    }
  }, [websiteData.pages]);

  // Handle page change
  const handlePageChange = (pageId: string) => {
    // If user has unsaved changes, confirm before switching
    if (hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to switch pages?')) {
        return;
      }
    }
    
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setActivePage(page);
      setHasUnsavedChanges(false);
    }
  };

  // Handle page content update
  const handleContentUpdate = (content: string) => {
    if (!activePage) return;
    
    // Update active page content locally
    setActivePage({
      ...activePage,
      content
    });
    
    // Mark unsaved changes
    setHasUnsavedChanges(true);
  };

  // Handle save page
  const handleSavePage = () => {
    if (!activePage) return;
    
    // Update page in store
    const updatedPages = pages.map(page => 
      page.id === activePage.id ? { ...page, content: activePage.content } : page
    );
    
    setPages(updatedPages);
    websiteData.updatePages(updatedPages);
    
    // Mark page as edited in localStorage for tracking changes
    localStorage.setItem('pageEdited_' + activePage.id, 'true');
    
    setHasUnsavedChanges(false);
    
    toast({
      title: "Halaman disimpan",
      description: "Perubahan halaman telah disimpan.",
    });
  };

  // Handle publish page
  const handlePublishPage = () => {
    if (!activePage) return;
    
    // Save first if there are unsaved changes
    if (hasUnsavedChanges) {
      handleSavePage();
    }
    
    // Mark page as published locally
    const updatedPages = pages.map(page => 
      page.id === activePage.id ? { ...page, isPublished: true } : page
    );
    
    setPages(updatedPages);
    websiteData.updatePages(updatedPages);
    
    toast({
      title: "Halaman dipublikasikan",
      description: "Halaman Anda telah dipublikasikan dan akan terlihat oleh pengunjung.",
    });
    
    // Dispatch event to trigger publish notification
    window.dispatchEvent(new CustomEvent('triggerPublish', { 
      detail: { source: 'Page Editor' } 
    }));
  };

  // Handle add page
  const handleAddPage = (title: string, slug: string) => {
    const newPage: WebsitePage = {
      id: `page-${Date.now()}`,
      title,
      slug,
      content: '<div class="container mx-auto p-4"><h1>New Page</h1><p>Start editing this page...</p></div>',
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    websiteData.updatePages(updatedPages);
    setActivePage(newPage);
  };

  // Handle delete page
  const handleDeletePage = (pageId: string) => {
    if (!window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      return;
    }
    
    const updatedPages = pages.filter(page => page.id !== pageId);
    setPages(updatedPages);
    websiteData.updatePages(updatedPages);
    
    if (activePage && activePage.id === pageId) {
      setActivePage(updatedPages.length > 0 ? updatedPages[0] : null);
    }
    
    toast({
      title: "Halaman dihapus",
      description: "Halaman telah dihapus dari website.",
    });
  };

  return (
    <EditorProvider>
      <div className="flex h-[calc(100vh-140px)] overflow-hidden">
        {/* Page list sidebar */}
        <PagesList
          pages={pages}
          activePage={activePage}
          onPageChange={handlePageChange}
          onAddPage={handleAddPage}
          onDeletePage={handleDeletePage}
        />
        
        {/* Main editor workspace */}
        <PageEditorWorkspace
          activePage={activePage}
          hasUnsavedChanges={hasUnsavedChanges}
          onContentUpdate={handleContentUpdate}
          onSave={handleSavePage}
          onPublish={handlePublishPage}
        />
      </div>
    </EditorProvider>
  );
};

export default PageEditorContainer;
