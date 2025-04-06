
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PasswordChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ score: 0, feedback: "" });
  const auth = useAuth();
  const { toast } = useToast();

  const checkPassword = () => {
    if (!password) {
      toast({
        title: "Password kosong",
        description: "Masukkan password untuk memeriksa kekuatannya",
        variant: "destructive",
      });
      return;
    }

    if (auth.checkPasswordStrength) {
      const result = auth.checkPasswordStrength(password);
      setStrength(result);
    } else {
      // Fallback simple check if function not available
      let score = 0;
      let feedback = "";
      
      if (password.length > 8) score++;
      if (password.match(/[A-Z]/)) score++;
      if (password.match(/[a-z]/)) score++;
      if (password.match(/[0-9]/)) score++;
      if (password.match(/[^A-Za-z0-9]/)) score++;
      
      if (score < 3) {
        feedback = "Password terlalu lemah. Tambahkan huruf kapital, angka, dan simbol.";
      } else if (score < 5) {
        feedback = "Password cukup kuat, namun bisa ditingkatkan lagi.";
      } else {
        feedback = "Password sangat kuat!";
      }
      
      setStrength({ score: score, feedback });
    }
  };

  const getProgressColor = () => {
    const score = strength.score;
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Pemeriksa Password</h3>
      <p className="text-sm text-muted-foreground">
        Periksa kekuatan password untuk memastikan keamanan
      </p>
      
      <div className="flex space-x-2">
        <Input
          type="password"
          placeholder="Masukkan password untuk diperiksa"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-dark-300 border-dark-400 text-white"
        />
        <Button 
          onClick={checkPassword}
          className="bg-neon-purple hover:bg-neon-violet text-white"
        >
          Periksa
        </Button>
      </div>
      
      {strength.score > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Kekuatan:</span>
            <span className="text-sm font-medium">
              {strength.score <= 2 ? "Lemah" : strength.score <= 3 ? "Sedang" : "Kuat"}
            </span>
          </div>
          <Progress 
            value={strength.score * 20} 
            className={`h-2 ${getProgressColor()}`} 
          />
          <p className="text-sm mt-1">{strength.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;
