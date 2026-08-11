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
        // === STAPLES & GRAINS ===
        {
          tenantId: tenant.id,
          name: "Basmati Rice (5 kg)",
          description: "Premium long-grain basmati rice, aged for perfect aroma",
          priceCents: 64900,
          sku: "rice-basmati-5kg",
          stock: 40,
        },
        {
          tenantId: tenant.id,
          name: "Sona Masoori Rice (10 kg)",
          description: "Light, aromatic medium-grain rice, ideal for daily meals",
          priceCents: 58900,
          sku: "rice-sonamasoori-10kg",
          stock: 35,
        },
        {
          tenantId: tenant.id,
          name: "Whole Wheat Atta (10 kg)",
          description: "Stone-ground whole wheat flour for soft rotis",
          priceCents: 42900,
          sku: "atta-10kg",
          stock: 50,
        },
        {
          tenantId: tenant.id,
          name: "Maida (1 kg)",
          description: "Refined wheat flour for baking and frying",
          priceCents: 4500,
          sku: "maida-1kg",
          stock: 80,
        },
        {
          tenantId: tenant.id,
          name: "Besan (1 kg)",
          description: "Gram flour, perfect for pakoras and sweets",
          priceCents: 8900,
          sku: "besan-1kg",
          stock: 60,
        },

        // === PULSES & DALS ===
        {
          tenantId: tenant.id,
          name: "Toor Dal (1 kg)",
          description: "Unpolished arhar dal, protein-rich",
          priceCents: 14900,
          sku: "dal-toor-1kg",
          stock: 60,
        },
        {
          tenantId: tenant.id,
          name: "Moong Dal (1 kg)",
          description: "Split green gram, easy to digest",
          priceCents: 12900,
          sku: "dal-moong-1kg",
          stock: 55,
        },
        {
          tenantId: tenant.id,
          name: "Masoor Dal (1 kg)",
          description: "Red lentils, quick-cooking",
          priceCents: 11900,
          sku: "dal-masoor-1kg",
          stock: 70,
        },
        {
          tenantId: tenant.id,
          name: "Chana Dal (1 kg)",
          description: "Split Bengal gram, nutty flavor",
          priceCents: 10900,
          sku: "dal-chana-1kg",
          stock: 65,
        },
        {
          tenantId: tenant.id,
          name: "Urad Dal (1 kg)",
          description: "Black gram dal, perfect for dosa batter",
          priceCents: 13900,
          sku: "dal-urad-1kg",
          stock: 50,
        },
        {
          tenantId: tenant.id,
          name: "Rajma (500 g)",
          description: "Red kidney beans, protein-packed",
          priceCents: 7900,
          sku: "rajma-500g",
          stock: 45,
        },
        {
          tenantId: tenant.id,
          name: "Kabuli Chana (1 kg)",
          description: "White chickpeas for curries and salads",
          priceCents: 9900,
          sku: "chana-kabuli-1kg",
          stock: 40,
        },

        // === COOKING OILS ===
        {
          tenantId: tenant.id,
          name: "Sunflower Oil (1 L)",
          description: "Light refined cooking oil, heart-healthy",
          priceCents: 18900,
          sku: "oil-sunflower-1l",
          stock: 35,
        },
        {
          tenantId: tenant.id,
          name: "Mustard Oil (1 L)",
          description: "Cold-pressed kachi ghani mustard oil",
          priceCents: 19900,
          sku: "oil-mustard-1l",
          stock: 30,
        },
        {
          tenantId: tenant.id,
          name: "Groundnut Oil (1 L)",
          description: "Traditional filtered groundnut oil",
          priceCents: 21900,
          sku: "oil-groundnut-1l",
          stock: 25,
        },
        {
          tenantId: tenant.id,
          name: "Coconut Oil (500 ml)",
          description: "Pure coconut oil for cooking and hair care",
          priceCents: 15900,
          sku: "oil-coconut-500ml",
          stock: 40,
        },
        {
          tenantId: tenant.id,
          name: "Ghee (500 ml)",
          description: "Pure cow ghee, traditional taste",
          priceCents: 34900,
          sku: "ghee-500ml",
          stock: 30,
        },

        // === DAIRY PRODUCTS ===
        {
          tenantId: tenant.id,
          name: "Amul Milk (500 ml)",
          description: "Toned milk, fresh daily",
          priceCents: 2800,
          sku: "milk-amul-500ml",
          stock: 100,
        },
        {
          tenantId: tenant.id,
          name: "Full Cream Milk (1 L)",
          description: "Rich, creamy full-fat milk",
          priceCents: 6200,
          sku: "milk-fullcream-1l",
          stock: 80,
        },
        {
          tenantId: tenant.id,
          name: "Amul Butter (100 g)",
          description: "Salted table butter, creamy texture",
          priceCents: 5900,
          sku: "butter-amul-100g",
          stock: 60,
        },
        {
          tenantId: tenant.id,
          name: "Amul Cheese Slices (200 g)",
          description: "Processed cheese slices, 8 slices",
          priceCents: 12900,
          sku: "cheese-slices-200g",
          stock: 45,
        },
        {
          tenantId: tenant.id,
          name: "Curd (500 g)",
          description: "Fresh daily curd, smooth and creamy",
          priceCents: 3500,
          sku: "curd-500g",
          stock: 70,
        },
        {
          tenantId: tenant.id,
          name: "Paneer (200 g)",
          description: "Fresh cottage cheese, high protein",
          priceCents: 8900,
          sku: "paneer-200g",
          stock: 40,
        },

        // === SPICES & CONDIMENTS ===
        {
          tenantId: tenant.id,
          name: "Turmeric Powder (100 g)",
          description: "Pure haldi powder, natural color",
          priceCents: 4900,
          sku: "spice-turmeric-100g",
          stock: 90,
        },
        {
          tenantId: tenant.id,
          name: "Red Chilli Powder (100 g)",
          description: "Medium-spicy chilli powder",
          priceCents: 5900,
          sku: "spice-chilli-100g",
          stock: 85,
        },
        {
          tenantId: tenant.id,
          name: "Coriander Powder (100 g)",
          description: "Freshly ground dhaniya powder",
          priceCents: 4500,
          sku: "spice-coriander-100g",
          stock: 80,
        },
        {
          tenantId: tenant.id,
          name: "Cumin Seeds (100 g)",
          description: "Premium jeera for tempering",
          priceCents: 7900,
          sku: "spice-cumin-100g",
          stock: 70,
        },
        {
          tenantId: tenant.id,
          name: "Garam Masala (50 g)",
          description: "Aromatic spice blend for curries",
          priceCents: 6900,
          sku: "spice-garammasala-50g",
          stock: 65,
        },
        {
          tenantId: tenant.id,
          name: "Mustard Seeds (100 g)",
          description: "Black mustard seeds for tadka",
          priceCents: 4900,
          sku: "spice-mustard-100g",
          stock: 75,
        },
        {
          tenantId: tenant.id,
          name: "Salt (1 kg)",
          description: "Iodized table salt",
          priceCents: 2200,
          sku: "salt-1kg",
          stock: 120,
        },
        {
          tenantId: tenant.id,
          name: "Sugar (1 kg)",
          description: "Refined white sugar",
          priceCents: 4900,
          sku: "sugar-1kg",
          stock: 100,
        },

        // === BEVERAGES ===
        {
          tenantId: tenant.id,
          name: "Tata Tea Gold (500 g)",
          description: "Premium blend tea leaves",
          priceCents: 24900,
          sku: "tea-tatagold-500g",
          stock: 50,
        },
        {
          tenantId: tenant.id,
          name: "Red Label Tea (250 g)",
          description: "Strong and aromatic tea",
          priceCents: 13900,
          sku: "tea-redlabel-250g",
          stock: 60,
        },
        {
          tenantId: tenant.id,
          name: "Nescafe Classic Coffee (50 g)",
          description: "Instant coffee powder",
          priceCents: 19900,
          sku: "coffee-nescafe-50g",
          stock: 45,
        },
        {
          tenantId: tenant.id,
          name: "Bournvita (500 g)",
          description: "Health drink for kids and adults",
          priceCents: 24900,
          sku: "healthdrink-bournvita-500g",
          stock: 40,
        },
        {
          tenantId: tenant.id,
          name: "Horlicks (500 g)",
          description: "Malted health drink",
          priceCents: 26900,
          sku: "healthdrink-horlicks-500g",
          stock: 35,
        },

        // === SNACKS & BISCUITS ===
        {
          tenantId: tenant.id,
          name: "Parle-G Biscuits (200 g)",
          description: "Classic glucose biscuits",
          priceCents: 2500,
          sku: "biscuit-parleg-200g",
          stock: 100,
        },
        {
          tenantId: tenant.id,
          name: "Britannia Good Day (100 g)",
          description: "Butter cookies, rich taste",
          priceCents: 3500,
          sku: "biscuit-goodday-100g",
          stock: 80,
        },
        {
          tenantId: tenant.id,
          name: "Cream Biscuits (120 g)",
          description: "Vanilla cream-filled biscuits",
          priceCents: 3000,
          sku: "biscuit-cream-120g",
          stock: 70,
        },
        {
          tenantId: tenant.id,
          name: "Marie Biscuits (250 g)",
          description: "Light and crispy tea biscuits",
          priceCents: 3500,
          sku: "biscuit-marie-250g",
          stock: 75,
        },
        {
          tenantId: tenant.id,
          name: "Haldiram Namkeen (200 g)",
          description: "Spicy Indian snack mix",
          priceCents: 6900,
          sku: "snack-namkeen-200g",
          stock: 50,
        },
        {
          tenantId: tenant.id,
          name: "Kurkure (90 g)",
          description: "Crunchy corn puffs, masala flavor",
          priceCents: 2000,
          sku: "snack-kurkure-90g",
          stock: 60,
        },
        {
          tenantId: tenant.id,
          name: "Lays Chips (90 g)",
          description: "Classic salted potato chips",
          priceCents: 2000,
          sku: "snack-lays-90g",
          stock: 65,
        },

        // === PERSONAL CARE ===
        {
          tenantId: tenant.id,
          name: "Colgate Toothpaste (200 g)",
          description: "Complete dental protection",
          priceCents: 12900,
          sku: "care-colgate-200g",
          stock: 50,
        },
        {
          tenantId: tenant.id,
          name: "Dove Soap (100 g)",
          description: "Moisturizing beauty soap",
          priceCents: 5900,
          sku: "care-dovesoap-100g",
          stock: 60,
        },
        {
          tenantId: tenant.id,
          name: "Clinic Plus Shampoo (340 ml)",
          description: "Strong and long hair shampoo",
          priceCents: 14900,
          sku: "care-shampoo-340ml",
          stock: 45,
        },
        {
          tenantId: tenant.id,
          name: "Dettol Handwash (200 ml)",
          description: "Germ protection liquid handwash",
          priceCents: 8900,
          sku: "care-handwash-200ml",
          stock: 55,
        },

        // === HOUSEHOLD ITEMS ===
        {
          tenantId: tenant.id,
          name: "Vim Dishwash Bar (300 g)",
          description: "Tough on stains, gentle on hands",
          priceCents: 3900,
          sku: "house-vim-300g",
          stock: 70,
        },
        {
          tenantId: tenant.id,
          name: "Surf Excel (500 g)",
          description: "Detergent powder, removes tough stains",
          priceCents: 8900,
          sku: "house-surfexcel-500g",
          stock: 50,
        },
        {
          tenantId: tenant.id,
          name: "Harpic Toilet Cleaner (500 ml)",
          description: "Disinfects and cleans toilets",
          priceCents: 9900,
          sku: "house-harpic-500ml",
          stock: 40,
        },
        {
          tenantId: tenant.id,
          name: "Colin Cleaner (500 ml)",
          description: "Glass and household surface cleaner",
          priceCents: 11900,
          sku: "house-colin-500ml",
          stock: 35,
        },

        // === INSTANT FOODS ===
        {
          tenantId: tenant.id,
          name: "Maggi Noodles (280 g, Pack of 4)",
          description: "2-minute instant noodles, masala flavor",
          priceCents: 5600,
          sku: "instant-maggi-280g",
          stock: 80,
        },
        {
          tenantId: tenant.id,
          name: "Top Ramen (280 g, Pack of 4)",
          description: "Curry flavor instant noodles",
          priceCents: 5200,
          sku: "instant-topramen-280g",
          stock: 70,
        },
        {
          tenantId: tenant.id,
          name: "MTR Ready to Eat - Alu Paratha (300 g)",
          description: "Instant potato paratha, just heat and eat",
          priceCents: 7900,
          sku: "instant-mtr-paratha-300g",
          stock: 30,
        },
        {
          tenantId: tenant.id,
          name: "Knorr Soup (20 g)",
          description: "Instant tomato soup mix",
          priceCents: 2500,
          sku: "instant-soup-20g",
          stock: 60,
        },

        // === FRUITS & VEGETABLES (Daily Fresh) ===
        {
          tenantId: tenant.id,
          name: "Fresh Tomatoes (1 kg)",
          description: "Farm-fresh red tomatoes",
          priceCents: 4000,
          sku: "veg-tomato-1kg",
          stock: 50,
        },
        {
          tenantId: tenant.id,
          name: "Fresh Onions (1 kg)",
          description: "Red onions, essential for cooking",
          priceCents: 3500,
          sku: "veg-onion-1kg",
          stock: 60,
        },
        {
          tenantId: tenant.id,
          name: "Fresh Potatoes (2 kg)",
          description: "High-quality potatoes",
          priceCents: 5000,
          sku: "veg-potato-2kg",
          stock: 55,
        },
        {
          tenantId: tenant.id,
          name: "Green Chillies (100 g)",
          description: "Fresh hot green chillies",
          priceCents: 1500,
          sku: "veg-chilli-100g",
          stock: 70,
        },
        {
          tenantId: tenant.id,
          name: "Coriander Leaves (100 g)",
          description: "Fresh dhaniya for garnishing",
          priceCents: 1000,
          sku: "veg-coriander-100g",
          stock: 40,
        },
        {
          tenantId: tenant.id,
          name: "Fresh Ginger (200 g)",
          description: "Fresh adrak root",
          priceCents: 3000,
          sku: "veg-ginger-200g",
          stock: 45,
        },
        {
          tenantId: tenant.id,
          name: "Fresh Garlic (200 g)",
          description: "Fresh lehsun pods",
          priceCents: 4500,
          sku: "veg-garlic-200g",
          stock: 50,
        },
        {
          tenantId: tenant.id,
          name: "Fresh Bananas (1 dozen)",
          description: "Ripe yellow bananas",
          priceCents: 6000,
          sku: "fruit-banana-dozen",
          stock: 40,
        },
        {
          tenantId: tenant.id,
          name: "Fresh Apples (1 kg)",
          description: "Crisp red apples",
          priceCents: 18000,
          sku: "fruit-apple-1kg",
          stock: 30,
        },
        {
          tenantId: tenant.id,
          name: "Fresh Lemons (500 g)",
          description: "Juicy lemons, vitamin C rich",
          priceCents: 4000,
          sku: "fruit-lemon-500g",
          stock: 50,
        },
      ],
    });
    console.log(`✅ Seeded ${70} products across multiple categories`);
  } else {
    console.log(`✅ Database already has ${count} products. Skipping seed.`);
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
