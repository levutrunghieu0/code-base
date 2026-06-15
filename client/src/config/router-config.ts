import {
  LayoutDashboard,
  BarChart3,
  Shield,
  Users,
  PackageSearch,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { Role } from '@/types';
import type { TranslationKey } from '@/i18n/translations';

export interface MenuItem {
  to: string;
  labelKey: TranslationKey;
  icon: LucideIcon;
  /** Roles được phép thấy menu item này (đồng bộ với routeConfig.ts của page) */
  roles: Role[];
}

/**
 * Config chung cho router:
 * - đường dẫn login / redirect mặc định (dùng bởi router guards)
 * - sidebar menu (lọc theo role lúc render)
 *
 * Quyền truy cập từng route khai báo trong pages/<page>/routeConfig.ts
 */
export const routerConfig = {
  /** Nơi user chưa đăng nhập bị chuyển đến */
  loginPath: '/login' as const,

  /** Trang đích sau khi login / khi bị chặn role */
  defaultRedirect: '/dashboard' as const,

  /** Sidebar navigation */
  menu: [
    {
      to: '/dashboard',
      labelKey: 'common.dashboard',
      icon: LayoutDashboard,
      roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/sales',
      labelKey: 'nav.sales',
      icon: BarChart3,
      roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/forecast',
      labelKey: 'nav.forecast',
      icon: TrendingUp,
      roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/recommendations',
      labelKey: 'nav.recommendations',
      icon: PackageSearch,
      roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/manager',
      labelKey: 'nav.reports',
      icon: BarChart3,
      roles: [Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/admin',
      labelKey: 'nav.admin',
      icon: Shield,
      roles: [Role.ADMIN],
    },
    {
      to: '/admin/users',
      labelKey: 'nav.users',
      icon: Users,
      roles: [Role.ADMIN],
    },
  ] as MenuItem[],
};
