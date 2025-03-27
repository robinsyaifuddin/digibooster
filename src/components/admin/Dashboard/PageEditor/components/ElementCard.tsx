
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface ElementCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const ElementCard = ({ icon: Icon, label, onClick }: ElementCardProps) => {
  return (
    <Card className="cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <CardContent className="p-3 flex flex-col items-center justify-center">
        <Icon className="h-8 w-8 mb-1 text-gray-600" />
        <span className="text-xs">{label}</span>
      </CardContent>
    </Card>
  );
};

export default ElementCard;
