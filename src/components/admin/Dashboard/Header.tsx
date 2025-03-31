
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
  const { user, signOut } = useAuth();
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
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          
          <h1 className="text-xl md:text-2xl font-bold">{getHeaderTitle()}</h1>
          
          {isRealImplementation ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className="hidden md:flex items-center ml-2 bg-green-50 text-green-700 border-green-200"
                  >
                    <span className="h-2 w-2 mr-1 rounded-full bg-green-500"></span>
                    Live
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-green-50 border-green-200 text-green-700">
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
                    className="hidden md:flex items-center ml-2 bg-amber-50 text-amber-700 border-amber-200"
                  >
                    <span className="h-2 w-2 mr-1 rounded-full bg-amber-500"></span>
                    Simulasi
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-amber-50 border-amber-200 text-amber-700">
                  <p className="text-xs">Mode simulasi - data hanya disimpan secara lokal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifikasi</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[9px] font-medium text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[300px]">
              <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { id: 1, title: "Pendaftaran pengguna baru", time: "5 menit yang lalu", read: false },
                { id: 2, title: "Komentar baru di artikel", time: "1 jam yang lalu", read: false },
                { id: 3, title: "Pembaruan sistem tersedia", time: "3 jam yang lalu", read: false },
              ].map(notification => (
                <DropdownMenuItem key={notification.id} className="py-2 px-3 flex flex-col items-start gap-1 hover:bg-gray-50">
                  <div className="flex justify-between w-full">
                    <span className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-black'}`}>
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <Button variant="ghost" className="w-full justify-center text-sm" size="sm">
                Lihat semua notifikasi
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pr-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-diginavy text-white">AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm font-medium text-left">
                  Admin DigiBooster
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin DigiBooster</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <User size={16} />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings size={16} />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-600" 
                onClick={() => signOut?.()}
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
