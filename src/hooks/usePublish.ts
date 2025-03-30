import { useToast } from "@/hooks/use-toast";
import { useWebsiteDataStore } from "@/stores/websiteDataStore";
import { usePublishProgress } from "./usePublishProgress";
import { usePublishState } from "./usePublishState";
import { usePublishTracking } from "./usePublishTracking";
import { useImplementationSettings } from "./useImplementationSettings";
import { usePublishApi } from "./usePublishApi";
import { usePublishStorage } from "./usePublishStorage";
import { usePublishEvents } from "./usePublishEvents";
import { usePublishNotifications } from "./usePublishNotifications";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { WebsiteData } from "@/types/websiteTypes";

export const usePublish = () => {
  const websiteData = useWebsiteDataStore(state => state);
  const { publishProgress, simulateProgressStep, resetProgress } = usePublishProgress();
  const { isPublishing, deploymentStatus, lastPublished, updatePublishState, recordPublishTime } = usePublishState();
  const { lastChanges, trackChanges, saveChanges } = usePublishTracking();
  const { isRealImplementation, implementationType } = useImplementationSettings();
  const { publishToApi, rollbackOnApi } = usePublishApi();
  const { saveWebsiteData, backupCurrentData, restoreFromBackup } = usePublishStorage();
  const { dispatchContentUpdateEvent, dispatchPageContentUpdates } = usePublishEvents();
  const notifications = usePublishNotifications();
  const { user } = useAuth();
  
  const loadWebsiteDataFromSupabase = async (): Promise<WebsiteData | null> => {
    if (!isRealImplementation) return null;
    
    try {
      if (implementationType === 'supabase') {
        const { data, error } = await supabase
          .from('website_content')
          .select('content')
          .eq('name', 'main')
          .single();
        
        if (error) {
          console.error('Error loading website data from Supabase:', error);
          return null;
        }
        
        if (data && data.content) {
          return data.content as unknown as WebsiteData;
        }
      } 
      else if (implementationType === 'custom') {
        const apiUrl = localStorage.getItem('implementation_apiUrl');
        const apiKey = localStorage.getItem('implementation_apiKey');
        
        if (!apiUrl) {
          console.error('API URL tidak dikonfigurasi');
          return null;
        }
        
        const getEndpoint = apiUrl.endsWith('/') 
          ? `${apiUrl}website/get` 
          : `${apiUrl}/website/get`;
        
        const headers = {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
        };
        
        const response = await fetch(getEndpoint, { 
          method: 'GET',
          headers
        });
        
        if (!response.ok) {
          console.error('Error loading website data from custom API:', response.statusText);
          return null;
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          return result.data as WebsiteData;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error loading website data:', error);
      return null;
    }
  };
  
  const publishChanges = async () => {
    updatePublishState('publishing', true);
    resetProgress();
    
    try {
      backupCurrentData();

      const pageEdits = {};
      websiteData.pages.forEach(page => {
        const isEdited = localStorage.getItem('pageEdited_' + page.id);
        if (isEdited) {
          pageEdits[page.id] = page.content;
        }
      });

      await simulateProgressStep(0, 20, 1000);
      
      notifications.notifyPublishStarted();
      
      await simulateProgressStep(20, 50, 1500);
      
      if (isRealImplementation) {
        try {
          await simulateProgressStep(50, 75, 1500);
          
          notifications.notifyDataSending();
          
          const apiResult = await publishToApi({
            websiteData,
            pageEdits
          });
          
          if (!apiResult.success) {
            throw new Error('API error');
          }
          
          if ('data' in apiResult && apiResult.data) {
            console.log('Data berhasil dipublikasikan ke API:', apiResult.data);
          }
        } catch (apiError) {
          throw new Error('API error');
        }
      } else {
        await simulateProgressStep(50, 75, 1500);
        notifications.notifySimulationMode();
      }
      
      saveWebsiteData(websiteData);
      
      dispatchContentUpdateEvent({
        ...websiteData,
        isPermanent: true,
        pageEdits
      });
      
      const changes = trackChanges();
      saveChanges(changes);
      
      await simulateProgressStep(90, 100, 500);
      
      updatePublishState('success', false);
      
      const publishTime = recordPublishTime();
      
      if (isRealImplementation && implementationType === 'supabase') {
        await supabase.from('publish_history').insert({
          publish_type: 'full',
          published_by: user?.id,
          changes: { changes }
        });
      }
      
      notifications.notifyPublishSuccess(publishTime);
      
    } catch (error) {
      console.error('Publish error:', error);
      updatePublishState('error', false);
      notifications.notifyPublishError(error);
    } finally {
      updatePublishState(deploymentStatus, false);
    }
  };
  
  const handleRollback = async () => {
    notifications.notifyRollbackStarted();
    
    try {
      if (isRealImplementation) {
        try {
          const result = await rollbackOnApi();
          
          if (result.success && 'data' in result && result.data) {
            dispatchContentUpdateEvent(result.data);
            
            if (result.data.pages) {
              dispatchPageContentUpdates(result.data.pages);
            }
            
            notifications.notifyRollbackSuccess();
            return;
          }
        } catch (apiError) {
          console.error('Error during API rollback:', apiError);
        }
      }
      
      const result = restoreFromBackup();
      
      if (result.success) {
        dispatchContentUpdateEvent(result.data);
        
        if (result.data.pages) {
          dispatchPageContentUpdates(result.data.pages);
        }
        
        notifications.notifyRollbackSuccess();
      } else if (result.reason === 'no-backup') {
        notifications.notifyNoBackupAvailable();
      } else {
        notifications.notifyRollbackFailed("Terjadi kesalahan saat mengembalikan versi website.");
      }
    } catch (error) {
      console.error('Rollback error:', error);
      notifications.notifyRollbackFailed();
    }
  };
  
  const previewWebsite = () => {
    const previewUrl = window.location.origin;
    window.open(previewUrl, '_blank');
  };
  
  return {
    isPublishing,
    publishProgress,
    lastPublished,
    deploymentStatus,
    lastChanges,
    publishChanges,
    handleRollback,
    previewWebsite,
    isRealImplementation,
    loadWebsiteDataFromSupabase
  };
};
