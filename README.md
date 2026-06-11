# Fullstack Boilerplate — React + NestJS + PostgreSQL

## Tech Stack

| Layer     | Technology                                                |
| --------- | --------------------------------------------------------- |
| Frontend  | React 18, Vite, TypeScript, TailwindCSS, shadcn/ui        |
| State     | Zustand, TanStack Query v5                                |
| Forms     | React Hook Form + Zod                                     |
| Routing   | React Router DOM v6 (dynamic role-based)                  |
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
│       ├── routes/          # Route config + AppRouter
│       ├── layouts/         # Layout components
│       ├── pages/           # Page components per role
│       ├── components/      # Shared + shadcn/ui components
│       ├── types/           # TypeScript types
│       └── lib/             # Utilities
├── server/                  # NestJS backend
│   └── src/
│       ├── auth/            # Auth module (login/register/refresh)
│       ├── users/           # Users module
│       ├── common/          # Guards, decorators, filters
│       ├── config/          # App configuration
│       └── database/        # TypeORM setup + seeds
└── docker-compose.yml
```
