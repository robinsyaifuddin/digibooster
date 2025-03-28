
import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

interface SecurityRecommendationProps {
  variant?: 'warning' | 'info';
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const SecurityRecommendation: React.FC<SecurityRecommendationProps> = ({
  variant = 'warning',
  title,
  description,
  icon
}) => {
  const bgClass = variant === 'warning' 
    ? 'bg-amber-50 border-amber-200' 
    : 'bg-blue-50 border-blue-200';
    
  const titleClass = variant === 'warning' 
    ? 'text-amber-800' 
    : 'text-blue-800';
    
  const textClass = variant === 'warning' 
    ? 'text-amber-700' 
    : 'text-blue-700';
    
  const iconColor = variant === 'warning' 
    ? 'text-amber-600' 
    : 'text-blue-600';
    
  const defaultIcon = variant === 'warning' 
    ? <AlertTriangle className={`h-5 w-5 ${iconColor} flex-shrink-0 mt-0.5`} /> 
    : <Shield className={`h-5 w-5 ${iconColor} flex-shrink-0 mt-0.5`} />;

  return (
    <div className={`${bgClass} border rounded-md p-4`}>
      <div className="flex gap-3">
        {icon || defaultIcon}
        <div>
          <h3 className={`font-medium ${titleClass} mb-1`}>{title}</h3>
          <p className={`text-sm ${textClass}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityRecommendation;
