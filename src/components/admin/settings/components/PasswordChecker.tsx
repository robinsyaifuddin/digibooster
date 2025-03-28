
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Fingerprint } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PasswordChecker: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const { checkPasswordStrength } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium flex items-center gap-2 mb-3">
        <Fingerprint className="h-4 w-4 text-blue-600" />
        Password Security Check
      </h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password-check">Periksa Kekuatan Password</Label>
          <div className="flex gap-2">
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password-check"
              placeholder="Masukkan password untuk diperiksa"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {password && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Kekuatan:</span>
              <span className={`font-medium ${
                passwordStrength.score <= 2 ? 'text-red-600' :
                passwordStrength.score <= 4 ? 'text-amber-600' :
                'text-green-600'
              }`}>
                {passwordStrength.score <= 2 ? 'Lemah' :
                 passwordStrength.score <= 4 ? 'Sedang' : 'Kuat'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className={`h-2.5 rounded-full ${
                passwordStrength.score <= 2 ? 'bg-red-600' :
                passwordStrength.score <= 4 ? 'bg-amber-500' :
                'bg-green-600'
              }`} style={{ width: `${Math.min(passwordStrength.score * 16.6, 100)}%` }}></div>
            </div>
            <p className="text-xs text-gray-600">{passwordStrength.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordChecker;
