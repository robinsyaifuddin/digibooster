
import { User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, data?: Record<string, any>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
</lov-code>
