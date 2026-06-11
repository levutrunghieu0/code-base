import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/types';

interface Props {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

/**
 * Redirects unauthenticated users to /login.
 * If allowedRoles is provided, also checks role permission.
 */
export function ProtectedRoute({ children, allowedRoles }: Props) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Authenticated but insufficient role — send to their dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
