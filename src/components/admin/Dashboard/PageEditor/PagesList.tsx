
import React, { useState } from 'react';
import { WebsitePage } from '@/types/websiteTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  FileText, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PagesListProps {
  pages: WebsitePage[];
  activePage: WebsitePage | null;
  onPageChange: (pageId: string) => void;
  onAddPage: (title: string, slug: string) => void;
  onDeletePage: (pageId: string) => void;
}

const PagesList = ({ 
  pages, 
  activePage, 
  onPageChange, 
  onAddPage, 
  onDeletePage 
}: PagesListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPage = () => {
    if (!newPageTitle.trim()) return;
    
    // Generate slug if empty
    const slug = newPageSlug.trim() || newPageTitle.trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
    
    onAddPage(newPageTitle, slug);
    setIsAddDialogOpen(false);
    setNewPageTitle('');
    setNewPageSlug('');
  };

  const handleNewPageTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewPageTitle(title);
    
    // Auto-generate slug
    if (!newPageSlug || newPageSlug === '') {
      const generatedSlug = title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
      setNewPageSlug(generatedSlug);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium flex-1">Halaman</h3>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsAddDialogOpen(true)}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari halaman..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {filteredPages.map((page) => (
            <li key={page.id}>
              <button
                onClick={() => onPageChange(page.id)}
                className={`w-full text-left px-4 py-3 flex items-start group hover:bg-gray-50 ${
                  activePage?.id === page.id ? 'bg-blue-50' : ''
                }`}
              >
                <FileText className={`h-5 w-5 mr-3 mt-0.5 ${
                  page.isPublished ? 'text-green-500' : 'text-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate">{page.title}</h4>
                    {activePage?.id === page.id && (
                      <div className="hidden group-hover:flex">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePage(page.id);
                          }}
                          className="p-1 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">/{page.slug}</p>
                  {page.isPublished && (
                    <div className="flex items-center mt-1">
                      <CheckCircle className="text-green-500 h-3 w-3 mr-1" />
                      <span className="text-xs text-green-600">Published</span>
                    </div>
                  )}
                </div>
              </button>
            </li>
          ))}
          {filteredPages.length === 0 && (
            <li className="px-4 py-6 text-center text-gray-500">
              No pages found
            </li>
          )}
        </ul>
      </div>

      {/* Add Page Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Halaman Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Judul Halaman</label>
              <Input
                value={newPageTitle}
                onChange={handleNewPageTitleChange}
                placeholder="Masukkan judul halaman"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">/</span>
                <Input
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  placeholder="halaman-baru"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                Slug akan menjadi URL halaman Anda
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleAddPage}>
              Tambah Halaman
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PagesList;
