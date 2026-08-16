# Railway Deployment Guide

Deploy WA Storefront to Railway with PostgreSQL, demo stores, and admin panel.

## Prerequisites

- GitHub repository with this code
- [Railway](https://railway.app) account

## Steps

### 1. Create project

1. Railway → **New Project** → **Deploy from GitHub repo**
2. Select your repository

### 2. Add PostgreSQL

1. **+ New** → **Database** → **PostgreSQL**
2. Railway links `DATABASE_URL` to your app service automatically

### 3. Set environment variables

In your app service → **Variables**:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Auto | Set when Postgres is linked |
| `ADMIN_SECRET` | **Yes for admin demo** | Any strong password for `/admin` login |
| `NEXT_PUBLIC_ROOT_DOMAIN` | No | Leave empty on `*.railway.app` (uses `/demo` paths) |

> Without `ADMIN_SECRET`, the storefront works but `/admin` login returns an error.

### 4. Deploy

Railway builds and runs `npm start`, which:

1. Runs `prisma migrate deploy`
2. Runs `prisma db seed` (syncs demo tenants + seeds empty catalogs)
3. Starts Next.js

## Demo URLs

Replace `your-app.railway.app` with your Railway domain:

| Page | URL |
|------|-----|
| Home | `https://your-app.railway.app/` |
| Demo Kirana | `https://your-app.railway.app/demo` |
| Purti Supermarket | `https://your-app.railway.app/purti` |
| HealthPlus Medical | `https://your-app.railway.app/healthplus` |
| Onboarding | `https://your-app.railway.app/onboard` |
| Admin | `https://your-app.railway.app/admin` |
| Track orders | `https://your-app.railway.app/demo/orders` |

## Tenant routing

### Path-based (default on Railway)

- `/demo` → Demo Kirana
- `/purti` → Purti Supermarket
- `/healthplus` → HealthPlus Medical

### Subdomain-based (custom domain)

Set `NEXT_PUBLIC_ROOT_DOMAIN=myapp.com`, then:

- `demo.myapp.com` → tenant `demo`
- `healthplus.myapp.com` → tenant `healthplus`

Redeploy after changing `NEXT_PUBLIC_*` variables (baked in at build time).

## Client demo checklist

- [ ] Latest code deployed from `main`
- [ ] `ADMIN_SECRET` set in Railway
- [ ] `/demo` shows 65+ products (not 4)
- [ ] One test order placed; status updated in admin to **confirmed** or **delivered**
- [ ] Demo on phone: Track orders link visible in store header
- [ ] WhatsApp number in seed matches your demo phone (see `prisma/seed-catalog.ts`)

## Adding stores

**Option A — Onboarding UI:** `/onboard` (creates store + 3 starter products)

**Option B — Prisma Studio:**
```bash
npx prisma studio
```

**Option C — Seed file:** Add tenant to `prisma/seed-catalog.ts` and redeploy

## Troubleshooting

### "Store not found"

- URL slug must match a tenant in the database
- Run seed: `npx prisma db seed` in Railway shell
- Visit `/` for links to all demo stores

### Admin login fails

- Confirm `ADMIN_SECRET` is set on the **app** service (not Postgres)
- Redeploy after adding the variable

### Old demo catalog (4 products)

Seed only adds products when a tenant's catalog is **empty**. If you upgraded from an early deploy:

```bash
# Railway shell
npx prisma db seed
```

Or delete products for the demo tenant in Prisma Studio and redeploy.

### Database connection errors

- Verify Postgres service is running
- Confirm `DATABASE_URL` is linked to the app service

## Support

1. Check Railway deploy logs
2. Check runtime logs during `npm start`
3. Verify env vars and Postgres linkage
