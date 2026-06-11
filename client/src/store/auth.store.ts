import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User, accessToken: string) => void;
  setAccessToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true, // starts true so we can attempt silent refresh on app load

  setAuth: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true, isLoading: false }),

  setAccessToken: (accessToken) => set({ accessToken }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    localStorage.removeItem('refreshToken');
    set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
  },
}));
