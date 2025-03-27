
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BlogsTable from "./BlogsTable";
import { TabsContent } from "@/components/ui/tabs";

interface Blog {
  id: number;
  title: string;
  author: string;
  published: string;
  views: number;
}

interface BlogTabContentProps {
  blogs: Blog[];
}

const BlogTabContent = ({ blogs }: BlogTabContentProps) => {
  return (
    <TabsContent value="blog">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h3 className="text-lg font-semibold">Artikel Blog</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Artikel
        </Button>
      </div>
      
      <BlogsTable blogs={blogs} />
    </TabsContent>
  );
};

export default BlogTabContent;
