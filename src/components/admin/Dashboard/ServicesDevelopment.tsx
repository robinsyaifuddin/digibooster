
import React from 'react';
import { Grid } from 'lucide-react';
import MainPublishCard from './Services/MainPublishCard';
import PublishInfoCard from './Services/PublishInfoCard';
import DomainCard from './Services/DomainCard';
import UpcomingFeaturesCard from './Services/UpcomingFeaturesCard';
import InfoSettingsCard from './Services/InfoSettingsCard';
import ImplementationStatusCard from './Services/ImplementationStatusCard';
import { usePublish } from '@/hooks/usePublish';

interface ServicesDevelopmentProps {
  onTabChange: (tab: string) => void;
}

const ServicesDevelopment = ({ onTabChange }: ServicesDevelopmentProps) => {
  const { 
    isPublishing, 
    publishProgress, 
    lastPublished, 
    deploymentStatus, 
    publishChanges, 
    handleRollback,
    isRealImplementation,
    lastChanges
  } = usePublish();
  
  const navigateToImplementationSettings = () => {
    // Navigate to settings tab with implementation subtab
    onTabChange('settings');
    
    // Use a CustomEvent to communicate with the WebsiteSettings component
    const event = new CustomEvent('switchToSettingsTab', { 
      detail: 'implementation'
    });
    window.dispatchEvent(event);
    
    // Also update URL without refresh
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tab', 'implementation');
    window.history.pushState({tab: 'implementation'}, '', newUrl.toString());
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <Grid className="mr-2 h-5 w-5" />
          Layanan & Publikasi Website
        </h1>
        <p className="text-muted-foreground mt-1">
          Publikasikan website dan kelola integrasi dengan layanan eksternal
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6 md:col-span-1">
          <MainPublishCard 
            isPublishing={isPublishing}
            publishProgress={publishProgress}
            lastPublished={lastPublished}
            deploymentStatus={deploymentStatus}
            handlePublishChanges={publishChanges}
            handleRollback={handleRollback}
            isRealImplementation={isRealImplementation}
          />
          
          <ImplementationStatusCard onNavigateToSettings={navigateToImplementationSettings} />
          
          <DomainCard />
        </div>
        
        <div className="space-y-6 md:col-span-1">
          <PublishInfoCard 
            lastPublished={lastPublished}
            lastChanges={lastChanges}
          />
          
          <InfoSettingsCard onTabChange={onTabChange} />
          
          <UpcomingFeaturesCard />
        </div>
      </div>
    </div>
  );
};

export default ServicesDevelopment;
