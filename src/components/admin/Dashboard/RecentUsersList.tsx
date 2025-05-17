
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  avatar: string;
}

interface RecentUsersListProps {
  users: User[];
}

const RecentUsersList = ({ users }: RecentUsersListProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-white">Pengguna Terbaru</CardTitle>
        <div className="relative w-full max-w-[180px]">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="search"
            placeholder="Cari pengguna..."
            className="pl-8 pr-2 py-1 w-full bg-gray-700 border-gray-600 rounded text-sm text-white"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="pb-3 font-medium">Nama</th>
                <th className="pb-3 font-medium hidden md:table-cell">Email</th>
                <th className="pb-3 font-medium hidden md:table-cell">Role</th>
                <th className="pb-3 font-medium hidden md:table-cell">Bergabung</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-700">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-medium mr-2">
                        {user.avatar}
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-300 hidden md:table-cell">{user.email}</td>
                  <td className="py-3 hidden md:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      user.role === "premium" 
                        ? "bg-amber-500/10 text-amber-400" 
                        : "bg-sky-500/10 text-sky-400"
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300 hidden md:table-cell">{user.joinDate}</td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-sky-500 hover:text-sky-400 hover:bg-sky-500/10">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-700">
            View All Users
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentUsersList;
