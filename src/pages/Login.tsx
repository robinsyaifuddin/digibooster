
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, UserCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      redirectBasedOnRole(user);
    }
  }, [user]);

  const redirectBasedOnRole = (user: any) => {
    // Check user role and redirect accordingly
    const role = user?.role || user?.user_metadata?.role || 'user';
    
    if (role === 'admin') {
      navigate('/admin');
      toast({
        title: "Login Admin Berhasil",
        description: "Selamat datang kembali, Admin!",
      });
    } else {
      navigate('/dashboard');
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di DigiBooster!",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Hardcoded credentials for demo
      if (email === 'pengguna@gmail.com' && password === 'pengguna123') {
        // Mock login for user role
        const mockUserData = {
          id: '1',
          email: 'pengguna@gmail.com',
          role: 'user',
          user_metadata: { name: 'Pengguna Demo', role: 'user' }
        };
        
        // Call login from context but also handle mock data
        await login(email, password);
        // In case Supabase isn't connected yet, we'll use our mock data
        console.log("Login attempt with user credentials");
        redirectBasedOnRole(mockUserData);
        
      } else if (email === 'admin.digibooster@gmail.com' && password === 'digibooster123') {
        // Mock login for admin role
        const mockAdminData = {
          id: '2',
          email: 'admin.digibooster@gmail.com',
          role: 'admin',
          user_metadata: { name: 'Admin DigiBooster', role: 'admin' }
        };
        
        // Call login from context but also handle mock data
        await login(email, password);
        // In case Supabase isn't connected yet, we'll use our mock data
        console.log("Login attempt with admin credentials");
        redirectBasedOnRole(mockAdminData);
        
      } else {
        // Try regular login (will work when Supabase is connected)
        await login(email, password);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: "Email atau password salah. Silakan coba lagi."
      });
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={`h-line-${i.toString()}`}
              className="absolute h-[1px] bg-sky-400/20 w-full left-0"
              style={{ top: `${i * 10}%` }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scaleX: [1, 1.05, 1],
                boxShadow: [
                  "0 0 2px rgba(56, 189, 248, 0.2)",
                  "0 0 8px rgba(56, 189, 248, 0.6)",
                  "0 0 2px rgba(56, 189, 248, 0.2)"
                ]
              }}
              transition={{ 
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        
        {/* Vertical lines animation */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={`v-line-${i.toString()}`}
              className="absolute w-[1px] bg-sky-400/20 h-full top-0"
              style={{ left: `${i * 10}%` }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scaleY: [1, 1.05, 1],
                boxShadow: [
                  "0 0 2px rgba(56, 189, 248, 0.2)",
                  "0 0 8px rgba(56, 189, 248, 0.6)",
                  "0 0 2px rgba(56, 189, 248, 0.2)"
                ]
              }}
              transition={{ 
                duration: 4 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
        
        {/* Large blurred circles for abstract background */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-sky-400 rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-sky-400 rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
      </div>
      
      <motion.div 
        className="w-full max-w-md z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Link to="/" className="flex justify-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            <span className="text-sky-400">Digi</span>Booster
          </h2>
        </Link>
        
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <Card className="bg-black/80 backdrop-blur-md border border-gray-800 shadow-xl">
            <motion.div variants={fadeIn}>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl text-white">Masuk Akun</CardTitle>
                <CardDescription className="text-gray-400">
                  Masukkan email dan password Anda untuk masuk
                </CardDescription>
              </CardHeader>
            </motion.div>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={fadeIn} className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-sky-400 focus:ring-sky-400/20"
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-sky-400 focus:ring-sky-400/20"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-sky-400 hover:underline">
                    Lupa password?
                  </Link>
                </motion.div>
                
                {error && (
                  <motion.div variants={fadeIn} className="text-sm text-red-500 p-2 bg-red-500/10 rounded border border-red-500/20">
                    {error}
                  </motion.div>
                )}
                
                <motion.div variants={fadeIn}>
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    {loading ? "Memproses..." : "Masuk"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div variants={fadeIn} className="relative flex items-center justify-center">
                  <div className="absolute w-full border-t border-gray-800"></div>
                  <div className="relative bg-black px-4 text-sm text-gray-400">atau</div>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full bg-transparent border-gray-700 hover:bg-gray-800 text-white"
                    onClick={() => {
                      // Demo login as regular user
                      setEmail('pengguna@gmail.com');
                      setPassword('pengguna123');
                    }}
                  >
                    <UserCircle2 className="mr-2 h-4 w-4" />
                    Login Demo sebagai Pengguna
                  </Button>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full bg-transparent border-gray-700 hover:bg-gray-800 text-white"
                    onClick={() => {
                      // Demo login as admin
                      setEmail('admin.digibooster@gmail.com');
                      setPassword('digibooster123');
                    }}
                  >
                    <UserCircle2 className="mr-2 h-4 w-4" />
                    Login Demo sebagai Admin
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            
            <motion.div variants={fadeIn}>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-gray-400">
                  Belum punya akun?{" "}
                  <Link to="/register" className="text-sky-400 hover:underline">
                    Daftar
                  </Link>
                </div>
              </CardFooter>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
