
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Globe,
  Settings,
  User,
  Database,
  Code,
  ExternalLink,
  BarChart,
  Terminal,
  GitBranch
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";
import { motion } from "framer-motion";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const { isRealImplementation } = useImplementationSettings();

  const tabs = [
    {
      id: "overview",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "users",
      label: "Pengguna",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "content",
      label: "Konten",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "services",
      label: "Layanan",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "Pengaturan",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: "profile",
      label: "Profil",
      icon: <User className="h-5 w-5" />,
    },
  ];
  
  const devTabs = [
    {
      id: "api-docs",
      label: "Dokumentasi API",
      icon: <Code className="h-5 w-5" />,
    },
    {
      id: "database",
      label: "Database",
      icon: <Database className="h-5 w-5" />,
      status: isRealImplementation
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: <Terminal className="h-5 w-5" />,
    },
    {
      id: "git",
      label: "Version Control",
      icon: <GitBranch className="h-5 w-5" />,
    }
  ];

  return (
    <aside className="hidden md:flex flex-col bg-white border-r w-64 h-screen sticky top-0">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="bg-dark text-white rounded-md h-8 w-8 flex items-center justify-center font-bold text-xl">
          D
        </div>
        <span className="font-bold text-lg">DigiBooster</span>
        {isRealImplementation && (
          <span className="flex h-2 w-2 bg-digicyan rounded-full ml-1"></span>
        )}
      </div>
      
      <div className="flex flex-col gap-1 p-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={cn("justify-start gap-3 h-10", {
              "bg-gray-100 text-digicyan font-medium": activeTab === tab.id,
            })}
            onClick={() => onTabChange(tab.id)}
          >
            {activeTab === tab.id ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-digicyan"
              >
                {tab.icon}
              </motion.div>
            ) : (
              tab.icon
            )}
            {tab.label}
            {tab.id === 'services' && (
              <span className="ml-auto flex h-2 w-2 rounded-full bg-digicyan"></span>
            )}
          </Button>
        ))}
      </div>

      <div className="mt-4 px-2">
        <div className="text-xs font-medium text-gray-500 px-3 py-2">
          DEVELOPER
        </div>
        <div className="flex flex-col gap-1">
          {devTabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn("justify-start gap-3 h-10", {
                "bg-gray-100 text-digicyan font-medium": activeTab === tab.id,
              })}
              onClick={() => onTabChange(tab.id)}
            >
              {activeTab === tab.id ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-digicyan"
                >
                  {tab.icon}
                </motion.div>
              ) : (
                tab.icon
              )}
              <span className="flex-1 text-left">{tab.label}</span>
              {tab.id === 'database' && (
                <span className={`h-2 w-2 rounded-full ${isRealImplementation ? 'bg-green-500' : 'bg-amber-500'}`}></span>
              )}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between items-center"
                onClick={() => window.open('/', '_blank')}
              >
                <span>Lihat Website</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Buka website di tab baru</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="mt-4 text-xs text-center text-gray-500">
          <p>DigiBooster Admin v1.0</p>
          <p className="mt-1">{isRealImplementation ? 'Live Mode' : 'Simulation Mode'}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
