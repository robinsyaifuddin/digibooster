
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { AuthContextType } from "@/types/auth";
import { checkPasswordStrength as utilsCheckPasswordStrength } from "@/utils/securityUtils";

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
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
  
  const checkSession = async (): Promise<void> => {
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

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    signIn: login,
    signUp: (email, password, data) => register(email, password, data?.name || ''),
    signOut: logout,
    isAuthenticated: !!user,
    checkSession,
    checkPasswordStrength: utilsCheckPasswordStrength,
    updateSecurityLevel,
    logoutFromAllDevices,
    loginWithGoogle,
  };
};
