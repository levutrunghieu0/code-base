import { useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * On app mount, attempt a silent refresh using the httpOnly refreshToken cookie.
 * This restores the session after a page reload without storing tokens in localStorage.
 */
export function useInitAuth() {
  const { setAuth, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const refresh = async () => {
      try {
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        const { user, accessToken } = data.data;
        setAuth(user, accessToken);
      } catch {
        logout();
        setLoading(false);
      }
    };

    refresh();
  }, [logout, setAuth, setLoading]);
}
