# WA Storefront

Multi-tenant WhatsApp storefront for Indian local stores — kirana, supermarket, and pharmacy. Each tenant gets its own catalog, branding, checkout flow, and admin tools.

## Demo stores

| Store | URL | Description |
|-------|-----|-------------|
| Demo Kirana | `/demo` | 65+ grocery items, teal branding |
| Purti Supermarket | `/purti` | 30 products, violet branding |
| HealthPlus Medical | `/healthplus` | 30 OTC pharmacy items, blue branding |

Also try:
- **Home:** `/` — demo store picker + feature overview
- **Onboarding:** `/onboard` — create a new store in minutes
- **Admin:** `/admin` — manage products and orders (requires `ADMIN_SECRET`)
- **Order tracking:** `/{store}/orders` — lookup by phone number

## Features

- Multi-tenant routing (path-based on Railway, subdomain optional)
- Product catalog with search, categories, popular/deals sections
- Cart drawer with customer details (name, phone, address)
- WhatsApp checkout with pre-filled order message
- Per-store branding (color, tagline, hero copy)
- Hindi / English language toggle
- Pharmacy mode with OTC disclaimer and prescription notes
- PWA support (install prompt + service worker)
- Admin panel for product CRUD and order status
- Self-serve store onboarding

## Quick start (local)

```bash
npm install
cp .env.example .env   # set DATABASE_URL and ADMIN_SECRET
npm run db:deploy
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_SECRET` | Yes (for admin) | Password for `/admin` login |
| `ALLOW_PUBLIC_ONBOARD` | No | Set `true` to enable `/onboard` in production (off by default) |
| `NEXT_PUBLIC_ROOT_DOMAIN` | No | Apex domain for subdomain tenants (e.g. `myapp.com`) |

## Deploy to Railway

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md).

On every deploy, `npm start` runs migrations and syncs demo seed data automatically.

**Before a client demo:**
1. Set `ADMIN_SECRET` in Railway variables
2. Redeploy from latest `main`
3. Visit `/demo` and confirm 65+ products
4. Pre-stage one order and update its status in admin for the tracking demo

## Suggested demo flow

1. Home → pick a demo store
2. Search / browse → add to cart → checkout with phone number
3. WhatsApp opens with order details
4. Admin → update order status
5. `/{store}/orders` → track with same phone number
6. Show `/healthplus` for pharmacy variant
7. Toggle Hindi on the storefront

## Tech stack

Next.js 15 · React 19 · Prisma · PostgreSQL · Tailwind CSS 4 · Zustand · TypeScript

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Migrate + seed + start (production) |
| `npm run db:seed` | Sync demo tenants and seed empty catalogs |
| `npm run db:studio` | Prisma Studio |

## License

MIT
