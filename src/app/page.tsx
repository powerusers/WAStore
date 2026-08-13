import { HomeLanding } from "@/components/home-landing";
import { StorefrontPage } from "@/components/storefront-page";
import { headers } from "next/headers";

export const revalidate = 60;

export default async function Home() {
  const slug = (await headers()).get("x-tenant-slug");

  if (slug) {
    return <StorefrontPage tenantSlug={slug} />;
  }

  return <HomeLanding />;
}
