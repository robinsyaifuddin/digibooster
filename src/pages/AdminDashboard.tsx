
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ArrowUpRight,
  BarChart3,
  BookText,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  Settings,
  PenSquare,
  Users,
  User,
  Home,
  Pencil,
  Plus,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '../hooks/use-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  
  // Sample data for demonstration
  const [userStats] = useState({
    total: 1245,
    new: 42,
    active: 891,
    premium: 122
  });
  
  const [contentStats] = useState({
    blogs: 28,
    courses: 12,
    services: 4,
    portfolios: 16
  });
  
  const [trafficStats] = useState({
    weekly: 2467,
    monthly: 10254,
    conversion: 3.2
  });
  
  const [recentUsers] = useState([
    { id: 1, name: 'Andi Pratama', email: 'andi@example.com', role: 'user', joinDate: '2023-08-12', avatar: 'A' },
    { id: 2, name: 'Dewi Lestari', email: 'dewi@example.com', role: 'user', joinDate: '2023-08-10', avatar: 'D' },
    { id: 3, name: 'Budi Santoso', email: 'budi@example.com', role: 'premium', joinDate: '2023-08-05', avatar: 'B' },
    { id: 4, name: 'Rina Wijaya', email: 'rina@example.com', role: 'user', joinDate: '2023-08-01', avatar: 'R' },
  ]);
  
  const [recentBlogs] = useState([
    { id: 1, title: 'Tips Optimasi Website untuk Pemula', author: 'Admin', published: '2023-08-10', views: 234 },
    { id: 2, title: 'Cara Membuat Konten Digital yang Menarik', author: 'Admin', published: '2023-08-07', views: 167 },
    { id: 3, title: 'Strategi Marketing Digital di Era 2023', author: 'Admin', published: '2023-08-05', views: 321 },
  ]);
  
  useEffect(() => {
    // Redirect if not admin
    if (!user || user.email !== 'digibooster@123') {
      navigate('/');
      toast({
        variant: "destructive",
        title: "Akses ditolak",
        description: "Anda tidak memiliki izin untuk mengakses halaman ini.",
      });
    }
  }, [user, navigate, toast]);
  
  if (!user || user.email !== 'digibooster@123') {
    return null;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <img 
            src="/lovable-uploads/eb7d859a-60c0-4007-afe4-522ffdd5afda.png" 
            alt="DigiBooster Logo" 
            className="h-8 mx-auto md:mx-0" 
          />
        </div>
        
        <nav className="flex-1 py-4">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Menu Utama</div>
          
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'overview' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'users' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-5 h-5 mr-3" />
            <span>Pengguna</span>
          </button>
          
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'content' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('content')}
          >
            <FileText className="w-5 h-5 mr-3" />
            <span>Konten</span>
          </button>
          
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'services' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('services')}
          >
            <LayoutGrid className="w-5 h-5 mr-3" />
            <span>Layanan</span>
          </button>
          
          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Pengaturan</div>
          
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'settings' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Pengaturan Website</span>
          </button>
          
          <button 
            className={`flex items-center px-4 py-3 w-full text-left ${activeTab === 'profile' ? 'bg-diginavy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="w-5 h-5 mr-3" />
            <span>Profil Admin</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Website
          </Button>
        </div>
      </div>
      
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button className="rounded-full w-14 h-14 shadow-lg bg-diginavy text-white" onClick={() => {}}>
          <LayoutDashboard className="w-6 h-6" />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-800 md:hidden">
            DigiBooster Admin
          </h1>
          
          <div className="flex items-center">
            <div className="hidden md:flex mr-4">
              <Input
                placeholder="Cari..."
                className="w-64"
              />
            </div>
            
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="ml-2 font-medium text-sm hidden md:inline">Admin DigiBooster</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="p-6">
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Pengguna
                    </CardTitle>
                    <Users className="w-4 h-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userStats.total}</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      +{userStats.new} baru minggu ini
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Konten
                    </CardTitle>
                    <BookText className="w-4 h-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{contentStats.blogs + contentStats.courses + contentStats.portfolios}</div>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      {contentStats.blogs} blog, {contentStats.courses} kelas, {contentStats.portfolios} portofolio
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Kunjungan Mingguan
                    </CardTitle>
                    <BarChart3 className="w-4 h-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{trafficStats.weekly}</div>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      Konversi {trafficStats.conversion}%
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Kunjungan Bulanan
                    </CardTitle>
                    <BarChart3 className="w-4 h-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{trafficStats.monthly}</div>
                    <p className="text-xs text-blue-500 flex items-center mt-1">
                      +12.5% dari bulan lalu
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Pengguna Terbaru</CardTitle>
                    <CardDescription>
                      Daftar pengguna yang baru mendaftar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>{user.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{user.joinDate}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              user.role === 'premium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role === 'premium' ? 'Premium' : 'Reguler'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                    <Button variant="ghost" size="sm">Lihat Semua Pengguna</Button>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Pengguna
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Blog Populer</CardTitle>
                    <CardDescription>
                      Artikel blog dengan kunjungan tertinggi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBlogs.map((blog) => (
                        <div key={blog.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <p className="text-sm font-medium">{blog.title}</p>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-500">
                              {blog.published}
                            </p>
                            <p className="text-xs text-gray-500">
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
              </div>
            </div>
          )}
          
          {/* Users tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kelola Pengguna</h1>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Daftar Pengguna</CardTitle>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Cari pengguna..."
                        className="w-60"
                      />
                      <Select>
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="all">Semua</SelectItem>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="inactive">Tidak Aktif</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {[...recentUsers, 
                          { id: 5, name: 'Ahmad Fauzi', email: 'ahmad@example.com', role: 'user', joinDate: '2023-07-28', avatar: 'A' },
                          { id: 6, name: 'Siti Nurhaliza', email: 'siti@example.com', role: 'premium', joinDate: '2023-07-22', avatar: 'S' },
                          { id: 7, name: 'Joko Widodo', email: 'joko@example.com', role: 'user', joinDate: '2023-07-15', avatar: 'J' },
                        ].map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{user.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 'premium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role === 'premium' ? 'Premium' : 'Reguler'}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Menampilkan 7 dari 1245 pengguna</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
                    <Button variant="outline" size="sm">Selanjutnya</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {/* Content tab */}
          {activeTab === 'content' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kelola Konten</h1>
              </div>
              
              <Tabs defaultValue="blog">
                <TabsList className="mb-6">
                  <TabsTrigger value="blog">Blog</TabsTrigger>
                  <TabsTrigger value="courses">Kelas</TabsTrigger>
                  <TabsTrigger value="portfolio">Portofolio</TabsTrigger>
                </TabsList>
                
                <TabsContent value="blog">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">Artikel Blog</h2>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Artikel
                    </Button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
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
                          {[...recentBlogs, 
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
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="courses">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">Kelas</h2>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Kelas
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 1, title: 'Digital Marketing untuk Pemula', students: 156, lessons: 12, level: 'Pemula' },
                      { id: 2, title: 'SEO Optimization', students: 89, lessons: 8, level: 'Menengah' },
                      { id: 3, title: 'Content Creation Strategy', students: 124, lessons: 10, level: 'Pemula' },
                      { id: 4, title: 'Advanced Web Development', students: 67, lessons: 15, level: 'Mahir' },
                      { id: 5, title: 'Social Media Management', students: 203, lessons: 9, level: 'Menengah' },
                      { id: 6, title: 'UI/UX Design Basic', students: 178, lessons: 11, level: 'Pemula' },
                    ].map((course) => (
                      <Card key={course.id}>
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
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">Portofolio</h2>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Portofolio
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 1, title: 'Website E-commerce Toko ABC', category: 'Web Development', client: 'Toko ABC' },
                      { id: 2, title: 'Kampanye Digital XYZ Corp', category: 'Digital Marketing', client: 'XYZ Corp' },
                      { id: 3, title: 'Aplikasi Mobile PQR', category: 'Mobile App', client: 'PQR Inc' },
                      { id: 4, title: 'Redesign UI Website Korporat', category: 'UI/UX Design', client: 'LMN Group' },
                      { id: 5, title: 'Strategi SEO Toko Online', category: 'SEO', client: 'Online Shop RST' },
                      { id: 6, title: 'Content Marketing Startup', category: 'Content Marketing', client: 'Startup UVW' },
                    ].map((portfolio) => (
                      <Card key={portfolio.id}>
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
          )}
          
          {/* If other tabs are selected, show a message */}
          {['services', 'settings', 'profile'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <h2 className="text-lg font-medium text-gray-600">Fitur {activeTab === 'services' ? 'Layanan' : activeTab === 'settings' ? 'Pengaturan Website' : 'Profil Admin'} Sedang Dikembangkan</h2>
              <p className="mt-2 text-sm text-gray-500">Fitur ini akan segera tersedia dalam waktu dekat.</p>
              <Button 
                className="mt-4"
                onClick={() => setActiveTab('overview')}
              >
                Kembali ke Dashboard
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
