import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, ExternalLink, Briefcase, GraduationCap, ChevronDown, ChevronUp, Book, Folder, Info, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./ui/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { CommandMenu } from "./ui/CommandMenu";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const {
    t
  } = useLanguage();
  const {
    theme
  } = useTheme();
  const isMobile = useIsMobile();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const toggleSubmenu = (label: string) => {
    setExpandedSubmenu(expandedSubmenu === label ? null : label);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedSubmenu(null);
  }, [location.pathname]);
  const navbarVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  const submenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Modified icon styling to remove shadow
  const iconStyle = "h-5 w-5 mr-2";
  const iconClasses = cn(iconStyle, "transition-all duration-300", scrolled ? "text-primary" : "group-hover:text-primary");
  const navLinks = [{
    path: "/",
    label: "beranda",
    icon: <Home className={iconClasses} />
  }, {
    label: "program",
    icon: null,
    isDropdown: true,
    children: [{
      path: "/program/jasa-digital",
      label: "jasa-digital",
      icon: <Briefcase className="h-4 w-4 mr-2" />
    }, {
      path: "/kelas",
      label: "pelatihan-digital",
      icon: <GraduationCap className="h-4 w-4 mr-2" />
    }]
  }, {
    path: "/blog",
    label: "blog",
    icon: <Book className={iconClasses} />
  }, {
    path: "/portofolio",
    label: "portofolio",
    icon: <Folder className={iconClasses} />
  }, {
    path: "/tentang",
    label: "tentang",
    icon: <Info className={iconClasses} />
  }];
  return <motion.header className={cn("fixed top-0 left-0 w-full backdrop-blur-lg border-b z-50 transition-all duration-300", scrolled ? "bg-black/90 border-sky-500/20 shadow-lg shadow-sky-500/5" : "bg-black/70 border-dark-300/50", "after:absolute after:inset-0 after:bg-gradient-to-r after:from-sky-500/10 after:via-transparent after:to-sky-500/10 after:opacity-70 after:z-[-1]")} initial="hidden" animate="visible" variants={navbarVariants}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <motion.img src="/lovable-uploads/e03e3661-a304-4ddc-95ce-bd9a1827bd64.png" alt="DigiBooster" className="h-10 w-auto" whileHover={{
            scale: 1.05,
            filter: "drop-shadow(0 0 8px rgba(3, 213, 235, 0.6))"
          }} transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }} />
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item, index) => !item.isDropdown ? <motion.div key={item.label} custom={index} variants={itemVariants} initial="hidden" animate="visible" whileHover="hover">
                  <Link to={item.path} className={cn("px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center relative group", isActive(item.path) ? "text-primary" : "text-gray-300 hover:text-white")}>
                    {item.icon}
                    {t(item.label)}
                    {isActive(item.path) && <motion.div className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-primary shadow-glow" layoutId="underline" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.3
              }} />}
                    <span className="absolute inset-0 rounded-md transition-colors duration-200 group-hover:bg-white/5"></span>
                  </Link>
                </motion.div> : <motion.div key={item.label} custom={index} variants={itemVariants} initial="hidden" animate="visible">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn("transition-colors duration-200", "bg-transparent hover:bg-white/5 focus:bg-dark-300 text-gray-300 hover:text-white data-[state=open]:bg-dark-300 data-[state=open]:text-primary")}>
                          {t(item.label)}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid grid-cols-1 gap-1 p-2 min-w-[180px] rounded-md shadow-lg bg-dark-200/95 backdrop-blur-xl border border-dark-300">
                            {item.children.map(child => <li key={child.label}>
                                <NavigationMenuLink asChild>
                                  <Link to={child.path} className={cn("block w-full select-none space-y-1 rounded-md px-3 py-2.5 leading-none no-underline outline-none transition-colors", isActive(child.path) ? "bg-primary/10 text-primary font-medium" : "text-gray-300 hover:bg-white/5 hover:text-white focus:bg-dark-300 focus:text-white")}>
                                    {child.icon}
                                    <div className="text-sm font-medium">
                                      {t(child.label)}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>)}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </motion.div>)}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Search Command */}
            <CommandMenu />

            {/* Language toggle */}
            <div className="flex items-center space-x-2 mr-2">
              <LanguageToggle />
            </div>

            {isAuthenticated ? <>
                <Link to="/admin">
                  <Button variant="outline" className="border-primary/40 bg-dark-300/50 text-white hover:bg-dark-300 hover:border-primary/80">
                    {t('dashboard')}
                  </Button>
                </Link>
                <Button onClick={logout} variant="ghost" className="text-white hover:bg-dark-300">
                  {t('keluar')}
                </Button>
              </> : <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-dark-300">
                    {t('masuk')}
                  </Button>
                </Link>
                <Link to="/register">
                  <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                    <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 text-gray-950">
                      {t('daftar')}
                    </Button>
                  </motion.div>
                </Link>
              </>}
          </div>

          <div className="flex md:hidden items-center space-x-3">
            {/* Mobile search */}
            <CommandMenu />
            
            {/* Mobile language toggle */}
            <LanguageToggle />

            <motion.button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 text-gray-400 hover:text-white hover:bg-dark-300" aria-label="Toggle menu" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
              <AnimatePresence initial={false} mode="wait">
                {mobileMenuOpen ? <motion.div key="close" initial={{
                rotate: -90,
                opacity: 0
              }} animate={{
                rotate: 0,
                opacity: 1
              }} exit={{
                rotate: 90,
                opacity: 0
              }} transition={{
                duration: 0.2
              }}>
                    <X className="block h-6 w-6 icon-3d" />
                  </motion.div> : <motion.div key="menu" initial={{
                rotate: 90,
                opacity: 0
              }} animate={{
                rotate: 0,
                opacity: 1
              }} exit={{
                rotate: -90,
                opacity: 0
              }} transition={{
                duration: 0.2
              }}>
                    <Menu className="block h-6 w-6 icon-3d" />
                  </motion.div>}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && <motion.div className="md:hidden border-t backdrop-blur-lg bg-dark-200/95 border-dark-300" initial="closed" animate="open" exit="closed" variants={mobileMenuVariants}>
            <div className="px-2 py-3 space-y-1 sm:px-3 max-h-[calc(100vh-4rem)] overflow-auto">
              {navLinks.map((item, index) => !item.isDropdown ? <motion.div key={item.label} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }}>
                    <Link to={item.path} className={cn("flex items-center px-3 py-2.5 rounded-md text-base font-medium", isActive(item.path) ? "text-primary bg-dark-300 shadow-inner" : "text-gray-300 hover:text-white hover:bg-dark-300")} onClick={toggleMobileMenu}>
                      {item.icon}
                      {t(item.label)}
                    </Link>
                  </motion.div> : <div key={item.label} className="py-2">
                    <motion.button initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.05
            }} onClick={() => toggleSubmenu(item.label)} className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium", expandedSubmenu === item.label ? "text-primary bg-dark-300/70" : "text-gray-300 hover:text-white hover:bg-dark-300/50")}>
                      <span>{t(item.label)}</span>
                      {expandedSubmenu === item.label ? <ChevronUp className="h-4 w-4 icon-3d" /> : <ChevronDown className="h-4 w-4 icon-3d" />}
                    </motion.button>
                    
                    <AnimatePresence>
                      {expandedSubmenu === item.label && <motion.div className="mt-1 space-y-1 pl-4" initial="closed" animate="open" exit="closed" variants={submenuVariants}>
                          {item.children.map((child, childIndex) => <motion.div key={child.label} initial={{
                  opacity: 0,
                  x: -5
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: childIndex * 0.1
                }}>
                              <Link to={child.path} className={cn("block px-4 py-2.5 rounded-md text-base font-medium transition-all flex items-center", isActive(child.path) ? "text-primary bg-primary/10" : "text-gray-300 hover:text-white hover:bg-dark-300/70")}>
                                {child.icon}
                                {t(child.label)}
                              </Link>
                            </motion.div>)}
                        </motion.div>}
                    </AnimatePresence>
                  </div>)}
              
              <div className="border-t pt-3 mt-3 border-dark-300">
                {isAuthenticated ? <>
                    <Link to="/admin" className="block px-3 py-2.5 rounded-md text-base font-medium mb-1 text-white bg-primary/20 hover:bg-primary/30" onClick={toggleMobileMenu}>
                      {t('dashboard')}
                    </Link>
                    <button onClick={() => {
                logout();
                toggleMobileMenu();
              }} className="w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-300">
                      {t('keluar')}
                    </button>
                  </> : <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" className="flex items-center justify-center px-3 py-2.5 rounded-md text-base font-medium text-gray-300 hover:text-white border border-gray-700 hover:bg-dark-300" onClick={toggleMobileMenu}>
                      {t('masuk')}
                    </Link>
                    <Link to="/register" onClick={toggleMobileMenu} className="flex items-center justify-center px-3 py-2.5 rounded-md text-base font-medium text-black transition-all bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                      {t('daftar')}
                    </Link>
                  </div>}
                
                <Link to="/" className="flex items-center justify-center gap-1.5 px-3 py-2.5 mt-2 rounded-md text-sm font-medium text-gray-400 hover:text-white" onClick={toggleMobileMenu}>
                  
                  
                </Link>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.header>;
};

export default Navbar;
