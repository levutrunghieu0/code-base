import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/user.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, RefreshCw } from 'lucide-react';
import { Role, User } from '@/types';
import { useAuthStore } from '@/store/auth.store';
import { useI18n } from '@/i18n/I18nProvider';

export default function UsersView() {
  const queryClient = useQueryClient();
  const { user: me } = useAuthStore();
  const { t } = useI18n();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: userApi.remove,
    onMutate: (id) => setDeletingId(id),
    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const roleColor = (role: Role) => {
    if (role === Role.ADMIN) return 'destructive' as const;
    if (role === Role.MANAGER) return 'default' as const;
    return 'secondary' as const;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('users.title')}</h1>
          <p className="text-muted-foreground">{t('users.total', { count: users.length })}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('common.refresh')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('users.all')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="py-4 text-center text-muted-foreground">{t('common.loading')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="pb-3 text-left font-medium">{t('users.name')}</th>
                    <th className="pb-3 text-left font-medium">{t('common.email')}</th>
                    <th className="pb-3 text-left font-medium">{t('common.role')}</th>
                    <th className="pb-3 text-left font-medium">{t('common.status')}</th>
                    <th className="pb-3 text-left font-medium">{t('users.joined')}</th>
                    <th className="pb-3 text-right font-medium">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user: User) => (
                    <tr key={user.id} className="hover:bg-muted/30">
                      <td className="py-3 font-medium">{user.name}</td>
                      <td className="py-3 text-muted-foreground">{user.email}</td>
                      <td className="py-3">
                        <Badge variant={roleColor(user.role)}>{user.role}</Badge>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            user.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {user.isActive ? t('common.active') : t('common.inactive')}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={user.id === me?.id || deletingId === user.id}
                          onClick={() => deleteMutation.mutate(user.id)}
                          title={user.id === me?.id ? t('users.deleteSelf') : t('users.delete')}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
