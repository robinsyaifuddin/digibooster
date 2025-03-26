
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  
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
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" alt="DigiBooster Logo" className="h-10 md:h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-diginavy">Layanan</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <Link to="/layanan/jasa-digital" className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                        Layanan Jasa Digital
                      </Link>
                      <Link to="/layanan/motivasi-edukasi" className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                        Motivasi dan Edukasi Digital
                      </Link>
                      <Link to="/layanan/sharing-konsultasi" className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                        Sharing dan Konsultasi Bisnis Digital
                      </Link>
                      <Link to="/layanan/kelas" className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                        Short Class dan Mini Bootcamp Digital
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/blog" className="text-diginavy px-4 py-2">
                    Blog
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/portofolio" className="text-diginavy px-4 py-2">
                    Portofolio
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/tentang" className="text-diginavy px-4 py-2">
                    Tentang
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {user ? (
              <div className="relative dropdown group">
                <button className="flex items-center space-x-2 text-diginavy">
                  <User className="w-5 h-5" />
                  <span>{user.email}</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
                </button>
                <div className="dropdown-content w-48 right-0 rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-scale-in">
                  <Link to="/profil" className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200">Profil</Link>
                  {user.email === "digibooster@123" && (
                    <Link to="/admin" className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200">Admin Dashboard</Link>
                  )}
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-red-600"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="border-digiblue-600 text-digiblue-600 hover:bg-digiblue-50 hover:text-digiblue-700 transition-colors duration-300">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-digiblue-600 text-white hover:bg-digiblue-700 transition-colors duration-300">
                    Daftar
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none text-diginavy"
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
        <div className="md:hidden bg-white shadow-md mt-2 animate-fade-in">
          <div className="py-4 space-y-1">
            <div className="block px-6 py-2 font-medium text-diginavy border-b border-gray-100">Layanan</div>
            <Link to="/layanan/jasa-digital" className="block px-8 py-3 text-sm">
              Layanan Jasa Digital
            </Link>
            <Link to="/layanan/motivasi-edukasi" className="block px-8 py-3 text-sm">
              Motivasi dan Edukasi Digital
            </Link>
            <Link to="/layanan/sharing-konsultasi" className="block px-8 py-3 text-sm">
              Sharing dan Konsultasi Bisnis Digital
            </Link>
            <Link to="/layanan/kelas" className="block px-8 py-3 text-sm">
              Short Class dan Mini Bootcamp Digital
            </Link>
            <Link to="/blog" className="block px-6 py-3 border-t border-gray-100">Blog</Link>
            <Link to="/portofolio" className="block px-6 py-3">Portofolio</Link>
            <Link to="/tentang" className="block px-6 py-3">Tentang</Link>
            
            {user ? (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <Link to="/profil" className="block px-6 py-3">Profil</Link>
                {user.email === "digibooster@123" && (
                  <Link to="/admin" className="block px-6 py-3">Admin Dashboard</Link>
                )}
                <button 
                  onClick={logout} 
                  className="block w-full text-left px-6 py-3 text-red-600"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="flex justify-center space-x-4 px-6 py-4 border-t border-gray-100 mt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-digiblue-600 text-digiblue-600">Masuk</Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="w-full bg-digiblue-600 text-white hover:bg-digiblue-700">Daftar</Button>
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
