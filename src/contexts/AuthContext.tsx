
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the user type
type User = {
  name: string | null;
  email: string | null;
  photoURL: string | null;
};

// Define the auth context type
type AuthContextType = {
  user: User | null;
  signOut: () => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  signOut: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Mock sign out function
  const signOut = () => {
    setUser(null);
  };

  // Mock auth state - in a real app this would connect to your auth service
  useEffect(() => {
    // Simulate a logged-in user for demonstration
    const mockUser = {
      name: 'Demo User',
      email: 'user@example.com',
      photoURL: 'https://randomuser.me/api/portraits/women/1.jpg',
    };
    
    // Uncomment to simulate a logged-in user
    // setUser(mockUser);
  }, []);

  // Provide auth context to children
  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
