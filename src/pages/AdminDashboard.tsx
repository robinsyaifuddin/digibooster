
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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

// Mock data for props
const mockUserStats = {
  totalUsers: 125,
  activeUsers: 58,
  newUsers: 12,
  growth: 8.5
};

const mockContentStats = {
  totalBlogs: 48,
  totalProducts: 24,
  newContent: 7,
  publishedToday: 3
};

const mockTrafficStats = {
  visitors: 2430,
  pageViews: 8950,
  bounceRate: 42.8,
  avgSessionDuration: "2:45"
};

const mockRecentUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", joined: "2023-04-01", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", joined: "2023-03-28", status: "active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", joined: "2023-03-25", status: "inactive" },
];

const mockRecentBlogs = [
  { id: "1", title: "Getting Started with React", author: "John Doe", date: "2023-04-01", views: 245 },
  { id: "2", title: "UI/UX Best Practices", author: "Jane Smith", date: "2023-03-28", views: 187 },
  { id: "3", title: "Digital Marketing Tips", author: "Bob Johnson", date: "2023-03-25", views: 320 },
];

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", lastActive: "2023-04-01" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor", lastActive: "2023-03-30" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer", lastActive: "2023-03-28" },
];

const mockBlogs = [
  { id: "1", title: "Getting Started with React", author: "John Doe", date: "2023-04-01", status: "published" },
  { id: "2", title: "UI/UX Best Practices", author: "Jane Smith", date: "2023-03-28", status: "draft" },
  { id: "3", title: "Digital Marketing Tips", author: "Bob Johnson", date: "2023-03-25", status: "published" },
];

const AdminDashboard = () => {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Parse tab from URL params on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Update URL without page refresh using history API
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('tab', tab);
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
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
    <div className="bg-gray-50 min-h-screen flex">
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
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
