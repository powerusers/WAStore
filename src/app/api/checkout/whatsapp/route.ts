import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  buildNumberedWhatsAppMessage,
  buildWhatsAppDeepLink,
  itemsToJsonValue,
  type CheckoutLineInput,
  type OrderItemSnapshot,
} from "@/lib/whatsapp-checkout";

type Body = {
  tenantSlug?: string;
  lines?: CheckoutLineInput[];
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tenantSlug = typeof body.tenantSlug === "string" ? body.tenantSlug.trim() : "";
  const lines = Array.isArray(body.lines) ? body.lines : [];

  if (!tenantSlug || lines.length === 0) {
    return NextResponse.json({ error: "tenantSlug and lines are required" }, { status: 400 });
  }

  const mergedQty = new Map<string, number>();
  for (const line of lines) {
    if (!line || typeof line.productId !== "string" || typeof line.quantity !== "number") {
      return NextResponse.json({ error: "Invalid line item" }, { status: 400 });
    }
    const qty = Math.floor(line.quantity);
    if (!Number.isFinite(qty) || qty < 1 || qty > 999) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }
    const id = line.productId.trim();
    if (!id) {
      return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
    }
    mergedQty.set(id, (mergedQty.get(id) ?? 0) + qty);
  }

  const normalized: CheckoutLineInput[] = [...mergedQty.entries()].map(
    ([productId, quantity]) => ({ productId, quantity }),
  );

  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (!tenant) {
    return NextResponse.json({ error: "Store not found" }, { status: 404 });
  }

  const productIds = [...new Set(normalized.map((l) => l.productId))];
  const products = await prisma.product.findMany({
    where: {
      tenantId: tenant.id,
      id: { in: productIds },
      active: true,
    },
    select: { id: true, name: true, priceCents: true, stock: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "One or more products are unavailable" }, { status: 400 });
  }

  const byId = new Map(products.map((p) => [p.id, p]));
  const snapshots: OrderItemSnapshot[] = [];
  let totalCents = 0;

  for (const line of normalized) {
    const p = byId.get(line.productId)!;
    if (line.quantity > p.stock) {
      return NextResponse.json(
        { error: `Insufficient stock for ${p.name}` },
        { status: 400 },
      );
    }
    const lineTotalCents = p.priceCents * line.quantity;
    totalCents += lineTotalCents;
    snapshots.push({
      productId: p.id,
      name: p.name,
      quantity: line.quantity,
      unitPriceCents: p.priceCents,
      lineTotalCents,
    });
  }

  const message = buildNumberedWhatsAppMessage({
    storeName: tenant.name,
    items: snapshots,
    totalCents,
  });

  const order = await prisma.order.create({
    data: {
      tenantId: tenant.id,
      status: "intent",
      whatsappPayload: message,
      itemsJson: itemsToJsonValue(snapshots),
      totalCents,
    },
  });

  const url = buildWhatsAppDeepLink(tenant.whatsappNumber, message);

  return NextResponse.json({ url, orderId: order.id });
}
