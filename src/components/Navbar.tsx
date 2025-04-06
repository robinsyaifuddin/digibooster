
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <motion.header 
      className="fixed top-0 left-0 w-full bg-dark/80 backdrop-blur-lg border-b border-dark-300/50 z-50"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png"
              alt="DigiBooster"
              className="h-8"
            />
            <span className="text-xl font-bold text-white">
              <span className="text-neon-purple">Digi</span>Booster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    "bg-transparent hover:bg-dark-300 focus:bg-dark-300",
                    "text-gray-300 hover:text-white",
                    "data-[state=open]:bg-dark-300"
                  )}>
                    Program <ChevronDown className="h-4 w-4 ml-1" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] bg-dark-200 border border-dark-300">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-dark-300/70 to-dark-100 p-6 no-underline outline-none focus:shadow-md"
                            to="/program/jasa-digital"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Jasa Digital
                            </div>
                            <p className="text-sm leading-tight text-gray-400">
                              Layanan jasa digital untuk kebutuhan bisnis dan personal Anda
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/program/motivasi-edukasi"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-dark-300 hover:text-white focus:bg-dark-300 focus:text-white"
                        >
                          <div className="text-sm font-medium leading-none text-white">
                            Motivasi & Edukasi
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                            Program motivasi dan edukasi untuk meningkatkan kemampuan digital
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/program/sharing-konsultasi"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-dark-300 hover:text-white focus:bg-dark-300 focus:text-white"
                        >
                          <div className="text-sm font-medium leading-none text-white">
                            Sharing & Konsultasi
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                            Sesi sharing dan konsultasi untuk masalah digital Anda
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/program/kelas"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-dark-300 hover:text-white focus:bg-dark-300 focus:text-white"
                        >
                          <div className="text-sm font-medium leading-none text-white">
                            Kelas
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                            Kelas dan pelatihan untuk meningkatkan skill digital
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link 
              to="/blog" 
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors", 
                isActive("/blog") 
                  ? "text-neon-purple bg-dark-300" 
                  : "text-gray-300 hover:text-white hover:bg-dark-300"
              )}
            >
              Blog
            </Link>
            
            <Link 
              to="/portofolio" 
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors", 
                isActive("/portofolio") 
                  ? "text-neon-purple bg-dark-300" 
                  : "text-gray-300 hover:text-white hover:bg-dark-300"
              )}
            >
              Portofolio
            </Link>
            
            <Link 
              to="/tentang" 
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors", 
                isActive("/tentang") 
                  ? "text-neon-purple bg-dark-300" 
                  : "text-gray-300 hover:text-white hover:bg-dark-300"
              )}
            >
              Tentang
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/admin">
                  <Button variant="outline" className="border-neon-purple/40 bg-dark-300/50 text-white hover:bg-dark-300 hover:border-neon-purple/80">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={logout} variant="ghost" className="text-white hover:bg-dark-300">
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-dark-300">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-neon-purple hover:bg-neon-violet text-white">
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-300"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-200 border-t border-dark-300">
          <div className="px-3 py-2 font-medium text-gray-300">Program</div>
          <Link
            to="/program/jasa-digital"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-300"
            onClick={toggleMobileMenu}
          >
            Jasa Digital
          </Link>
          <Link
            to="/program/motivasi-edukasi"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-300"
            onClick={toggleMobileMenu}
          >
            Motivasi & Edukasi
          </Link>
          <Link
            to="/program/sharing-konsultasi"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-300"
            onClick={toggleMobileMenu}
          >
            Sharing & Konsultasi
          </Link>
          <Link
            to="/program/kelas"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-300"
            onClick={toggleMobileMenu}
          >
            Kelas
          </Link>
          
          <div className="border-t border-dark-300 my-2"></div>
          
          <Link
            to="/blog"
            className={cn(
              "block px-3 py-2 rounded-md text-base font-medium",
              isActive("/blog") 
                ? "text-neon-purple bg-dark-300" 
                : "text-gray-300 hover:text-white hover:bg-dark-300"
            )}
            onClick={toggleMobileMenu}
          >
            Blog
          </Link>
          <Link
            to="/portofolio"
            className={cn(
              "block px-3 py-2 rounded-md text-base font-medium",
              isActive("/portofolio") 
                ? "text-neon-purple bg-dark-300" 
                : "text-gray-300 hover:text-white hover:bg-dark-300"
            )}
            onClick={toggleMobileMenu}
          >
            Portofolio
          </Link>
          <Link
            to="/tentang"
            className={cn(
              "block px-3 py-2 rounded-md text-base font-medium",
              isActive("/tentang") 
                ? "text-neon-purple bg-dark-300" 
                : "text-gray-300 hover:text-white hover:bg-dark-300"
            )}
            onClick={toggleMobileMenu}
          >
            Tentang
          </Link>
          
          {/* Auth buttons for mobile */}
          <div className="border-t border-dark-300 my-2"></div>
          
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-neon-purple/20 hover:bg-neon-purple/30"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-300"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-300"
                onClick={toggleMobileMenu}
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-neon-purple hover:bg-neon-violet"
                onClick={toggleMobileMenu}
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
