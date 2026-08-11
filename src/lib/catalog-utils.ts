export type CatalogProduct = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  stock: number;
  sku: string | null;
};

export type ProductCategory = {
  id: string;
  label: string;
  emoji: string;
};

export const ALL_CATEGORY: ProductCategory = {
  id: "all",
  label: "All",
  emoji: "🛍️",
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  ALL_CATEGORY,
  { id: "staples", label: "Staples", emoji: "🌾" },
  { id: "pulses", label: "Pulses", emoji: "🥘" },
  { id: "oils", label: "Oils", emoji: "🛢️" },
  { id: "dairy", label: "Dairy", emoji: "🥛" },
  { id: "spices", label: "Spices", emoji: "🌶️" },
  { id: "beverages", label: "Drinks", emoji: "☕" },
  { id: "snacks", label: "Snacks", emoji: "🍪" },
  { id: "care", label: "Care", emoji: "🧴" },
  { id: "household", label: "Home", emoji: "🧹" },
  { id: "instant", label: "Instant", emoji: "🍜" },
  { id: "produce", label: "Fresh", emoji: "🥬" },
];

const CATEGORY_IMAGES: Record<string, string> = {
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

function skuPrefix(sku: string | null): string {
  if (!sku) return "";
  return sku.split("-")[0] ?? "";
}

export function getProductCategoryId(product: CatalogProduct): string {
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

export function getProductImage(product: CatalogProduct): string {
  if (product.imageUrl) return product.imageUrl;
  const categoryId = getProductCategoryId(product);
  return CATEGORY_IMAGES[categoryId] ?? CATEGORY_IMAGES.default;
}

export function getCategoryLabel(categoryId: string): string {
  return (
    PRODUCT_CATEGORIES.find((c) => c.id === categoryId)?.label ?? "Grocery"
  );
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "name";

export function filterAndSortProducts(
  products: CatalogProduct[],
  options: {
    query: string;
    categoryId: string;
    sort: SortOption;
  },
): CatalogProduct[] {
  const q = options.query.trim().toLowerCase();

  let filtered = products.filter((p) => {
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false) ||
      (p.sku?.toLowerCase().includes(q) ?? false);

    const matchesCategory =
      options.categoryId === "all" ||
      getProductCategoryId(p) === options.categoryId;

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
