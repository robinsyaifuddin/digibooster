
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from "../hooks/use-mobile";
import { useToast } from '../hooks/use-toast';

// Dashboard Components
import Sidebar from '../components/admin/Dashboard/Sidebar';
import MobileSidebar from '../components/admin/Dashboard/MobileSidebar';
import Header from '../components/admin/Dashboard/Header';
import DashboardOverview from '../components/admin/Dashboard/DashboardOverview';
import UsersManagement from '../components/admin/Dashboard/UsersManagement';
import ContentManagement from '../components/admin/Dashboard/ContentManagement';
import ServicesDevelopment from '../components/admin/Dashboard/ServicesDevelopment';
import WebsiteSettings from '../components/admin/WebsiteSettings';
import AdminProfile from '../components/admin/AdminProfile';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sample data for demonstration
  const [userStats] = useState({
    total: 1245,
    new: 42,
    active: 891,
    premium: 122
  });
  
  const [contentStats] = useState({
    blogs: 28,
    courses: 12,
    services: 4,
    portfolios: 16
  });
  
  const [trafficStats] = useState({
    weekly: 2467,
    monthly: 10254,
    conversion: 3.2
  });
  
  const [recentUsers] = useState([
    { id: 1, name: 'Andi Pratama', email: 'andi@example.com', role: 'user', joinDate: '2023-08-12', avatar: 'A' },
    { id: 2, name: 'Dewi Lestari', email: 'dewi@example.com', role: 'user', joinDate: '2023-08-10', avatar: 'D' },
    { id: 3, name: 'Budi Santoso', email: 'budi@example.com', role: 'premium', joinDate: '2023-08-05', avatar: 'B' },
    { id: 4, name: 'Rina Wijaya', email: 'rina@example.com', role: 'user', joinDate: '2023-08-01', avatar: 'R' },
    { id: 5, name: 'Ahmad Fauzi', email: 'ahmad@example.com', role: 'user', joinDate: '2023-07-28', avatar: 'A' },
    { id: 6, name: 'Siti Nurhaliza', email: 'siti@example.com', role: 'premium', joinDate: '2023-07-22', avatar: 'S' },
    { id: 7, name: 'Joko Widodo', email: 'joko@example.com', role: 'user', joinDate: '2023-07-15', avatar: 'J' },
  ]);
  
  const [recentBlogs] = useState([
    { id: 1, title: 'Tips Optimasi Website untuk Pemula', author: 'Admin', published: '2023-08-10', views: 234 },
    { id: 2, title: 'Cara Membuat Konten Digital yang Menarik', author: 'Admin', published: '2023-08-07', views: 167 },
    { id: 3, title: 'Strategi Marketing Digital di Era 2023', author: 'Admin', published: '2023-08-05', views: 321 },
  ]);
  
  useEffect(() => {
    // Redirect if not admin
    if (!user || user.email !== 'digibooster@123') {
      navigate('/');
      toast({
        variant: "destructive",
        title: "Akses ditolak",
        description: "Anda tidak memiliki izin untuk mengakses halaman ini.",
      });
    }
    
    // Mendengarkan event untuk pindah tab dari komponen lain
    const handleSwitchTab = (event: CustomEvent) => {
      if (event.detail) {
        setActiveTab(event.detail);
      }
    };
    
    // Mendengarkan event triggerPublish dari ContentManagement
    const handleTriggerPublish = (event: CustomEvent) => {
      if (event.detail && event.detail.source) {
        toast({
          title: "Perubahan siap dipublikasikan",
          description: `Perubahan dari ${event.detail.source} telah disimpan dan siap dipublikasikan.`,
        });
        
        // Otomatis pindah ke tab publikasi
        setActiveTab('services');
      }
    };
    
    window.addEventListener('switchToTab', handleSwitchTab as EventListener);
    window.addEventListener('triggerPublish', handleTriggerPublish as EventListener);
    
    return () => {
      window.removeEventListener('switchToTab', handleSwitchTab as EventListener);
      window.removeEventListener('triggerPublish', handleTriggerPublish as EventListener);
    };
  }, [user, navigate, toast]);
  
  if (!user || user.email !== 'digibooster@123') {
    return null;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        activeTab={activeTab} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        onTabChange={handleTabChange} 
      />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <Header activeTab={activeTab} setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Dashboard content */}
        <main className="p-4 md:p-6">
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <DashboardOverview 
              userStats={userStats}
              contentStats={contentStats}
              trafficStats={trafficStats}
              recentUsers={recentUsers.slice(0, 4)}
              recentBlogs={recentBlogs}
            />
          )}
          
          {/* Users tab */}
          {activeTab === 'users' && <UsersManagement users={recentUsers} />}
          
          {/* Content tab */}
          {activeTab === 'content' && <ContentManagement blogs={recentBlogs} />}
          
          {/* Website Settings */}
          {activeTab === 'settings' && <WebsiteSettings />}
          
          {/* Admin Profile */}
          {activeTab === 'profile' && <AdminProfile />}
          
          {/* Services tab - untuk fitur publikasi website */}
          {activeTab === 'services' && <ServicesDevelopment onTabChange={handleTabChange} />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
