import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, ExternalLink, Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./ui/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
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
    hidden: { opacity: 0, y: -10 },
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

  const navLinks = [
    { path: "/", label: "beranda", icon: <Home className="h-4 w-4 mr-1" /> },
    { 
      label: "program",
      icon: null,
      isDropdown: true,
      children: [
        { path: "/program/jasa-digital", label: "jasa-digital", icon: <Briefcase className="h-4 w-4 mr-2" /> },
        { path: "/program/kelas", label: "shortclass-bootcamp", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
      ]
    },
    { path: "/blog", label: "blog", icon: null },
    { path: "/portofolio", label: "portofolio", icon: null },
    { path: "/tentang", label: "tentang", icon: null },
  ];
  
  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 w-full backdrop-blur-lg border-b z-50 transition-all duration-300",
        theme === 'dark'
          ? scrolled ? "bg-black/90 border-dark-300/50" : "bg-black/70 border-transparent"
          : scrolled ? "bg-white/90 border-gray-200" : "bg-white/70 border-transparent"
      )}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/63175a8a-8817-436e-8f8b-a3246a8bf733.png"
              alt="DigiBooster"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item, index) => (
              !item.isDropdown ? (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Link 
                    to={item.path} 
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center relative group", 
                      isActive(item.path) 
                        ? theme === 'dark' ? "text-neon-cyan" : "text-digicyan" 
                        : theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
                    )}
                  >
                    {item.icon}
                    {t(item.label)}
                    {isActive(item.path) && (
                      <motion.div 
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-0.5 rounded-full",
                          theme === 'dark' ? "bg-neon-cyan" : "bg-digicyan"
                        )}
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className={cn(
                      "absolute inset-0 rounded-md transition-colors duration-200",
                      theme === 'dark' 
                        ? "group-hover:bg-white/5" 
                        : "group-hover:bg-black/5"
                    )}></span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn(
                          "transition-colors duration-200",
                          theme === 'dark' 
                            ? "bg-transparent hover:bg-white/5 focus:bg-dark-300 text-gray-300 hover:text-white data-[state=open]:bg-dark-300 data-[state=open]:text-neon-cyan" 
                            : "bg-transparent hover:bg-black/5 focus:bg-gray-100 text-gray-700 hover:text-black data-[state=open]:bg-gray-100 data-[state=open]:text-digicyan"
                        )}>
                          {t(item.label)}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className={cn(
                            "grid grid-cols-1 gap-1 p-2 min-w-[180px] rounded-md shadow-lg", 
                            theme === 'dark' 
                              ? "bg-dark-200/90 backdrop-blur-xl border border-dark-300" 
                              : "bg-white/90 backdrop-blur-xl border border-gray-200"
                          )}>
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.path}
                                    className={cn(
                                      "block w-full select-none space-y-1 rounded-md px-3 py-2.5 leading-none no-underline outline-none transition-colors",
                                      isActive(child.path) 
                                        ? theme === 'dark'
                                          ? "bg-neon-cyan/10 text-neon-cyan font-medium" 
                                          : "bg-digicyan/10 text-digicyan font-medium" 
                                        : theme === 'dark'
                                          ? "text-gray-300 hover:bg-white/5 hover:text-white focus:bg-dark-300 focus:text-white"
                                          : "text-gray-700 hover:bg-black/5 hover:text-black focus:bg-gray-100 focus:text-black"
                                    )}
                                  >
                                    {child.icon}
                                    <div className="text-sm font-medium">
                                      {t(child.label)}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </motion.div>
              )
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language toggle */}
            <div className="flex items-center space-x-2 mr-2">
              <LanguageToggle />
            </div>

            {isAuthenticated ? (
              <>
                <Link to="/admin">
                  <Button 
                    variant="outline" 
                    className={cn(
                      "transition-all duration-200",
                      theme === 'dark'
                        ? "border-neon-cyan/40 bg-dark-300/50 text-white hover:bg-dark-300 hover:border-neon-cyan/80"
                        : "border-digicyan/40 bg-gray-100 text-gray-800 hover:bg-gray-200 hover:border-digicyan/80"
                    )}
                  >
                    {t('dashboard')}
                  </Button>
                </Link>
                <Button 
                  onClick={logout} 
                  variant="ghost" 
                  className={cn(
                    "transition-all duration-200",
                    theme === 'dark'
                      ? "text-white hover:bg-dark-300"
                      : "text-gray-800 hover:bg-gray-200"
                  )}
                >
                  {t('keluar')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "transition-all duration-200",
                      theme === 'dark'
                        ? "text-white hover:bg-dark-300"
                        : "text-gray-800 hover:bg-gray-200"
                    )}
                  >
                    {t('masuk')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className={cn(
                      "transition-all duration-200 shadow-lg",
                      theme === 'dark'
                        ? "bg-neon-cyan hover:bg-neon-blue text-white shadow-neon-cyan/20 hover:shadow-neon-blue/30"
                        : "bg-digicyan hover:bg-digicyan-600 text-white shadow-digicyan/20 hover:shadow-digicyan/30"
                    )}
                  >
                    {t('daftar')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile language toggle */}
            <LanguageToggle />

            <button
              onClick={toggleMobileMenu}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200",
                theme === 'dark'
                  ? "text-gray-400 hover:text-white hover:bg-dark-300"
                  : "text-gray-600 hover:text-black hover:bg-gray-200"
              )}
              aria-label="Toggle menu"
            >
              <AnimatePresence initial={false} mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={cn(
              "md:hidden border-t backdrop-blur-lg",
              theme === 'dark'
                ? "bg-dark-200/95 border-dark-300"
                : "bg-white/95 border-gray-200"
            )}
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="px-2 py-3 space-y-1 sm:px-3 max-h-[calc(100vh-4rem)] overflow-auto">
              {navLinks.map((item, index) => (
                !item.isDropdown ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2.5 rounded-md text-base font-medium",
                        isActive(item.path) 
                          ? theme === 'dark'
                            ? "text-neon-cyan bg-dark-300" 
                            : "text-digicyan bg-gray-100"
                          : theme === 'dark'
                            ? "text-gray-300 hover:text-white hover:bg-dark-300"
                            : "text-gray-700 hover:text-black hover:bg-gray-100"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {item.icon}
                      {t(item.label)}
                    </Link>
                  </motion.div>
                ) : (
                  <div key={item.label} className="py-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "px-3 py-1.5 font-medium",
                        theme === 'dark'
                          ? "text-gray-300"
                          : "text-gray-700"
                      )}
                    >
                      {t(item.label)}
                    </motion.div>
                    
                    <div className="mt-1 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <motion.div
                          key={child.label}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.05) + (childIndex * 0.03) }}
                        >
                          <Link
                            to={child.path}
                            className={cn(
                              "block px-4 py-2.5 rounded-md text-base font-medium transition-all flex items-center",
                              isActive(child.path)
                                ? theme === 'dark'
                                  ? "text-neon-cyan bg-neon-cyan/10" 
                                  : "text-digicyan bg-digicyan/10"
                                : theme === 'dark'
                                  ? "text-gray-300 hover:text-white hover:bg-dark-300/70"
                                  : "text-gray-700 hover:text-black hover:bg-gray-100/70"
                            )}
                            onClick={toggleMobileMenu}
                          >
                            {child.icon}
                            {t(child.label)}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              ))}
              
              <div className={cn(
                "border-t pt-3 mt-3",
                theme === 'dark' ? "border-dark-300" : "border-gray-200"
              )}>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/admin"
                      className={cn(
                        "block px-3 py-2.5 rounded-md text-base font-medium mb-1",
                        theme === 'dark'
                          ? "text-white bg-neon-cyan/20 hover:bg-neon-cyan/30"
                          : "text-gray-800 bg-digicyan/20 hover:bg-digicyan/30"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {t('dashboard')}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-md text-base font-medium",
                        theme === 'dark'
                          ? "text-gray-300 hover:text-white hover:bg-dark-300"
                          : "text-gray-700 hover:text-black hover:bg-gray-100"
                      )}
                    >
                      {t('keluar')}
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      className={cn(
                        "flex items-center justify-center px-3 py-2.5 rounded-md text-base font-medium",
                        theme === 'dark'
                          ? "text-gray-300 hover:text-white border border-gray-700 hover:bg-dark-300"
                          : "text-gray-700 hover:text-black border border-gray-300 hover:bg-gray-100"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {t('masuk')}
                    </Link>
                    <Link
                      to="/register"
                      className={cn(
                        "flex items-center justify-center px-3 py-2.5 rounded-md text-base font-medium text-white transition-all",
                        theme === 'dark'
                          ? "bg-neon-cyan hover:bg-neon-blue"
                          : "bg-digicyan hover:bg-digicyan-600"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {t('daftar')}
                    </Link>
                  </div>
                )}
                
                <Link
                  to="/"
                  className={cn(
                    "flex items-center justify-center gap-1.5 px-3 py-2.5 mt-2 rounded-md text-sm font-medium",
                    theme === 'dark'
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-black"
                  )}
                  onClick={toggleMobileMenu}
                >
                  <span>{t('lihat-website')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
