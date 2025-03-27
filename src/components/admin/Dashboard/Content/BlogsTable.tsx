
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogProps {
  id: number;
  title: string;
  author: string;
  published: string;
  views: number;
}

interface BlogsTableProps {
  blogs: BlogProps[];
}

const BlogsTable = ({ blogs }: BlogsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penulis</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...blogs, 
                { id: 4, title: 'Tren Digital Marketing 2023', author: 'Admin', published: '2023-08-03', views: 145 },
                { id: 5, title: 'Pentingnya Website untuk Bisnis', author: 'Admin', published: '2023-07-28', views: 267 },
              ].map((blog, index) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{blog.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{['Marketing', 'Website', 'Content', 'SEO', 'Social Media'][index % 5]}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{blog.author}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{blog.published}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Dipublikasikan
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogsTable;
