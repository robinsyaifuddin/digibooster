
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { useImplementationSettings } from "@/hooks/useImplementationSettings";
import { Badge } from "@/components/ui/badge";

interface ImplementationStatusCardProps {
  onNavigateToSettings: () => void;
}

const ImplementationStatusCard = ({ onNavigateToSettings }: ImplementationStatusCardProps) => {
  const { isRealImplementation, implementationType } = useImplementationSettings();
  
  return (
    <Card className={isRealImplementation ? "border-green-200" : "border-amber-200"}>
      <CardHeader className={isRealImplementation ? "bg-green-50/50" : "bg-amber-50/50"}>
        <CardTitle className="flex items-center gap-2">
          <Database className={`h-5 w-5 ${isRealImplementation ? "text-green-600" : "text-amber-600"}`} />
          Status Implementasi
        </CardTitle>
        <CardDescription>
          {isRealImplementation 
            ? "Website Anda terhubung dengan implementasi nyata" 
            : "Website Anda masih dalam mode simulasi"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          {isRealImplementation ? (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <Check className="h-3.5 w-3.5 mr-1" />
              Implementasi Nyata Aktif
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              Mode Simulasi
            </Badge>
          )}
          
          {isRealImplementation && implementationType === 'supabase' && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              Supabase
            </Badge>
          )}
          
          {isRealImplementation && implementationType === 'custom' && (
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
              API Kustom
            </Badge>
          )}
        </div>
        
        <p className={`text-sm ${isRealImplementation ? "text-green-700" : "text-amber-700"} mt-2`}>
          {isRealImplementation 
            ? "Website Anda terhubung dengan database PostgreSQL dan perubahan disimpan secara permanen."
            : "Perubahan website hanya disimpan di browser ini menggunakan localStorage. Perubahan tidak akan terlihat di browser atau perangkat lain."}
        </p>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={onNavigateToSettings}
          className={isRealImplementation 
            ? "text-green-700 border-green-200 hover:bg-green-50" 
            : "text-amber-700 border-amber-200 hover:bg-amber-50"
          }
        >
          {isRealImplementation ? "Lihat Pengaturan" : "Aktifkan Implementasi Nyata"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImplementationStatusCard;
