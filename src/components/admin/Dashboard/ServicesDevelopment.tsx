
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatabaseMonitor from './Developer/DatabaseMonitor';
import VersionControl from './Developer/VersionControl';
import ApiDocumentation from './Developer/ApiDocumentation';
import Terminal from './Developer/Terminal';
import AnalyticsMonitor from './Developer/AnalyticsMonitor';
import { Button } from '@/components/ui/button';
import { testSupabaseConnection } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check, AlertTriangle, RefreshCw } from 'lucide-react';

const ServicesDevelopment = () => {
  const [activeTab, setActiveTab] = useState('database');
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const { toast } = useToast();
  
  useEffect(() => {
    checkSupabaseConnection();
  }, []);
  
  const checkSupabaseConnection = async () => {
    setSupabaseStatus('checking');
    try {
      const result = await testSupabaseConnection();
      
      if (result?.success) {
        setSupabaseStatus('connected');
      } else {
        setSupabaseStatus('error');
        toast({
          variant: "destructive",
          title: "Database Connection Error",
          description: result?.error || "Could not connect to Supabase database",
        });
      }
    } catch (error) {
      setSupabaseStatus('error');
      toast({
        variant: "destructive",
        title: "Database Connection Error",
        description: "Failed to test connection to Supabase",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Developer Tools</h2>
          <p className="text-gray-400">Monitor dan kelola pengembangan layanan</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-sm mr-2 text-gray-400">Supabase:</span>
            {supabaseStatus === 'checking' ? (
              <RefreshCw size={16} className="text-yellow-500 animate-spin" />
            ) : supabaseStatus === 'connected' ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <AlertTriangle size={16} className="text-red-500" />
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkSupabaseConnection} 
            className="border-dark-300 text-gray-300 hover:bg-dark-300"
          >
            <RefreshCw size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="database" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-dark-300 text-gray-300">
          <TabsTrigger value="database" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">Database</TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">API</TabsTrigger>
          <TabsTrigger value="version" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">Version Control</TabsTrigger>
          <TabsTrigger value="terminal" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">Terminal</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-neon-purple data-[state=active]:text-white">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="database" className="space-y-4 mt-4">
          <DatabaseMonitor />
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4 mt-4">
          <ApiDocumentation />
        </TabsContent>
        
        <TabsContent value="version" className="space-y-4 mt-4">
          <VersionControl />
        </TabsContent>
        
        <TabsContent value="terminal" className="space-y-4 mt-4">
          <Terminal />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4 mt-4">
          <AnalyticsMonitor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesDevelopment;
