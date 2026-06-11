import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { routeConfig } from '@/routes/route-config';
import { cn } from '@/lib/utils';
import { useLogout } from '@/hooks/useLogout';

/** Dynamically renders only the menu items the current user's role can access */
export function Sidebar() {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();

  const menuItems = routeConfig.filter(
    (r) =>
      r.showInMenu &&
      r.requireAuth &&
      r.icon &&
      r.label &&
      (!r.roles || !user || r.roles.includes(user.role)),
  );

  return (
    <aside className="flex h-full w-60 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <span className="text-xl font-bold text-white">FullStack App</span>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <p className="text-sm font-medium text-white truncate">{user?.name}</p>
        <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</p>
        <span className="mt-1 inline-block rounded-full bg-sidebar-primary px-2 py-0.5 text-xs text-white">
          {user?.role}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-white'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white',
              )
            }
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
