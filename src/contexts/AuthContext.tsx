
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';
import { supabase } from '../integrations/supabase/client';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => void;
  signOut: () => void; // Added for compatibility
  loading: boolean;
  isAuthenticated: boolean;
  checkPasswordStrength?: (password: string) => { score: number; feedback: string };
  updateSecurityLevel?: (level: string) => Promise<boolean>;
  logoutFromAllDevices?: () => Promise<boolean>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  signOut: () => {}, // Added for compatibility
  loading: true,
  isAuthenticated: false
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if there's a user already logged in
    const checkUser = async () => {
      try {
        // For now, simulate a logged-in user for demo purposes
        const storedUser = localStorage.getItem('digibooster_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else if (window.location.pathname.includes('/admin')) {
          // Auto-login as admin for demo purposes when visiting admin page
          const demoAdminUser = {
            id: 'admin-123',
            email: 'digibooster@123',
            name: 'Admin DigiBooster',
            role: 'admin',
            securityLevel: 'high' // Added security level
          };
          setUser(demoAdminUser);
          localStorage.setItem('digibooster_user', JSON.stringify(demoAdminUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, we'll just simulate a login
      if (email === 'digibooster@123' && password === 'admin123') {
        const adminUser = {
          id: 'admin-123',
          email: 'digibooster@123',
          name: 'Admin DigiBooster',
          role: 'admin',
          securityLevel: 'high' // Added security level
        };
        
        setUser(adminUser);
        localStorage.setItem('digibooster_user', JSON.stringify(adminUser));
        return { success: true };
      }
      
      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // For demo purposes, we'll just simulate a registration
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'user',
        securityLevel: 'medium' // Added security level
      };
      
      setUser(newUser);
      localStorage.setItem('digibooster_user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('digibooster_user');
  };

  // Adding the missing functions to fix TypeScript errors
  const checkPasswordStrength = (password: string) => {
    // Simple implementation for demo
    const score = password.length >= 8 ? 
      (password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/) ? 4 : 
       password.match(/[A-Za-z]/) && password.match(/[0-9]/) ? 3 : 2) : 1;
       
    let feedback = '';
    switch(score) {
      case 1: feedback = 'Lemah - gunakan minimal 8 karakter'; break;
      case 2: feedback = 'Sedang - tambahkan angka dan huruf'; break;
      case 3: feedback = 'Kuat - tambahkan huruf kapital'; break;
      case 4: feedback = 'Sangat kuat'; break;
      default: feedback = 'Tidak valid';
    }
    
    return { score, feedback };
  };

  const updateSecurityLevel = async (level: string) => {
    try {
      if (user) {
        const updatedUser = { ...user, securityLevel: level };
        setUser(updatedUser);
        localStorage.setItem('digibooster_user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating security level:', error);
      return false;
    }
  };

  const logoutFromAllDevices = async () => {
    try {
      logout(); // For demo, just normal logout
      return true;
    } catch (error) {
      console.error('Error logging out from all devices:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        signOut: logout, // Make signOut an alias of logout
        loading,
        isAuthenticated: !!user,
        checkPasswordStrength,
        updateSecurityLevel,
        logoutFromAllDevices
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
