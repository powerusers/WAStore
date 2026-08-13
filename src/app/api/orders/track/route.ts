import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantSlug = searchParams.get("tenantSlug")?.trim();
  const phone = searchParams.get("phone")?.replace(/\D/g, "").slice(-10);

  if (!tenantSlug || !phone || phone.length < 10) {
    return NextResponse.json(
      { error: "tenantSlug and a valid 10-digit phone are required" },
      { status: 400 },
    );
  }

  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (!tenant) {
    return NextResponse.json({ error: "Store not found" }, { status: 404 });
  }

  const orders = await prisma.order.findMany({
    where: {
      tenantId: tenant.id,
      customerPhone: phone,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      status: true,
      totalCents: true,
      customerName: true,
      createdAt: true,
      itemsJson: true,
    },
  });

  return NextResponse.json({ orders });
}
