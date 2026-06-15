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

export interface MenuItem {
  to: string;
  label: string;
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
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/sales',
      label: 'Sales History',
      icon: BarChart3,
      roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/forecast',
      label: 'Forecast',
      icon: TrendingUp,
      roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/recommendations',
      label: 'Recommendations',
      icon: PackageSearch,
      roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/manager',
      label: 'Reports',
      icon: BarChart3,
      roles: [Role.MANAGER, Role.ADMIN],
    },
    {
      to: '/admin',
      label: 'Admin',
      icon: Shield,
      roles: [Role.ADMIN],
    },
    {
      to: '/admin/users',
      label: 'Users',
      icon: Users,
      roles: [Role.ADMIN],
    },
  ] as MenuItem[],
};
