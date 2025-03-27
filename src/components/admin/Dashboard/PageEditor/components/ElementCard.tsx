
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface ElementCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  secure?: boolean;
}

const ElementCard = ({ icon: Icon, label, onClick, secure = false }: ElementCardProps) => {
  // Menerapkan sanitasi sederhana untuk mencegah XSS
  const sanitizeLabel = (text: string) => {
    return text.replace(/[<>&"']/g, (match) => {
      return {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;'
      }[match] || match;
    });
  };

  const safeLabel = sanitizeLabel(label);

  return (
    <Card 
      className={`cursor-pointer hover:bg-gray-50 ${secure ? 'border-green-200' : ''}`} 
      onClick={onClick}
      data-testid={`element-card-${safeLabel.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-3 flex flex-col items-center justify-center">
        <Icon className={`h-8 w-8 mb-1 ${secure ? 'text-green-600' : 'text-gray-600'}`} />
        <span 
          className="text-xs"
          dangerouslySetInnerHTML={{ __html: secure ? safeLabel : safeLabel }}
        />
      </CardContent>
    </Card>
  );
};

export default ElementCard;
