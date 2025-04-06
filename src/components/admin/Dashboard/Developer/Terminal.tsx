
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, Terminal as TerminalIcon, Copy, Trash2, CheckCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{type: 'command' | 'response', content: string, timestamp: Date}>>([
    {type: 'response', content: 'DigiBooster Development Terminal', timestamp: new Date()},
    {type: 'response', content: 'Type "help" to see available commands', timestamp: new Date()}
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // Add command to history
    const newHistory = [...history, {type: 'command', content: command, timestamp: new Date()}];
    setHistory(newHistory);

    // Process command
    const response = await processCommand(command);
    
    // Add response to history
    setHistory([...newHistory, {type: 'response', content: response, timestamp: new Date()}]);
    
    // Clear command input
    setCommand('');
  };
  
  const handleCopy = (index: number) => {
    const item = history[index];
    navigator.clipboard.writeText(item.content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  const clearTerminal = () => {
    setHistory([
      {type: 'response', content: 'Terminal cleared', timestamp: new Date()}
    ]);
    toast({
      description: "Terminal history cleared"
    });
  };

  // Process terminal commands
  const processCommand = async (cmd: string): Promise<string> => {
    const tokens = cmd.split(' ');
    const baseCommand = tokens[0].toLowerCase();

    try {
      switch (baseCommand) {
        case 'help':
          return `
Available commands:
- help                      Show this help message
- status                    Check the status of services
- version                   Show current version
- clear                     Clear the terminal
- test [service]           Test connection to a service (e.g. test database)
- query [sql]              Run a SQL query (e.g. query SELECT * FROM users LIMIT 10)
- info                     Show system information`;
          
        case 'status':
          const { data: statusData, error: statusError } = await supabase
            .from('system_status')
            .select('*')
            .limit(1);
          
          if (statusError) return `Error: ${statusError.message}`;
          return `System status: ${statusData?.length ? JSON.stringify(statusData[0], null, 2) : 'No status data found'}`;
          
        case 'version':
          return `DigiBooster v1.0.0`;
          
        case 'clear':
          // This is handled separately in the UI
          return `Terminal cleared`;
          
        case 'test':
          if (tokens.length < 2) return 'Usage: test [service]';
          
          const service = tokens[1].toLowerCase();
          if (service === 'database') {
            const { data: testData, error: testError } = await supabase
              .from('test_connection')
              .select('*')
              .limit(1);
            
            if (testError) return `Database connection test failed: ${testError.message}`;
            return 'Database connection successful';
          }
          
          return `Unknown service: ${service}`;
          
        case 'query':
          if (tokens.length < 2) return 'Usage: query [sql]';
          
          const sql = cmd.substring(cmd.indexOf(' ') + 1);
          try {
            const { data: queryData, error: queryError } = await supabase.rpc('run_query', {
              query_text: sql
            });
            
            if (queryError) return `Query error: ${queryError.message}`;
            return `Query result: ${JSON.stringify(queryData, null, 2)}`;
          } catch (err: any) {
            return `Failed to execute query: ${err.message}`;
          }
          
        case 'info':
          const authSessionUrl = await supabase.auth.getSession();
          
          return `
System information:
- Node version: ${process.env.NODE_ENV}
- Browser: ${navigator.userAgent}
- Auth status: ${authSessionUrl ? 'Authenticated' : 'Not authenticated'}
- Date: ${new Date().toISOString()}`;
          
        default:
          return `Unknown command: ${baseCommand}. Type "help" to see available commands.`;
      }
    } catch (error: any) {
      return `Error executing command: ${error.message}`;
    }
  };

  return (
    <Card className="bg-dark-200 border-dark-300 shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center text-white">
            <TerminalIcon className="mr-2 h-5 w-5 text-neon-purple" />
            Terminal
          </CardTitle>
          <CardDescription className="text-gray-400">
            Run commands and view responses
          </CardDescription>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearTerminal} 
                className="text-gray-400 hover:text-white hover:bg-dark-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear terminal</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea ref={scrollAreaRef} className="h-[400px] border border-dark-300 rounded-md p-4 bg-dark-300 font-mono text-sm">
          <div className="space-y-2">
            {history.map((item, index) => (
              <div key={index} className="flex items-start group">
                <div className="flex-1">
                  {item.type === 'command' ? (
                    <div className="flex items-center">
                      <span className="text-neon-purple mr-2">$</span>
                      <span className="text-white">{item.content}</span>
                    </div>
                  ) : (
                    <div className="text-gray-400 whitespace-pre-wrap pl-4 border-l-2 border-dark-400 ml-[0.4rem]">
                      {item.content}
                    </div>
                  )}
                  <div className="text-[10px] text-gray-500 mt-1">
                    {item.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <button 
                  onClick={() => handleCopy(index)} 
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-dark-400 rounded transition-all ml-2"
                >
                  {copiedIndex === index ? (
                    <CheckCheck className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3 text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neon-purple">
              $
            </span>
            <Input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type a command..."
              className="pl-6 bg-dark-300 border-dark-400 text-white focus:border-neon-purple"
            />
          </div>
          <Button type="submit" className="bg-neon-purple hover:bg-neon-violet text-white">
            Run
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Terminal;
