import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth.store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token to every request
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Refresh token logic ---
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: AxiosError | null, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // If a refresh is already in flight, queue this request
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return apiClient(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedRefreshToken) {
      processQueue(error);
      useAuthStore.getState().logout();
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      // Use a plain axios call to avoid interceptor loops
      const { data } = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        { headers: { Authorization: `Bearer ${storedRefreshToken}` } },
      );

      const newAccessToken: string = data.data.accessToken;
      const newRefreshToken: string = data.data.refreshToken;

      useAuthStore.getState().setAccessToken(newAccessToken);
      if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

      apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      original.headers.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);
      return apiClient(original);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError);
      useAuthStore.getState().logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
