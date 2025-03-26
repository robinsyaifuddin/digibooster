
import { Plus, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Blog {
  id: number;
  title: string;
  author: string;
  published: string;
  views: number;
}

interface Course {
  id: number;
  title: string;
  students: number;
  lessons: number;
  level: string;
}

interface Portfolio {
  id: number;
  title: string;
  category: string;
  client: string;
}

interface ContentManagementProps {
  blogs: Blog[];
}

const ContentManagement = ({ blogs }: ContentManagementProps) => {
  const courses = [
    { id: 1, title: 'Digital Marketing untuk Pemula', students: 156, lessons: 12, level: 'Pemula' },
    { id: 2, title: 'SEO Optimization', students: 89, lessons: 8, level: 'Menengah' },
    { id: 3, title: 'Content Creation Strategy', students: 124, lessons: 10, level: 'Pemula' },
    { id: 4, title: 'Advanced Web Development', students: 67, lessons: 15, level: 'Mahir' },
    { id: 5, title: 'Social Media Management', students: 203, lessons: 9, level: 'Menengah' },
    { id: 6, title: 'UI/UX Design Basic', students: 178, lessons: 11, level: 'Pemula' },
  ];

  const portfolios = [
    { id: 1, title: 'Website E-commerce Toko ABC', category: 'Web Development', client: 'Toko ABC' },
    { id: 2, title: 'Kampanye Digital XYZ Corp', category: 'Digital Marketing', client: 'XYZ Corp' },
    { id: 3, title: 'Aplikasi Mobile PQR', category: 'Mobile App', client: 'PQR Inc' },
    { id: 4, title: 'Redesign UI Website Korporat', category: 'UI/UX Design', client: 'LMN Group' },
    { id: 5, title: 'Strategi SEO Toko Online', category: 'SEO', client: 'Online Shop RST' },
    { id: 6, title: 'Content Marketing Startup', category: 'Content Marketing', client: 'Startup UVW' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 hidden md:block">Kelola Konten</h2>
      </div>
      
      <Tabs defaultValue="blog">
        <TabsList className="mb-6 overflow-x-auto flex whitespace-nowrap pb-2 scrollbar-none">
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="courses">Kelas</TabsTrigger>
          <TabsTrigger value="portfolio">Portofolio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blog">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <h3 className="text-lg font-semibold">Artikel Blog</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Artikel
            </Button>
          </div>
          
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
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <h3 className="text-lg font-semibold">Kelas</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kelas
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{course.title}</CardTitle>
                  <CardDescription>
                    {course.students} siswa terdaftar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span>{course.lessons} pelajaran</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.level === 'Pemula' ? 'bg-green-100 text-green-800' :
                      course.level === 'Menengah' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">Lihat Detail</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="portfolio">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <h3 className="text-lg font-semibold">Portofolio</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Portofolio
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <PenSquare className="w-8 h-8 text-gray-400" />
                </div>
                <CardHeader>
                  <CardTitle className="text-base">{portfolio.title}</CardTitle>
                  <CardDescription>
                    Client: {portfolio.client}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {portfolio.category}
                  </span>
                  <div>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
