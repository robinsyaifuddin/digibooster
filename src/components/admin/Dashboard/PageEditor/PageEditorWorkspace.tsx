
import React, { useState } from 'react';
import { WebsitePage } from '@/types/websiteTypes';
import EditorToolbar from './EditorToolbar';
import ElementsSidebar from './ElementsSidebar';
import PagePreview from './PagePreview';

interface PageEditorWorkspaceProps {
  activePage: WebsitePage | null;
  hasUnsavedChanges: boolean;
  onContentUpdate: (content: string) => void;
  onSave: () => void;
  onPublish: () => void;
}

const PageEditorWorkspace = ({
  activePage,
  hasUnsavedChanges,
  onContentUpdate,
  onSave,
  onPublish
}: PageEditorWorkspaceProps) => {
  const [editMode, setEditMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showElementsSidebar, setShowElementsSidebar] = useState(true);
  const [showResponsiveControls, setShowResponsiveControls] = useState(true);

  const handlePreview = () => {
    if (!activePage) return;
    
    // Open page in new tab for preview
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Preview: ${activePage.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>
            <div class="bg-blue-100 p-2 text-sm text-center">
              Preview Mode - Changes are not saved
            </div>
            ${activePage.content}
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Editor toolbar */}
      <EditorToolbar
        activePage={activePage}
        editMode={editMode}
        setEditMode={setEditMode}
        showElementsSidebar={showElementsSidebar}
        setShowElementsSidebar={setShowElementsSidebar}
        showResponsiveControls={showResponsiveControls}
        setShowResponsiveControls={setShowResponsiveControls}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={onSave}
        onPublish={onPublish}
        onPreview={handlePreview}
      />
      
      {/* Editor content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Elements sidebar */}
        {showElementsSidebar && <ElementsSidebar />}
        
        {/* Page preview/editor */}
        {activePage ? (
          <PagePreview
            content={activePage.content}
            viewMode={editMode}
            onContentUpdate={onContentUpdate}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 max-w-md">
              <h3 className="text-xl font-semibold mb-2">Pilih atau Buat Halaman</h3>
              <p className="text-gray-600">
                Pilih halaman dari sidebar untuk mulai mengedit, atau buat halaman baru untuk menambahkan konten ke website Anda.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageEditorWorkspace;
