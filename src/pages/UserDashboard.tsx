
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  Users2, Search, BookOpen, Award, Clock, Activity, Layout, 
  BarChart3, FileText, Code, Palette, Video, Database, Bell,
  Home, User, Settings, LogOut
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
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast when dashboard loads
    if (user) {
      toast({
        title: "Selamat Datang",
        description: `Halo ${user.user_metadata?.name || 'Pengguna'}, selamat datang kembali!`
      });
    }
  }, []);

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
  
  const handleLogout = async () => {
    toast({
      title: "Logging out...",
      description: "Terima kasih telah menggunakan DigiBooster"
    });
    await logout();
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    toast({
      title: "Menu Changed",
      description: `Switched to ${section}`
    });
  };

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return renderDashboardContent();
      case 'courses':
        return renderCoursesContent();
      case 'reports':
        return renderReportsContent();
      case 'certificates':
        return renderCertificatesContent();
      case 'activities':
        return renderActivitiesContent();
      case 'profile':
        return renderProfileContent();
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <>
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
    </>
  );

  const renderCoursesContent = () => (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">All Courses</CardTitle>
          <CardDescription>Browse all your enrolled courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...ongoingCourses, ...completedCourses].map(course => (
              <Card key={course.id} className="bg-gray-800 border-gray-700">
                <div className="h-40 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{course.title}</h3>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{course.category}</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-sky-500'}`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
                    <span>{course.progress}% completed</span>
                  </div>
                  <Button className="w-full mt-3 bg-sky-500 hover:bg-sky-600">
                    {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Recommended Courses</CardTitle>
          <CardDescription>Courses you might be interested in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportsContent = () => (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Learning Progress</CardTitle>
          <CardDescription>Track your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Overall Progress</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>65% Complete</span>
                <span>35% Remaining</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium mb-2">Time Spent Learning</h3>
              <div className="grid grid-cols-7 gap-1">
                {Array(7).fill(0).map((_, i) => {
                  const height = 20 + Math.random() * 60;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="w-4 bg-sky-500/70 rounded-sm" 
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">
                        {['M','T','W','T','F','S','S'][i]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-gray-400 text-center">
                Last 7 days: 12.5 hours
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium mb-2">Course Completion</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>UX/UI Design</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Cyber Security</span>
                    <span>66%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Data Analyst</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Assessment Results</CardTitle>
          <CardDescription>Your performance in course assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['UX/UI Design', 'Cyber Security', 'Data Analyst'].map((course, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{course} Assessment</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    [85, 92, 78][i] >= 90 ? 'bg-green-500/20 text-green-400' : 
                    [85, 92, 78][i] >= 80 ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {[85, 92, 78][i]}%
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Completed on {['May 12', 'May 8', 'May 15'][i]}, 2025</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-gray-700 p-2 rounded">
                    <div className="text-gray-400">Questions</div>
                    <div className="font-medium mt-1">{[20, 30, 25][i]}</div>
                  </div>
                  <div className="bg-gray-700 p-2 rounded">
                    <div className="text-gray-400">Correct</div>
                    <div className="font-medium mt-1">{[17, 28, 20][i]}</div>
                  </div>
                  <div className="bg-gray-700 p-2 rounded">
                    <div className="text-gray-400">Time</div>
                    <div className="font-medium mt-1">{[35, 42, 30][i]} min</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCertificatesContent = () => (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Your Certificates</CardTitle>
          <CardDescription>Certificates you've earned from completed courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedCourses.map((course) => (
              <div key={course.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                <div className="p-6 relative">
                  <div className="absolute top-4 right-4 text-amber-500">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-400">Completed on March 15, 2025</p>
                  
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center">
                      <span className="text-xs font-bold">DB</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">DigiBooster</div>
                      <div className="text-xs text-gray-400">Certificate ID: {course.id}-CERT-2025</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
                    <Button variant="outline" size="sm" className="border-gray-700">
                      <Award className="w-4 h-4 mr-2" /> View
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-700">
                      <FileText className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Certificate Requirements</CardTitle>
          <CardDescription>Courses that are eligible for certification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ongoingCourses.map((course) => (
              <div key={course.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{course.title}</h3>
                  <span className="px-2 py-1 bg-sky-500/20 text-sky-400 rounded text-xs">
                    {course.progress}% Complete
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-sky-500 h-1.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="mt-3 text-sm">
                  <div className="flex items-center text-gray-400">
                    <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center mr-2">
                      {course.lessonsCompleted === course.totalLessons ? 
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> : 
                        null
                      }
                    </div>
                    Complete all {course.totalLessons} lessons ({course.lessonsCompleted}/{course.totalLessons})
                  </div>
                  <div className="flex items-center text-gray-400 mt-1">
                    <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center mr-2">
                      {course.progress >= 80 ? 
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> : 
                        null
                      }
                    </div>
                    Score at least 80% on final assessment ({course.progress}%)
                  </div>
                </div>
                <div className="mt-3">
                  <Button 
                    className={`w-full ${
                      course.progress === 100 ? 
                      'bg-green-500 hover:bg-green-600' : 
                      'bg-sky-500 hover:bg-sky-600'
                    }`}
                  >
                    {course.progress === 100 ? 'Claim Certificate' : 'Continue Course'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderActivitiesContent = () => (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Recent Activities</CardTitle>
          <CardDescription>Track your learning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { course: "UX/UI Design", activity: "Completed lesson: Color Theory Basics", time: "2 hours ago", icon: Palette },
              { course: "Cyber Security", activity: "Quiz submitted with score 85%", time: "Yesterday", icon: FileText },
              { course: "Data Analyst", activity: "Started new lesson: SQL Basics", time: "2 days ago", icon: Database },
              { course: "UX/UI Design", activity: "Discussion post: Modern UI Trends", time: "3 days ago", icon: Users2 },
              { course: "Cyber Security", activity: "Assignment submitted: Network Security", time: "4 days ago", icon: FileText },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">
                  <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-sky-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div>
                    <span className="font-medium">{item.course}</span>
                    <span className="text-sm text-gray-400 ml-2">{item.time}</span>
                  </div>
                  <p className="text-gray-400">{item.activity}</p>
                  {i < 4 && <div className="mt-2 border-b border-gray-800"></div>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" className="border-gray-700">
              Load More Activities
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Learning Streak</CardTitle>
          <CardDescription>Your daily learning progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">7</div>
            <div className="text-gray-400 mb-6">Days in a row</div>
            
            <div className="grid grid-cols-7 gap-2 mb-4 w-full max-w-md">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    i <= 6 ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500' : 'bg-gray-800'
                  }`}>
                    {i <= 6 && <Check className="w-4 h-4" />}
                  </div>
                  <span className="text-xs text-gray-400">{day}</span>
                </div>
              ))}
            </div>
            
            <p className="text-gray-400 text-sm text-center mt-2">
              You've been learning consistently for 7 days. Keep going!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfileContent = () => (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Profile Information</CardTitle>
          <CardDescription>Manage your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-sky-500 flex items-center justify-center text-3xl font-bold">
                {userName[0]}
              </div>
              <Button variant="outline" size="sm" className="mt-4 border-gray-700">
                Change Avatar
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    value={userName} 
                    className="bg-gray-800 border-gray-700 focus:border-sky-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    value={user?.email || 'pengguna@gmail.com'} 
                    readOnly
                    className="bg-gray-800 border-gray-700 focus:border-sky-500 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea 
                  rows={3}
                  className="w-full rounded-md bg-gray-800 border-gray-700 focus:border-sky-500 text-white p-2"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-sky-500 hover:bg-sky-600">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-400">Receive emails about course updates and new content</p>
              </div>
              <div className="flex items-center h-6">
                <input 
                  type="checkbox" 
                  checked={true}
                  className="w-4 h-4 accent-sky-500"
                />
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-400">Receive notifications when new lessons are available</p>
                </div>
                <div className="flex items-center h-6">
                  <input 
                    type="checkbox" 
                    checked={true}
                    className="w-4 h-4 accent-sky-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-400">Use dark mode for all screens</p>
                </div>
                <div className="flex items-center h-6">
                  <input 
                    type="checkbox" 
                    checked={true}
                    className="w-4 h-4 accent-sky-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800">
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold">
              <span className="text-sky-400">Digi</span>Booster
            </h2>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => handleSectionChange('dashboard')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left ${
                    activeSection === 'dashboard' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white transition-colors'
                  }`}
                >
                  <Layout className="h-5 w-5 mr-3" />
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionChange('courses')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left ${
                    activeSection === 'courses' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white transition-colors'
                  }`}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  My Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionChange('reports')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left ${
                    activeSection === 'reports' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white transition-colors'
                  }`}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Reports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionChange('certificates')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left ${
                    activeSection === 'certificates' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white transition-colors'
                  }`}
                >
                  <Award className="h-5 w-5 mr-3" />
                  Certificates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionChange('activities')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left ${
                    activeSection === 'activities' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white transition-colors'
                  }`}
                >
                  <Activity className="h-5 w-5 mr-3" />
                  Activities
                </button>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">Account</h3>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => handleSectionChange('profile')} 
                    className={`flex items-center w-full p-3 rounded-lg text-left ${
                      activeSection === 'profile' ? 'bg-sky-500/10 text-sky-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white transition-colors'
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLogout()} 
                    className="flex items-center w-full p-3 rounded-lg text-left text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
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
              <Home className="w-4 h-4 mr-2" />
              Back to Website
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
                className="md:hidden text-white"
              >
                <Layout className="h-5 w-5" />
              </Button>

              <div className="relative w-full max-w-md mx-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative text-white">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-sky-500"></span>
                </Button>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-medium">
                    {userName[0]}
                  </div>
                  <span className="ml-2 hidden md:inline text-white">{userName}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
            {renderSectionContent()}
          </main>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 flex justify-between">
        <Button 
          variant="ghost" 
          size="icon" 
          className={activeSection === 'dashboard' ? 'text-sky-400' : 'text-gray-400'}
          onClick={() => handleSectionChange('dashboard')}
        >
          <Layout className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className={activeSection === 'courses' ? 'text-sky-400' : 'text-gray-400'}
          onClick={() => handleSectionChange('courses')}
        >
          <BookOpen className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className={activeSection === 'certificates' ? 'text-sky-400' : 'text-gray-400'}
          onClick={() => handleSectionChange('certificates')}
        >
          <Award className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className={activeSection === 'profile' ? 'text-sky-400' : 'text-gray-400'}
          onClick={() => handleSectionChange('profile')}
        >
          <User className="h-5 w-5" />
        </Button>
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
