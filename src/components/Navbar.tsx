
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  BookOpen, 
  Briefcase, 
  Users, 
  User,
  LogOut,
  Grid
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut, logout } = useAuth();
  const location = useLocation();
  
  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Use either logout or signOut based on what's available
      if (logout) {
        await logout();
      } else if (signOut) {
        await signOut();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Monitor scroll position to change navbar styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-cyber-dark/90 backdrop-blur shadow-md py-3"
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-cyber-accent font-display text-2xl font-bold">
            <span className="cyber-glow" style={{/* @ts-ignore */ "--glow-color": "rgba(75, 255, 209, 0.7)"}}>DIGI</span>
            <span className="text-white">BOOSTER</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "inline-flex items-center justify-center py-2 text-sm font-medium transition-colors",
                    isActive('/') 
                      ? "text-cyber-accent" 
                      : "text-white/80 hover:text-cyber-accent"
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              {/* Blog */}
              <NavigationMenuItem>
                <Link to="/blog">
                  <NavigationMenuLink className={cn(
                    "inline-flex items-center justify-center py-2 text-sm font-medium transition-colors",
                    isActive('/blog') 
                      ? "text-cyber-accent" 
                      : "text-white/80 hover:text-cyber-accent"
                  )}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              {/* Programs Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-cyber-darker/60",
                  (isActive('/program/jasa-digital') || 
                   isActive('/program/motivasi-edukasi') || 
                   isActive('/program/sharing-konsultasi') || 
                   isActive('/program/kelas'))
                    ? "text-cyber-accent" 
                    : "text-white/80 hover:text-cyber-accent"
                )}>
                  Programs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px] bg-cyber-dark border border-cyber-primary/20">
                    <li>
                      <Link to="/program/jasa-digital">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cyber-primary/10 hover:text-cyber-accent">
                          Digital Services
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/program/motivasi-edukasi">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cyber-primary/10 hover:text-cyber-accent">
                          Motivation & Education
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/program/sharing-konsultasi">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cyber-primary/10 hover:text-cyber-accent">
                          Sharing & Consultation
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/program/kelas">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-cyber-primary/10 hover:text-cyber-accent">
                          Classes
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              {/* Portfolio */}
              <NavigationMenuItem>
                <Link to="/portofolio">
                  <NavigationMenuLink className={cn(
                    "inline-flex items-center justify-center py-2 text-sm font-medium transition-colors",
                    isActive('/portofolio') 
                      ? "text-cyber-accent" 
                      : "text-white/80 hover:text-cyber-accent"
                  )}>
                    Portfolio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              {/* About */}
              <NavigationMenuItem>
                <Link to="/tentang">
                  <NavigationMenuLink className={cn(
                    "inline-flex items-center justify-center py-2 text-sm font-medium transition-colors",
                    isActive('/tentang') 
                      ? "text-cyber-accent" 
                      : "text-white/80 hover:text-cyber-accent"
                  )}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Authentication buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" className="text-white/80 hover:text-cyber-accent hover:bg-cyber-darker/60">
                  <Link to="/admin">
                    <Grid className="mr-1 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white/80 hover:text-cyber-accent hover:bg-cyber-darker/60"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-white/80 hover:text-cyber-accent hover:bg-cyber-darker/60">
                  <Link to="/login">
                    <User className="mr-1 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild className="cyber-btn">
                  <Link to="/register">
                    Register
                  </Link>
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white" 
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'h-auto opacity-100 visible' : 'h-0 opacity-0 invisible'}`}>
        <div className="container mx-auto px-4 py-4 bg-cyber-dark border-t border-cyber-primary/20">
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                className={`flex items-center space-x-2 ${isActive('/') ? 'text-cyber-accent' : 'text-white/80'}`}
                onClick={() => setIsOpen(false)}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className={`flex items-center space-x-2 ${isActive('/blog') ? 'text-cyber-accent' : 'text-white/80'}`}
                onClick={() => setIsOpen(false)}
              >
                <BookOpen size={18} />
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-white/80">
                  <Briefcase size={18} />
                  <span>Programs</span>
                </div>
                <ul className="pl-6 space-y-2 border-l border-cyber-primary/30">
                  <li>
                    <Link 
                      to="/program/jasa-digital" 
                      className="text-white/70 hover:text-cyber-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      Digital Services
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/program/motivasi-edukasi" 
                      className="text-white/70 hover:text-cyber-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      Motivation & Education
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/program/sharing-konsultasi" 
                      className="text-white/70 hover:text-cyber-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      Sharing & Consultation
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/program/kelas" 
                      className="text-white/70 hover:text-cyber-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      Classes
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link 
                to="/portofolio" 
                className={`flex items-center space-x-2 ${isActive('/portofolio') ? 'text-cyber-accent' : 'text-white/80'}`}
                onClick={() => setIsOpen(false)}
              >
                <Briefcase size={18} />
                <span>Portfolio</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/tentang" 
                className={`flex items-center space-x-2 ${isActive('/tentang') ? 'text-cyber-accent' : 'text-white/80'}`}
                onClick={() => setIsOpen(false)}
              >
                <Users size={18} />
                <span>About</span>
              </Link>
            </li>
            <div className="pt-4 border-t border-cyber-primary/20">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="secondary" size="sm" className="justify-start">
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Grid className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="justify-start"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="secondary" size="sm" className="justify-start">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button asChild variant="default" size="sm" className="justify-start">
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
