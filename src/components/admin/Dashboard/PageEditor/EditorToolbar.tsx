
import React from 'react';
import { WebsitePage } from '@/types/websiteTypes';
import { Button } from '@/components/ui/button';
import { 
  Save,
  Globe,
  LayoutGrid,
  Smartphone,
  Tablet,
  EyeIcon,
  SidebarOpen,
  SidebarClose,
  Palette,
  DatabaseBackup
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditorToolbarProps {
  activePage: WebsitePage | null;
  editMode: 'desktop' | 'tablet' | 'mobile';
  setEditMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  showElementsSidebar: boolean;
  setShowElementsSidebar: (show: boolean) => void;
  showResponsiveControls: boolean;
  setShowResponsiveControls: (show: boolean) => void;
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onPublish: () => void;
  onPreview: () => void;
}

const EditorToolbar = ({
  activePage,
  editMode,
  setEditMode,
  showElementsSidebar,
  setShowElementsSidebar,
  showResponsiveControls,
  setShowResponsiveControls,
  hasUnsavedChanges,
  onSave,
  onPublish,
  onPreview
}: EditorToolbarProps) => {
  const { toast } = useToast();
  
  const handleImplementationInfo = () => {
    toast({
      title: "Implementasi Nyata Website",
      description: "Untuk implementasi nyata, perubahan halaman perlu dikirim ke server melalui API dan disimpan dalam database.",
      duration: 5000,
    });
  };
  
  return (
    <div className="flex justify-between items-center border-b border-gray-200 bg-white p-2">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowElementsSidebar(!showElementsSidebar)}
          title={showElementsSidebar ? "Sembunyikan panel elemen" : "Tampilkan panel elemen"}
        >
          {showElementsSidebar ? (
            <SidebarClose className="h-4 w-4" />
          ) : (
            <SidebarOpen className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowResponsiveControls(!showResponsiveControls)}
          title="Toggle responsive controls"
          className={!showResponsiveControls ? 'text-gray-400' : ''}
        >
          <Palette className="h-4 w-4" />
        </Button>
        
        {showResponsiveControls && (
          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none h-8 w-8 ${editMode === 'desktop' ? 'bg-gray-100' : ''}`}
              onClick={() => setEditMode('desktop')}
              title="Desktop view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none h-8 w-8 ${editMode === 'tablet' ? 'bg-gray-100' : ''}`}
              onClick={() => setEditMode('tablet')}
              title="Tablet view"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none h-8 w-8 ${editMode === 'mobile' ? 'bg-gray-100' : ''}`}
              onClick={() => setEditMode('mobile')}
              title="Mobile view"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex items-center">
        {activePage && (
          <span className="text-sm font-medium text-gray-600 mr-4">
            Editing: {activePage.title}
          </span>
        )}
        
        {hasUnsavedChanges && (
          <span className="text-xs text-amber-600 mr-4">
            Perubahan belum disimpan
          </span>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleImplementationInfo}
          className="text-amber-600 mr-2"
        >
          <DatabaseBackup className="h-4 w-4 mr-1" />
          Info Implementasi
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          title="Pratinjau halaman di tab baru"
          disabled={!activePage}
        >
          <EyeIcon className="h-4 w-4 mr-1" />
          Pratinjau
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          disabled={!hasUnsavedChanges || !activePage}
          title="Simpan perubahan"
        >
          <Save className="h-4 w-4 mr-1" />
          Simpan
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onPublish}
          disabled={!activePage}
          title="Publikasikan halaman"
          className="bg-green-600 hover:bg-green-700"
        >
          <Globe className="h-4 w-4 mr-1" />
          Publikasikan
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
