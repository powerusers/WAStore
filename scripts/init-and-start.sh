#!/bin/bash
set -e

echo "🚀 Starting initialization..."

# Run migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

# Always run seed: upserts demo tenant (incl. WhatsApp number) and
# only inserts products when the catalog is empty.
echo "🌱 Syncing demo store data..."
npx prisma db seed

echo "✅ Initialization complete. Starting Next.js..."
exec npm run start:app
