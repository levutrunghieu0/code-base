import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth.store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Attach access token when it is available for backward compatibility.
// The backend also accepts the httpOnly accessToken cookie as the primary auth source.
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
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: AxiosError | null, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
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

    // If a refresh is already in flight, queue this request.
    if (isRefreshing) {
      return new Promise<string | null>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (token) original.headers.Authorization = `Bearer ${token}`;
        return apiClient(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      // Use a plain axios call to avoid interceptor loops. Refresh token is sent by cookie.
      const { data } = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      const newAccessToken: string | undefined = data.data?.accessToken;

      if (newAccessToken) {
        useAuthStore.getState().setAccessToken(newAccessToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        original.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      processQueue(null, newAccessToken || null);
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
