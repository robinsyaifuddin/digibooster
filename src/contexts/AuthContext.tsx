
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  checkSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  checkSession: async () => {},
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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        setUser(data.user);
        toast({
          title: "Login berhasil!",
          description: "Selamat datang kembali di DigiBooster",
        });
        navigate('/admin');
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
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'user',
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        setUser(data.user);
        toast({
          title: "Registrasi berhasil!",
          description: "Akun Anda telah dibuat, silahkan cek email untuk verifikasi",
        });
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

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
