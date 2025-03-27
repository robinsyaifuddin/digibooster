
import { useState, useEffect } from "react";

export type DeploymentStatus = 'idle' | 'publishing' | 'success' | 'error';

export const usePublishState = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus>('idle');
  const [lastPublished, setLastPublished] = useState<string | null>(
    localStorage.getItem('lastPublishTime')
  );
  
  useEffect(() => {
    // Load previous publication data
    const storedLastPublished = localStorage.getItem('lastPublishTime');
    if (storedLastPublished) {
      setLastPublished(storedLastPublished);
    }
  }, []);
  
  const updatePublishState = (status: DeploymentStatus, isActive: boolean = false) => {
    setDeploymentStatus(status);
    setIsPublishing(isActive);
  };
  
  const recordPublishTime = () => {
    const now = new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    setLastPublished(now);
    localStorage.setItem('lastPublishTime', now);
    return now;
  };
  
  return {
    isPublishing,
    deploymentStatus,
    lastPublished,
    updatePublishState,
    recordPublishTime
  };
};
