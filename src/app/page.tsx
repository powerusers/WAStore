import { HomeLanding } from "@/components/home-landing";
import { StorefrontPage } from "@/components/storefront-page";
import { buildHomeStoreCards } from "@/lib/home-stores";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const slug = (await headers()).get("x-tenant-slug");

  if (slug) {
    return <StorefrontPage tenantSlug={slug} />;
  }

  const tenants = await prisma.tenant.findMany({
    where: {
      slug: { in: ["demo", "purti", "healthplus"] },
    },
    select: {
      slug: true,
      name: true,
      primaryColor: true,
      storeType: true,
      tagline: true,
    },
  });

  const stores = buildHomeStoreCards(tenants);

  return <HomeLanding stores={stores} />;
}
