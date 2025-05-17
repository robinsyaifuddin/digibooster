
import { Home, Menu, Users, FileText, LayoutDashboard, Settings, User, Code, Database, BarChart3, Terminal, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

interface MobileSidebarProps {
  activeTab: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onTabChange: (tab: string) => void;
}

const MobileSidebar = ({ 
  activeTab, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onTabChange 
}: MobileSidebarProps) => {
  const navigate = useNavigate();
  
  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[260px] bg-gray-900 border-gray-800 text-white">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">
                <span className="text-sky-400">Digi</span>Booster
              </h2>
            </div>
            
            <nav className="flex-1 py-4">
              <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Menu Utama</div>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'overview' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('overview')}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'users' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('users')}
              >
                <Users className="w-5 h-5 mr-3" />
                <span>Pengguna</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'content' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('content')}
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>Konten</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'services' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('services')}
              >
                <Code className="w-5 h-5 mr-3" />
                <span>Layanan</span>
              </button>
              
              <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Pengaturan</div>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'settings' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('settings')}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Pengaturan Website</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'profile' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('profile')}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Profil Admin</span>
              </button>
              
              <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Pengembang</div>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'api-docs' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('api-docs')}
              >
                <Code className="w-5 h-5 mr-3" />
                <span>API Docs</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'database' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('database')}
              >
                <Database className="w-5 h-5 mr-3" />
                <span>Database</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'analytics' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('analytics')}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                <span>Analytics</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'terminal' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('terminal')}
              >
                <Terminal className="w-5 h-5 mr-3" />
                <span>Terminal</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'git' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => handleTabChange('git')}
              >
                <GitBranch className="w-5 h-5 mr-3" />
                <span>Version Control</span>
              </button>
            </nav>
            
            <div className="p-4 border-t border-gray-800">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center border-gray-700 text-white hover:bg-gray-800"
                onClick={() => navigate('/')}
              >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Website
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <Button className="rounded-full w-14 h-14 shadow-lg bg-sky-500 text-white hover:bg-sky-600" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};

export default MobileSidebar;
