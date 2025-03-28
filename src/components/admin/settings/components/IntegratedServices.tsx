
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileWarning } from 'lucide-react';

const IntegratedServices: React.FC = () => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Layanan Terintegrasi</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
                <path d="M10.5 13.5v2.25h3v-2.25h-3zm0-9v2.25h3V4.5h-3zm0 4.5v2.25h3V9h-3zM4.5 13.5v2.25h3v-2.25h-3zm0-9v2.25h3V4.5h-3zm0 4.5v2.25h3V9h-3zm13.5 0v2.25h3V9h-3zm0-4.5v2.25h3V4.5h-3zm0 9v2.25h3v-2.25h-3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Database Service</p>
              <p className="text-xs text-gray-500">Terhubung • Diperbarui 2 hari lalu</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Atur
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center mr-3">
              <FileWarning className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Security Scanner</p>
              <p className="text-xs text-gray-500">Terhubung • Diperbarui 7 hari lalu</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Atur
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegratedServices;
