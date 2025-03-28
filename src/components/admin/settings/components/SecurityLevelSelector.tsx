
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

type SecurityLevel = 'standard' | 'enhanced' | 'maximum';

interface SecurityLevelSelectorProps {
  currentLevel: SecurityLevel;
  onChange: (level: SecurityLevel) => void;
}

const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({ 
  currentLevel, 
  onChange 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card 
        className={`border cursor-pointer hover:border-blue-300 ${
          currentLevel === 'standard' ? 'border-blue-500 bg-blue-50' : ''
        }`}
        onClick={() => onChange('standard')}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Standar</h4>
            <Badge variant="outline" className="bg-blue-100">Default</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2">Perlindungan dasar untuk website Anda</p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Validasi input
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Enkripsi data dasar
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Perlindungan CSRF
            </li>
          </ul>
        </div>
      </Card>
      
      <Card 
        className={`border cursor-pointer hover:border-blue-300 ${
          currentLevel === 'enhanced' ? 'border-blue-500 bg-blue-50' : ''
        }`}
        onClick={() => onChange('enhanced')}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Ditingkatkan</h4>
            <Badge variant="outline" className="bg-green-100 text-green-800">Direkomendasikan</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2">Keamanan tambahan untuk data sensitif</p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Semua fitur Standar
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Login dengan 2FA
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Rate limiting
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Log audit keamanan
            </li>
          </ul>
        </div>
      </Card>
      
      <Card 
        className={`border cursor-pointer hover:border-blue-300 ${
          currentLevel === 'maximum' ? 'border-blue-500 bg-blue-50' : ''
        }`}
        onClick={() => onChange('maximum')}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Maksimum</h4>
            <Badge variant="outline" className="bg-purple-100 text-purple-800">Enterprise</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2">Perlindungan tingkat tertinggi</p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Semua fitur Ditingkatkan
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Advanced encryption
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Security headers
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              IP filtering
            </li>
            <li className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Anomaly detection
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default SecurityLevelSelector;
