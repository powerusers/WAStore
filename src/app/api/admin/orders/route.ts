import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tenantSlug = searchParams.get("tenantSlug")?.trim();
  const status = searchParams.get("status")?.trim();

  const orders = await prisma.order.findMany({
    where: {
      ...(tenantSlug ? { tenant: { slug: tenantSlug } } : {}),
      ...(status ? { status } : {}),
    },
    include: {
      tenant: { select: { slug: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ orders });
}
