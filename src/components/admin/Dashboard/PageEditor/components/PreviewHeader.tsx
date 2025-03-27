
import React from 'react';
import { Button } from '@/components/ui/button';

interface PreviewHeaderProps {
  viewMode: 'desktop' | 'tablet' | 'mobile';
  isHtmlView: boolean;
  onToggleHtmlView: () => void;
  onSyncPreview: () => void;
}

const PreviewHeader = ({ viewMode, isHtmlView, onToggleHtmlView, onSyncPreview }: PreviewHeaderProps) => {
  return (
    <div className="p-2 bg-white border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Preview</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={onSyncPreview}
          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sinkronkan Pratinjau
        </Button>
        <Button
          onClick={onToggleHtmlView}
          className={`px-2 py-1 text-xs rounded ${isHtmlView ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
        >
          {isHtmlView ? 'Visual Editor' : 'HTML Editor'}
        </Button>
      </div>
    </div>
  );
};

export default PreviewHeader;
