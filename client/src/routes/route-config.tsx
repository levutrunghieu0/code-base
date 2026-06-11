import { lazy } from 'react';
import {
  Home,
  LayoutDashboard,
  Users,
  BarChart3,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { Role } from '@/types';

const HomePage = lazy(() => import('@/pages/public/HomePage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const UserDashboard = lazy(() => import('@/pages/user/UserDashboard'));
const ManagerDashboard = lazy(() => import('@/pages/manager/ManagerDashboard'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const UsersManagement = lazy(() => import('@/pages/admin/UsersManagement'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export type LayoutType = 'public' | 'auth' | 'dashboard';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  layout: LayoutType;
  /** Route requires authentication */
  requireAuth?: boolean;
  /** Only accessible when NOT authenticated (login/register) */
  guestOnly?: boolean;
  /** Roles that can access this route (empty = any authenticated user) */
  roles?: Role[];
  /** Display in sidebar navigation */
  showInMenu?: boolean;
  label?: string;
  icon?: LucideIcon;
}

export const routeConfig: RouteConfig[] = [
  // ── Public ────────────────────────────────────────────────────────────
  {
    path: '/',
    element: <HomePage />,
    layout: 'public',
    showInMenu: false,
  },

  // ── Guest only (redirect away if already logged in) ────────────────
  {
    path: '/login',
    element: <LoginPage />,
    layout: 'auth',
    guestOnly: true,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    layout: 'auth',
    guestOnly: true,
  },

  // ── Protected — all authenticated users ───────────────────────────
  {
    path: '/dashboard',
    element: <UserDashboard />,
    layout: 'dashboard',
    requireAuth: true,
    roles: [Role.USER, Role.MANAGER, Role.ADMIN],
    showInMenu: true,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },

  // ── Protected — MANAGER + ADMIN ────────────────────────────────────
  {
    path: '/manager',
    element: <ManagerDashboard />,
    layout: 'dashboard',
    requireAuth: true,
    roles: [Role.MANAGER, Role.ADMIN],
    showInMenu: true,
    label: 'Reports',
    icon: BarChart3,
  },

  // ── Protected — ADMIN only ─────────────────────────────────────────
  {
    path: '/admin',
    element: <AdminDashboard />,
    layout: 'dashboard',
    requireAuth: true,
    roles: [Role.ADMIN],
    showInMenu: true,
    label: 'Admin',
    icon: Shield,
  },
  {
    path: '/admin/users',
    element: <UsersManagement />,
    layout: 'dashboard',
    requireAuth: true,
    roles: [Role.ADMIN],
    showInMenu: true,
    label: 'Users',
    icon: Users,
  },

  // ── 404 ────────────────────────────────────────────────────────────
  {
    path: '*',
    element: <NotFoundPage />,
    layout: 'public',
  },
];
