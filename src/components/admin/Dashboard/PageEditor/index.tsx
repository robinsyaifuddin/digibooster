
import React, { useState, useEffect } from 'react';
import { WebsitePage } from '@/types/websiteTypes';
import { useToast } from '@/hooks/use-toast';
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import PagesList from './PagesList';
import EditorToolbar from './EditorToolbar';
import ElementsSidebar from './ElementsSidebar';
import PagePreview from './PagePreview';
import { EditorProvider } from './EditorContext';

interface PageEditorProps {
  pages: WebsitePage[];
}

const PageEditor = ({ pages }: PageEditorProps) => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore();
  const [activePage, setActivePage] = useState<WebsitePage | null>(null);
  const [editMode, setEditMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [editorContent, setEditorContent] = useState<string>('');
  const [showElementsSidebar, setShowElementsSidebar] = useState(true);
  const [showResponsiveControls, setShowResponsiveControls] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Initialize with the first page if available
  useEffect(() => {
    if (pages && pages.length > 0 && !activePage) {
      setActivePage(pages[0]);
      setEditorContent(pages[0].content);
    }
  }, [pages, activePage]);

  // Event listener untuk mendeteksi perubahan konten halaman dari editor lain
  useEffect(() => {
    const handlePageContentUpdated = (event: CustomEvent) => {
      if (event.detail && activePage) {
        // Update content jika halaman yang aktif
        setEditorContent(event.detail.content);
        
        // Otomatis simpan perubahan jika didapat dari sinkronisasi
        if (event.detail.autoSave) {
          websiteData.updatePage(activePage.id, {
            content: event.detail.content
          });
          
          toast({
            title: "Konten tersimpan",
            description: "Perubahan konten halaman telah otomatis tersimpan.",
          });
        }
      }
    };

    window.addEventListener('pageContentUpdated', handlePageContentUpdated as EventListener);
    
    return () => {
      window.removeEventListener('pageContentUpdated', handlePageContentUpdated as EventListener);
    };
  }, [activePage, websiteData, toast]);

  // Handle page change
  const handlePageChange = (pageId: string) => {
    // Check for unsaved changes before switching
    if (hasUnsavedChanges) {
      if (window.confirm('Anda memiliki perubahan yang belum disimpan. Tetap pindah halaman?')) {
        const newPage = pages.find(page => page.id === pageId);
        if (newPage) {
          setActivePage(newPage);
          setEditorContent(newPage.content);
          setHasUnsavedChanges(false);
        }
      }
    } else {
      const newPage = pages.find(page => page.id === pageId);
      if (newPage) {
        setActivePage(newPage);
        setEditorContent(newPage.content);
      }
    }
  };

  // Handle content updates
  const handleContentUpdate = (content: string) => {
    setEditorContent(content);
    setHasUnsavedChanges(true);
  };

  // Save changes
  const handleSaveChanges = () => {
    if (!activePage) return;
    
    websiteData.updatePage(activePage.id, {
      content: editorContent
    });
    
    setHasUnsavedChanges(false);
    
    toast({
      title: "Perubahan berhasil disimpan",
      description: "Perubahan pada halaman telah disimpan dan siap untuk dipublikasikan.",
    });
    
    // Sinkronkan perubahan ke tampilan langsung
    const contentUpdateEvent = new CustomEvent('pageContentUpdated', { 
      detail: {
        pageId: activePage.id,
        content: editorContent,
        isPermanent: false
      }
    });
    window.dispatchEvent(contentUpdateEvent);
    
    // Mark page as edited for tracking changes
    localStorage.setItem('pageEdited_' + activePage.id, 'true');
  };

  // Publish changes
  const handlePublishChanges = () => {
    if (!activePage) return;
    
    // Simpan terlebih dahulu
    websiteData.updatePage(activePage.id, {
      content: editorContent,
      isPublished: true
    });
    
    // Sinkronkan perubahan ke tampilan langsung dengan status permanen
    const contentUpdateEvent = new CustomEvent('pageContentUpdated', { 
      detail: {
        pageId: activePage.id,
        content: editorContent,
        isPermanent: true
      }
    });
    window.dispatchEvent(contentUpdateEvent);
    
    // Trigger publish event
    const publishEvent = new CustomEvent('triggerPublish', {
      detail: { source: 'pageEditor' }
    });
    window.dispatchEvent(publishEvent);
    
    toast({
      title: "Halaman siap dipublikasikan",
      description: "Silakan akses menu Publikasi Website untuk mempublikasikan perubahan.",
    });
    
    setHasUnsavedChanges(false);
  };
  
  // Add a new page
  const handleAddPage = (title: string, slug: string) => {
    const newPage: Omit<WebsitePage, 'id'> = {
      title,
      slug,
      content: '<div class="container mx-auto py-8"><h1 class="text-3xl font-bold">Halaman Baru</h1><p>Mulai edit halaman ini sekarang.</p></div>',
      isPublished: false
    };
    
    websiteData.addPage(newPage);
    
    toast({
      title: "Halaman baru ditambahkan",
      description: `Halaman "${title}" telah ditambahkan dan siap untuk diedit.`,
    });
  };

  // Delete page
  const handleDeletePage = (pageId: string) => {
    if (window.confirm('Anda yakin ingin menghapus halaman ini? Tindakan ini tidak dapat dibatalkan.')) {
      websiteData.deletePage(pageId);
      
      // If we deleted the active page, switch to the first available page
      if (activePage && activePage.id === pageId) {
        const remainingPages = pages.filter(page => page.id !== pageId);
        if (remainingPages.length > 0) {
          setActivePage(remainingPages[0]);
          setEditorContent(remainingPages[0].content);
        } else {
          setActivePage(null);
          setEditorContent('');
        }
      }
      
      toast({
        title: "Halaman dihapus",
        description: "Halaman telah berhasil dihapus.",
      });
    }
  };

  // Pratinjau halaman di tab baru
  const handlePreviewPage = () => {
    if (!activePage) return;
    
    // Simpan konten sementara untuk pratinjau
    localStorage.setItem('pagePreview_' + activePage.id, editorContent);
    
    // Buka halaman di tab baru dengan parameter preview
    const previewUrl = `${window.location.origin}/${activePage.slug}?preview=true`;
    window.open(previewUrl, '_blank');
  };

  if (!pages || pages.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Belum ada halaman</h3>
        <p className="text-gray-500 mb-6">Mulai dengan menambahkan halaman pertama Anda</p>
        <button 
          onClick={() => handleAddPage('Halaman Baru', 'halaman-baru')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Tambah Halaman Baru
        </button>
      </div>
    );
  }

  return (
    <EditorProvider>
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <EditorToolbar 
          activePage={activePage}
          editMode={editMode}
          setEditMode={setEditMode}
          showElementsSidebar={showElementsSidebar}
          setShowElementsSidebar={setShowElementsSidebar}
          showResponsiveControls={showResponsiveControls}
          setShowResponsiveControls={setShowResponsiveControls}
          hasUnsavedChanges={hasUnsavedChanges}
          onSave={handleSaveChanges}
          onPublish={handlePublishChanges}
          onPreview={handlePreviewPage}
        />
        
        <div className="flex flex-1 h-full bg-gray-100 overflow-hidden">
          <PagesList 
            pages={pages} 
            activePage={activePage} 
            onPageChange={handlePageChange}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
          />
          
          <div className="flex-1 flex overflow-hidden">
            {showElementsSidebar && (
              <ElementsSidebar />
            )}
            
            <PagePreview 
              content={editorContent}
              viewMode={editMode}
              onContentUpdate={handleContentUpdate}
            />
          </div>
        </div>
      </div>
    </EditorProvider>
  );
};

export default PageEditor;
