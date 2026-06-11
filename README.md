# Fullstack Boilerplate — React + NestJS + PostgreSQL

## Tech Stack

| Layer     | Technology                                                |
| --------- | --------------------------------------------------------- |
| Frontend  | React 18, Vite, TypeScript, TailwindCSS, shadcn/ui        |
| State     | Zustand, TanStack Query v5                                |
| Forms     | React Hook Form + Zod                                     |
| Routing   | TanStack Router v1 (auto-built from pages/**/index.tsx)   |
| HTTP      | Axios + auto refresh token interceptor                    |
| Backend   | NestJS 10, TypeScript, TypeORM                            |
| Database  | PostgreSQL 16                                             |
| Auth      | JWT Access Token (15m) + Refresh Token (7d) + bcrypt      |
| Docs      | Swagger UI at /api/docs                                   |

## Roles

| Role    | Access                              |
| ------- | ----------------------------------- |
| ADMIN   | All routes + user management        |
| MANAGER | Manager dashboard + own profile     |
| USER    | Personal dashboard only             |

## Quick Start

### 1. Start Database

```bash
docker compose up -d
```

### 2. Backend

```bash
cd server
cp .env.example .env
npm install
npm run seed        # seed admin user
npm run start:dev
```

### 3. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

## Default Credentials (after seed)

| Role    | Email                 | Password     |
| ------- | --------------------- | ------------ |
| ADMIN   | admin@example.com     | Admin@123    |
| MANAGER | manager@example.com   | Manager@123  |
| USER    | user@example.com      | User@123     |

## API Docs

After starting the server: http://localhost:3000/api/docs

## Project Structure

```
code-base/
├── client/                  # React frontend
│   └── src/
│       ├── api/             # Axios instance + API functions
│       ├── store/           # Zustand auth store
│       ├── config/          # router-config.ts — login path, default redirect, sidebar menu
│       ├── router/          # Router builder (import.meta.glob) + Root layout switcher
│       ├── layouts/         # Layout components (Public/Auth/Dashboard)
│       ├── pages/           # Each folder with index.tsx becomes a route automatically
│       │   │                # index.tsx chỉ re-export view + routeConfig.ts (roles/public)
│       │   ├── index.tsx            → /
│       │   ├── login/  register/    → public (routeConfig.ts: public)
│       │   ├── 404/  403/           → error pages (public)
│       │   ├── dashboard/           → /dashboard (routeConfig.ts: all roles)
│       │   ├── manager/             → /manager   (routeConfig.ts: MANAGER+ADMIN)
│       │   └── admin/               → /admin     (routeConfig.ts: ADMIN, inherited)
│       │       └── users/           → /admin/users (inherits ADMIN from parent)
│       ├── views/           # UI của từng page (HomeView, LoginView, AdminView, ...)
│       ├── components/      # Shared + shadcn/ui components
│       ├── types/           # TypeScript types
│       └── lib/             # Utilities

### Adding a new page (client)

1. Create `src/views/<name>/MyView.tsx` with the UI
2. Create `src/pages/<path>/index.tsx` re-exporting it: `export { default } from '@/views/<name>/MyView'`
3. (Optional) `src/pages/<path>/routeConfig.ts` with `{ roles: [...] }` or `{ public: true }` — omit to inherit from the parent folder
4. Add a menu entry in `src/config/router-config.ts` if it should appear in the sidebar

Dynamic params: name the folder `[id]` → becomes `$id` (e.g. `pages/admin/users/[id]/index.tsx` → `/admin/users/:id`).
├── server/                  # NestJS backend
│   └── src/
│       ├── auth/            # Auth module (login/register/refresh)
│       ├── users/           # Users module (controller → service → repository)
│       ├── common/          # Guards, decorators, filters
│       ├── config/          # App configuration
│       └── database/        # TypeORM setup + seeds
└── docker-compose.yml
```
