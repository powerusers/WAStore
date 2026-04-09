import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CatalogClient } from "@/components/catalog-client";

export async function StorefrontPage({ tenantSlug }: { tenantSlug: string }) {
  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
  });

  if (!tenant) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { tenantId: tenant.id, active: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      description: true,
      priceCents: true,
      imageUrl: true,
      stock: true,
    },
  });

  return (
    <CatalogClient
      tenantSlug={tenant.slug}
      tenantName={tenant.name}
      products={products}
    />
  );
}
