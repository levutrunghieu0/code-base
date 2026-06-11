import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/api/auth.api';

export function useLogout() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Best-effort — clear local state regardless
    } finally {
      logout();
      navigate('/login');
    }
  };

  return { handleLogout };
}
