
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { portfolioItems } from "@/data/portfolioData";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface SearchItem {
  id: string | number;
  title: string;
  type: 'blog' | 'portfolio' | 'page';
  path: string;
  category?: string;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);

  useEffect(() => {
    // Create a combined list of searchable items
    const blogItems: SearchItem[] = blogPosts.map(post => ({
      id: post.id,
      title: post.title,
      type: 'blog',
      path: `/blog/${post.id}`,
      category: post.category
    }));

    const portfolioSearchItems: SearchItem[] = portfolioItems.map(item => ({
      id: item.id,
      title: item.title,
      type: 'portfolio',
      path: `/portofolio/${item.id}`,
      category: item.category
    }));

    const pageItems: SearchItem[] = [
      { id: 'home', title: t('beranda'), type: 'page', path: '/' },
      { id: 'jasa-digital', title: t('jasa-digital'), type: 'page', path: '/program/jasa-digital' },
      { id: 'kelas', title: t('shortclass-bootcamp'), type: 'page', path: '/program/kelas' },
      { id: 'blog', title: t('blog'), type: 'page', path: '/blog' },
      { id: 'portofolio', title: t('portofolio'), type: 'page', path: '/portofolio' },
      { id: 'about', title: t('tentang'), type: 'page', path: '/tentang' },
    ];

    setSearchItems([...blogItems, ...portfolioSearchItems, ...pageItems]);
  }, [t]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const searchButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      filter: "drop-shadow(0 0 8px rgba(0, 216, 232, 0.6))",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full w-9 h-9 transition-colors bg-dark-300/50 text-primary hover:bg-dark-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 icon-3d"
        aria-label="Search"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={searchButtonVariants}
      >
        <Search className="h-[1.2rem] w-[1.2rem]" />
      </motion.button>
      <CommandDialog 
        open={open} 
        onOpenChange={setOpen} 
        className="rounded-lg shadow-glow overflow-hidden"
      >
        <CommandInput placeholder={t('search-placeholder') || "Search for anything..."} />
        <CommandList>
          <CommandEmpty>{t('no-results') || "No results found."}</CommandEmpty>
          
          <CommandGroup heading={t('pages') || "Pages"}>
            {searchItems
              .filter(item => item.type === 'page')
              .map(item => (
                <CommandItem
                  key={item.id.toString()}
                  onSelect={() => handleSelect(item.path)}
                  className="flex items-center gap-2 transition-all duration-200 hover:bg-primary/10"
                >
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          
          <CommandGroup heading={t('blog') || "Blog"}>
            {searchItems
              .filter(item => item.type === 'blog')
              .map(item => (
                <CommandItem
                  key={item.id.toString()}
                  onSelect={() => handleSelect(item.path)}
                  className="flex items-center gap-2 transition-all duration-200 hover:bg-primary/10"
                >
                  <span>{item.title}</span>
                  <span className="ml-auto text-xs text-gray-400">{item.category}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          
          <CommandGroup heading={t('portofolio') || "Portfolio"}>
            {searchItems
              .filter(item => item.type === 'portfolio')
              .map(item => (
                <CommandItem
                  key={item.id.toString()}
                  onSelect={() => handleSelect(item.path)}
                  className="flex items-center gap-2 transition-all duration-200 hover:bg-primary/10"
                >
                  <span>{item.title}</span>
                  <span className="ml-auto text-xs text-gray-400">{item.category}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
