
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Play, RotateCcw, Download } from 'lucide-react';

type CommandType = "command" | "response";

interface TerminalLine {
  type: CommandType;
  content: string;
  timestamp: Date;
}

const Terminal: React.FC = () => {
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "response", content: "DigiBooster CLI v1.0.0", timestamp: new Date() },
    { type: "response", content: "Type 'help' to see available commands", timestamp: new Date() }
  ]);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (command.trim() === "") return;
    
    // Add command to history
    const newHistory: TerminalLine[] = [
      ...history,
      { type: "command", content: command, timestamp: new Date() }
    ];
    
    // Process command
    let response: string = "";
    const lowerCmd = command.toLowerCase().trim();
    
    if (lowerCmd === "help") {
      response = `
Available commands:
  - help: Show this help message
  - clear: Clear terminal
  - status: Check system status
  - version: Show version information
  - deploy: Simulate deploy process
  - user list: List sample users
  - api test: Test API connection
`;
    } else if (lowerCmd === "clear") {
      setHistory([]);
      setCommand("");
      return;
    } else if (lowerCmd === "status") {
      response = "All systems operational: Database ✅ | API ✅ | Storage ✅ | Authentication ✅";
    } else if (lowerCmd === "version") {
      response = "DigiBooster CLI v1.0.0 | Core: v2.3.4 | API: v1.2.0 | Database: v5.1.2";
    } else if (lowerCmd === "deploy") {
      response = "Starting deployment process...\nBuilding project...\nOptimizing assets...\nUploading files...\nDeployment successful! Site is now live.";
    } else if (lowerCmd === "user list") {
      response = "Users:\n - admin@example.com (Admin)\n - user1@example.com (User)\n - user2@example.com (User)\n - moderator@example.com (Moderator)";
    } else if (lowerCmd === "api test") {
      response = "Testing API connection...\nEndpoints available:\n - /api/users ✅\n - /api/content ✅\n - /api/analytics ✅\n - /api/settings ✅";
    } else {
      response = `Command not recognized: '${command}'. Type 'help' to see available commands.`;
    }
    
    // Add response to history
    newHistory.push({
      type: "response",
      content: response,
      timestamp: new Date()
    });
    
    setHistory(newHistory);
    setCommand("");
  };
  
  const clearTerminal = () => {
    setHistory([]);
  };
  
  const downloadHistory = () => {
    const historyText = history
      .map(line => `[${line.timestamp.toLocaleTimeString()}] ${line.type === "command" ? ">" : ""} ${line.content}`)
      .join("\n\n");
    
    const blob = new Blob([historyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `terminal-history-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const runDemoCommand = () => {
    setCommand("status");
    setTimeout(() => {
      handleCommand({ preventDefault: () => {} } as React.FormEvent);
    }, 100);
  };
  
  return (
    <Card className="border border-dark-300 bg-dark-200 shadow-lg overflow-hidden">
      <CardHeader className="bg-dark-300 border-b border-dark-400 px-4 py-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-white flex items-center">
          <Code size={16} className="mr-2 text-neon-purple" />
          Developer Terminal
        </CardTitle>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={runDemoCommand}>
            <Play size={12} className="text-neon-purple" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clearTerminal}>
            <RotateCcw size={12} className="text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={downloadHistory}>
            <Download size={12} className="text-gray-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={terminalRef}
          className="bg-black/90 font-mono text-xs text-gray-300 p-3 h-64 overflow-y-auto"
        >
          {history.map((line, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-start">
                <span className="text-gray-500 mr-2">{line.timestamp.toLocaleTimeString()}</span>
                {line.type === "command" && <span className="text-neon-purple mr-1">❯</span>}
                {line.type === "response" && <span className="text-green-500 mr-1">➤</span>}
                <span 
                  className={line.type === "command" ? "text-white" : "text-gray-300"}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {line.content}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-dark-300 border-t border-dark-400 p-2">
        <form onSubmit={handleCommand} className="w-full flex">
          <span className="text-neon-purple mr-2 font-mono mt-2">❯</span>
          <Input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type a command (try 'help')"
            className="flex-1 bg-dark-300 border-dark-400 text-white focus:border-neon-purple font-mono text-xs"
          />
          <Button type="submit" size="sm" className="ml-2 bg-neon-purple hover:bg-neon-violet text-white">
            Execute
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Terminal;
