import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { userApi } from '@/api/user.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Activity, ArrowRight } from 'lucide-react';
import { Role } from '@/types';

export default function AdminDashboard() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAll,
  });

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Admins',
      value: users.filter((u) => u.role === Role.ADMIN).length,
      icon: Shield,
      color: 'text-red-600',
    },
    {
      title: 'Active',
      value: users.filter((u) => u.isActive).length,
      icon: Activity,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview</p>
        </div>
        <Button asChild>
          <Link to="/admin/users">
            Manage Users <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ title, value, icon: Icon, color }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isLoading ? '—' : value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-2">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-md border px-4 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge
                    variant={
                      user.role === Role.ADMIN
                        ? 'destructive'
                        : user.role === Role.MANAGER
                          ? 'default'
                          : 'secondary'
                    }
                  >
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
