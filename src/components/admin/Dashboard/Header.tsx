
import React from "react";
import { Menu, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export interface HeaderProps {
  activeTab: string;
  toggleMobileMenu: () => void;
}

const Header = ({ activeTab, toggleMobileMenu }: HeaderProps) => {
  const { user, logout } = useAuth();
  
  // Get title based on active tab
  const getTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Dashboard Overview";
      case "users":
        return "Users Management";
      case "content":
        return "Content Management";
      case "services":
        return "Services Development";
      case "settings":
        return "Website Settings";
      case "profile":
        return "Admin Profile";
      case "api-docs":
        return "API Documentation";
      case "database":
        return "Database Monitor";
      case "analytics":
        return "Analytics Monitor";
      case "terminal":
        return "Terminal";
      case "git":
        return "Version Control";
      default:
        return "Dashboard";
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">{getTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || undefined} alt={user?.name || "User"} />
                <AvatarFallback className="bg-digicyan text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
