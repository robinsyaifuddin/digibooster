
import React from 'react';
import { Button } from "@/components/ui/button";
import { useEditor } from '../EditorContext';
import ElementsAccordion from './ElementsAccordion';

const ElementsSidebar = () => {
  const { addElement } = useEditor();
  
  const generateUniqueId = () => `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handleAddElement = (type: string) => {
    const defaultContent = `New ${type}`;
    const elementId = generateUniqueId();
    
    const newElement = {
      id: elementId,
      type,
      content: defaultContent,
      styles: {},
      attributes: {}
    };
    
    addElement(newElement);
  };

  return (
    <div className="w-64 border-r border-gray-200 h-full overflow-y-auto bg-white p-3">
      <h3 className="text-lg font-medium mb-4">Elements</h3>
      
      <ElementsAccordion onAddElement={handleAddElement} />
      
      <div className="mt-4">
        <Button className="w-full" variant="outline" size="sm">
          Import Custom Element
        </Button>
      </div>
    </div>
  );
};

export default ElementsSidebar;
