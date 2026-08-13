import {
  getCategoriesForStoreType,
  getCategoryLabel as getCategoryLabelForStore,
  type ProductCategory,
} from "@/lib/catalog-categories";
import type { StoreType } from "@/lib/store-types";

export type CatalogProduct = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  stock: number;
  sku: string | null;
  requiresPrescription?: boolean;
};

export type { ProductCategory };
export { getCategoriesForStoreType, getCategoryLabelForStore as getCategoryLabel };

export const PRODUCT_CATEGORIES = getCategoriesForStoreType("kirana");

const GROCERY_CATEGORY_IMAGES: Record<string, string> = {
  staples:
    "https://images.unsplash.com/photo-1586201375761-83875001bb04?w=600&h=600&fit=crop&q=80",
  pulses:
    "https://images.unsplash.com/photo-1584270354949-c26b0d646042?w=600&h=600&fit=crop&q=80",
  oils:
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop&q=80",
  dairy:
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=600&fit=crop&q=80",
  spices:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop&q=80",
  beverages:
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop&q=80",
  snacks:
    "https://images.unsplash.com/photo-1558961363-fa8a2d7550d2?w=600&h=600&fit=crop&q=80",
  care:
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop&q=80",
  household:
    "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&h=600&fit=crop&q=80",
  instant:
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=600&fit=crop&q=80",
  produce:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop&q=80",
  default:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop&q=80",
};

const PHARMACY_CATEGORY_IMAGES: Record<string, string> = {
  "pain-fever":
    "https://images.unsplash.com/photo-1584308664894-24d4f5fd0f43?w=600&h=600&fit=crop&q=80",
  "cold-cough":
    "https://images.unsplash.com/photo-1587854692152-cf400469ba80?w=600&h=600&fit=crop&q=80",
  vitamins:
    "https://images.unsplash.com/photo-1550572017-edd951aaee09?w=600&h=600&fit=crop&q=80",
  digestion:
    "https://images.unsplash.com/photo-1587854692152-cf400469ba80?w=600&h=600&fit=crop&q=80",
  skin:
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop&q=80",
  baby:
    "https://images.unsplash.com/photo-1515488042361-ee00e817b221?w=600&h=600&fit=crop&q=80",
  "first-aid":
    "https://images.unsplash.com/photo-1603398939848-5643e7fb7592?w=600&h=600&fit=crop&q=80",
  wellness:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=600&fit=crop&q=80",
  default:
    "https://images.unsplash.com/photo-1576602976037-6e887884b9a8?w=600&h=600&fit=crop&q=80",
};

function skuPrefix(sku: string | null): string {
  if (!sku) return "";
  return sku.split("-")[0] ?? "";
}

function groceryCategoryId(product: CatalogProduct): string {
  const sku = product.sku ?? "";
  const prefix = skuPrefix(sku);
  const name = product.name.toLowerCase();

  if (["rice", "atta", "maida", "besan"].includes(prefix)) return "staples";
  if (["dal", "rajma", "chana"].includes(prefix)) return "pulses";
  if (["oil", "ghee"].includes(prefix)) return "oils";
  if (["milk", "butter", "cheese", "curd", "paneer"].includes(prefix))
    return "dairy";
  if (["spice", "salt", "sugar"].includes(prefix)) return "spices";
  if (["tea", "coffee", "healthdrink"].includes(prefix)) return "beverages";
  if (["biscuit", "snack"].includes(prefix)) return "snacks";
  if (prefix === "care") return "care";
  if (prefix === "house") return "household";
  if (prefix === "instant") return "instant";
  if (["veg", "fruit"].includes(prefix)) return "produce";

  if (name.includes("rice") || name.includes("atta")) return "staples";
  if (name.includes("dal")) return "pulses";
  if (name.includes("oil") || name.includes("ghee")) return "oils";
  if (name.includes("milk") || name.includes("paneer")) return "dairy";

  return "default";
}

function pharmacyCategoryId(product: CatalogProduct): string {
  const sku = product.sku ?? "";
  const parts = sku.split("-");
  const category = parts[1] ?? "";
  const name = product.name.toLowerCase();

  const map: Record<string, string> = {
    pain: "pain-fever",
    fever: "pain-fever",
    cold: "cold-cough",
    cough: "cold-cough",
    vit: "vitamins",
    vitamin: "vitamins",
    digest: "digestion",
    skin: "skin",
    baby: "baby",
    aid: "first-aid",
    wellness: "wellness",
  };

  if (map[category]) return map[category];

  if (name.includes("paracetamol") || name.includes("dolo") || name.includes("crocin"))
    return "pain-fever";
  if (name.includes("cough") || name.includes("cold") || name.includes("cetirizine"))
    return "cold-cough";
  if (name.includes("vitamin") || name.includes("calcium") || name.includes("zinc"))
    return "vitamins";
  if (name.includes("eno") || name.includes("digene") || name.includes("ors"))
    return "digestion";
  if (name.includes("cream") || name.includes("lotion") || name.includes("soap"))
    return "skin";
  if (name.includes("baby") || name.includes("diaper") || name.includes("pampers"))
    return "baby";
  if (name.includes("band") || name.includes("dettol") || name.includes("betadine"))
    return "first-aid";

  return "wellness";
}

export function getProductCategoryId(
  product: CatalogProduct,
  storeType: StoreType = "kirana",
): string {
  return storeType === "pharmacy"
    ? pharmacyCategoryId(product)
    : groceryCategoryId(product);
}

export function getProductImage(
  product: CatalogProduct,
  storeType: StoreType = "kirana",
): string {
  if (product.imageUrl) return product.imageUrl;
  const categoryId = getProductCategoryId(product, storeType);
  const images =
    storeType === "pharmacy" ? PHARMACY_CATEGORY_IMAGES : GROCERY_CATEGORY_IMAGES;
  return images[categoryId] ?? images.default;
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "name";

export function filterAndSortProducts(
  products: CatalogProduct[],
  options: {
    query: string;
    categoryId: string;
    sort: SortOption;
    storeType?: StoreType;
  },
): CatalogProduct[] {
  const storeType = options.storeType ?? "kirana";
  const q = options.query.trim().toLowerCase();

  let filtered = products.filter((p) => {
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false) ||
      (p.sku?.toLowerCase().includes(q) ?? false);

    const matchesCategory =
      options.categoryId === "all" ||
      getProductCategoryId(p, storeType) === options.categoryId;

    return matchesQuery && matchesCategory;
  });

  filtered = [...filtered].sort((a, b) => {
    switch (options.sort) {
      case "price-asc":
        return a.priceCents - b.priceCents;
      case "price-desc":
        return b.priceCents - a.priceCents;
      case "name":
        return a.name.localeCompare(b.name);
      case "popular":
      default:
        if (a.stock === 0 && b.stock !== 0) return 1;
        if (b.stock === 0 && a.stock !== 0) return -1;
        return a.name.localeCompare(b.name);
    }
  });

  return filtered;
}

export function getPopularProducts(products: CatalogProduct[]): CatalogProduct[] {
  return [...products]
    .filter((p) => p.stock > 0)
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 8);
}

export function getDealProducts(products: CatalogProduct[]): CatalogProduct[] {
  return [...products]
    .filter((p) => p.stock > 0 && p.priceCents <= 5000)
    .slice(0, 6);
}
