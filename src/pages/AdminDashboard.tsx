
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
        return <DashboardOverview />;
      case "users":
        return <UsersManagement />;
      case "content":
        return <ContentManagement />;
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
        return <DashboardOverview />;
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
          onMenuClick={() => setMobileMenuOpen(true)} 
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
