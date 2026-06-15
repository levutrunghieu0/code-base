import { Link } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { routerConfig } from '@/config/router-config';
import { useLogout } from '@/hooks/useLogout';
import { useI18n } from '@/i18n/I18nProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SidebarProps {
  onNavigate?: () => void;
}

/** Dynamically renders only the menu items the current user's role can access */
export function Sidebar({ onNavigate }: SidebarProps) {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();
  const { t } = useI18n();

  const visibleItems = routerConfig.menu.filter((item) => user && item.roles.includes(user.role));

  const onLogout = async () => {
    onNavigate?.();
    await handleLogout();
  };

  return (
    <aside className="flex h-full w-72 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl lg:w-64 lg:shadow-none">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between gap-3 border-b border-sidebar-border px-4">
        <div className="min-w-0">
          <span className="block truncate text-lg font-bold text-white">{t('app.name')}</span>
          <span className="text-xs text-sidebar-foreground/50">{t('common.dashboard')}</span>
        </div>
        <LanguageSwitcher />
      </div>

      {/* User info */}
      <div className="border-b border-sidebar-border px-4 py-4">
        <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sm font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user?.name}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>
            </div>
          </div>
          <span className="mt-3 inline-flex rounded-full bg-sidebar-primary/20 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-sidebar-primary/30">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {visibleItems.map(({ to, labelKey, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact: true }}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-all hover:bg-sidebar-accent/60 hover:text-white hover:shadow-sm"
            activeProps={{
              className:
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all bg-sidebar-accent text-white shadow-sm ring-1 ring-white/10',
            }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-white/10">
              <Icon className="h-4 w-4" />
            </span>
            <span className="truncate">{t(labelKey)}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-all hover:bg-sidebar-accent/60 hover:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
            <LogOut className="h-4 w-4" />
          </span>
          {t('common.logout')}
        </button>
      </div>
    </aside>
  );
}
