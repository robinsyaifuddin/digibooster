
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  subtitle?: string;
  subtitleColor?: string;
  change?: number;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  subtitle, 
  subtitleColor = "text-gray-400",
  change 
}: StatCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-gray-700 rounded-lg">
          <Icon className="h-5 w-5 text-sky-400" />
        </div>
      </div>
      
      <div className="mt-4">
        <span className="text-3xl font-bold text-white">{value.toLocaleString()}</span>
        
        {subtitle && (
          <div className={`mt-1 text-sm ${subtitleColor}`}>
            {subtitle}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
