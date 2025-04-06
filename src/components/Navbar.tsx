
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Home, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

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

  // Animation variants for the navbar
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

  // Animation variants for navigation items
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

  // Animation variants for mobile menu
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

  // Navigation links for desktop and mobile
  const navLinks = [
    { path: "/", label: "Beranda", icon: <Home className="h-4 w-4 mr-1" /> },
    { 
      label: "Program",
      icon: null,
      isDropdown: true,
      children: [
        { path: "/program/jasa-digital", label: "Jasa Digital" },
        { path: "/program/motivasi-edukasi", label: "Motivasi & Edukasi" },
        { path: "/program/sharing-konsultasi", label: "Sharing & Konsultasi" },
        { path: "/program/kelas", label: "Kelas" },
      ]
    },
    { path: "/blog", label: "Blog", icon: null },
    { path: "/portofolio", label: "Portofolio", icon: null },
    { path: "/tentang", label: "Tentang", icon: null },
  ];
  
  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 w-full backdrop-blur-lg border-b z-50 transition-all duration-300",
        scrolled ? "bg-dark/90 border-dark-300/50" : "bg-dark/70 border-transparent"
      )}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/63175a8a-8817-436e-8f8b-a3246a8bf733.png"
              alt="DigiBooster"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
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
                        ? "text-neon-cyan" 
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    {item.icon}
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-cyan rounded-full" 
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/5 transition-colors duration-200"></span>
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
                          "bg-transparent hover:bg-white/5 focus:bg-dark-300 transition-colors duration-200",
                          "text-gray-300 hover:text-white",
                          "data-[state=open]:bg-dark-300 data-[state=open]:text-neon-cyan"
                        )}>
                          {item.label} <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200" />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid grid-cols-1 gap-1 p-2 min-w-[180px] bg-dark-200/90 backdrop-blur-xl border border-dark-300 rounded-md shadow-lg">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.path}
                                    className={cn(
                                      "block w-full select-none space-y-1 rounded-md px-3 py-2.5 leading-none no-underline outline-none transition-colors",
                                      isActive(child.path) 
                                        ? "bg-neon-cyan/10 text-neon-cyan font-medium" 
                                        : "text-gray-300 hover:bg-white/5 hover:text-white focus:bg-dark-300 focus:text-white"
                                    )}
                                  >
                                    <div className="text-sm font-medium">
                                      {child.label}
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/admin">
                  <Button 
                    variant="outline" 
                    className="border-neon-cyan/40 bg-dark-300/50 text-white hover:bg-dark-300 hover:border-neon-cyan/80 transition-all duration-200"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={logout} 
                  variant="ghost" 
                  className="text-white hover:bg-dark-300 transition-all duration-200"
                >
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-dark-300 transition-all duration-200"
                  >
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className="bg-neon-cyan hover:bg-neon-blue text-white transition-all duration-200 shadow-lg shadow-neon-cyan/20 hover:shadow-neon-blue/30"
                  >
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-300 transition-colors duration-200"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-dark-200/95 backdrop-blur-lg border-t border-dark-300"
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
                          ? "text-neon-cyan bg-dark-300" 
                          : "text-gray-300 hover:text-white hover:bg-dark-300"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <div key={item.label} className="py-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1.5 font-medium text-gray-300"
                    >
                      {item.label}
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
                              "block px-4 py-2.5 rounded-md text-base font-medium transition-all",
                              isActive(child.path) 
                                ? "text-neon-cyan bg-neon-cyan/10" 
                                : "text-gray-300 hover:text-white hover:bg-dark-300/70"
                            )}
                            onClick={toggleMobileMenu}
                          >
                            {child.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              ))}
              
              {/* Auth buttons for mobile */}
              <div className="border-t border-dark-300 pt-3 mt-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/admin"
                      className="block px-3 py-2.5 rounded-md text-base font-medium text-white bg-neon-cyan/20 hover:bg-neon-cyan/30 mb-1"
                      onClick={toggleMobileMenu}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-300"
                    >
                      Keluar
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-3 py-2.5 rounded-md text-base font-medium text-gray-300 hover:text-white border border-gray-700 hover:bg-dark-300"
                      onClick={toggleMobileMenu}
                    >
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center px-3 py-2.5 rounded-md text-base font-medium text-white bg-neon-cyan hover:bg-neon-blue transition-all"
                      onClick={toggleMobileMenu}
                    >
                      Daftar
                    </Link>
                  </div>
                )}
                
                <Link
                  to="/"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 mt-2 rounded-md text-sm font-medium text-gray-400 hover:text-white"
                  onClick={toggleMobileMenu}
                >
                  <span>Beranda</span>
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
