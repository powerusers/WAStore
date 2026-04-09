import { StorefrontPage } from "@/components/storefront-page";

export const revalidate = 60;

type Props = {
  params: Promise<{ tenantSlug: string }>;
};

export default async function TenantStorefront({ params }: Props) {
  const { tenantSlug } = await params;
  return <StorefrontPage tenantSlug={tenantSlug} />;
}
