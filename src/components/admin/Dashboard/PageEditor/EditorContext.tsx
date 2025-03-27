
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Element {
  id: string;
  type: string;
  content: string;
  styles: Record<string, string>;
  attributes: Record<string, string>;
  children?: Element[];
}

interface EditorContextType {
  selectedElement: Element | null;
  hoveredElement: Element | null;
  draggedElement: Element | null;
  setSelectedElement: (element: Element | null) => void;
  setHoveredElement: (element: Element | null) => void;
  setDraggedElement: (element: Element | null) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  addElement: (element: Element, parentId?: string) => void;
  removeElement: (id: string) => void;
  elements: Element[];
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [draggedElement, setDraggedElement] = useState<Element | null>(null);
  const [elements, setElements] = useState<Element[]>([]);

  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements(prevElements => 
      prevElements.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  const addElement = (element: Element, parentId?: string) => {
    if (!parentId) {
      setElements(prev => [...prev, element]);
      return;
    }

    setElements(prevElements => {
      const findAndAddChild = (elements: Element[]): Element[] => {
        return elements.map(el => {
          if (el.id === parentId) {
            return {
              ...el,
              children: [...(el.children || []), element]
            };
          } else if (el.children) {
            return {
              ...el,
              children: findAndAddChild(el.children)
            };
          }
          return el;
        });
      };

      return findAndAddChild(prevElements);
    });
  };

  const removeElement = (id: string) => {
    setElements(prevElements => {
      const removeElementById = (elements: Element[]): Element[] => {
        return elements
          .filter(el => el.id !== id)
          .map(el => {
            if (el.children) {
              return {
                ...el,
                children: removeElementById(el.children)
              };
            }
            return el;
          });
      };

      return removeElementById(prevElements);
    });
  };

  return (
    <EditorContext.Provider
      value={{
        selectedElement,
        hoveredElement,
        draggedElement,
        setSelectedElement,
        setHoveredElement,
        setDraggedElement,
        updateElement,
        addElement,
        removeElement,
        elements
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
