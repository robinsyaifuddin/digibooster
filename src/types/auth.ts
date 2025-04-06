
import { User as SupabaseUser } from "@supabase/supabase-js";

export interface User extends SupabaseUser {
  name?: string;
  role?: string;
  photoURL?: string;
  securityLevel?: 'standard' | 'enhanced' | 'maximum';
}

export interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, data?: Record<string, any>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  checkSession: () => Promise<void>;
  
  // Make sure these functions exist in the context
  checkPasswordStrength: (password: string) => { score: number, feedback: string };
  updateSecurityLevel: (level: 'standard' | 'enhanced' | 'maximum') => void;
  logoutFromAllDevices: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}
