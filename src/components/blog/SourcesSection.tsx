
import { ExternalLink } from 'lucide-react';
import { Source } from '@/types/blogTypes';

interface SourcesSectionProps {
  sources: Source[];
}

const SourcesSection = ({ sources }: SourcesSectionProps) => {
  if (!sources || sources.length === 0) return null;
  
  return (
    <div className="mt-10 pt-6 border-t border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Sumber</h3>
      <ul className="space-y-2">
        {sources.map((source) => (
          <li key={source.id} className="text-gray-300 text-sm">
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-start hover:text-digicyan transition-colors"
            >
              <span className="mr-2">•</span>
              <span>
                {source.text}
                <ExternalLink className="inline-block ml-1 h-3 w-3 text-digicyan" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourcesSection;
