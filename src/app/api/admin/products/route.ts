import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tenantSlug = searchParams.get("tenantSlug")?.trim();

  const products = await prisma.product.findMany({
    where: tenantSlug
      ? { tenant: { slug: tenantSlug } }
      : undefined,
    include: { tenant: { select: { slug: true, name: true } } },
    orderBy: [{ tenant: { name: "asc" } }, { name: "asc" }],
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    tenantSlug?: string;
    name?: string;
    description?: string;
    priceCents?: number;
    sku?: string;
    stock?: number;
    active?: boolean;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tenantSlug = body.tenantSlug?.trim();
  const name = body.name?.trim();
  if (!tenantSlug || !name) {
    return NextResponse.json({ error: "tenantSlug and name are required" }, { status: 400 });
  }

  const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (!tenant) {
    return NextResponse.json({ error: "Store not found" }, { status: 404 });
  }

  const priceCents = Math.floor(Number(body.priceCents));
  const stock = Math.floor(Number(body.stock ?? 0));
  if (!Number.isFinite(priceCents) || priceCents < 0) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      tenantId: tenant.id,
      name,
      description: body.description?.trim() || null,
      priceCents,
      sku: body.sku?.trim() || null,
      stock: Number.isFinite(stock) ? Math.max(0, stock) : 0,
      active: body.active !== false,
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}
