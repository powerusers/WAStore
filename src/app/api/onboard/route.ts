import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  normalizeSlug,
  normalizeWhatsAppNumber,
  validateStoreSlug,
  validateWhatsAppNumber,
} from "@/lib/onboard-validation";

type Body = {
  name?: string;
  slug?: string;
  whatsappNumber?: string;
  primaryColor?: string;
  tagline?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const slug = normalizeSlug(body.slug ?? body.name ?? "");
  const whatsappNumber = normalizeWhatsAppNumber(body.whatsappNumber ?? "");
  const primaryColor = body.primaryColor?.trim() || "#0f766e";
  const tagline = body.tagline?.trim() || "Your neighbourhood store";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Store name is required." }, { status: 400 });
  }

  const slugError = validateStoreSlug(slug);
  if (slugError) {
    return NextResponse.json({ error: slugError }, { status: 400 });
  }

  const phoneError = validateWhatsAppNumber(whatsappNumber);
  if (phoneError) {
    return NextResponse.json({ error: phoneError }, { status: 400 });
  }

  if (!/^#[0-9a-fA-F]{6}$/.test(primaryColor)) {
    return NextResponse.json({ error: "Invalid brand color." }, { status: 400 });
  }

  const existing = await prisma.tenant.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "This store URL is already taken. Try a different slug." },
      { status: 409 },
    );
  }

  const tenant = await prisma.tenant.create({
    data: {
      slug,
      name,
      whatsappNumber,
      primaryColor,
      tagline,
      deliveryNote: "Open now · WhatsApp orders",
      heroTitle: `Welcome to ${name}`,
      heroSubtitle: "Browse products and order on WhatsApp in seconds.",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        tenantId: tenant.id,
        name: "Sample Rice (1 kg)",
        description: "Starter product — edit or delete in admin",
        priceCents: 9900,
        sku: "rice-sample-1kg",
        stock: 50,
      },
      {
        tenantId: tenant.id,
        name: "Sample Dal (500 g)",
        description: "Starter product — edit or delete in admin",
        priceCents: 7900,
        sku: "dal-sample-500g",
        stock: 50,
      },
      {
        tenantId: tenant.id,
        name: "Sample Cooking Oil (1 L)",
        description: "Starter product — edit or delete in admin",
        priceCents: 18900,
        sku: "oil-sample-1l",
        stock: 30,
      },
    ],
  });

  return NextResponse.json({ slug: tenant.slug, url: `/${tenant.slug}` }, { status: 201 });
}
