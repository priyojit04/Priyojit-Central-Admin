# Priyojit Central Admin

A dark-premium central control center starter for managing the project registry, unified user directory, overview metrics, and workspace settings.

## Requirements
- Node.js 18+
- MySQL 8+

## Setup
1. Extract the ZIP and open this folder in VS Code.
2. In MySQL Workbench, execute `database/schema.sql`.
3. Copy `.env.example` to `.env` in the project root.
4. Set your MySQL credentials and a long random `JWT_SECRET`. Set a strong unique `ADMIN_PASSWORD`.
5. Run `npm install`.
6. Run `npm run seed` to create the owner account and register the starter projects.
7. Run `npm start`.
8. Open http://localhost:5001

Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values from `.env` to sign in.

## Current capabilities
- Secure admin login with bcrypt password hashing and signed JWT session
- Owner/admin/viewer role checks on project write operations
- Project registry: list, add, edit, owner-only delete API
- Unified user directory for records received from project integrations
- Overview metrics and admin activity log
- Rate-limited login, Helmet security headers, parameterized SQL queries

## Important integration note
The registry initially lists your eight planned projects. They are not automatically connected just because they appear here. Each project must later send authenticated events/users to this service or expose a separately secured API. This starter includes the registry and read-only unified user directory; per-project business actions (appointments, orders, finance records, etc.) must be integrated one project at a time using narrowly scoped APIs and permissions.

## API
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/overview`
- `GET /api/projects`
- `POST /api/projects`
- `PATCH /api/projects/:id`
- `DELETE /api/projects/:id` (owner only)
- `GET /api/users`
- `GET /health`

All routes except `/health` and login require `Authorization: Bearer <token>`.

## Before deployment
- Use HTTPS and a managed database.
- Set a strong unique `JWT_SECRET` and admin password.
- Never commit `.env`; keep `.env.example` free of secrets.
- Add backups, monitoring, audit review, and per-project API credentials before connecting production apps.
- Do not expose database credentials or master admin token to frontend code.
