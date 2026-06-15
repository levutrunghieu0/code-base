import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/api/user.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, TrendingUp } from 'lucide-react';
import { Role } from '@/types';

export default function ManagerView() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAll,
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    byRole: {
      [Role.ADMIN]: users.filter((u) => u.role === Role.ADMIN).length,
      [Role.MANAGER]: users.filter((u) => u.role === Role.MANAGER).length,
      [Role.USER]: users.filter((u) => u.role === Role.USER).length,
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>
        <p className="text-muted-foreground">Team overview and reports</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Managers</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.byRole[Role.MANAGER]}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users by Role</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.byRole).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <Badge
                    variant={
                      role === 'ADMIN'
                        ? 'destructive'
                        : role === 'MANAGER'
                          ? 'default'
                          : 'secondary'
                    }
                  >
                    {role}
                  </Badge>
                  <div className="flex items-center gap-2 flex-1 mx-4">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: stats.total ? `${(count / stats.total) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium w-6 text-right">{count}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
