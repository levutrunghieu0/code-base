import { apiClient } from './axios';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types';

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<{ data: AuthResponse }>('/auth/login', payload);
    return data.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<{ data: AuthResponse }>('/auth/register', payload);
    return data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<{ data: User }>('/auth/me');
    return data.data;
  },
};
