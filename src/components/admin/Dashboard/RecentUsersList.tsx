
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";

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
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Pengguna Terbaru</CardTitle>
        <CardDescription>
          Daftar pengguna yang baru mendaftar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className={user.role === 'premium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}>
                    {user.avatar}
                  </AvatarFallback>
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
  );
};

export default RecentUsersList;
