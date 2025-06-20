import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from '@/types/auth';
import { checkPasswordStrength } from '@/utils/securityUtils';

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isAuthenticated: false,
  checkSession: async () => {},
  checkPasswordStrength: (password) => ({ score: 0, feedback: '' }),
  updateSecurityLevel: () => {},
  logoutFromAllDevices: async () => {},
  loginWithGoogle: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check session on mount
  useEffect(() => {
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth session:', error);
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Handle hardcoded demo credentials
      if (email === 'pengguna@gmail.com' && password === 'pengguna123') {
        const mockUserData = {
          id: '1',
          email: 'pengguna@gmail.com',
          role: 'user',
          user_metadata: { name: 'Pengguna Demo', role: 'user' }
        };
        setUser(mockUserData as any);
        return;
      }
      
      if (email === 'admin.digibooster@gmail.com' && password === 'digibooster123') {
        const mockAdminData = {
          id: '2',
          email: 'admin.digibooster@gmail.com',
          role: 'admin',
          user_metadata: { name: 'Admin DigiBooster', role: 'admin' }
        };
        setUser(mockAdminData as any);
        return;
      }
      
      // Try regular Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        setUser(data.user);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login');
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error.message || "Email atau password salah",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Login with Google error:', error);
      setError(error.message || 'Failed to login with Google');
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error.message || "Gagal login dengan Google",
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        setUser(data.user);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login');
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error.message || "Email atau password salah",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    return signUp(email, password, { name });
  };

  const signUp = async (email: string, password: string, data?: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: data?.name || '',
            role: 'user',
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (authData?.user) {
        setUser(authData.user);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register');
      toast({
        variant: "destructive",
        title: "Registrasi gagal",
        description: error.message || "Gagal membuat akun",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    return signOut();
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      navigate('/');
      toast({
        title: "Logout berhasil",
        description: "Anda telah keluar dari akun",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      setError(error.message || 'Failed to logout');
      toast({
        variant: "destructive",
        title: "Logout gagal",
        description: error.message,
      });
    }
  };
  
  const logoutFromAllDevices = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      navigate('/');
      toast({
        title: "Logout berhasil",
        description: "Anda telah keluar dari semua perangkat",
      });
    } catch (error: any) {
      console.error('Global logout error:', error);
      setError(error.message || 'Failed to logout from all devices');
      toast({
        variant: "destructive",
        title: "Logout gagal",
        description: error.message || "Gagal keluar dari semua perangkat",
      });
    }
  };
  
  const updateSecurityLevel = (level: 'standard' | 'enhanced' | 'maximum') => {
    if (user) {
      const updatedUser = { ...user, securityLevel: level };
      setUser(updatedUser as any);
      
      toast({
        title: "Level keamanan diperbarui",
        description: `Level keamanan akun telah diubah ke ${level}`,
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        signIn: login,
        signUp,
        signOut: logout,
        isAuthenticated: !!user,
        checkSession,
        checkPasswordStrength,
        updateSecurityLevel,
        logoutFromAllDevices,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
