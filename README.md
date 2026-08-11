# Multi-Tenant Grocery Storefront

A Next.js-based multi-tenant grocery storefront with WhatsApp ordering integration. Each store operates independently with its own products, branding, and WhatsApp number.

## Features

- 🏪 Multi-tenant architecture (subdomain or path-based routing)
- 🛒 Product catalog with stock management
- 📱 WhatsApp order integration
- 🎨 Modern, responsive UI built with Tailwind CSS
- 💾 PostgreSQL database with Prisma ORM
- 🚀 Optimized for Railway deployment

## Quick Start

### Local Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your PostgreSQL `DATABASE_URL`

3. **Set up database:**
   ```bash
   npm run db:deploy  # Run migrations
   npm run db:seed    # Seed with demo store
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Visit the demo store:**
   - Home: [http://localhost:3000](http://localhost:3000)
   - Demo store: [http://localhost:3000/demo](http://localhost:3000/demo)

## Deploy to Railway

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for a complete deployment guide.

**Quick steps:**
1. Push code to GitHub
2. Create new Railway project from your repo
3. Add PostgreSQL database
4. Deploy (automatic setup runs on first deploy)
5. Access your app at `https://your-app.railway.app/demo`

## Tenant Resolution

### Path-based (Default for Railway & localhost)
When `NEXT_PUBLIC_ROOT_DOMAIN` is not set:
- `/demo` → demo store
- `/purti` → purti store

### Subdomain-based (Custom domains)
When you set `NEXT_PUBLIC_ROOT_DOMAIN=myapp.com`:
- `demo.myapp.com` → demo store
- `purti.myapp.com` → purti store

## Database Schema

- **Tenant**: Stores (slug, name, whatsappNumber)
- **Product**: Products per store (name, price, stock, etc.)
- **Order**: Customer orders with WhatsApp payload

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server (with auto-setup) |
| `npm run db:seed` | Seed database with demo data |
| `npm run db:studio` | Open Prisma Studio (database UI) |

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── [tenantSlug]/         # Tenant-specific routes
│   │   │   └── page.tsx          # Storefront page
│   │   └── api/                  # API routes
│   ├── components/               # React components
│   ├── lib/                      # Utilities & configs
│   └── middleware.ts             # Tenant resolution middleware
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Seed data
│   └── migrations/               # Database migrations
└── scripts/
    └── init-and-start.sh         # Production initialization script
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Railway Documentation](https://docs.railway.app)

## License

MIT
