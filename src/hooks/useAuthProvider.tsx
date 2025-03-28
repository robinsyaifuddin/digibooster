
import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { toast } from './use-toast';
import { generateCSRFToken, applyRateLimit, checkPasswordStrength } from '../utils/securityUtils';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Generate CSRF token
    setCsrfToken(generateCSRFToken());
    
    // Periksa token keamanan (JWT) yang disimpan
    const checkStoredToken = () => {
      // Check for existing user in localStorage
      const storedUser = localStorage.getItem('digibooster_user');
      const storedToken = localStorage.getItem('digibooster_auth_token');
      
      if (storedUser && storedToken) {
        try {
          // Validasi token - ini hanya simulasi
          // Dalam implementasi nyata, kita perlu verifikasi JWT dengan backend
          const tokenExpiry = localStorage.getItem('digibooster_token_expiry');
          
          if (tokenExpiry && new Date(tokenExpiry) > new Date()) {
            const userData = JSON.parse(storedUser);
            setUser({
              ...userData,
              lastLogin: new Date(),
              securityLevel: localStorage.getItem('digibooster_security_level') as any || 'standard'
            });
          } else {
            // Token kedaluwarsa, hapus data
            localStorage.removeItem('digibooster_user');
            localStorage.removeItem('digibooster_auth_token');
            localStorage.removeItem('digibooster_token_expiry');
          }
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('digibooster_user');
          localStorage.removeItem('digibooster_auth_token');
          localStorage.removeItem('digibooster_token_expiry');
        }
      }
      
      setIsLoading(false);
    };
    
    checkStoredToken();
    
    // Set interval untuk refresh token (simulasi)
    const tokenRefreshInterval = setInterval(() => {
      if (user) {
        // Refresh token - simulasi
        const newExpiry = new Date();
        newExpiry.setHours(newExpiry.getHours() + 2); // Token berlaku 2 jam
        localStorage.setItem('digibooster_token_expiry', newExpiry.toISOString());
      }
    }, 30 * 60 * 1000); // Refresh setiap 30 menit
    
    return () => {
      clearInterval(tokenRefreshInterval);
    };
  }, [user]);

  const login = async (email: string, password: string) => {
    // Periksa rate limiting
    if (applyRateLimit(email)) {
      toast({
        variant: "destructive",
        title: "Terlalu banyak percobaan",
        description: "Silakan coba lagi setelah 15 menit",
      });
      throw new Error("Rate limited");
    }
    
    // Simulasi login API call dengan CSRF protection
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Validasi password (simulasi)
        const isValid = email === 'digibooster@123' && password === 'digibooster@123';
        
        if (isValid) {
          // Generate token dengan expiry (simulasi JWT)
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 2); // Token berlaku 2 jam
          
          const sessionToken = `sim.${btoa(email)}.${generateCSRFToken()}`;
          
          const adminUser: User = {
            id: 'admin-1',
            name: 'Admin DigiBooster',
            email: 'digibooster@123',
            role: 'admin',
            createdAt: new Date(),
            lastLogin: new Date(),
            securityLevel: 'enhanced'
          };
          
          // Simpan token dan user
          localStorage.setItem('digibooster_auth_token', sessionToken);
          localStorage.setItem('digibooster_token_expiry', expiryDate.toISOString());
          localStorage.setItem('digibooster_user', JSON.stringify(adminUser));
          localStorage.setItem('digibooster_security_level', 'enhanced');
          
          // Log login untuk audit
          console.log(`Secure login: ${email} at ${new Date().toISOString()}`);
          
          setUser(adminUser);
          resolve();
        } else if (email && password) {
          // Demo login untuk pengguna biasa
          const passwordCheck = checkPasswordStrength(password);
          
          if (passwordCheck.score < 3) {
            toast({
              variant: "default",
              title: "Password lemah",
              description: passwordCheck.feedback,
            });
          }
          
          // Generate token dengan expiry (simulasi JWT)
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 2); // Token berlaku 2 jam
          
          const sessionToken = `sim.${btoa(email)}.${generateCSRFToken()}`;
          
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: email.split('@')[0],
            email: email,
            role: 'user',
            createdAt: new Date(),
            lastLogin: new Date(),
            securityLevel: 'standard'
          };
          
          // Simpan token dan user
          localStorage.setItem('digibooster_auth_token', sessionToken);
          localStorage.setItem('digibooster_token_expiry', expiryDate.toISOString());
          localStorage.setItem('digibooster_user', JSON.stringify(newUser));
          localStorage.setItem('digibooster_security_level', 'standard');
          
          setUser(newUser);
          resolve();
        } else {
          // Login gagal
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  };

  const loginWithGoogle = async () => {
    // Simulasi Google OAuth API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock Google login response with random Google email
        const googleEmails = [
          'user1@gmail.com',
          'johndoe@gmail.com',
          'janedoe@gmail.com',
          'digiuser@gmail.com',
          'booster@gmail.com'
        ];
        
        const randomEmail = googleEmails[Math.floor(Math.random() * googleEmails.length)];
        const username = randomEmail.split('@')[0];
        
        // Generate token dengan expiry (simulasi JWT)
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 12); // Token OAuth berlaku lebih lama (12 jam)
        
        const sessionToken = `oauth.${btoa(randomEmail)}.${generateCSRFToken()}`;
        
        const newUser: User = {
          id: `google-${Date.now()}`,
          name: username.charAt(0).toUpperCase() + username.slice(1), // Capitalize first letter
          email: randomEmail,
          role: 'user',
          createdAt: new Date(),
          lastLogin: new Date(),
          photoURL: `https://ui-avatars.com/api/?name=${username}&background=random&color=fff`,
          securityLevel: 'standard'
        };
        
        // Simpan token dan user
        localStorage.setItem('digibooster_auth_token', sessionToken);
        localStorage.setItem('digibooster_token_expiry', expiryDate.toISOString());
        localStorage.setItem('digibooster_user', JSON.stringify(newUser));
        localStorage.setItem('digibooster_security_level', 'standard');
        
        setUser(newUser);
        
        toast({
          title: "Google login berhasil",
          description: `Selamat datang, ${newUser.name}!`,
        });
        
        resolve();
      }, 1200);
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // Verifikasi kekuatan password
    const passwordStrength = checkPasswordStrength(password);
    
    if (passwordStrength.score < 3) {
      toast({
        variant: "default",
        title: "Password tidak aman",
        description: passwordStrength.feedback,
      });
      throw new Error("Password tidak memenuhi standar keamanan");
    }
    
    // Simulasi API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Generate token dengan expiry (simulasi JWT)
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 2); // Token berlaku 2 jam
        
        const sessionToken = `sim.${btoa(email)}.${generateCSRFToken()}`;
        
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: name,
          email: email,
          role: 'user',
          createdAt: new Date(),
          lastLogin: new Date(),
          securityLevel: 'standard'
        };
        
        // Simpan token dan user
        localStorage.setItem('digibooster_auth_token', sessionToken);
        localStorage.setItem('digibooster_token_expiry', expiryDate.toISOString());
        localStorage.setItem('digibooster_user', JSON.stringify(newUser));
        localStorage.setItem('digibooster_security_level', 'standard');
        
        setUser(newUser);
        
        toast({
          title: "Pendaftaran berhasil",
          description: "Akun telah dibuat dengan pengaturan keamanan standar",
        });
        
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('digibooster_user');
    localStorage.removeItem('digibooster_auth_token');
    localStorage.removeItem('digibooster_token_expiry');
    localStorage.removeItem('digibooster_security_level');
    
    // Reset CSRF token
    setCsrfToken(generateCSRFToken());
    
    toast({
      title: "Logout berhasil",
      description: "Anda telah berhasil keluar dari akun.",
    });
  };
  
  const logoutFromAllDevices = () => {
    logout();
    
    toast({
      title: "Logout dari semua perangkat",
      description: "Anda telah berhasil keluar dari semua perangkat.",
    });
  };
  
  const updateSecurityLevel = (level: 'standard' | 'enhanced' | 'maximum') => {
    if (user) {
      const updatedUser = {
        ...user,
        securityLevel: level
      };
      
      setUser(updatedUser);
      localStorage.setItem('digibooster_user', JSON.stringify(updatedUser));
      localStorage.setItem('digibooster_security_level', level);
      
      toast({
        title: "Keamanan diperbarui",
        description: `Level keamanan akun diubah menjadi ${level}`,
      });
    }
  };

  return {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    logoutFromAllDevices,
    isAuthenticated: !!user,
    checkPasswordStrength,
    updateSecurityLevel,
    isLoading
  };
};
