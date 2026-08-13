-- CreateIndex
CREATE INDEX "Order_tenantId_customerPhone_idx" ON "Order"("tenantId", "customerPhone");
