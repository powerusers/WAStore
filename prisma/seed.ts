import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "demo" },
    create: {
      slug: "demo",
      name: "Demo Kirana",
      whatsappNumber: "919876543210",
    },
    update: {},
  });

  const count = await prisma.product.count({ where: { tenantId: tenant.id } });
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        {
          tenantId: tenant.id,
          name: "Basmati Rice (5 kg)",
          description: "Long-grain basmati",
          priceCents: 64900,
          sku: "rice-5kg",
          stock: 40,
        },
        {
          tenantId: tenant.id,
          name: "Toor Dal (1 kg)",
          description: "Unpolished arhar dal",
          priceCents: 14900,
          sku: "dal-1kg",
          stock: 60,
        },
        {
          tenantId: tenant.id,
          name: "Sunflower Oil (1 L)",
          description: "Refined cooking oil",
          priceCents: 18900,
          sku: "oil-1l",
          stock: 35,
        },
        {
          tenantId: tenant.id,
          name: "Amul Milk (500 ml)",
          description: "Toned milk",
          priceCents: 2800,
          sku: "milk-500",
          stock: 100,
        },
      ],
    });
  }

  console.log("Seed complete. Visit http://localhost:3000/demo for the demo store.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
