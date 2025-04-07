
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  author: string;
  published: string;
  views: number;
}

interface PopularBlogsListProps {
  blogs: Blog[];
}

const PopularBlogsList = ({ blogs }: PopularBlogsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Populer</CardTitle>
        <CardDescription>
          Artikel blog dengan kunjungan tertinggi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-medium">{blog.title}</p>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-white">
                  {blog.published}
                </p>
                <p className="text-xs text-white">
                  {blog.views} kunjungan
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-4">
        <Button variant="outline" size="sm" className="w-full">
          <Pencil className="w-4 h-4 mr-2" />
          Kelola Konten Blog
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PopularBlogsList;
