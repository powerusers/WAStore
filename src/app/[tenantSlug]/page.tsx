import { StorefrontPage } from "@/components/storefront-page";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ tenantSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tenantSlug } = await params;
  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
    select: { name: true, tagline: true },
  });

  if (!tenant) {
    return { title: "Store not found" };
  }

  return {
    title: tenant.name,
    description: tenant.tagline ?? `Order from ${tenant.name} on WhatsApp.`,
  };
}

export default async function TenantStorefront({ params }: Props) {
  const { tenantSlug } = await params;
  return <StorefrontPage tenantSlug={tenantSlug} />;
}
