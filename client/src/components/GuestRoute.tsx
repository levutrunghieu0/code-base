import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

interface Props {
  children: React.ReactNode;
}

/** Redirects already-authenticated users away from login/register pages */
export function GuestRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}
