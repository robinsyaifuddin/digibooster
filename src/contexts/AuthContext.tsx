
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '../hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('digibooster_user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('digibooster_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Hardcoded admin credentials
        if (email === 'digibooster@123' && password === 'digibooster@123') {
          const adminUser: User = {
            id: 'admin-1',
            name: 'Admin DigiBooster',
            email: 'digibooster@123',
            role: 'admin',
            createdAt: new Date(),
          };
          
          setUser(adminUser);
          localStorage.setItem('digibooster_user', JSON.stringify(adminUser));
          resolve();
        } else {
          // For demo purposes, allow any login
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: email.split('@')[0],
            email: email,
            role: 'user',
            createdAt: new Date(),
          };
          
          setUser(newUser);
          localStorage.setItem('digibooster_user', JSON.stringify(newUser));
          resolve();
        }
      }, 800);
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: name,
          email: email,
          role: 'user',
          createdAt: new Date(),
        };
        
        setUser(newUser);
        localStorage.setItem('digibooster_user', JSON.stringify(newUser));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('digibooster_user');
    toast({
      title: "Logout berhasil",
      description: "Anda telah berhasil keluar dari akun.",
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
