# Code Snippet Manager Web App

The main web application for the Code Snippet Manager project.

## Features

- 🔐 Authentication with Clerk
- 📝 Create, edit, and delete code snippets
- 💻 Syntax highlighting with Monaco Editor
- 🎨 Modern UI with Tailwind CSS and shadcn
- 🔍 Full-text search (coming soon)
- 🏷️ Tag organization (coming soon)

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Clerk
- **UI Components:** shadcn
- **Styling:** Tailwind CSS
- **Code Editor:** Monaco Editor
- **Testing:** Vitest + Testing Library

## Getting Started

1. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Required variables:

   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
   - `CLERK_SECRET_KEY`: Clerk secret key

2. Start the database:

   ```bash
   docker compose up -d
   ```

3. Run database migrations:

   ```bash
   pnpm prisma migrate dev
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI
- `pnpm coverage` - Run tests with coverage
- `pnpm type-check` - Run TypeScript type checking
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/              # Utility functions
└── hooks/            # Custom React hooks
```
