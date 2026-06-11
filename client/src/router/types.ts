import { Role } from '@/types';

/**
 * Per-page route config — đặt trong file routeConfig.ts cạnh index.tsx của page.
 * - roles: các role được phép truy cập (kế thừa xuống các route con)
 * - public: không cần đăng nhập
 */
export interface RouteConfig {
  roles?: Role[];
  public?: boolean;
}
