
import { createContext, useContext, ReactNode } from 'react';
import { useAuthProvider } from '../hooks/useAuthProvider';
import { AuthContextType } from '../types/auth';
import { checkPasswordStrength as checkPwdStrength } from '../utils/securityUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export checkPasswordStrength untuk kemudahan penggunaan
export const checkPasswordStrength = checkPwdStrength;
