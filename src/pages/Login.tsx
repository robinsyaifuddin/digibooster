
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-dark px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Horizontal lines animation */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={`h-line-${i}`}
              className="absolute h-[1px] bg-neon-purple/20 w-full left-0"
              style={{ top: `${i * 10}%` }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scaleX: [1, 1.05, 1],
                boxShadow: [
                  "0 0 2px rgba(166, 51, 255, 0.2)",
                  "0 0 8px rgba(166, 51, 255, 0.6)",
                  "0 0 2px rgba(166, 51, 255, 0.2)"
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
              key={`v-line-${i}`}
              className="absolute w-[1px] bg-neon-violet/20 h-full top-0"
              style={{ left: `${i * 10}%` }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scaleY: [1, 1.05, 1],
                boxShadow: [
                  "0 0 2px rgba(114, 9, 183, 0.2)",
                  "0 0 8px rgba(114, 9, 183, 0.6)",
                  "0 0 2px rgba(114, 9, 183, 0.2)"
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
        <div className="absolute top-20 right-0 w-64 h-64 bg-neon-purple rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-neon-violet rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
      </div>
      
      <motion.div 
        className="w-full max-w-md z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Link to="/" className="flex justify-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            <span className="text-neon-purple">Digi</span>Booster
          </h2>
        </Link>
        
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <Card className="bg-dark-200/80 backdrop-blur-md border border-dark-300 shadow-xl">
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
                      className="pl-10 bg-dark-300 border-dark-400 text-white focus:border-neon-purple focus:ring-neon-purple/20"
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
                      className="pl-10 bg-dark-300 border-dark-400 text-white focus:border-neon-purple focus:ring-neon-purple/20"
                    />
                  </div>
                </motion.div>
                
                {error && (
                  <motion.div variants={fadeIn} className="text-sm text-red-500">
                    {error}
                  </motion.div>
                )}
                
                <motion.div variants={fadeIn}>
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-neon-purple hover:bg-neon-violet text-white"
                  >
                    {loading ? "Memproses..." : "Masuk"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            
            <motion.div variants={fadeIn}>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-gray-400">
                  Belum punya akun?{" "}
                  <Link to="/register" className="text-neon-purple hover:underline">
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
