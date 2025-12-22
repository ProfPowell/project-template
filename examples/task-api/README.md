# Task API Demo

A demonstration Task Management API showcasing the project template's backend features.

## Features Demonstrated

- **Database migrations** with up/down functions
- **JWT authentication** with access/refresh tokens
- **Password hashing** with Argon2id
- **Rate limiting** on auth and API endpoints
- **Structured logging** (JSON format)
- **OpenAPI documentation**
- **Error handling middleware**
- **Seed data** with faker.js

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Setup

1. **Create database**

```bash
createdb task_api_dev
```

2. **Configure environment**

```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Install dependencies**

```bash
npm install
```

4. **Run migrations**

```bash
npm run db:migrate
```

5. **Seed data** (optional)

```bash
npm run db:seed
```

6. **Start server**

```bash
npm run dev
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh token |
| GET | `/api/auth/me` | Get current user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/:id` | Get task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api-docs` | OpenAPI spec |

## Example Usage

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"Test User","password":"Password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password123"}'
```

### Create Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"title":"My first task","description":"Do something important","priority":1}'
```

### List Tasks

```bash
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Database Commands

```bash
npm run db:migrate    # Run pending migrations
npm run db:rollback   # Rollback last migration
npm run db:status     # Show migration status
npm run db:seed       # Run seed files
npm run db:reset      # Truncate and reseed (dev only)
```

## Test Accounts

After running seeds:

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | Password123 | admin |
| user@example.com | Password123 | user |

## Project Structure

```
src/
├── index.js              # Server entry point
├── config/
│   └── index.js          # Environment config
├── api/
│   ├── routes.js         # Route definitions
│   ├── handlers/         # Request handlers
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   └── health.js
│   └── middleware/       # Express middleware
│       ├── auth.js
│       ├── error.js
│       └── rateLimit.js
├── services/             # Business logic
│   ├── auth.js
│   └── task.js
├── db/
│   ├── client.js         # PostgreSQL pool
│   ├── migrate.js        # Migration runner
│   ├── seed.js           # Seed runner
│   ├── schema.sql        # Schema documentation
│   ├── migrations/       # Migration files
│   └── seeds/            # Seed files
└── lib/                  # Utilities
    ├── auth.js           # JWT/password utils
    ├── errors.js         # Custom errors
    └── logger.js         # JSON logger
```

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Auth endpoints | 10 req / 15 min |
| API endpoints | 100 req / min |

## License

MIT
