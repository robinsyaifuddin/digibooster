
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password tidak cocok",
        description: "Password dan konfirmasi password harus sama.",
      });
      return;
    }
    
    if (!agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Syarat dan ketentuan",
        description: "Anda harus menyetujui syarat dan ketentuan untuk mendaftar.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(email, password, name);
      toast({
        title: "Pendaftaran berhasil",
        description: "Akun Anda telah berhasil dibuat!",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Pendaftaran gagal",
        description: "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
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
          <h1 className="mt-6 text-3xl font-bold text-white">Buat Akun Baru</h1>
          <p className="mt-2 text-gray-300">
            Lengkapi data berikut untuk membuat akun DigiBooster
          </p>
        </div>
        
        <div className="bg-dark-200 py-8 px-6 shadow-md rounded-lg border border-dark-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-dark-300 border-dark-400 text-white"
              />
            </div>
            
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
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-dark-300 border-dark-400 text-white"
                minLength={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-200">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-dark-300 border-dark-400 text-white"
                minLength={8}
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1 data-[state=checked]:bg-neon-purple data-[state=checked]:border-neon-purple"
              />
              <div>
                <Label 
                  htmlFor="terms" 
                  className="text-sm text-gray-300 font-normal"
                >
                  Saya setuju dengan{" "}
                  <Link to="/syarat-ketentuan" className="text-neon-purple hover:underline">
                    Syarat dan Ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link to="/kebijakan-privasi" className="text-neon-purple hover:underline">
                    Kebijakan Privasi
                  </Link>
                </Label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-neon-purple to-neon-violet hover:from-neon-violet hover:to-neon-purple text-white mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Memproses...
                </>
              ) : "Daftar Sekarang"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-neon-purple hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
