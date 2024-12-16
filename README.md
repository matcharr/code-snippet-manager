# Code Snippet Manager

A modern application for managing and sharing code snippets.

## Setup

1. Install dependencies: `pnpm install`
2. Copy .env.example to .env and fill in values
3. Start database: `docker-compose up -d`
4. Run migrations: `pnpm prisma migrate dev`
5. Start dev server: `pnpm dev`

## Development

- `pnpm dev` - Start development server
- `pnpm test` - Run tests
- `pnpm build` - Build for production
- `pnpm lint` - Run linter
