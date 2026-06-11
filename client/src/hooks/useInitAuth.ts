import { useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * On app mount, attempt a silent refresh if a stored refresh token exists.
 * This restores the session after a page reload.
 */
export function useInitAuth() {
  const { setAuth, setLoading } = useAuthStore();

  useEffect(() => {
    const refresh = async () => {
      const storedToken = localStorage.getItem('refreshToken');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { headers: { Authorization: `Bearer ${storedToken}` } },
        );
        const { user, accessToken, refreshToken } = data.data;
        localStorage.setItem('refreshToken', refreshToken);
        setAuth(user, accessToken);
      } catch {
        localStorage.removeItem('refreshToken');
        setLoading(false);
      }
    };

    refresh();
  }, []);
}
