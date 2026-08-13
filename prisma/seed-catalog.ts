/** Product seed rows without tenantId (added at seed time). */
export type ProductSeed = {
  name: string;
  description: string;
  priceCents: number;
  sku: string;
  stock: number;
  requiresPrescription?: boolean;
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
  storeType?: "kirana" | "pharmacy";
};

export const PHARMACY_PRODUCTS: ProductSeed[] = [
  {
    name: "Paracetamol 650 mg (15 tablets)",
    description: "For fever and mild pain relief",
    priceCents: 3500,
    sku: "med-pain-paracetamol-650",
    stock: 120,
  },
  {
    name: "Dolo 650 (15 tablets)",
    description: "Paracetamol tablets for fever",
    priceCents: 3200,
    sku: "med-pain-dolo-650",
    stock: 100,
  },
  {
    name: "Crocin Advance (20 tablets)",
    description: "Fast fever and pain relief",
    priceCents: 4500,
    sku: "med-pain-crocin-adv",
    stock: 85,
  },
  {
    name: "Volini Spray 60 g",
    description: "Topical pain relief spray",
    priceCents: 18900,
    sku: "med-pain-volini-60g",
    stock: 40,
  },
  {
    name: "Moov Pain Relief Cream 50 g",
    description: "For muscle and joint pain",
    priceCents: 12900,
    sku: "med-pain-moov-50g",
    stock: 55,
  },
  {
    name: "Cetirizine 10 mg (10 tablets)",
    description: "Allergy and cold relief",
    priceCents: 2500,
    sku: "med-cold-cetirizine-10",
    stock: 90,
  },
  {
    name: "Cheston Cold (10 tablets)",
    description: "Relief from cold and blocked nose",
    priceCents: 3900,
    sku: "med-cold-cheston-10",
    stock: 70,
  },
  {
    name: "Vicks Vaporub 25 ml",
    description: "Cough, cold and congestion relief",
    priceCents: 9900,
    sku: "med-cough-vicks-25ml",
    stock: 60,
  },
  {
    name: "Honitus Cough Syrup 100 ml",
    description: "Ayurvedic cough syrup",
    priceCents: 11900,
    sku: "med-cough-honitus-100",
    stock: 45,
  },
  {
    name: "ORS Electral Powder (5 sachets)",
    description: "Oral rehydration for dehydration",
    priceCents: 4500,
    sku: "med-digest-ors-5",
    stock: 80,
  },
  {
    name: "Eno Fruit Salt (100 g)",
    description: "Instant acidity and indigestion relief",
    priceCents: 8900,
    sku: "med-digest-eno-100g",
    stock: 65,
  },
  {
    name: "Digene Tablets (15 tablets)",
    description: "Antacid for acidity and gas",
    priceCents: 2900,
    sku: "med-digest-digene-15",
    stock: 75,
  },
  {
    name: "Zincovit Tablets (15 tablets)",
    description: "Multivitamin with minerals",
    priceCents: 14900,
    sku: "med-vit-zincovit-15",
    stock: 50,
  },
  {
    name: "Becosules Capsules (20 capsules)",
    description: "B-complex with vitamin C",
    priceCents: 8900,
    sku: "med-vit-becosules-20",
    stock: 55,
  },
  {
    name: "Shelcal 500 (15 tablets)",
    description: "Calcium with vitamin D3",
    priceCents: 12900,
    sku: "med-vit-shelcal-15",
    stock: 48,
  },
  {
    name: "Vitamin C 500 mg (20 tablets)",
    description: "Immunity support supplement",
    priceCents: 6900,
    sku: "med-vit-vitc-20",
    stock: 60,
  },
  {
    name: "Candid Cream 20 g",
    description: "Antifungal skin cream",
    priceCents: 11900,
    sku: "med-skin-candid-20g",
    stock: 40,
  },
  {
    name: "Boroplus Antiseptic Cream 40 ml",
    description: "Moisturising antiseptic cream",
    priceCents: 7900,
    sku: "med-skin-boroplus-40",
    stock: 50,
  },
  {
    name: "Dettol Antiseptic Liquid 100 ml",
    description: "First-aid antiseptic liquid",
    priceCents: 6900,
    sku: "med-aid-dettol-100",
    stock: 70,
  },
  {
    name: "Band-Aid Washproof (10 strips)",
    description: "Waterproof adhesive bandages",
    priceCents: 4500,
    sku: "med-aid-bandaid-10",
    stock: 85,
  },
  {
    name: "Betadine Solution 50 ml",
    description: "Antiseptic for cuts and wounds",
    priceCents: 14900,
    sku: "med-aid-betadine-50",
    stock: 35,
  },
  {
    name: "Digital Thermometer",
    description: "Fast-read fever thermometer",
    priceCents: 24900,
    sku: "med-wellness-thermometer",
    stock: 25,
  },
  {
    name: "Cotton Roll 100 g",
    description: "Sterile cotton for first aid",
    priceCents: 3500,
    sku: "med-aid-cotton-100g",
    stock: 60,
  },
  {
    name: "Pampers Baby Diapers M (22 count)",
    description: "Medium size baby diapers",
    priceCents: 89900,
    sku: "med-baby-pampers-m22",
    stock: 30,
  },
  {
    name: "Johnson's Baby Powder 200 g",
    description: "Gentle talc-free baby powder",
    priceCents: 18900,
    sku: "med-baby-johnson-powder",
    stock: 40,
  },
  {
    name: "Himalaya Baby Cream 100 ml",
    description: "Moisturising cream for baby skin",
    priceCents: 12900,
    sku: "med-baby-himalaya-cream",
    stock: 38,
  },
  {
    name: "Lifebuoy Handwash 200 ml",
    description: "Germ protection handwash",
    priceCents: 7900,
    sku: "med-wellness-lifebuoy-200",
    stock: 55,
  },
  {
    name: "Himalaya Ashvagandha (60 tablets)",
    description: "Ayurvedic stress and wellness support",
    priceCents: 19900,
    sku: "med-wellness-ashwagandha",
    stock: 28,
  },
  {
    name: "Protinex Original 250 g",
    description: "Nutritional protein supplement",
    priceCents: 44900,
    sku: "med-wellness-protinex-250",
    stock: 22,
  },
  {
    name: "Metformin 500 mg (10 tablets)",
    description: "Diabetes medicine — valid prescription required",
    priceCents: 1500,
    sku: "med-wellness-metformin-500",
    stock: 20,
    requiresPrescription: true,
  },
];

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

export const PHARMACY_TENANT: TenantSeedConfig = {
  slug: "healthplus",
  name: "HealthPlus Medical",
  whatsappNumber: "919850524303",
  primaryColor: "#0284c7",
  tagline: "Your trusted neighbourhood chemist",
  deliveryNote: "Home delivery · 8am–10pm · OTC items only",
  heroTitle: "Medicines & wellness, on WhatsApp",
  heroSubtitle:
    "Order fast-moving OTC items from our catalog. For other medicines, mention them in notes or send your prescription on WhatsApp.",
  storeType: "pharmacy",
};
