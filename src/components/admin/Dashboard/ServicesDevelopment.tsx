
import { usePublish } from "@/hooks/usePublish";
import PublishPageHeader from "./Services/PublishPageHeader";
import MainPublishCard from "./Services/MainPublishCard";
import PublishInfoCard from "./Services/PublishInfoCard";
import DomainCard from "./Services/DomainCard";
import UpcomingFeaturesCard from "./Services/UpcomingFeaturesCard";
import InfoSettingsCard from "./Services/InfoSettingsCard";
import PreviewButton from "./Services/PreviewButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ServicesDevelopmentProps {
  onTabChange: (tab: string) => void;
}

const ServicesDevelopment = ({ onTabChange }: ServicesDevelopmentProps) => {
  const { toast } = useToast();
  const {
    isPublishing,
    publishProgress,
    lastPublished,
    deploymentStatus,
    lastChanges,
    publishChanges,
    handleRollback,
    previewWebsite
  } = usePublish();
  
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [previewUpdated, setPreviewUpdated] = useState(false);
  const [showImplementationInfo, setShowImplementationInfo] = useState(true);
  
  // Deteksi apakah ada halaman yang sudah diedit
  useEffect(() => {
    const checkForEdits = () => {
      const keys = Object.keys(localStorage);
      const editedPages = keys.filter(key => key.startsWith('pageEdited_'));
      
      if (editedPages.length > 0) {
        setPreviewUpdated(true);
      } else {
        setPreviewUpdated(false);
      }
    };
    
    checkForEdits();
    
    // Listen for content update events
    const handleContentUpdate = () => {
      checkForEdits();
    };
    
    window.addEventListener('pageContentUpdated', handleContentUpdate);
    
    return () => {
      window.removeEventListener('pageContentUpdated', handleContentUpdate);
    };
  }, []);
  
  // Tampilkan pratinjau langsung
  const toggleLivePreview = () => {
    if (!showLivePreview) {
      setShowLivePreview(true);
      
      // Reset flag setelah menunjukkan pratinjau
      setTimeout(() => {
        setPreviewUpdated(false);
      }, 1000);
    } else {
      setShowLivePreview(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <PublishPageHeader onTabChange={onTabChange} />
      
      {showImplementationInfo && (
        <InfoSettingsCard onTabChange={onTabChange} />
      )}
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-blue-800 font-medium mb-2">Panduan Penerbitan Website</h3>
            <p className="text-blue-700 text-sm">
              Sebelum menerbitkan website, pastikan Anda telah memeriksa semua konten. 
              Penerbitan akan membuat perubahan langsung terlihat oleh pengunjung website.
              Jika terjadi error, gunakan fitur Rollback untuk kembali ke versi sebelumnya.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between gap-2">
          <div className="flex items-center">
            {previewUpdated && (
              <div className="text-amber-600 text-sm mr-2 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
                Perubahan baru tersedia
              </div>
            )}
            <button 
              onClick={() => setShowImplementationInfo(!showImplementationInfo)} 
              className="text-xs text-gray-500 underline hover:text-gray-700"
            >
              {showImplementationInfo ? 'Sembunyikan info implementasi' : 'Tampilkan info implementasi'}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleLivePreview}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                showLivePreview 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              {showLivePreview ? 'Tutup Pratinjau' : 'Pratinjau Real-time'}
            </button>
            <PreviewButton onClick={previewWebsite} />
          </div>
        </CardFooter>
      </Card>
      
      {showLivePreview && (
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-0 h-[600px]">
            <div className="bg-gray-100 w-full h-full relative">
              <iframe 
                src={`${window.location.origin}?preview=true&t=${Date.now()}`} 
                className="w-full h-full border-0"
                title="Website Preview"
              />
              <div className="absolute top-0 left-0 right-0 bg-gray-800 bg-opacity-70 text-white px-4 py-2 flex justify-between items-center">
                <span className="text-sm">Pratinjau Real-time (perubahan belum dipublikasikan)</span>
                <button 
                  onClick={toggleLivePreview}
                  className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                >
                  Tutup
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <MainPublishCard
        deploymentStatus={deploymentStatus}
        publishProgress={publishProgress}
        lastPublished={lastPublished}
        isPublishing={isPublishing}
        handlePublishChanges={publishChanges}
        handleRollback={handleRollback}
      />
      
      <PublishInfoCard lastPublished={lastPublished} lastChanges={lastChanges} />
      
      <DomainCard />
      
      <UpcomingFeaturesCard />
    </div>
  );
};

export default ServicesDevelopment;
