import { apiClient } from './axios';
import { User } from '@/types';

export interface UpdateUserPayload {
  name?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
}

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<{ data: User[] }>('/users');
    return data.data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<{ data: User }>(`/users/${id}`);
    return data.data;
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<User> => {
    const { data } = await apiClient.patch<{ data: User }>(`/users/${id}`, payload);
    return data.data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
