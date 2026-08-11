#!/bin/bash
set -e

echo "🚀 Starting initialization..."

# Run migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

# Check if demo tenant exists, seed if not
echo "🌱 Checking if database needs seeding..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAndSeed() {
  try {
    const demoTenant = await prisma.tenant.findUnique({
      where: { slug: 'demo' }
    });
    
    if (!demoTenant) {
      console.log('⚠️  Demo tenant not found. Running seed...');
      await prisma.\$disconnect();
      const { execSync } = require('child_process');
      execSync('npx prisma db seed', { stdio: 'inherit' });
    } else {
      console.log('✅ Demo tenant exists. Skipping seed.');
      await prisma.\$disconnect();
    }
  } catch (error) {
    console.error('Error checking database:', error);
    await prisma.\$disconnect();
    process.exit(1);
  }
}

checkAndSeed();
"

echo "✅ Initialization complete. Starting Next.js..."
exec npm run start:app
