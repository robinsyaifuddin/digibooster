
import React from 'react';
import { 
  Heading1, Heading2, Heading3, 
  Type, Image, Square, ListOrdered, 
  Link2, Quote, Video, Columns, 
  CircleDot, Sparkles, Palmtree, 
  ChevronsUpDown
} from 'lucide-react';
import { Button as UIButton } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useEditor } from './EditorContext';

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
      
      <Accordion type="multiple" defaultValue={["basic", "media", "layout"]}>
        <AccordionItem value="basic">
          <AccordionTrigger>Basic Elements</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('heading1')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Heading1 className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Heading 1</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('heading2')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Heading2 className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Heading 2</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('heading3')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Heading3 className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Heading 3</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('paragraph')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Type className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Paragraph</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('list')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <ListOrdered className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">List</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('link')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Link2 className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Link</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('quote')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Quote className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Quote</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('button')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Square className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Button</span>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="media">
          <AccordionTrigger>Media</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('image')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Image className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Image</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('video')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Video className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Video</span>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="layout">
          <AccordionTrigger>Layout</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('container')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Square className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Container</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('columns')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Columns className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Columns</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('accordion')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <ChevronsUpDown className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Accordion</span>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="widgets">
          <AccordionTrigger>Widgets</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('testimonial')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Quote className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Testimonial</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('icon')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <CircleDot className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Icon</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('feature')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Sparkles className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">Feature</span>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleAddElement('cta')}>
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Palmtree className="h-8 w-8 mb-1 text-gray-600" />
                  <span className="text-xs">CTA Block</span>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-4">
        <UIButton className="w-full" variant="outline" size="sm">
          Import Custom Element
        </UIButton>
      </div>
    </div>
  );
};

export default ElementsSidebar;
