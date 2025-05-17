
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { 
  Users2, Search, BookOpen, Award, Clock, Activity, Layout, 
  BarChart3, FileText, Code, Palette, Video, Database, Bell 
} from 'lucide-react';

// Mock course data
const ongoingCourses = [
  {
    id: '1',
    title: 'Belajar Web Development dengan React',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    lessonsCompleted: 9,
    totalLessons: 20,
    category: 'Web Development',
    level: 'Intermediate',
  },
  {
    id: '2',
    title: 'Dasar-Dasar UI/UX Design',
    progress: 30,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80',
    lessonsCompleted: 6,
    totalLessons: 15,
    category: 'Design',
    level: 'Beginner',
  },
];

const completedCourses = [
  {
    id: '3',
    title: 'Digital Marketing untuk Pemula',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    lessonsCompleted: 30,
    totalLessons: 30,
    category: 'Marketing',
    level: 'Beginner',
    certificate: true,
  },
  {
    id: '4',
    title: 'Fotografi Produk untuk E-commerce',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    lessonsCompleted: 24,
    totalLessons: 24,
    category: 'Photography',
    level: 'Intermediate',
    certificate: true,
  },
];

// Mock recommended courses
const recommendedCourses = [
  {
    id: '5',
    title: 'Cyber Security for Beginners',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    lessonsCount: 28,
    category: 'Security',
    price: 'Rp 799.000',
    rating: 4.8,
    level: 'Beginner',
  },
  {
    id: '6',
    title: 'UX/UI Design Masterclass',
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80',
    lessonsCount: 42,
    category: 'Design',
    price: 'Rp 1.299.000',
    rating: 4.9,
    level: 'Advanced',
  },
  {
    id: '7',
    title: 'Data Analysis with Python',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    lessonsCount: 35,
    category: 'Data Science',
    price: 'Rp 999.000',
    rating: 4.7,
    level: 'Intermediate',
  },
];

// Mock learning statistics
const learningStats = {
  completedCourses: 2,
  ongoingCourses: 2,
  certificates: 2,
  hoursSpent: 42,
};

const UserDashboard = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userName = user?.user_metadata?.name || 'Pengguna';

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold">
              <span className="text-sky-400">T</span>-Course
            </h2>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center p-3 rounded-lg bg-sky-500/10 text-sky-400">
                  <Layout className="h-5 w-5 mr-3" />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                  <BookOpen className="h-5 w-5 mr-3" />
                  Kursus Saya
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                  <FileText className="h-5 w-5 mr-3" />
                  Rapor
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                  <Award className="h-5 w-5 mr-3" />
                  Sertifikat
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                  <Activity className="h-5 w-5 mr-3" />
                  Aktivitas
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">Bantuan & Support</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                    <Users2 className="h-5 w-5 mr-3" />
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-800">
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full border-gray-700"
            >
              Kembali ke Website
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-gray-900 border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              {/* Mobile menu button - only shown on mobile */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
              >
                <Layout className="h-5 w-5" />
              </Button>

              <div className="relative w-full max-w-md mx-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Cari kelas..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-sky-500"></span>
                </Button>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-medium">
                    {userName[0]}
                  </div>
                  <span className="ml-2 hidden md:inline">{userName}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatsCard 
                title="Ongoing" 
                value={learningStats.ongoingCourses} 
                icon={<Clock className="h-5 w-5 text-blue-500" />}
                color="blue"
              />
              
              <StatsCard 
                title="Completed" 
                value={learningStats.completedCourses} 
                icon={<BookOpen className="h-5 w-5 text-green-500" />}
                color="green"
              />
              
              <StatsCard 
                title="Certificate" 
                value={learningStats.certificates} 
                icon={<Award className="h-5 w-5 text-amber-500" />}
                color="amber"
              />
              
              <StatsCard 
                title="Hours Spent" 
                value={learningStats.hoursSpent} 
                icon={<Activity className="h-5 w-5 text-purple-500" />}
                color="purple"
              />
            </div>

            {/* Course Topic Donut Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Popular Course</CardTitle>
                      <Button variant="link" className="text-sky-400 p-0">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recommendedCourses.map(course => (
                        <CourseCard key={course.id.toString()} course={course} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl">Course Topic</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    {/* Donut chart component */}
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Design segment - 40% */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#818cf8"
                          strokeWidth="20"
                          strokeDasharray={`${0.4 * 251.2} ${251.2}`}
                          transform="rotate(-90 50 50)"
                        />
                        {/* Code segment - 30% */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#a5b4fc"
                          strokeWidth="20"
                          strokeDasharray={`${0.3 * 251.2} ${251.2}`}
                          strokeDashoffset={`${-0.4 * 251.2}`}
                          transform="rotate(-90 50 50)"
                        />
                        {/* Business segment - 20% */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#c7d2fe"
                          strokeWidth="20"
                          strokeDasharray={`${0.2 * 251.2} ${251.2}`}
                          strokeDashoffset={`${-0.7 * 251.2}`}
                          transform="rotate(-90 50 50)"
                        />
                        {/* Data segment - 10% */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#e0e7ff"
                          strokeWidth="20"
                          strokeDasharray={`${0.1 * 251.2} ${251.2}`}
                          strokeDashoffset={`${-0.9 * 251.2}`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">42</span>
                        <span className="text-xs text-gray-400">Total Course</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full mt-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
                        <div>
                          <div className="text-xs text-gray-400">Design</div>
                          <div className="text-sm font-medium">40%</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-300 mr-2"></div>
                        <div>
                          <div className="text-xs text-gray-400">Code</div>
                          <div className="text-sm font-medium">30%</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-200 mr-2"></div>
                        <div>
                          <div className="text-xs text-gray-400">Business</div>
                          <div className="text-sm font-medium">20%</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-100 mr-2"></div>
                        <div>
                          <div className="text-xs text-gray-400">Data</div>
                          <div className="text-sm font-medium">10%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Continue Learning */}
            <div className="mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Continue Learning</CardTitle>
                    <Button variant="link" className="text-sky-400 p-0">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="bg-gray-800 border-none">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-pink-100 rounded-lg p-3">
                            <Palette className="h-6 w-6 text-pink-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">UX/UI Design</h4>
                            <p className="text-xs text-gray-400">12/15 Lessons</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-none">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 rounded-lg p-3">
                            <Code className="h-6 w-6 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Cyber Security</h4>
                            <p className="text-xs text-gray-400">20/30 Lessons</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '66%' }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-none">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-green-100 rounded-lg p-3">
                            <Database className="h-6 w-6 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Data Analyst</h4>
                            <p className="text-xs text-gray-400">8/20 Lessons</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* My Courses */}
            <div className="mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl">My Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="ongoing" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ongoing">
                      <table className="w-full">
                        <thead className="text-left text-gray-400 text-sm">
                          <tr>
                            <th className="pb-4">Course Name</th>
                            <th className="pb-4 hidden md:table-cell">Lessons</th>
                            <th className="pb-4 hidden md:table-cell">Status</th>
                            <th className="pb-4 hidden md:table-cell">Level</th>
                            <th className="pb-4 hidden md:table-cell">Category</th>
                            <th className="pb-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {ongoingCourses.map(course => (
                            <tr key={course.id.toString()} className="border-t border-gray-800">
                              <td className="py-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded overflow-hidden mr-3">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="font-medium">{course.title}</span>
                                </div>
                              </td>
                              <td className="py-4 hidden md:table-cell">{course.lessonsCompleted}/{course.totalLessons}</td>
                              <td className="py-4 hidden md:table-cell">
                                <span className="px-2 py-1 bg-sky-500/20 text-sky-400 rounded text-xs">
                                  Ongoing
                                </span>
                              </td>
                              <td className="py-4 hidden md:table-cell">{course.level}</td>
                              <td className="py-4 hidden md:table-cell">{course.category}</td>
                              <td className="py-4 text-right">
                                <Button size="sm" className="bg-sky-500 hover:bg-sky-600">Continue</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TabsContent>
                    <TabsContent value="completed">
                      <table className="w-full">
                        <thead className="text-left text-gray-400 text-sm">
                          <tr>
                            <th className="pb-4">Course Name</th>
                            <th className="pb-4 hidden md:table-cell">Lessons</th>
                            <th className="pb-4 hidden md:table-cell">Status</th>
                            <th className="pb-4 hidden md:table-cell">Level</th>
                            <th className="pb-4 hidden md:table-cell">Category</th>
                            <th className="pb-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {completedCourses.map(course => (
                            <tr key={course.id.toString()} className="border-t border-gray-800">
                              <td className="py-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded overflow-hidden mr-3">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="font-medium">{course.title}</span>
                                </div>
                              </td>
                              <td className="py-4 hidden md:table-cell">{course.lessonsCompleted}/{course.totalLessons}</td>
                              <td className="py-4 hidden md:table-cell">
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                                  Completed
                                </span>
                              </td>
                              <td className="py-4 hidden md:table-cell">{course.level}</td>
                              <td className="py-4 hidden md:table-cell">{course.category}</td>
                              <td className="py-4 text-right">
                                {course.certificate ? (
                                  <Button size="sm" variant="outline" className="border-amber-500 text-amber-500">
                                    <Award className="h-4 w-4 mr-1" /> Certificate
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline">Review</Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => {
  let bgColor = "bg-gray-900";
  let ringColor = "";
  
  switch (color) {
    case "blue":
      ringColor = "ring-blue-500/20";
      break;
    case "green":
      ringColor = "ring-green-500/20";
      break;
    case "amber":
      ringColor = "ring-amber-500/20";
      break;
    case "purple":
      ringColor = "ring-purple-500/20";
      break;
    default:
      ringColor = "ring-gray-500/20";
  }
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${bgColor} border-gray-800 p-4 rounded-xl ring-1 ${ringColor}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <div className="bg-gray-800 p-1.5 rounded-full">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </motion.div>
  );
};

// Course Card Component
const CourseCard = ({ course }: { course: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl overflow-hidden"
    >
      <div className="relative h-36">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs font-medium">
          {course.price}
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="text-sky-400">{course.category}</span>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1">{course.rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-sm line-clamp-1">{course.title}</h3>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span>{course.lessonsCount} Lessons</span>
          <span>{course.level}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
