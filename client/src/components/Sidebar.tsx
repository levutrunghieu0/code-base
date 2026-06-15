import { Link } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { routerConfig } from '@/config/router-config';
import { useLogout } from '@/hooks/useLogout';
import { useI18n } from '@/i18n/I18nProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

/** Dynamically renders only the menu items the current user's role can access */
export function Sidebar() {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();
  const { t } = useI18n();

  const visibleItems = routerConfig.menu.filter((item) => user && item.roles.includes(user.role));

  return (
    <aside className="flex h-full w-60 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between gap-3 border-b border-sidebar-border px-4">
        <span className="text-lg font-bold text-white">{t('app.name')}</span>
        <LanguageSwitcher />
      </div>

      {/* User info */}
      <div className="border-b border-sidebar-border px-4 py-4">
        <p className="truncate text-sm font-medium text-white">{user?.name}</p>
        <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>
        <span className="mt-1 inline-block rounded-full bg-sidebar-primary px-2 py-0.5 text-xs text-white">
          {user?.role}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {visibleItems.map(({ to, labelKey, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: true }}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-white"
            activeProps={{
              className:
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors bg-sidebar-accent text-white',
            }}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {t(labelKey)}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          {t('common.logout')}
        </button>
      </div>
    </aside>
  );
}
