
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaLink?: string;
  color?: 'sky' | 'default' | 'gold';
}

const PricingCard = ({
  title,
  price,
  period,
  features,
  isPopular = false,
  ctaText = "Get Started",
  ctaLink = "#",
  color = 'default'
}: PricingPlanProps) => {
  const colorStyles = {
    sky: {
      background: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      text: 'text-sky-400',
      check: 'text-sky-400',
      cta: 'bg-sky-500 hover:bg-sky-600 text-white'
    },
    default: {
      background: 'bg-gray-900/50',
      border: 'border-gray-800',
      text: 'text-white',
      check: 'text-gray-400',
      cta: 'bg-white hover:bg-gray-200 text-black'
    },
    gold: {
      background: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      check: 'text-amber-400',
      cta: 'bg-amber-500 hover:bg-amber-600 text-white'
    }
  };

  return (
    <motion.div 
      className={`rounded-xl p-6 ${colorStyles[color].background} ${colorStyles[color].border} border relative overflow-hidden`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {isPopular && (
        <div className="absolute -right-12 top-6 rotate-45 bg-sky-500 text-xs py-1 w-36 text-center text-white font-semibold">
          Popular
        </div>
      )}

      <h3 className={`text-xl font-bold mb-1 ${colorStyles[color].text}`}>{title}</h3>
      
      <div className="flex items-baseline mb-4">
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-sm text-gray-400 ml-1">/{period}</span>
      </div>
      
      <div className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center">
            <Check className={`h-4 w-4 mr-2 ${colorStyles[color].check}`} />
            <span className="text-sm text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button className={`w-full ${colorStyles[color].cta}`}>
        {ctaText}
      </Button>
    </motion.div>
  );
};

export default PricingCard;
