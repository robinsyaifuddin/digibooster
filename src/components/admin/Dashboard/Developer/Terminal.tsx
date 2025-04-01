import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Terminal as TerminalIcon, Copy, Download, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useImplementationSettings } from "@/hooks/useImplementationSettings";

type ValidTable = 'profiles' | 'pages' | 'website_content' | 'publish_history';

interface CommandResponse {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: string;
}

const Terminal = () => {
  const { toast } = useToast();
  const { isRealImplementation } = useImplementationSettings();
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandResponse[]>([
    { 
      type: 'output', 
      content: 'DigiBooster Terminal v1.0\nKetik "help" untuk melihat daftar perintah yang tersedia.', 
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = async () => {
    if (!command.trim()) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const newCommandEntry: CommandResponse = {
      type: 'input',
      content: `$ ${command}`,
      timestamp
    };
    
    // Add command to history array
    const newCommandHistory = [command, ...commandHistory.slice(0, 9)];
    setCommandHistory(newCommandHistory);
    setHistoryIndex(-1);
    
    // Process command
    let responseEntry: CommandResponse;
    
    try {
      if (command.toLowerCase() === 'help') {
        responseEntry = {
          type: 'output',
          content: `Perintah yang tersedia:
- help: Menampilkan bantuan
- clear: Membersihkan terminal
- status: Cek status koneksi database
- tables: Daftar tabel database
- count [table_name]: Hitung jumlah baris dalam tabel
- version: Tampilkan versi sistem`,
          timestamp
        };
      } else if (command.toLowerCase() === 'clear') {
        setHistory([]);
        setCommand("");
        return;
      } else if (command.toLowerCase() === 'status') {
        if (!isRealImplementation) {
          responseEntry = {
            type: 'error',
            content: 'Error: Mode simulasi aktif. Koneksi database tidak tersedia.',
            timestamp
          };
        } else {
          const startTime = performance.now();
          const { data, error } = await supabase.from('website_content').select('id').limit(1);
          const endTime = performance.now();
          
          if (error) {
            responseEntry = {
              type: 'error',
              content: `Error: ${error.message}`,
              timestamp
            };
          } else {
            const supabaseApiUrl = new URL(supabase.getAuthApiBaseUrl());
            responseEntry = {
              type: 'output',
              content: `Status koneksi: OK
Latency: ${Math.round(endTime - startTime)}ms
Database URL: ${supabaseApiUrl.hostname || 'tidak tersedia'}
Mode: ${isRealImplementation ? 'Live Implementation' : 'Simulation'}`,
              timestamp
            };
          }
        }
      } else if (command.toLowerCase() === 'tables') {
        if (!isRealImplementation) {
          responseEntry = {
            type: 'error',
            content: 'Error: Mode simulasi aktif. Daftar tabel tidak tersedia.',
            timestamp
          };
        } else {
          responseEntry = {
            type: 'output',
            content: `Tabel tersedia:
- profiles
- pages
- publish_history
- website_content`,
            timestamp
          };
        }
      } else if (command.toLowerCase().startsWith('count')) {
        if (!isRealImplementation) {
          responseEntry = {
            type: 'error',
            content: 'Error: Mode simulasi aktif. Count tidak tersedia.',
            timestamp
          };
        } else {
          const args = command.split(' ');
          if (args.length < 2) {
            responseEntry = {
              type: 'error',
              content: 'Error: Format perintah: count [table_name]',
              timestamp
            };
          } else {
            const tableName = args[1];
            const validTables: ValidTable[] = ['profiles', 'pages', 'publish_history', 'website_content'];
            
            if (!validTables.includes(tableName as ValidTable)) {
              responseEntry = {
                type: 'error',
                content: `Error: Tabel "${tableName}" tidak valid. Tabel yang tersedia: ${validTables.join(', ')}`,
                timestamp
              };
            } else {
              try {
                const { count, error } = await supabase
                  .from(tableName as ValidTable)
                  .select('*', { count: 'exact', head: true });
                
                if (error) {
                  responseEntry = {
                    type: 'error',
                    content: `Error: ${error.message}`,
                    timestamp
                  };
                } else {
                  responseEntry = {
                    type: 'output',
                    content: `Tabel ${tableName} memiliki ${count} baris.`,
                    timestamp
                  };
                }
              } catch (error) {
                responseEntry = {
                  type: 'error',
                  content: `Error: ${error.message}`,
                  timestamp
                };
              }
            }
          }
        }
      } else if (command.toLowerCase() === 'version') {
        responseEntry = {
          type: 'output',
          content: `DigiBooster Admin v1.0
Database Client: Supabase JS v2.x
Implementasi: ${isRealImplementation ? 'Nyata' : 'Simulasi'}
Build Date: 2025-03-31`,
          timestamp
        };
      } else {
        responseEntry = {
          type: 'error',
          content: `Perintah tidak dikenal: ${command}
Ketik "help" untuk melihat daftar perintah yang tersedia.`,
          timestamp
        };
      }
    } catch (error) {
      responseEntry = {
        type: 'error',
        content: `Error: ${error.message}`,
        timestamp
      };
    }
    
    setHistory(prev => [...prev, newCommandEntry, responseEntry]);
    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const copyToClipboard = () => {
    const textContent = history.map(entry => 
      `[${entry.timestamp}] ${entry.content}`
    ).join('\n');
    
    navigator.clipboard.writeText(textContent);
    toast({
      title: "Log disalin ke clipboard",
      description: "Seluruh isi terminal telah disalin ke clipboard",
    });
  };

  const clearTerminal = () => {
    setHistory([{
      type: 'output', 
      content: 'Terminal dibersihkan', 
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Terminal</h2>
          <p className="text-muted-foreground">
            Terminal untuk manajemen dan analisis database
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={clearTerminal}>
            <Trash2 className="h-4 w-4" />
            <span>Clear</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      {!isRealImplementation && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Terminal berada dalam mode simulasi. Beberapa perintah yang berinteraksi dengan database tidak akan berfungsi. Aktifkan implementasi nyata untuk akses penuh.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="border-2">
        <CardHeader className="bg-black text-white py-2 px-4 rounded-t-lg border-b border-gray-700 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-4 w-4" />
            <CardTitle className="text-sm font-mono">DigiBooster Terminal</CardTitle>
          </div>
          <Badge variant="outline" className="border-gray-500 text-gray-300">
            {isRealImplementation ? 'Live Mode' : 'Simulation Mode'}
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            ref={terminalRef}
            className="bg-black text-green-400 p-4 font-mono text-sm h-[400px] overflow-y-auto whitespace-pre-wrap"
          >
            {history.map((entry, index) => (
              <div key={index} className={`mb-1 ${entry.type === 'error' ? 'text-red-400' : entry.type === 'input' ? 'text-blue-400' : ''}`}>
                {entry.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-900 p-3 border-t border-gray-700 rounded-b-lg">
          <div className="flex w-full items-center gap-2">
            <span className="text-white font-mono">$</span>
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-gray-800 border-gray-700 text-white font-mono"
              placeholder="Ketik perintah (ketik 'help' untuk bantuan)"
              autoFocus
            />
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={executeCommand}
            >
              Run
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Terminal;
