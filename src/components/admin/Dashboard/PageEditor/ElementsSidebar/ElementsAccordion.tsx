
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ElementsGroup from '../components/ElementsGroup';
import { elementsData } from '../ElementsData';

interface ElementsAccordionProps {
  onAddElement: (type: string) => void;
}

const ElementsAccordion = ({ onAddElement }: ElementsAccordionProps) => {
  return (
    <Accordion type="multiple" defaultValue={["basic", "media", "layout"]}>
      {elementsData.map((category) => (
        <AccordionItem key={category.id} value={category.id}>
          <AccordionTrigger>{category.label}</AccordionTrigger>
          <ElementsGroup 
            elements={category.elements} 
            onAddElement={onAddElement} 
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ElementsAccordion;
