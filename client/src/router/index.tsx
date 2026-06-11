import React from 'react';
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Navigate,
  Outlet,
  redirect,
  type AnyRoute,
  type RouteComponent,
} from '@tanstack/react-router';
import Root from './Root';
import type { RouteConfig } from './types';
import { Role, User } from '@/types';
import { routerConfig } from '@/config/router-config';

export type { RouteConfig } from './types';

/** Auth context truyền vào router từ <RouterProvider context={...}> (App.tsx) */
export interface RouterContext {
  auth: {
    isAuthed: boolean;
    user: User | null;
  };
}

// ✅ Root vẫn giữ layout Root (menu)
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <Navigate to="/404" replace />,
});

type PageModule = {
  default: React.ComponentType;
};

// Tự động quét toàn bộ pages/**/index.tsx — mỗi index.tsx là một route
const pageModules = import.meta.glob('../pages/**/index.tsx', {
  eager: true,
}) as Record<string, PageModule>;
const routeConfigModules = import.meta.glob('../pages/**/routeConfig.ts', { eager: true });

function getRouteConfigForIndexPath(indexPath: string): RouteConfig | undefined {
  // ../pages/a/b/index.tsx  ->  ../pages/a/b/routeConfig.ts
  const cfgPath = indexPath.replace(/\/index\.(t|j)sx?$/, '/routeConfig.ts');
  const mod = routeConfigModules[cfgPath] as { routeConfig?: RouteConfig } | undefined;

  return mod?.routeConfig;
}

function normalizeSegments(filePath: string): string[] {
  const trimmed = filePath.replace(/^\.\.\/pages\//, '').replace(/\/?index\.(t|j)sx?$/, '');
  if (!trimmed) return [];

  return trimmed.split('/').map((seg) => {
    // [id] -> $id (dynamic param)
    const m = seg.match(/^\[(.+)\]$/);

    return m ? `$${m[1]}` : seg;
  });
}

interface RouteNode {
  segment?: string;
  component?: React.ComponentType;
  roles?: Role[];
  isPublic?: boolean;
  children: Record<string, RouteNode>;
}

const tree: RouteNode = { children: {} };

// Build a route tree from /pages/**/index.tsx
for (const [path, mod] of Object.entries(pageModules)) {
  const segments = normalizeSegments(path);
  let cursor = tree;

  for (const seg of segments) {
    cursor.children[seg] ??= { segment: seg, children: {} };
    cursor = cursor.children[seg];
  }

  cursor.component = mod.default;

  // ✅ lấy config từ routeConfig.ts (thay vì export trong index.tsx)
  const cfg = getRouteConfigForIndexPath(path);
  cursor.roles = cfg?.roles;
  cursor.isPublic = cfg?.public;
}

function isSafeInternalRedirect(v: unknown): v is string {
  return typeof v === 'string' && v.startsWith('/');
}

function hasRequiredRole(userRole: Role | undefined, requiredRoles: Role[] | undefined): boolean {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  if (!userRole) return false;

  return requiredRoles.includes(userRole);
}

const PUBLIC_PATHS = new Set(['login', 'register', '404', '403']);

/**
 * Build child routes for a given parent route.
 * - Khi not found xảy ra ở bất kỳ folder/group nào => redirect sang /404
 * - /404 là route thật nên NotFound hiển thị nhất quán
 * - roles trong routeConfig.ts được kế thừa xuống các route con
 */
function buildChildRoutes(
  parent: AnyRoute,
  node: RouteNode,
  inherited?: { roles?: Role[]; isPublic?: boolean },
): AnyRoute[] {
  const routes: AnyRoute[] = [];

  // root index route: pages/index.tsx (trang Home public)
  if (parent === rootRoute) {
    if (node.component) {
      routes.push(
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/',
          component: node.component as RouteComponent,
        }),
      );
    } else {
      // Không có trang Home => về login
      routes.push(
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/',
          beforeLoad: () => {
            throw redirect({ to: routerConfig.loginPath, replace: true });
          },
        }),
      );
    }
  }

  for (const [seg, child] of Object.entries(node.children)) {
    const requiredRoles = child.roles ?? inherited?.roles;
    const inheritedPublic = inherited?.isPublic ?? false;

    // Check if this node has both a component AND children (nested routes)
    const hasChildren = Object.keys(child.children).length > 0;
    const hasComponent = !!child.component;

    // If node has both component and children, wrapper renders Outlet
    let routeComponent: RouteComponent | undefined;

    let addIndex404 = false;
    if (hasComponent && hasChildren) {
      routeComponent = () => <Outlet />;
    } else if (hasComponent) {
      routeComponent = child.component as RouteComponent;
    } else {
      // Không có component:
      // Nếu có ít nhất 1 child có component, render Outlet để truy cập các route con
      const hasChildWithComponent = Object.values(child.children).some((c) => !!c.component);
      if (hasChildWithComponent) {
        routeComponent = () => <Outlet />;
        addIndex404 = true;
      } else {
        // Không có component và không có child nào có component: điều hướng 404
        routeComponent = () => <Navigate to="/404" replace />;
      }
    }

    const route = createRoute({
      getParentRoute: () => parent,
      path: seg,
      component: routeComponent,

      // ✅ Quan trọng: not found trong mọi folder/group => đá sang /404
      // => đảm bảo 404 xử lý đồng nhất (không phụ thuộc notFoundComponent từng level)
      notFoundComponent: () => <Navigate to="/404" replace />,

      beforeLoad: ({ location, context, params }) => {
        // ✅ nếu đã ở /404 thì không làm auth/role redirect nữa
        if (location.pathname === '/404') return;

        // Nếu là dynamic id và không phải số, điều hướng 404
        if (seg.startsWith('$') && params && (params as Record<string, unknown>)[seg.slice(1)] !== undefined) {
          const idValue = (params as Record<string, unknown>)[seg.slice(1)];
          if (typeof idValue !== 'string' || !/^\d+$/.test(idValue)) {
            throw redirect({ to: '/404', replace: true });
          }
        }

        const auth = (context as RouterContext | undefined)?.auth;

        const isAuthed = !!auth?.isAuthed;
        const userRole = auth?.user?.role;

        const isLogin = seg === 'login';

        const isPublic = inheritedPublic || !!child.isPublic || PUBLIC_PATHS.has(seg) || isLogin;

        const search = location.search as Record<string, unknown>;
        const redirectUrl = isSafeInternalRedirect(search?.redirect)
          ? (search.redirect as string)
          : undefined;

        const safeRedirect = redirectUrl ?? routerConfig.defaultRedirect;

        // 1) Chưa login mà vào private route => /login
        if (!isAuthed && !isPublic) {
          const back = location.href;

          throw redirect({
            to: routerConfig.loginPath,
            search: { redirect: back },
            replace: true,
          });
        }

        // 2) Đã login mà vẫn vào /login hoặc /register => về trang an toàn
        if (isAuthed && (isLogin || seg === 'register')) {
          throw redirect({ to: safeRedirect, replace: true });
        }

        // 3) Role check — không đủ quyền => /403
        if (isAuthed && !isPublic && requiredRoles?.length) {
          const ok = hasRequiredRole(userRole, requiredRoles);
          if (!ok) {
            throw redirect({ to: '/403', replace: true });
          }
        }
      },
    });

    const grandchildren = buildChildRoutes(route, child, {
      roles: requiredRoles,
      isPublic: inheritedPublic || !!child.isPublic,
    });

    // If this route has both component and children, create index route for component
    if (hasComponent && hasChildren) {
      const indexRoute = createRoute({
        getParentRoute: () => route,
        path: '/',
        component: child.component as RouteComponent,
      });
      grandchildren.unshift(indexRoute); // Add index route first
    }
    // Nếu không có component nhưng có children có component, tạo index route điều hướng 404
    if (addIndex404) {
      const index404Route = createRoute({
        getParentRoute: () => route,
        path: '/',
        component: () => <Navigate to="/404" replace />,
      });
      grandchildren.unshift(index404Route);
    }

    if (grandchildren.length) route.addChildren(grandchildren);

    routes.push(route);
  }

  return routes;
}

// ✅ Attach: generated routes (404 will be auto-generated from pages/404/index.tsx)
rootRoute.addChildren(buildChildRoutes(rootRoute, tree));

export const router = createRouter({
  routeTree: rootRoute,
  context: {
    auth: { isAuthed: false, user: null },
  },
});
