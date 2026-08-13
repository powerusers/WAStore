-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN "logoUrl" TEXT,
ADD COLUMN "primaryColor" TEXT DEFAULT '#0f766e',
ADD COLUMN "tagline" TEXT,
ADD COLUMN "deliveryNote" TEXT,
ADD COLUMN "heroTitle" TEXT,
ADD COLUMN "heroSubtitle" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "customerName" TEXT,
ADD COLUMN "customerPhone" TEXT,
ADD COLUMN "customerAddress" TEXT,
ADD COLUMN "customerNotes" TEXT;
