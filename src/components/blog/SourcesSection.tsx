
import { Source } from '@/types/blogTypes';
import { ExternalLink } from 'lucide-react';

interface SourcesSectionProps {
  sources: Source[];
}

const SourcesSection = ({ sources }: SourcesSectionProps) => {
  if (!sources || sources.length === 0) return null;
  
  return (
    <div className="mt-8 p-4 bg-dark-300 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Sumber & Referensi</h3>
      <ul className="space-y-2">
        {sources.map((source) => (
          <li key={source.id} className="flex items-start">
            <span className="text-digicyan mr-2">[{source.id}]</span>
            <div>
              <span className="text-gray-300">{source.text}</span>
              {source.url && (
                <a 
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center text-digicyan hover:underline"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span>Kunjungi</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourcesSection;
