import { Role } from '@/types';
import type { RouteConfig } from '@/router/types';

// Áp dụng cho /admin và kế thừa xuống mọi route con (/admin/users, ...)
export const routeConfig: RouteConfig = {
  roles: [Role.ADMIN],
};
