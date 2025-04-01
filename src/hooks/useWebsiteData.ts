
import { useWebsiteDataStore } from '@/stores/websiteDataStore';
import { WebsiteData } from '@/types/websiteTypes';

// Create a hook for easier access to the store's state
export const useWebsiteData = (): WebsiteData & { isLoading: boolean } => {
  const state = useWebsiteDataStore();
  return { ...state, isLoading: false };
};

export default useWebsiteData;
