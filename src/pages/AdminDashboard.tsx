
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "@/components/admin/Dashboard/Sidebar";
import MobileSidebar from "@/components/admin/Dashboard/MobileSidebar";
import Header from "@/components/admin/Dashboard/Header";
import DashboardOverview from "@/components/admin/Dashboard/DashboardOverview";
import UsersManagement from "@/components/admin/Dashboard/UsersManagement";
import ContentManagement from "@/components/admin/Dashboard/ContentManagement";
import ServicesDevelopment from "@/components/admin/Dashboard/ServicesDevelopment";
import WebsiteSettings from "@/components/admin/WebsiteSettings";
import AdminProfile from "@/components/admin/AdminProfile";
import ApiDocumentation from "@/components/admin/Dashboard/Developer/ApiDocumentation";
import DatabaseMonitor from "@/components/admin/Dashboard/Developer/DatabaseMonitor";
import AnalyticsMonitor from "@/components/admin/Dashboard/Developer/AnalyticsMonitor";
import Terminal from "@/components/admin/Dashboard/Developer/Terminal";
import VersionControl from "@/components/admin/Dashboard/Developer/VersionControl";
import { useToast } from "@/hooks/use-toast";

// Mock data for props - updated to match component prop types
const mockUserStats = {
  total: 125,
  new: 12,
  active: 58,
  premium: 24
};

const mockContentStats = {
  blogs: 48,
  courses: 16,
  services: 8,
  portfolios: 24
};

const mockTrafficStats = {
  weekly: 2430,
  monthly: 8950,
  conversion: 42.8
};

const mockRecentUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", joinDate: "2023-04-01", role: "premium", avatar: "JD" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", joinDate: "2023-03-28", role: "user", avatar: "JS" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", joinDate: "2023-03-25", role: "user", avatar: "BJ" },
];

const mockRecentBlogs = [
  { id: 1, title: "Getting Started with React", author: "John Doe", published: "2023-04-01", views: 245 },
  { id: 2, title: "UI/UX Best Practices", author: "Jane Smith", published: "2023-03-28", views: 187 },
  { id: 3, title: "Digital Marketing Tips", author: "Bob Johnson", published: "2023-03-25", views: 320 },
];

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", joinDate: "2023-04-01", avatar: "JD" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", joinDate: "2023-03-30", avatar: "JS" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", joinDate: "2023-03-28", avatar: "BJ" },
];

const mockBlogs = [
  { id: 1, title: "Getting Started with React", author: "John Doe", published: "2023-04-01", views: 245, status: "published" },
  { id: 2, title: "UI/UX Best Practices", author: "Jane Smith", published: "2023-03-28", views: 187, status: "draft" },
  { id: 3, title: "Digital Marketing Tips", author: "Bob Johnson", published: "2023-03-25", views: 320, status: "published" },
];

const AdminDashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Parse tab from URL params on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    // Welcome toast
    if (user?.role === 'admin' || user?.user_metadata?.role === 'admin') {
      toast({
        title: "Selamat Datang, Admin",
        description: "Anda telah masuk ke dashboard admin"
      });
    }
  }, [location, user]);

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  // If not authenticated or not admin, redirect to login page
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  // Check if user is admin
  const userRole = user?.role || user?.user_metadata?.role;
  if (userRole !== 'admin' && !loading) {
    toast({
      variant: "destructive",
      title: "Akses Ditolak",
      description: "Anda tidak memiliki izin untuk mengakses halaman ini"
    });
    return <Navigate to="/dashboard" />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Update URL without page refresh using history API
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('tab', tab);
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
    
    // Show toast notification
    toast({
      title: "Menu Diubah",
      description: `Beralih ke ${getTabTitle(tab)}`
    });
  };
  
  // Get title based on tab
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case "overview": return "Dashboard";
      case "users": return "Manajemen Pengguna";
      case "content": return "Manajemen Konten";
      case "services": return "Pengembangan Layanan";
      case "settings": return "Pengaturan Website";
      case "profile": return "Profil Admin";
      case "api-docs": return "Dokumentasi API";
      case "database": return "Monitor Database";
      case "analytics": return "Monitor Analitik";
      case "terminal": return "Terminal";
      case "git": return "Kontrol Versi";
      default: return "Dashboard";
    }
  };

  // Render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview 
                userStats={mockUserStats} 
                contentStats={mockContentStats} 
                trafficStats={mockTrafficStats} 
                recentUsers={mockRecentUsers}
                recentBlogs={mockRecentBlogs}
              />;
      case "users":
        return <UsersManagement users={mockUsers} />;
      case "content":
        return <ContentManagement blogs={mockBlogs} />;
      case "services":
        return <ServicesDevelopment />;
      case "settings":
        return <WebsiteSettings />;
      case "profile":
        return <AdminProfile />;
      case "api-docs":
        return <ApiDocumentation />;
      case "database":
        return <DatabaseMonitor />;
      case "analytics":
        return <AnalyticsMonitor />;
      case "terminal":
        return <Terminal />;
      case "git":
        return <VersionControl />;
      default:
        return <DashboardOverview 
                userStats={mockUserStats} 
                contentStats={mockContentStats} 
                trafficStats={mockTrafficStats} 
                recentUsers={mockRecentUsers}
                recentBlogs={mockRecentBlogs}
              />;
    }
  };

  return (
    <div className="bg-black min-h-screen flex">
      {/* Sidebar for desktop */}
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        activeTab={activeTab} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        onTabChange={handleTabChange}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeTab={activeTab} 
          toggleMobileMenu={() => setMobileMenuOpen(true)} 
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
