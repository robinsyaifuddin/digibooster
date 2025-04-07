import { Home, Menu, Users, FileText, LayoutDashboard, Settings, User } from "lucide-react";
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
        <SheetContent side="left" className="p-0 w-[260px] bg-dark-100 border-dark-300 text-white">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-dark-300">
              <h2 className="text-xl font-bold text-neon-purple">DigiBooster</h2>
            </div>
            
            <nav className="flex-1 py-4">
              <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Menu Utama</div>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'overview' ? 'bg-neon-purple/20 text-neon-purple' : 'text-gray-300 hover:bg-dark-200'}`}
                onClick={() => handleTabChange('overview')}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'users' ? 'bg-neon-purple/20 text-neon-purple' : 'text-gray-300 hover:bg-dark-200'}`}
                onClick={() => handleTabChange('users')}
              >
                <Users className="w-5 h-5 mr-3" />
                <span>Pengguna</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'content' ? 'bg-neon-purple/20 text-neon-purple' : 'text-gray-300 hover:bg-dark-200'}`}
                onClick={() => handleTabChange('content')}
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>Konten</span>
              </button>
              
              <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Pengaturan</div>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'settings' ? 'bg-neon-purple/20 text-neon-purple' : 'text-gray-300 hover:bg-dark-200'}`}
                onClick={() => handleTabChange('settings')}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Pengaturan Website</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'profile' ? 'bg-neon-purple/20 text-neon-purple' : 'text-gray-300 hover:bg-dark-200'}`}
                onClick={() => handleTabChange('profile')}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Profil Admin</span>
              </button>
            </nav>
            
            <div className="p-4 border-t border-dark-300">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center border-dark-300 text-white hover:bg-dark-200"
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
        <Button className="rounded-full w-14 h-14 shadow-lg bg-neon-purple text-white hover:bg-neon-violet" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};

export default MobileSidebar;
