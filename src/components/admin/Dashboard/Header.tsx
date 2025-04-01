
import { Bell, ChevronDown, User, Settings, MenuIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeaderProps {
  activeTab: string;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header = ({ activeTab, setMobileMenuOpen }: HeaderProps) => {
  const { user, logout } = useAuth();
  const { isRealImplementation } = useImplementationSettings();
  
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Dashboard Admin';
      case 'users':
        return 'Manajemen Pengguna';
      case 'content':
        return 'Manajemen Konten';
      case 'services':
        return 'Layanan & Pengembangan';
      case 'settings':
        return 'Pengaturan Website';
      case 'profile':
        return 'Profil Admin';
      default:
        return 'Dashboard Admin';
    }
  };

  return (
    <header className="bg-dark-200 border-b border-dark-300 sticky top-0 z-10">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:bg-dark-300" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          
          <h1 className="text-xl md:text-2xl font-bold text-white">{getHeaderTitle()}</h1>
          
          {isRealImplementation ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className="hidden md:flex items-center ml-2 bg-green-900/30 text-green-400 border-green-700"
                  >
                    <span className="h-2 w-2 mr-1 rounded-full bg-green-500"></span>
                    Live
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-dark-200 border-dark-300 text-green-400">
                  <p className="text-xs">Implementasi nyata aktif - terhubung ke Supabase</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className="hidden md:flex items-center ml-2 bg-amber-900/30 text-amber-400 border-amber-700"
                  >
                    <span className="h-2 w-2 mr-1 rounded-full bg-amber-500"></span>
                    Simulasi
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-dark-200 border-dark-300 text-amber-400">
                  <p className="text-xs">Mode simulasi - data hanya disimpan secara lokal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-dark-300">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifikasi</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[9px] font-medium text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[300px] bg-dark-200 border-dark-300 text-white">
              <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-dark-300" />
              {[
                { id: 1, title: "Pendaftaran pengguna baru", time: "5 menit yang lalu", read: false },
                { id: 2, title: "Komentar baru di artikel", time: "1 jam yang lalu", read: false },
                { id: 3, title: "Pembaruan sistem tersedia", time: "3 jam yang lalu", read: false },
              ].map(notification => (
                <DropdownMenuItem key={notification.id} className="py-2 px-3 flex flex-col items-start gap-1 hover:bg-dark-300 focus:bg-dark-300">
                  <div className="flex justify-between w-full">
                    <span className={`text-sm font-medium ${notification.read ? 'text-gray-400' : 'text-white'}`}>
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-neon-purple"></span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-dark-300" />
              <Button variant="ghost" className="w-full justify-center text-sm text-white hover:bg-dark-300" size="sm">
                Lihat semua notifikasi
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pr-1 text-white hover:bg-dark-300">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-neon-purple text-white">AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm font-medium text-left">
                  Admin DigiBooster
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-dark-200 border-dark-300 text-white">
              <DropdownMenuLabel>Admin DigiBooster</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-dark-300" />
              <DropdownMenuItem className="flex items-center gap-2 text-white hover:bg-dark-300 focus:bg-dark-300">
                <User size={16} />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-white hover:bg-dark-300 focus:bg-dark-300">
                <Settings size={16} />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-dark-300" />
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-400 hover:bg-dark-300 focus:bg-dark-300" 
                onClick={() => logout?.()}
              >
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
