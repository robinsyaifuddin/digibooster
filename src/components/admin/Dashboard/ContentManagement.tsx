
import { useState } from "react";
import { useWebsiteDataStore } from "@/stores/websiteDataStore";
import { useToast } from "@/hooks/use-toast";
import { PartnerItem } from "@/types/websiteTypes";

// Import components
import PublishButton from "./Content/PublishButton";
import ContentTabs from "./Content/ContentTabs";
import BlogTabContent from "./Content/BlogTabContent";
import CoursesTabContent from "./Content/CoursesTabContent";
import PortfolioTabContent from "./Content/PortfolioTabContent";
import HomeTabContent from "./Content/HomeTabContent";
import PartnersTabContent from "./Content/PartnersTabContent";

interface Blog {
  id: number;
  title: string;
  author: string;
  published: string;
  views: number;
}

interface ContentManagementProps {
  blogs: Blog[];
}

const ContentManagement = ({ blogs }: ContentManagementProps) => {
  const { toast } = useToast();
  const websiteData = useWebsiteDataStore();
  const [activeTab, setActiveTab] = useState("blog");
  
  // State for hero content
  const [heroContent, setHeroContent] = useState({
    title: websiteData.homeContent.hero.title,
    subtitle: websiteData.homeContent.hero.subtitle,
    ctaText: websiteData.homeContent.hero.ctaText,
    ctaLink: websiteData.homeContent.hero.ctaLink,
  });
  
  // State for new partner
  const [newPartner, setNewPartner] = useState<Omit<PartnerItem, 'id'>>({
    name: '',
    image: '',
    link: '',
  });
  
  // Functions for handling changes
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroContent(prev => ({ ...prev, [name]: value }));
  };
  
  const saveHeroChanges = () => {
    websiteData.updateHomeContent({
      hero: heroContent
    });
    
    toast({
      title: "Konten hero berhasil disimpan",
      description: "Perubahan akan terlihat setelah dipublikasikan",
    });
    
    localStorage.setItem('heroContentEdited', 'true');
  };
  
  const handleServiceChange = (id: string, field: string, value: string) => {
    const updatedServices = websiteData.homeContent.services.map(service => {
      if (service.id === id) {
        return { ...service, [field]: value };
      }
      return service;
    });
    
    websiteData.updateHomeServices(updatedServices);
    localStorage.setItem('servicesEdited', 'true');
  };
  
  const handleTestimonialChange = (id: string, field: string, value: string) => {
    const updatedTestimonials = websiteData.homeContent.testimonials.map(testimonial => {
      if (testimonial.id === id) {
        return { ...testimonial, [field]: value };
      }
      return testimonial;
    });
    
    websiteData.updateHomeTestimonials(updatedTestimonials);
    localStorage.setItem('testimonialsEdited', 'true');
  };
  
  const handlePartnerChange = (id: string, field: string, value: string) => {
    const updatedPartners = websiteData.homeContent.partners.map(partner => {
      if (partner.id === id) {
        return { ...partner, [field]: value };
      }
      return partner;
    });
    
    websiteData.updateHomePartners(updatedPartners);
    localStorage.setItem('partnersEdited', 'true');
  };
  
  const handleNewPartnerChange = (field: string, value: string) => {
    setNewPartner(prev => ({ ...prev, [field]: value }));
  };
  
  const addNewPartner = () => {
    if (!newPartner.name || !newPartner.image) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Nama dan URL gambar partner harus diisi",
      });
      return;
    }
    
    const newPartnerWithId: PartnerItem = {
      id: Date.now().toString(),
      ...newPartner
    };
    
    const updatedPartners = [...websiteData.homeContent.partners, newPartnerWithId];
    websiteData.updateHomePartners(updatedPartners);
    
    // Reset form
    setNewPartner({
      name: '',
      image: '',
      link: '',
    });
    
    toast({
      title: "Partner baru ditambahkan",
      description: "Partner baru berhasil ditambahkan dan akan terlihat setelah dipublikasikan",
    });
    
    localStorage.setItem('partnersEdited', 'true');
  };
  
  const deletePartner = (id: string) => {
    const updatedPartners = websiteData.homeContent.partners.filter(
      partner => partner.id !== id
    );
    
    websiteData.updateHomePartners(updatedPartners);
    
    toast({
      title: "Partner dihapus",
      description: "Partner berhasil dihapus dari daftar",
    });
    
    localStorage.setItem('partnersEdited', 'true');
  };
  
  // Sample data for demonstration
  const courses = [
    { id: 1, title: 'Digital Marketing untuk Pemula', students: 156, lessons: 12, level: 'Pemula' },
    { id: 2, title: 'SEO Optimization', students: 89, lessons: 8, level: 'Menengah' },
    { id: 3, title: 'Content Creation Strategy', students: 124, lessons: 10, level: 'Pemula' },
    { id: 4, title: 'Advanced Web Development', students: 67, lessons: 15, level: 'Mahir' },
    { id: 5, title: 'Social Media Management', students: 203, lessons: 9, level: 'Menengah' },
    { id: 6, title: 'UI/UX Design Basic', students: 178, lessons: 11, level: 'Pemula' },
  ];

  const portfolios = [
    { id: 1, title: 'Website E-commerce Toko ABC', category: 'Web Development', client: 'Toko ABC' },
    { id: 2, title: 'Kampanye Digital XYZ Corp', category: 'Digital Marketing', client: 'XYZ Corp' },
    { id: 3, title: 'Aplikasi Mobile PQR', category: 'Mobile App', client: 'PQR Inc' },
    { id: 4, title: 'Redesign UI Website Korporat', category: 'UI/UX Design', client: 'LMN Group' },
    { id: 5, title: 'Strategi SEO Toko Online', category: 'SEO', client: 'Online Shop RST' },
    { id: 6, title: 'Content Marketing Startup', category: 'Content Marketing', client: 'Startup UVW' },
  ];

  const handlePublishContent = () => {
    // Trigger publish event
    const publishEvent = new CustomEvent('triggerPublish', {
      detail: { source: 'contentManagement' }
    });
    window.dispatchEvent(publishEvent);
    
    toast({
      title: "Konten siap dipublikasikan",
      description: "Silakan akses menu Publikasi Website untuk mempublikasikan perubahan",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 hidden md:block">Kelola Konten</h2>
        <PublishButton onClick={handlePublishContent} />
      </div>
      
      <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <BlogTabContent blogs={blogs} />
        
        <CoursesTabContent courses={courses} />
        
        <PortfolioTabContent portfolios={portfolios} />
        
        <HomeTabContent 
          heroContent={heroContent}
          handleHeroChange={handleHeroChange}
          saveHeroChanges={saveHeroChanges}
          services={websiteData.homeContent.services}
          handleServiceChange={handleServiceChange}
          testimonials={websiteData.homeContent.testimonials}
          handleTestimonialChange={handleTestimonialChange}
          handlePublishContent={handlePublishContent}
          setActiveTab={setActiveTab}
        />
        
        <PartnersTabContent 
          partners={websiteData.homeContent.partners}
          handlePartnerChange={handlePartnerChange}
          deletePartner={deletePartner}
          newPartner={newPartner}
          handleNewPartnerChange={handleNewPartnerChange}
          addNewPartner={addNewPartner}
          handlePublishContent={handlePublishContent}
          setActiveTab={setActiveTab}
        />
      </ContentTabs>
    </div>
  );
};

export default ContentManagement;
