
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  subtitleColor?: string;
}

const StatCard = ({ title, value, icon: Icon, subtitle, subtitleColor = "text-gray-500" }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="w-4 h-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className={`text-xs ${subtitleColor} flex items-center mt-1`}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
