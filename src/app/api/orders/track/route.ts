import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeOrderRef } from "@/lib/rate-limit";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantSlug = searchParams.get("tenantSlug")?.trim();
  const phone = searchParams.get("phone")?.replace(/\D/g, "").slice(-10);
  const orderRef = normalizeOrderRef(searchParams.get("orderRef") ?? "");

  if (!tenantSlug || !phone || phone.length < 10) {
    return NextResponse.json(
      { error: "tenantSlug and a valid 10-digit phone are required" },
      { status: 400 },
    );
  }

  if (!orderRef || orderRef.length < 8) {
    return NextResponse.json(
      { error: "Order ID (8 characters from your confirmation) is required" },
      { status: 400 },
    );
  }

  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (!tenant) {
    return NextResponse.json({ error: "Store not found" }, { status: 404 });
  }

  const order = await prisma.order.findFirst({
    where: {
      tenantId: tenant.id,
      customerPhone: phone,
      id: { endsWith: orderRef },
    },
    select: {
      id: true,
      status: true,
      totalCents: true,
      customerName: true,
      createdAt: true,
      itemsJson: true,
    },
  });

  if (!order) {
    return NextResponse.json({ orders: [] });
  }

  return NextResponse.json({ orders: [order] });
}
