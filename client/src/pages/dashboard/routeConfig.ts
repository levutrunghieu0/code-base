import { Role } from '@/types';
import type { RouteConfig } from '@/router/types';

export const routeConfig: RouteConfig = {
  roles: [Role.USER, Role.MANAGER, Role.ADMIN],
};
