
import React from 'react';
import { WebsitePage } from '@/types/websiteTypes';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Globe, 
  Laptop, 
  Smartphone, 
  Tablet,
  Undo,
  Redo,
  Eye,
  Sidebar,
  Layers,
  Settings,
  Grid,
  Monitor
} from 'lucide-react';

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
  onPublish
}: EditorToolbarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between flex-wrap gap-2">
      {/* Page Title */}
      <div className="flex items-center">
        {activePage && (
          <h3 className="font-medium text-gray-700 mr-4 hidden md:block">
            Edit: <span className="text-blue-600">{activePage.title}</span>
          </h3>
        )}
      </div>

      {/* Editing Tools */}
      <div className="flex items-center space-x-2">
        <div className="border rounded-md flex bg-gray-50">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 ${editMode === 'desktop' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
            onClick={() => setEditMode('desktop')}
          >
            <Monitor className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Desktop</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 ${editMode === 'tablet' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
            onClick={() => setEditMode('tablet')}
          >
            <Tablet className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Tablet</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 ${editMode === 'mobile' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
            onClick={() => setEditMode('mobile')}
          >
            <Smartphone className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Mobile</span>
          </Button>
        </div>

        <div className="border rounded-md flex bg-gray-50">
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-gray-500"
            onClick={() => setShowElementsSidebar(!showElementsSidebar)}
          >
            <Sidebar className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Elements</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-gray-500"
          >
            <Layers className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Layers</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-gray-500"
          >
            <Settings className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(`/${activePage?.slug || ''}`, '_blank')}
        >
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSave}
          disabled={!hasUnsavedChanges}
          className={hasUnsavedChanges ? 'border-amber-500 text-amber-600' : ''}
        >
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
        
        <Button 
          size="sm"
          onClick={onPublish}
        >
          <Globe className="h-4 w-4 mr-1" />
          Publish
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
