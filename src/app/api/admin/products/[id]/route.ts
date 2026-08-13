import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: {
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

  const data: Record<string, unknown> = {};
  if (typeof body.name === "string") data.name = body.name.trim();
  if (typeof body.description === "string") data.description = body.description.trim() || null;
  if (body.priceCents !== undefined) {
    const priceCents = Math.floor(Number(body.priceCents));
    if (!Number.isFinite(priceCents) || priceCents < 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }
    data.priceCents = priceCents;
  }
  if (typeof body.sku === "string") data.sku = body.sku.trim() || null;
  if (body.stock !== undefined) {
    const stock = Math.floor(Number(body.stock));
    data.stock = Number.isFinite(stock) ? Math.max(0, stock) : 0;
  }
  if (typeof body.active === "boolean") data.active = body.active;

  try {
    const product = await prisma.product.update({ where: { id }, data });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}
