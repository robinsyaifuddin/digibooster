
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User, AuthContextType } from "@/types/auth";

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check active session on mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (data.session) {
          // Set user if there's an active session
          const userData = data.session.user;
          setUser({
            ...userData,
            name: userData.user_metadata?.name || userData.email?.split('@')[0] || 'User',
            role: userData.user_metadata?.role || 'user',
            created_at: userData.created_at
          } as User);
        }
      } catch (error: any) {
        console.error("Error checking session:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    // Check active session when the component mounts
    checkSession();
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userData = session.user;
          setUser({
            ...userData,
            name: userData.user_metadata?.name || userData.email?.split('@')[0] || 'User',
            role: userData.user_metadata?.role || 'user',
            created_at: userData.created_at
          } as User);
          setError(null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    // Clean up the subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // User data will be set via the auth state change listener
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      setError(error.message);
      throw error; // Re-throw for the component to catch
    } finally {
      setLoading(false);
    }
  };
  
  const signUp = async (email: string, password: string, userData?: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...userData,
            name: userData?.name || email.split('@')[0],
            role: 'user'
          }
        }
      });
      
      if (error) throw error;
      
      // We might not set the user here because email confirmation may be required
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setError(error.message);
      throw error; // Re-throw for the component to catch
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (email: string, password: string) => {
    return signIn(email, password);
  };
  
  const logout = async () => {
    return signOut();
  };
  
  const logoutFromAllDevices = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error("Error signing out from all devices:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    return signUp(email, password, { name });
  };
  
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      
      if (error) throw error;
      
      // User data will be set via the auth state change listener
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const updateSecurityLevel = (level: 'standard' | 'enhanced' | 'maximum') => {
    // Would implement actual security level changes in a real app
    console.log(`Security level updated to ${level}`);
  };
  
  return {
    user,
    signIn,
    signUp,
    signOut,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    loginWithGoogle,
    logoutFromAllDevices,
    updateSecurityLevel
  };
};
