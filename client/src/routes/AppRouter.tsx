import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routeConfig } from './route-config';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { GuestRoute } from '@/components/GuestRoute';

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

const LAYOUTS = {
  public: PublicLayout,
  auth: AuthLayout,
  dashboard: DashboardLayout,
};

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {routeConfig.map(({ path, element, layout, requireAuth, guestOnly, roles }) => {
            const Layout = LAYOUTS[layout];

            let content = element;

            if (guestOnly) {
              content = <GuestRoute>{element}</GuestRoute>;
            } else if (requireAuth) {
              content = (
                <ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>
              );
            }

            return (
              <Route key={path} path={path} element={<Layout>{content}</Layout>} />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
