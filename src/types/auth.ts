
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  photoURL?: string;
  lastLogin?: Date;
  securityLevel?: 'standard' | 'enhanced' | 'maximum';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  checkPasswordStrength: (password: string) => {
    score: number;
    feedback: string;
  };
  updateSecurityLevel: (level: 'standard' | 'enhanced' | 'maximum') => void;
  logoutFromAllDevices?: () => void;
}
