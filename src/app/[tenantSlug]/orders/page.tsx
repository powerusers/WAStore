import { notFound } from "next/navigation";
import { OrderTrackClient } from "@/components/order-track-client";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ tenantSlug: string }>;
};

export default async function OrderTrackPage({ params }: Props) {
  const { tenantSlug } = await params;
  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
    select: { name: true, slug: true },
  });

  if (!tenant) {
    notFound();
  }

  return <OrderTrackClient tenantSlug={tenant.slug} tenantName={tenant.name} />;
}
