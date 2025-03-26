
import { Button } from "@/components/ui/button";

interface ServicesDevelopmentProps {
  onTabChange: (tab: string) => void;
}

const ServicesDevelopment = ({ onTabChange }: ServicesDevelopmentProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <h2 className="text-lg font-medium text-gray-600">Fitur Layanan Sedang Dikembangkan</h2>
      <p className="mt-2 text-sm text-gray-500">Fitur ini akan segera tersedia dalam waktu dekat.</p>
      <Button 
        className="mt-4"
        onClick={() => onTabChange('overview')}
      >
        Kembali ke Dashboard
      </Button>
    </div>
  );
};

export default ServicesDevelopment;
