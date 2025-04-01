
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      await login(email, password);
      toast({
        title: "Login berhasil",
        description: "Selamat datang kembali di DigiBooster!",
      });
      navigate('/');
    } catch (error: any) {
      setErrorMessage("Email atau password salah. Silakan coba lagi.");
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: "Email atau password salah. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);
    
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error: any) {
      setErrorMessage("Terjadi kesalahan saat login dengan Google. Silakan coba lagi.");
      toast({
        variant: "destructive",
        title: "Login dengan Google gagal",
        description: "Terjadi kesalahan saat login dengan Google. Silakan coba lagi.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-dark">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img 
              src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" 
              alt="DigiBooster Logo" 
              className="h-12 mx-auto" 
            />
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-white">Masuk ke Akun Anda</h1>
          <p className="mt-2 text-gray-300">
            Masukkan email dan password untuk melanjutkan
          </p>
        </div>
        
        <div className="bg-dark-200 py-8 px-6 shadow-md rounded-lg border border-dark-300">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-800/50 text-red-400 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-dark-300 border-dark-400 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Link to="/forgot-password" className="text-sm text-neon-purple hover:underline">
                  Lupa password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-dark-300 border-dark-400 text-white"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-neon-purple to-neon-violet hover:from-neon-violet hover:to-neon-purple text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Memproses...
                </>
              ) : "Masuk"}
            </Button>
          </form>
          
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-400"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-200 text-gray-400">Atau masuk dengan</span>
            </div>
          </div>
          
          <Button 
            type="button"
            variant="outline"
            className="w-full mt-6 flex items-center justify-center border-dark-400 text-white hover:bg-dark-300"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Memproses...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Masuk dengan Google
              </>
            )}
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Belum punya akun?{" "}
              <Link to="/register" className="text-neon-purple hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
