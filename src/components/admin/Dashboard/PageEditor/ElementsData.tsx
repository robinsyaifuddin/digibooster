
import { 
  Heading1, Heading2, Heading3, 
  Type, Image, Square, ListOrdered, 
  Link2, Quote, Video, Columns, 
  CircleDot, Sparkles, Palmtree, 
  ChevronsUpDown, LucideIcon
} from 'lucide-react';

interface ElementCategory {
  id: string;
  label: string;
  elements: {
    type: string;
    label: string;
    icon: LucideIcon;
  }[];
}

export const elementsData: ElementCategory[] = [
  {
    id: "basic",
    label: "Basic Elements",
    elements: [
      { type: 'heading1', label: 'Heading 1', icon: Heading1 },
      { type: 'heading2', label: 'Heading 2', icon: Heading2 },
      { type: 'heading3', label: 'Heading 3', icon: Heading3 },
      { type: 'paragraph', label: 'Paragraph', icon: Type },
      { type: 'list', label: 'List', icon: ListOrdered },
      { type: 'link', label: 'Link', icon: Link2 },
      { type: 'quote', label: 'Quote', icon: Quote },
      { type: 'button', label: 'Button', icon: Square },
    ]
  },
  {
    id: "media",
    label: "Media",
    elements: [
      { type: 'image', label: 'Image', icon: Image },
      { type: 'video', label: 'Video', icon: Video },
    ]
  },
  {
    id: "layout",
    label: "Layout",
    elements: [
      { type: 'container', label: 'Container', icon: Square },
      { type: 'columns', label: 'Columns', icon: Columns },
      { type: 'accordion', label: 'Accordion', icon: ChevronsUpDown },
    ]
  },
  {
    id: "widgets",
    label: "Widgets",
    elements: [
      { type: 'testimonial', label: 'Testimonial', icon: Quote },
      { type: 'icon', label: 'Icon', icon: CircleDot },
      { type: 'feature', label: 'Feature', icon: Sparkles },
      { type: 'cta', label: 'CTA Block', icon: Palmtree },
    ]
  }
];
