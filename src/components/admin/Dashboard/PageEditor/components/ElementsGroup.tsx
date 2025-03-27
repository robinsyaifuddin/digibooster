
import React from 'react';
import { AccordionContent } from "@/components/ui/accordion";
import ElementCard from './ElementCard';
import { LucideIcon } from 'lucide-react';

interface ElementItem {
  type: string;
  label: string;
  icon: LucideIcon;
}

interface ElementsGroupProps {
  elements: ElementItem[];
  onAddElement: (type: string) => void;
}

const ElementsGroup = ({ elements, onAddElement }: ElementsGroupProps) => {
  return (
    <AccordionContent>
      <div className="grid grid-cols-2 gap-2">
        {elements.map((element) => (
          <ElementCard
            key={element.type}
            icon={element.icon}
            label={element.label}
            onClick={() => onAddElement(element.type)}
          />
        ))}
      </div>
    </AccordionContent>
  );
};

export default ElementsGroup;
