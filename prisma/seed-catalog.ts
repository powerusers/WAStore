/** Product seed rows without tenantId (added at seed time). */
export type ProductSeed = {
  name: string;
  description: string;
  priceCents: number;
  sku: string;
  stock: number;
};

export const PURTI_PRODUCTS: ProductSeed[] = [
  {
    name: "Fortune Basmati Rice (5 kg)",
    description: "Premium aged basmati",
    priceCents: 59900,
    sku: "rice-fortune-5kg",
    stock: 45,
  },
  {
    name: "Aashirvaad Atta (5 kg)",
    description: "Whole wheat flour",
    priceCents: 24900,
    sku: "atta-aashirvaad-5kg",
    stock: 55,
  },
  {
    name: "Moong Dal (500 g)",
    description: "Split green gram",
    priceCents: 6900,
    sku: "dal-moong-500g",
    stock: 70,
  },
  {
    name: "Toor Dal (500 g)",
    description: "Unpolished arhar dal",
    priceCents: 7900,
    sku: "dal-toor-500g",
    stock: 65,
  },
  {
    name: "Saffola Gold Oil (1 L)",
    description: "Blended cooking oil",
    priceCents: 19900,
    sku: "oil-saffola-1l",
    stock: 40,
  },
  {
    name: "Amul Taaza Milk (1 L)",
    description: "Homogenised toned milk",
    priceCents: 5800,
    sku: "milk-amul-1l",
    stock: 90,
  },
  {
    name: "Amul Butter (500 g)",
    description: "Salted table butter",
    priceCents: 26900,
    sku: "butter-amul-500g",
    stock: 35,
  },
  {
    name: "Britannia Bread (400 g)",
    description: "Fresh milk bread",
    priceCents: 4500,
    sku: "bread-britannia-400g",
    stock: 50,
  },
  {
    name: "Tata Salt (1 kg)",
    description: "Iodised salt",
    priceCents: 2800,
    sku: "salt-1kg",
    stock: 100,
  },
  {
    name: "Sugar (1 kg)",
    description: "Refined white sugar",
    priceCents: 5200,
    sku: "sugar-1kg",
    stock: 80,
  },
  {
    name: "Everest Garam Masala (50 g)",
    description: "Aromatic spice blend",
    priceCents: 7200,
    sku: "spice-garammasala-50g",
    stock: 60,
  },
  {
    name: "Red Chilli Powder (200 g)",
    description: "Medium spice level",
    priceCents: 8900,
    sku: "spice-chilli-200g",
    stock: 55,
  },
  {
    name: "Tata Tea Premium (250 g)",
    description: "Strong chai blend",
    priceCents: 14900,
    sku: "tea-tatapremium-250g",
    stock: 45,
  },
  {
    name: "Nescafe Classic (100 g)",
    description: "Instant coffee",
    priceCents: 34900,
    sku: "coffee-nescafe-100g",
    stock: 30,
  },
  {
    name: "Parle-G Gold (600 g)",
    description: "Family pack glucose biscuits",
    priceCents: 6900,
    sku: "biscuit-parleg-600g",
    stock: 75,
  },
  {
    name: "Oreo Cookies (120 g)",
    description: "Chocolate cream biscuits",
    priceCents: 3500,
    sku: "biscuit-oreo-120g",
    stock: 60,
  },
  {
    name: "Haldiram Bhujia (400 g)",
    description: "Crispy namkeen snack",
    priceCents: 9900,
    sku: "snack-bhujia-400g",
    stock: 40,
  },
  {
    name: "Lays Magic Masala (52 g)",
    description: "Crunchy potato chips",
    priceCents: 2000,
    sku: "snack-lays-52g",
    stock: 80,
  },
  {
    name: "Maggi 2-Minute Noodles (420 g)",
    description: "Pack of 6 masala noodles",
    priceCents: 8400,
    sku: "instant-maggi-420g",
    stock: 65,
  },
  {
    name: "Kellogg's Chocos (375 g)",
    description: "Chocolate breakfast cereal",
    priceCents: 19900,
    sku: "instant-chocos-375g",
    stock: 25,
  },
  {
    name: "Colgate MaxFresh (300 g)",
    description: "Cool mint toothpaste",
    priceCents: 16900,
    sku: "care-colgate-300g",
    stock: 40,
  },
  {
    name: "Dove Cream Beauty Bar (125 g × 3)",
    description: "Moisturising soap pack",
    priceCents: 14900,
    sku: "care-dove-125g",
    stock: 35,
  },
  {
    name: "Surf Excel Matic (2 kg)",
    description: "Front-load detergent powder",
    priceCents: 34900,
    sku: "house-surfexcel-2kg",
    stock: 30,
  },
  {
    name: "Vim Liquid (500 ml)",
    description: "Lemon dishwash liquid",
    priceCents: 10900,
    sku: "house-vim-500ml",
    stock: 45,
  },
  {
    name: "Fresh Tomatoes (1 kg)",
    description: "Farm-fresh red tomatoes",
    priceCents: 3800,
    sku: "veg-tomato-1kg",
    stock: 55,
  },
  {
    name: "Fresh Onions (1 kg)",
    description: "Red onions",
    priceCents: 3200,
    sku: "veg-onion-1kg",
    stock: 60,
  },
  {
    name: "Fresh Bananas (1 dozen)",
    description: "Ripe yellow bananas",
    priceCents: 5500,
    sku: "fruit-banana-dozen",
    stock: 40,
  },
  {
    name: "Fresh Oranges (1 kg)",
    description: "Juicy Nagpur oranges",
    priceCents: 12000,
    sku: "fruit-orange-1kg",
    stock: 35,
  },
  {
    name: "Amul Paneer (200 g)",
    description: "Fresh cottage cheese",
    priceCents: 9200,
    sku: "paneer-200g",
    stock: 30,
  },
  {
    name: "Mother Dairy Curd (400 g)",
    description: "Set curd, creamy texture",
    priceCents: 3200,
    sku: "curd-400g",
    stock: 50,
  },
];

export type TenantSeedConfig = {
  slug: string;
  name: string;
  whatsappNumber: string;
  logoUrl?: string | null;
  primaryColor: string;
  tagline: string;
  deliveryNote: string;
  heroTitle: string;
  heroSubtitle: string;
};

export const DEMO_TENANT: TenantSeedConfig = {
  slug: "demo",
  name: "Demo Kirana",
  whatsappNumber: "919850524303",
  primaryColor: "#0f766e",
  tagline: "Your neighbourhood kirana",
  deliveryNote: "Delivery in 30–45 min · Open now",
  heroTitle: "Fresh groceries, delivered fast",
  heroSubtitle: "Browse staples, snacks, and daily essentials. Order on WhatsApp in seconds.",
};

export const PURTI_TENANT: TenantSeedConfig = {
  slug: "purti",
  name: "Purti Supermarket",
  whatsappNumber: "919850524303",
  primaryColor: "#7c3aed",
  tagline: "Quality at honest prices",
  deliveryNote: "Same-day delivery · 8am–10pm",
  heroTitle: "Everything for your home",
  heroSubtitle: "Snacks, staples, and daily essentials — shop local, shop smart.",
};
