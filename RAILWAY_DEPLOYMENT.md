# Railway Deployment Guide

This guide will help you deploy this multi-tenant grocery storefront to Railway.

## Prerequisites

- A GitHub account
- A Railway account (sign up at [railway.app](https://railway.app))

## Deployment Steps

### 1. Push Code to GitHub

Make sure your code is pushed to a GitHub repository.

### 2. Create New Project on Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### 3. Add PostgreSQL Database

1. In your Railway project, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create a `DATABASE_URL` environment variable linking your app to the database

### 4. Configure Environment Variables

In your Railway service settings, add these variables:

#### Required Variables

- `DATABASE_URL` - ✅ Automatically set by Railway when you add PostgreSQL

#### Optional Variables

- `NEXT_PUBLIC_ROOT_DOMAIN` - Leave empty for Railway deployment (uses path-based routing like `/demo`)

> **Note:** For custom domains, set `NEXT_PUBLIC_ROOT_DOMAIN` to your apex domain (e.g., `myapp.com`) to enable subdomain-based tenant routing (e.g., `demo.myapp.com`).

### 5. Deploy

Railway will automatically:
1. Build your application
2. Run database migrations
3. Seed the demo store (if it doesn't exist)
4. Start the server

The entire initialization happens automatically on first deploy!

## Accessing Your Store

After deployment completes, you'll get a Railway URL like `https://your-app.railway.app`

- **Home page:** `https://your-app.railway.app` - Shows the landing page
- **Demo store:** `https://your-app.railway.app/demo` - The demo grocery store

## How Tenant Resolution Works

### Path-based (Railway & localhost)

When `NEXT_PUBLIC_ROOT_DOMAIN` is not set (default for Railway):
- `https://your-app.railway.app/demo` → tenant: "demo"
- `https://your-app.railway.app/purti` → tenant: "purti"

### Subdomain-based (Custom domains)

When you set `NEXT_PUBLIC_ROOT_DOMAIN=myapp.com`:
- `https://demo.myapp.com` → tenant: "demo"
- `https://purti.myapp.com` → tenant: "purti"

## Adding More Stores

You can add more stores through the database:

### Option 1: Using Prisma Studio (Recommended)

1. In Railway, open your service's shell
2. Run: `npx prisma studio`
3. Railway will provide a URL to access the database UI
4. Add new tenants and products through the UI

### Option 2: Using Railway Shell

1. Open your Railway service's shell
2. Connect to your database and insert data:

```javascript
// Create a new file: scripts/add-store.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addStore() {
  const tenant = await prisma.tenant.create({
    data: {
      slug: "purti",
      name: "Purti Kirana",
      whatsappNumber: "919876543210",
      products: {
        create: [
          {
            name: "Sample Product",
            description: "Product description",
            priceCents: 9900,
            sku: "sample-001",
            stock: 50,
          },
        ],
      },
    },
  });
  console.log("Store created:", tenant);
  await prisma.$disconnect();
}

addStore();
```

Then run:
```bash
node scripts/add-store.js
```

## Troubleshooting

### "Store not found" error

If you see this error, it means:
1. The tenant slug in the URL doesn't exist in the database
2. Check your database has been seeded (should happen automatically on first deploy)

To manually seed:
```bash
# In Railway shell
npx prisma db seed
```

### Database connection issues

1. Verify `DATABASE_URL` is set in Railway variables
2. Check that the PostgreSQL service is running
3. Ensure the two services are in the same Railway project

### Changes not reflecting

Remember: `NEXT_PUBLIC_*` variables are baked into the build. After changing them:
1. Trigger a new deployment in Railway
2. Or use "Redeploy" button in Railway dashboard

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | ✅ Yes | Auto-set by Railway | PostgreSQL connection string |
| `NEXT_PUBLIC_ROOT_DOMAIN` | ❌ No | Empty | Your apex domain for subdomain routing |

## Support

For issues with this deployment:
1. Check Railway logs in the dashboard
2. Verify all environment variables are set
3. Ensure PostgreSQL service is running and linked
