
export const usePublishEvents = () => {
  const dispatchContentUpdateEvent = (data: any) => {
    try {
      // Create and dispatch an event to notify all components that content has been updated
      const contentUpdateEvent = new CustomEvent('websiteContentUpdated', { 
        detail: {
          ...data,
          isPermanent: true
        }
      });
      
      window.dispatchEvent(contentUpdateEvent);
      return true;
    } catch (eventError) {
      console.error('Error dispatching event:', eventError);
      return false;
    }
  };
  
  const dispatchPageContentUpdates = (pages: any[]) => {
    try {
      // Notifikasi semua komponen tentang perubahan konten halaman
      if (pages && pages.length) {
        pages.forEach(page => {
          window.dispatchEvent(new CustomEvent('pageContentUpdated', {
            detail: {
              pageId: page.id,
              content: page.content,
              isPermanent: true,
              isRollback: true
            }
          }));
        });
      }
      return true;
    } catch (error) {
      console.error('Error dispatching page content updates:', error);
      return false;
    }
  };
  
  return {
    dispatchContentUpdateEvent,
    dispatchPageContentUpdates
  };
};
