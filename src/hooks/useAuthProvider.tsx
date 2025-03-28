
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, User } from '../types/auth';
import { toast } from '@/hooks/use-toast';
import { checkPasswordStrength } from '../utils/securityUtils';

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize auth state from Supabase
  useEffect(() => {
    // First set up the auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoading(true);
        
        if (session && session.user) {
          // Get the user profile from the profiles table
          const fetchUserProfile = async () => {
            try {
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (error) {
                console.error('Error fetching user profile:', error);
                return;
              }

              if (data) {
                const userWithProfile: User = {
                  id: session.user.id,
                  email: session.user.email || '',
                  name: data.name || '',
                  role: data.role || 'user',
                  createdAt: new Date(session.user.created_at),
                  photoURL: data.avatar_url,
                  securityLevel: 'standard',
                };
                setUser(userWithProfile);
                setIsAuthenticated(true);
              }
            } catch (error) {
              console.error('Error in profile fetch:', error);
            } finally {
              setIsLoading(false);
            }
          };

          // Use setTimeout to prevent auth deadlock
          setTimeout(() => {
            fetchUserProfile();
          }, 0);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Initial auth state is handled by the listener above
      if (!session) {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error logging in with Google:', error.message);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Check password strength before registration
      const strengthCheck = checkPasswordStrength(password);
      if (strengthCheck.score < 3) {
        toast({
          title: "Password terlalu lemah",
          description: strengthCheck.feedback,
          variant: "destructive",
        });
        throw new Error("Password terlalu lemah");
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error registering:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  const logoutFromAllDevices = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      toast({
        title: "Berhasil keluar",
        description: "Anda telah keluar dari semua perangkat",
      });
    } catch (error: any) {
      console.error('Error logging out from all devices:', error.message);
      toast({
        title: "Gagal keluar",
        description: "Terjadi kesalahan saat keluar dari semua perangkat",
        variant: "destructive",
      });
    }
  };

  const updateSecurityLevel = (level: 'standard' | 'enhanced' | 'maximum') => {
    if (user) {
      const updatedUser = { ...user, securityLevel: level };
      setUser(updatedUser);
      
      toast({
        title: "Level keamanan diperbarui",
        description: `Level keamanan akun telah diubah ke ${level}`,
      });
    }
  };

  return {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    isAuthenticated,
    isLoading,
    checkPasswordStrength,
    updateSecurityLevel,
    logoutFromAllDevices,
  };
};
