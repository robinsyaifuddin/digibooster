
export const usePublishEvents = () => {
  // Dispatch event untuk memberitahu komponen lain bahwa konten telah diperbarui
  const dispatchContentUpdateEvent = (data: Record<string, any>) => {
    const event = new CustomEvent('websiteContentUpdated', { 
      detail: data
    });
    window.dispatchEvent(event);
  };
  
  // Dispatch event untuk memberitahu komponen tentang pembaruan konten halaman
  const dispatchPageContentUpdates = (pagesData: any) => {
    const event = new CustomEvent('pageContentUpdated', { 
      detail: { pages: pagesData }
    });
    window.dispatchEvent(event);
  };
  
  return {
    dispatchContentUpdateEvent,
    dispatchPageContentUpdates
  };
};
