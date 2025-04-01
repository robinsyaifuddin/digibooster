
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  
  // Handle logout
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-dark-100/95 backdrop-blur-md shadow-md py-2' : 'bg-dark-100/80 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" alt="DigiBooster Logo" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-neon-purple transition-colors">Program</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2 bg-dark-200 border border-dark-300 shadow-xl">
                      <Link to="/program/jasa-digital" className="block px-4 py-3 hover:bg-dark-300 text-gray-200 hover:text-neon-purple transition-colors duration-200 rounded">
                        Layanan Jasa Digital
                      </Link>
                      <Link to="/program/motivasi-edukasi" className="block px-4 py-3 hover:bg-dark-300 text-gray-200 hover:text-neon-purple transition-colors duration-200 rounded">
                        Motivasi dan Edukasi Digital
                      </Link>
                      <Link to="/program/sharing-konsultasi" className="block px-4 py-3 hover:bg-dark-300 text-gray-200 hover:text-neon-purple transition-colors duration-200 rounded">
                        Sharing dan Konsultasi Bisnis Digital
                      </Link>
                      <Link to="/program/kelas" className="block px-4 py-3 hover:bg-dark-300 text-gray-200 hover:text-neon-purple transition-colors duration-200 rounded">
                        Short Class dan Mini Bootcamp Digital
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/blog" className="text-white px-4 py-2 hover:text-neon-purple transition-colors">
                    Blog
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/portofolio" className="text-white px-4 py-2 hover:text-neon-purple transition-colors">
                    Portofolio
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/tentang" className="text-white px-4 py-2 hover:text-neon-purple transition-colors">
                    Tentang
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {user ? (
              <div className="relative dropdown group">
                <button className="flex items-center space-x-2 text-white hover:text-neon-purple transition-colors">
                  <User className="w-5 h-5" />
                  <span>{user.email}</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
                </button>
                <div className="dropdown-content w-48 right-0 rounded-xl shadow-lg border border-dark-300 bg-dark-200 overflow-hidden animate-scale-in">
                  <Link to="/profil" className="block px-4 py-3 hover:bg-dark-300 text-gray-200 transition-colors duration-200">Profil</Link>
                  {user.email === "digibooster@123" && (
                    <Link to="/admin" className="block px-4 py-3 hover:bg-dark-300 text-gray-200 transition-colors duration-200">Admin Dashboard</Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-3 hover:bg-dark-300 transition-colors duration-200 text-red-400"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="border-neon-purple text-white hover:bg-dark-300 hover:text-neon-purple transition-colors duration-300">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-neon-purple to-neon-violet hover:from-neon-violet hover:to-neon-purple text-white shadow-md hover:shadow-lg transition-all duration-300">
                    Daftar
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none text-white"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-dark-200 shadow-md mt-2 animate-fade-in">
          <div className="py-4 space-y-1">
            <div className="block px-6 py-2 font-medium text-neon-purple border-b border-dark-300">Program</div>
            <Link to="/program/jasa-digital" className="block px-8 py-3 text-sm text-gray-200" onClick={toggleMenu}>
              Layanan Jasa Digital
            </Link>
            <Link to="/program/motivasi-edukasi" className="block px-8 py-3 text-sm text-gray-200" onClick={toggleMenu}>
              Motivasi dan Edukasi Digital
            </Link>
            <Link to="/program/sharing-konsultasi" className="block px-8 py-3 text-sm text-gray-200" onClick={toggleMenu}>
              Sharing dan Konsultasi Bisnis Digital
            </Link>
            <Link to="/program/kelas" className="block px-8 py-3 text-sm text-gray-200" onClick={toggleMenu}>
              Short Class dan Mini Bootcamp Digital
            </Link>
            <Link to="/blog" className="block px-6 py-3 border-t border-dark-300 text-gray-200" onClick={toggleMenu}>Blog</Link>
            <Link to="/portofolio" className="block px-6 py-3 text-gray-200" onClick={toggleMenu}>Portofolio</Link>
            <Link to="/tentang" className="block px-6 py-3 text-gray-200" onClick={toggleMenu}>Tentang</Link>
            
            {user ? (
              <>
                <div className="border-t border-dark-300 my-2"></div>
                <Link to="/profil" className="block px-6 py-3 text-gray-200" onClick={toggleMenu}>Profil</Link>
                {user.email === "digibooster@123" && (
                  <Link to="/admin" className="block px-6 py-3 text-gray-200" onClick={toggleMenu}>Admin Dashboard</Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }} 
                  className="block w-full text-left px-6 py-3 text-red-400"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="flex justify-center space-x-4 px-6 py-4 border-t border-dark-300 mt-2">
                <Link to="/login" className="flex-1" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full border-neon-purple text-white hover:bg-dark-300">Masuk</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={toggleMenu}>
                  <Button className="w-full bg-neon-purple text-white hover:bg-neon-violet">Daftar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
