
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainPublishCard from './Services/MainPublishCard';
import ImplementationStatusCard from './Services/ImplementationStatusCard';
import InfoSettingsCard from './Services/InfoSettingsCard';
import SupabaseConnectionStatus from './Services/SupabaseConnectionStatus';
import { usePublish } from '@/hooks/usePublish';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useImplementationSettings } from '@/hooks/useImplementationSettings';

interface ServicesDevelopmentProps {
  onTabChange: (tab: string) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4
    }
  }
};

const staggeredContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ServicesDevelopment = ({ onTabChange }: ServicesDevelopmentProps) => {
  const { 
    isPublishing, 
    publishProgress, 
    lastPublished, 
    deploymentStatus,
    publishChanges, 
    handleRollback, 
    previewWebsite,
    isRealImplementation
  } = usePublish();
  
  const { implementationType } = useImplementationSettings();
  const [showLivePreview, setShowLivePreview] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Layanan & Pengembangan</h2>
          <p className="text-muted-foreground">
            Kelola layanan, publikasi, dan pengaturan implementasi website
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setShowLivePreview(!showLivePreview)}
        >
          <Eye className="h-4 w-4" />
          {showLivePreview ? 'Tutup Preview' : 'Live Preview'}
        </Button>
      </div>
      
      {isRealImplementation && (
        <div className="flex items-center bg-green-50 text-green-800 rounded-md p-3 border border-green-200">
          <Badge className="bg-green-500 mr-2">Live</Badge>
          <span className="text-sm">
            Website Anda berjalan dalam mode implementasi nyata menggunakan {implementationType === 'supabase' ? 'Supabase' : 'API Kustom'}.
          </span>
        </div>
      )}
      
      {showLivePreview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border rounded-md overflow-hidden bg-gray-50"
        >
          <div className="p-2 bg-gray-100 border-b flex justify-between items-center">
            <span className="text-sm font-medium">Live Preview</span>
            <Badge variant="outline" className="text-xs">Preview Mode</Badge>
          </div>
          <iframe 
            src="/" 
            className="w-full"
            style={{ height: '50vh' }}
            title="Website Preview"
          ></iframe>
        </motion.div>
      )}
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6" 
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn}>
          <MainPublishCard 
            deploymentStatus={deploymentStatus}
            publishProgress={publishProgress}
            lastPublished={lastPublished}
            isPublishing={isPublishing}
            isRealImplementation={isRealImplementation}
            handlePublishChanges={publishChanges}
            handleRollback={handleRollback}
          />
        </motion.div>
        
        <motion.div variants={fadeIn}>
          <ImplementationStatusCard onNavigateToSettings={() => onTabChange('settings')} />
        </motion.div>
        
        <motion.div variants={fadeIn}>
          <SupabaseConnectionStatus />
        </motion.div>
        
        <motion.div variants={fadeIn}>
          <InfoSettingsCard onTabChange={onTabChange} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServicesDevelopment;
