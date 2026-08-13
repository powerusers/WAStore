import type { StoreType } from "@/lib/store-types";

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

export const GROCERY_CATEGORIES: ProductCategory[] = [
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

export const PHARMACY_CATEGORIES: ProductCategory[] = [
  ALL_CATEGORY,
  { id: "pain-fever", label: "Pain & fever", emoji: "🤒" },
  { id: "cold-cough", label: "Cold & cough", emoji: "🤧" },
  { id: "vitamins", label: "Vitamins", emoji: "💊" },
  { id: "digestion", label: "Digestion", emoji: "🫁" },
  { id: "skin", label: "Skin care", emoji: "🧴" },
  { id: "baby", label: "Baby care", emoji: "👶" },
  { id: "first-aid", label: "First aid", emoji: "🩹" },
  { id: "wellness", label: "Wellness", emoji: "🌿" },
];

export function getCategoriesForStoreType(storeType: StoreType): ProductCategory[] {
  return storeType === "pharmacy" ? PHARMACY_CATEGORIES : GROCERY_CATEGORIES;
}

export function getCategoryLabel(
  categoryId: string,
  storeType: StoreType = "kirana",
): string {
  const categories = getCategoriesForStoreType(storeType);
  return categories.find((c) => c.id === categoryId)?.label ?? "Products";
}
