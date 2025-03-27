
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
        <SheetContent side="left" className="p-0 w-[260px]">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-200">
              <img 
                src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" 
                alt="DigiBooster Logo" 
                className="h-8" 
              />
            </div>
            
            <nav className="flex-1 py-4">
              <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Menu Utama</div>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'overview' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleTabChange('overview')}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'users' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleTabChange('users')}
              >
                <Users className="w-5 h-5 mr-3" />
                <span>Pengguna</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'content' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleTabChange('content')}
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>Konten</span>
              </button>
              
              <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Pengaturan</div>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'settings' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleTabChange('settings')}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Pengaturan Website</span>
              </button>
              
              <button 
                className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'profile' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleTabChange('profile')}
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
        </SheetContent>
      </Sheet>
      
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <Button className="rounded-full w-14 h-14 shadow-lg bg-diginavy text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};

export default MobileSidebar;
