
import { ArrowUpRight, BarChart3, BookText, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "./StatCard";
import RecentUsersList from "./RecentUsersList";
import PopularBlogsList from "./PopularBlogsList";

interface DashboardOverviewProps {
  userStats: {
    total: number;
    new: number;
    active: number;
    premium: number;
  };
  contentStats: {
    blogs: number;
    courses: number;
    services: number;
    portfolios: number;
  };
  trafficStats: {
    weekly: number;
    monthly: number;
    conversion: number;
  };
  recentUsers: {
    id: number;
    name: string;
    email: string;
    role: string;
    joinDate: string;
    avatar: string;
  }[];
  recentBlogs: {
    id: number;
    title: string;
    author: string;
    published: string;
    views: number;
  }[];
}

const DashboardOverview = ({
  userStats,
  contentStats,
  trafficStats,
  recentUsers,
  recentBlogs
}: DashboardOverviewProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white hidden md:block">Ringkasan Website</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex border-gray-700 text-white hover:bg-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard 
          title="Total Pengguna" 
          value={userStats.total} 
          icon={Users} 
          subtitle={`+${userStats.new} baru minggu ini`} 
          subtitleColor="text-green-500"
        />
        
        <StatCard 
          title="Total Konten" 
          value={contentStats.blogs + contentStats.courses + contentStats.portfolios} 
          icon={BookText} 
          subtitle={`${contentStats.blogs} blog, ${contentStats.courses} kelas, ${contentStats.portfolios} portofolio`} 
        />
        
        <StatCard 
          title="Kunjungan Mingguan" 
          value={trafficStats.weekly} 
          icon={BarChart3} 
          subtitle={`Konversi ${trafficStats.conversion}%`} 
        />
        
        <StatCard 
          title="Kunjungan Bulanan" 
          value={trafficStats.monthly} 
          icon={BarChart3} 
          subtitle="+12.5% dari bulan lalu" 
          subtitleColor="text-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentUsersList users={recentUsers} />
        </div>
        <div>
          <PopularBlogsList blogs={recentBlogs} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
