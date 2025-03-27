
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Type, 
  Layout, 
  Image, 
  Box, 
  Grid, 
  Columns, 
  Heading, 
  Text, 
  Button as ButtonIcon, 
  ListOrdered, 
  Link, 
  Table, 
  FormInput, 
  Video,
  Map,
  Star,
  AtSign,
  ShoppingCart,
  Camera,
  Search,
  AlertCircle,
  User,
  Clock,
  Calendar,
  Zap,
  Heart,
  Square,
  Minus,
  Plus
} from 'lucide-react';
import { useEditor } from './EditorContext';

const ElementsSidebar = () => {
  const [activeCategory, setActiveCategory] = useState('basic');
  const { setDraggedElement } = useEditor();

  const handleElementDragStart = (elementType: string) => {
    const id = `el-${Date.now()}`;
    let elementData;
    
    switch (elementType) {
      case 'heading':
        elementData = {
          id,
          type: 'heading',
          content: 'Judul Heading',
          styles: {
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '1rem'
          },
          attributes: {
            level: 'h2'
          }
        };
        break;
      case 'paragraph':
        elementData = {
          id,
          type: 'paragraph',
          content: 'Ini adalah text paragraph. Klik untuk mengedit.',
          styles: {
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '1rem'
          },
          attributes: {}
        };
        break;
      case 'button':
        elementData = {
          id,
          type: 'button',
          content: 'Tombol',
          styles: {
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer'
          },
          attributes: {
            href: '#'
          }
        };
        break;
      case 'image':
        elementData = {
          id,
          type: 'image',
          content: '',
          styles: {
            width: '100%',
            height: 'auto',
            marginBottom: '1rem'
          },
          attributes: {
            src: 'https://via.placeholder.com/800x400',
            alt: 'Placeholder image'
          }
        };
        break;
      case 'container':
        elementData = {
          id,
          type: 'container',
          content: '',
          styles: {
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          },
          attributes: {},
          children: []
        };
        break;
      case 'row':
        elementData = {
          id,
          type: 'row',
          content: '',
          styles: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            marginBottom: '1rem'
          },
          attributes: {},
          children: []
        };
        break;
      case 'column':
        elementData = {
          id,
          type: 'column',
          content: '',
          styles: {
            flex: '1',
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.25rem'
          },
          attributes: {},
          children: []
        };
        break;
      default:
        elementData = {
          id,
          type: elementType,
          content: 'New element',
          styles: {},
          attributes: {}
        };
    }
    
    setDraggedElement(elementData);
  };

  const renderElementItem = (name: string, icon: React.ReactNode, type: string) => (
    <div
      className="flex flex-col items-center p-2 bg-white border border-gray-200 rounded shadow-sm cursor-move hover:border-blue-400 hover:shadow-md transition-all"
      draggable
      onDragStart={() => handleElementDragStart(type)}
    >
      <div className="p-2 rounded-full bg-gray-100 mb-1">
        {icon}
      </div>
      <span className="text-xs text-center">{name}</span>
    </div>
  );

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <Tabs defaultValue="basic" className="h-full">
        <div className="p-3 border-b border-gray-200">
          <TabsList className="w-full">
            <TabsTrigger value="basic" className="flex-1 text-xs">Dasar</TabsTrigger>
            <TabsTrigger value="layout" className="flex-1 text-xs">Layout</TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1 text-xs">Advanced</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="p-3 flex-1 overflow-y-auto">
          <TabsContent value="basic" className="mt-0 h-full">
            <h4 className="text-sm font-medium mb-3">Elemen Dasar</h4>
            <div className="grid grid-cols-2 gap-3">
              {renderElementItem('Heading', <Heading className="h-4 w-4 text-blue-600" />, 'heading')}
              {renderElementItem('Paragraf', <Text className="h-4 w-4 text-blue-600" />, 'paragraph')}
              {renderElementItem('Tombol', <ButtonIcon className="h-4 w-4 text-blue-600" />, 'button')}
              {renderElementItem('Gambar', <Image className="h-4 w-4 text-blue-600" />, 'image')}
              {renderElementItem('Link', <Link className="h-4 w-4 text-blue-600" />, 'link')}
              {renderElementItem('List', <ListOrdered className="h-4 w-4 text-blue-600" />, 'list')}
              {renderElementItem('Icon', <Star className="h-4 w-4 text-blue-600" />, 'icon')}
              {renderElementItem('Video', <Video className="h-4 w-4 text-blue-600" />, 'video')}
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="mt-0 h-full">
            <h4 className="text-sm font-medium mb-3">Elemen Layout</h4>
            <div className="grid grid-cols-2 gap-3">
              {renderElementItem('Container', <Box className="h-4 w-4 text-indigo-600" />, 'container')}
              {renderElementItem('Row', <Layout className="h-4 w-4 text-indigo-600" />, 'row')}
              {renderElementItem('Column', <Columns className="h-4 w-4 text-indigo-600" />, 'column')}
              {renderElementItem('Grid', <Grid className="h-4 w-4 text-indigo-600" />, 'grid')}
              {renderElementItem('Divider', <Minus className="h-4 w-4 text-indigo-600" />, 'divider')}
              {renderElementItem('Spacer', <Square className="h-4 w-4 text-indigo-600" />, 'spacer')}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-0 h-full">
            <h4 className="text-sm font-medium mb-3">Elemen Advanced</h4>
            <div className="grid grid-cols-2 gap-3">
              {renderElementItem('Form', <FormInput className="h-4 w-4 text-purple-600" />, 'form')}
              {renderElementItem('Table', <Table className="h-4 w-4 text-purple-600" />, 'table')}
              {renderElementItem('Map', <Map className="h-4 w-4 text-purple-600" />, 'map')}
              {renderElementItem('Social', <AtSign className="h-4 w-4 text-purple-600" />, 'social')}
              {renderElementItem('Slider', <Clock className="h-4 w-4 text-purple-600" />, 'slider')}
              {renderElementItem('Counter', <Plus className="h-4 w-4 text-purple-600" />, 'counter')}
              {renderElementItem('Gallery', <Camera className="h-4 w-4 text-purple-600" />, 'gallery')}
              {renderElementItem('Popup', <AlertCircle className="h-4 w-4 text-purple-600" />, 'popup')}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ElementsSidebar;
