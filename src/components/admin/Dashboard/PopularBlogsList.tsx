
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">Artikel Populer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {blogs.map(blog => (
            <div key={blog.id} className="border-b border-gray-700 pb-5 last:border-0 last:pb-0">
              <h3 className="font-medium text-white mb-1 line-clamp-1">{blog.title}</h3>
              
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">{blog.author}</div>
                <div className="text-gray-400">{blog.published}</div>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {blog.views} views
                </div>
                
                <a href="#" className="text-sky-400 text-sm hover:underline hover:text-sky-500">
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularBlogsList;
