import { Outlet, useRouterState } from '@tanstack/react-router';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

const AUTH_PATHS = ['/login', '/register'];
const PUBLIC_PATHS = ['/', '/404', '/403'];

/**
 * Root giữ layout chung — chọn layout theo path:
 * - /login, /register   → AuthLayout (form giữa màn hình)
 * - /, /404, /403       → PublicLayout (header + footer)
 * - còn lại (protected) → DashboardLayout (sidebar menu)
 */
export default function Root() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (AUTH_PATHS.includes(pathname)) {
    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    );
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return (
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    );
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
