
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface HtmlEditorProps {
  htmlContent: string;
  onChange: (content: string) => void;
}

const HtmlEditor = ({ htmlContent, onChange }: HtmlEditorProps) => {
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full h-full">
      <Textarea
        className="w-full h-full p-4 border border-gray-300 font-mono text-sm"
        value={htmlContent}
        onChange={handleHtmlChange}
      />
    </div>
  );
};

export default HtmlEditor;
