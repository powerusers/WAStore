export type StoreType = "kirana" | "pharmacy";

export function normalizeStoreType(value: string | null | undefined): StoreType {
  return value === "pharmacy" ? "pharmacy" : "kirana";
}

export function isPharmacyStore(storeType: StoreType): boolean {
  return storeType === "pharmacy";
}
