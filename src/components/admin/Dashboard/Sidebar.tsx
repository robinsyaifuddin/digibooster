
import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  User, 
  LayoutDashboard,
  Code,
  Database,
  BarChart3,
  Terminal,
  GitBranch
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const { user } = useAuth();
  const adminName = user?.user_metadata?.name || 'Admin';
  
  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-white">
            <span className="text-sky-400">Digi</span>Booster
          </span>
        </Link>
      </div>
      
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white font-medium">
            {adminName[0]}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{adminName}</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Menu Utama</div>
        
        <button
          onClick={() => onTabChange("overview")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "overview" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </button>
        
        <button
          onClick={() => onTabChange("users")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "users" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <Users className="w-5 h-5 mr-3" />
          <span>Pengguna</span>
        </button>
        
        <button
          onClick={() => onTabChange("content")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "content" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <FileText className="w-5 h-5 mr-3" />
          <span>Konten</span>
        </button>
        
        <button
          onClick={() => onTabChange("services")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "services" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <Code className="w-5 h-5 mr-3" />
          <span>Layanan</span>
        </button>
        
        <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Pengaturan</div>
        
        <button
          onClick={() => onTabChange("settings")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "settings" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <Settings className="w-5 h-5 mr-3" />
          <span>Pengaturan Website</span>
        </button>
        
        <button
          onClick={() => onTabChange("profile")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "profile" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <User className="w-5 h-5 mr-3" />
          <span>Profil Admin</span>
        </button>
        
        <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Pengembang</div>
        
        <button
          onClick={() => onTabChange("api-docs")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "api-docs" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <Code className="w-5 h-5 mr-3" />
          <span>API Docs</span>
        </button>
        
        <button
          onClick={() => onTabChange("database")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "database" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <Database className="w-5 h-5 mr-3" />
          <span>Database</span>
        </button>
        
        <button
          onClick={() => onTabChange("analytics")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "analytics" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          <span>Analytics</span>
        </button>
        
        <button
          onClick={() => onTabChange("terminal")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "terminal" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <Terminal className="w-5 h-5 mr-3" />
          <span>Terminal</span>
        </button>
        
        <button
          onClick={() => onTabChange("git")}
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === "git" ? "bg-sky-500/10 text-sky-400" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <GitBranch className="w-5 h-5 mr-3" />
          <span>Version Control</span>
        </button>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <Link
          to="/"
          className="flex items-center justify-center py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          <span>Kembali ke Website</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
