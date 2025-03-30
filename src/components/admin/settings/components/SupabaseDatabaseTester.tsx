
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Database, Check, X, AlertTriangle, Server } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const SupabaseDatabaseTester = () => {
  const { toast } = useToast();
  const [testingStatus, setTestingStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<{
    tables: { name: string; status: 'success' | 'error'; rows?: number }[];
    summary: string;
  }>({
    tables: [],
    summary: ''
  });

  const runDatabaseTests = async () => {
    setTestingStatus('testing');
    setTestResults({ tables: [], summary: 'Pengujian database sedang berjalan...' });
    
    try {
      // Test tables that should exist in our schema
      const tablesToTest = [
        'website_content', 
        'profiles', 
        'pages', 
        'publish_history'
      ];
      
      const results = [];
      let totalTablesWorking = 0;
      let totalRows = 0;
      
      // Test each table
      for (const tableName of tablesToTest) {
        try {
          // Type casting tableName to allowed table type to fix TS error
          // Supabase client's type system expects specific table names
          const { data, error, count } = await supabase
            .from(tableName as any)
            .select('*', { count: 'exact' })
            .limit(1);
          
          if (error) {
            console.error(`Error testing table ${tableName}:`, error);
            results.push({
              name: tableName,
              status: 'error' as const
            });
          } else {
            totalTablesWorking++;
            totalRows += count || 0;
            results.push({
              name: tableName,
              status: 'success' as const,
              rows: count || 0
            });
          }
        } catch (tableError) {
          console.error(`Failed to test table ${tableName}:`, tableError);
          results.push({
            name: tableName,
            status: 'error' as const
          });
        }
      }
      
      // Create summary
      const summary = `${totalTablesWorking} dari ${tablesToTest.length} tabel berhasil diakses. Total ${totalRows} baris data ditemukan.`;
      
      setTestResults({
        tables: results,
        summary
      });
      
      if (totalTablesWorking === tablesToTest.length) {
        setTestingStatus('success');
        toast({
          title: "Pengujian database berhasil",
          description: summary,
        });
      } else {
        setTestingStatus('error');
        toast({
          variant: "destructive",
          title: "Beberapa tabel tidak dapat diakses",
          description: `${tablesToTest.length - totalTablesWorking} tabel tidak dapat diakses. Periksa konfigurasi database Anda.`,
        });
      }
    } catch (error) {
      console.error('Error testing database:', error);
      setTestingStatus('error');
      setTestResults({
        tables: [],
        summary: 'Gagal melakukan pengujian database: ' + error.message
      });
      
      toast({
        variant: "destructive",
        title: "Pengujian database gagal",
        description: error.message,
      });
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Pengujian Database Supabase
        </CardTitle>
        <CardDescription>
          Periksa koneksi ke tabel-tabel Supabase dan validasi struktur database
        </CardDescription>
      </CardHeader>
      <CardContent>
        {testingStatus === 'success' && (
          <Alert variant="default" className="bg-green-50 border-green-200 mb-4">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Semua tabel berfungsi dengan baik</AlertTitle>
            <AlertDescription className="text-green-700">
              {testResults.summary}
            </AlertDescription>
          </Alert>
        )}
        
        {testingStatus === 'error' && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Terdapat masalah dengan database</AlertTitle>
            <AlertDescription>
              {testResults.summary}
            </AlertDescription>
          </Alert>
        )}
        
        {testResults.tables.length > 0 && (
          <div className="space-y-4 mt-2">
            <h3 className="text-sm font-medium">Hasil Pengujian Tabel:</h3>
            <div className="grid gap-2">
              {testResults.tables.map((table) => (
                <div 
                  key={table.name}
                  className={`flex justify-between items-center p-2 rounded-md ${
                    table.status === 'success' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {table.status === 'success' ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`font-medium ${
                      table.status === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {table.name}
                    </span>
                  </div>
                  <div>
                    {table.status === 'success' ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        {table.rows} baris
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                        Tidak dapat diakses
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={runDatabaseTests}
          disabled={testingStatus === 'testing'}
          className="w-full"
        >
          {testingStatus === 'testing' ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Sedang Menguji Database...
            </>
          ) : (
            <>
              <Server className="mr-2 h-4 w-4" />
              Jalankan Pengujian Database
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseDatabaseTester;
