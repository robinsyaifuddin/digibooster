
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, RefreshCw, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiKeyManager: React.FC = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk_live_DigiB00st3r_S3cur3_K3y_2024');
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  const handleGenerateApiKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
      setApiKey(newKey);
      setIsGeneratingKey(false);
      toast({
        title: "API key telah diperbarui",
        description: "Pastikan untuk menyimpan API key baru Anda dengan aman",
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">API Key</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key Anda</Label>
          <div className="flex gap-2">
            <Input
              type={showApiKey ? 'text' : 'password'}
              id="api-key"
              value={apiKey}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            API key ini digunakan untuk mengintegrasikan layanan eksternal. Jaga kerahasiaannya.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleGenerateApiKey}
            disabled={isGeneratingKey}
          >
            {isGeneratingKey ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate API Key Baru
              </>
            )}
          </Button>
          
          <Button variant="outline">
            Salin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager;
