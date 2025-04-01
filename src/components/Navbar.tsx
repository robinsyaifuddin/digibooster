
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close the mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-cyber-darker/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-cyber-accent font-display text-2xl font-bold">
              <span className="cyber-glow" style={{ "--glow-color": "rgba(75, 255, 209, 0.7)" } as React.CSSProperties}>DIGI</span>
              <span className="text-white">BOOSTER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn('nav-link', isActive('/') && 'active')}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={cn('nav-link', isActive('/blog') && 'active')}
            >
              Blog
            </Link>
            <Link
              to="/portfolio"
              className={cn('nav-link', isActive('/portfolio') && 'active')}
            >
              Portfolio
            </Link>
            <Link
              to="/about"
              className={cn('nav-link', isActive('/about') && 'active')}
            >
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || ''} alt={user.name || 'User'} />
                      <AvatarFallback className="bg-cyber-primary/20 text-cyber-accent">
                        {user.name ? user.name[0] : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-cyber-accent">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-cyber-accent hover:bg-cyber-accent/90">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyber-darker border-t border-cyber-primary/20">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={cn('nav-link text-lg py-2', isActive('/') && 'active')}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className={cn('nav-link text-lg py-2', isActive('/blog') && 'active')}
              >
                Blog
              </Link>
              <Link
                to="/portfolio"
                className={cn('nav-link text-lg py-2', isActive('/portfolio') && 'active')}
              >
                Portfolio
              </Link>
              <Link
                to="/about"
                className={cn('nav-link text-lg py-2', isActive('/about') && 'active')}
              >
                About
              </Link>
              
              <div className="pt-4 border-t border-cyber-primary/20">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url || ''} alt={user.name || 'User'} />
                        <AvatarFallback className="bg-cyber-primary/20 text-cyber-accent">
                          {user.name ? user.name[0] : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-white/60">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Link to="/dashboard" className="flex-1">
                        <Button variant="outline" className="w-full">
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => signOut()}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <Link to="/login" className="flex-1">
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <Button className="w-full bg-cyber-accent hover:bg-cyber-accent/90">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
