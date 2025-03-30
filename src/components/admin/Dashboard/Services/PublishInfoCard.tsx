
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PublishInfoCardProps {
  lastPublished: string | null;
  lastChanges?: string[] | null;
}

const PublishInfoCard = ({ lastPublished, lastChanges }: PublishInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          Informasi Publikasi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastPublished ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Terakhir dipublikasikan
              </Badge>
              <span className="text-sm text-gray-500">
                {new Date(lastPublished).toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            {lastChanges && lastChanges.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-1">Perubahan terakhir:</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-5 list-disc">
                  {lastChanges.map((change, index) => (
                    <li key={index}>{change}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800">
                Website belum pernah dipublikasikan. Publikasikan agar perubahan dapat dilihat oleh pengunjung.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PublishInfoCard;
