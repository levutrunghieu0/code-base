import { useAuthStore } from '@/store/auth.store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar } from 'lucide-react';

export default function DashboardView() {
  const { user } = useAuthStore();

  const roleColor: Record<string, 'default' | 'secondary' | 'destructive'> = {
    ADMIN: 'destructive',
    MANAGER: 'default',
    USER: 'secondary',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{user?.name}</div>
            <Badge variant={roleColor[user?.role || 'USER']} className="mt-1">
              {user?.role}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Email</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium truncate">{user?.email}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Full Name', value: user?.name },
            { label: 'Email Address', value: user?.email },
            { label: 'Role', value: user?.role },
            { label: 'Account Status', value: user?.isActive ? 'Active' : 'Inactive' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="text-sm font-medium">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
