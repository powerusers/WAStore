-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN "storeType" TEXT NOT NULL DEFAULT 'kirana';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "requiresPrescription" BOOLEAN NOT NULL DEFAULT false;
