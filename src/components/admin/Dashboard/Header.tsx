
import { Bell, Filter, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  activeTab: string;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header = ({ activeTab, setMobileMenuOpen }: HeaderProps) => {
  return (
    <header className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          className="md:hidden text-gray-500 mr-3"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          {activeTab === 'overview' && 'Dashboard'}
          {activeTab === 'users' && 'Kelola Pengguna'}
          {activeTab === 'content' && 'Kelola Konten'}
          {activeTab === 'services' && 'Kelola Layanan'}
          {activeTab === 'settings' && 'Pengaturan Website'}
          {activeTab === 'profile' && 'Profil Admin'}
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex relative">
          <Input
            placeholder="Cari..."
            className="w-64 pr-8"
          />
          <Button variant="ghost" className="absolute right-0 top-0 h-full aspect-square p-0">
            <Filter className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
        
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Admin" />
            <AvatarFallback className="bg-diginavy text-white">AD</AvatarFallback>
          </Avatar>
          <span className="ml-2 font-medium text-sm hidden md:inline">Admin DigiBooster</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
