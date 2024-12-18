# Code Snippet Manager

A modern monorepo application for managing and sharing code snippets.

## Project Structure

```
.
├── apps
│ └── web # Next.js application
├── packages # Shared packages (future use)
└── README.md # You are here
```

## Prerequisites

- Node.js 20.10.0 or higher
- pnpm 9.15.0 or higher
- Docker (for PostgreSQL database)

## Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

3. Start development:
   ```bash
   pnpm dev
   ```

## Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm test` - Run tests across all applications
- `pnpm lint` - Run linting across all applications
- `pnpm type-check` - Run type checking across all applications

## Applications

- [Web App](apps/web/README.md) - Main web application for managing code snippets

## Development

- Node.js version: 20.10.0
- Package Manager: pnpm 9.15.0
- Build System: Turborepo

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC
