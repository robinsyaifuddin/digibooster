
import { Home, Users, FileText, LayoutDashboard, LayoutGrid, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <img 
          src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" 
          alt="DigiBooster Logo" 
          className="h-8 mx-auto md:mx-0" 
        />
      </div>
      
      <nav className="flex-1 py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Menu Utama</div>
        
        <button 
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'overview' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => onTabChange('overview')}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'users' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => onTabChange('users')}
        >
          <Users className="w-5 h-5 mr-3" />
          <span>Pengguna</span>
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'content' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => onTabChange('content')}
        >
          <FileText className="w-5 h-5 mr-3" />
          <span>Konten</span>
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'services' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => onTabChange('services')}
        >
          <LayoutGrid className="w-5 h-5 mr-3" />
          <span>Layanan</span>
        </button>
        
        <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Pengaturan</div>
        
        <button 
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'settings' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => onTabChange('settings')}
        >
          <Settings className="w-5 h-5 mr-3" />
          <span>Pengaturan Website</span>
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'profile' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => onTabChange('profile')}
        >
          <User className="w-5 h-5 mr-3" />
          <span>Profil Admin</span>
        </button>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center"
          onClick={() => navigate('/')}
        >
          <Home className="w-4 h-4 mr-2" />
          Kembali ke Website
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
