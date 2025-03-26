
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

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
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" alt="DigiBooster Logo" className="h-10 md:h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative dropdown group">
              <button className="nav-link flex items-center hover:text-diginavy transition-colors duration-300">
                Layanan <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
              </button>
              <div className="dropdown-content w-64 rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-scale-in">
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
            </div>
            <Link to="/blog" className="nav-link hover:text-diginavy transition-colors duration-300">Blog</Link>
            <Link to="/portofolio" className="nav-link hover:text-diginavy transition-colors duration-300">Portofolio</Link>
            <Link to="/tentang" className="nav-link hover:text-diginavy transition-colors duration-300">Tentang</Link>

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
                  <Button variant="outline" className="border-diginavy text-diginavy hover:bg-diginavy hover:text-white transition-colors duration-300">Masuk</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-diginavy text-white hover:bg-diginavy-800 transition-colors duration-300">Daftar</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
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
        <div className="md:hidden bg-white border-t mt-2 animate-fade-in">
          <div className="py-2 space-y-1">
            <div className="block px-4 py-2 font-medium">Layanan</div>
            <Link to="/layanan/jasa-digital" className="block px-8 py-2 text-sm">
              Layanan Jasa Digital
            </Link>
            <Link to="/layanan/motivasi-edukasi" className="block px-8 py-2 text-sm">
              Motivasi dan Edukasi Digital
            </Link>
            <Link to="/layanan/sharing-konsultasi" className="block px-8 py-2 text-sm">
              Sharing dan Konsultasi Bisnis Digital
            </Link>
            <Link to="/layanan/kelas" className="block px-8 py-2 text-sm">
              Short Class dan Mini Bootcamp Digital
            </Link>
            <Link to="/blog" className="block px-4 py-2">Blog</Link>
            <Link to="/portofolio" className="block px-4 py-2">Portofolio</Link>
            <Link to="/tentang" className="block px-4 py-2">Tentang</Link>
            
            {user ? (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <Link to="/profil" className="block px-4 py-2">Profil</Link>
                {user.email === "digibooster@123" && (
                  <Link to="/admin" className="block px-4 py-2">Admin Dashboard</Link>
                )}
                <button 
                  onClick={logout} 
                  className="block w-full text-left px-4 py-2 text-red-600"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="flex justify-start space-x-4 px-4 py-4">
                <Link to="/login">
                  <Button variant="outline" className="border-diginavy text-diginavy">Masuk</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-diginavy text-white hover:bg-diginavy-800">Daftar</Button>
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
