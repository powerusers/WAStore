import { DEMO_STORES, type DemoStore } from "@/lib/demo-stores";
import { normalizeStoreType } from "@/lib/store-types";

export type HomeStoreCard = DemoStore & {
  tagline: string | null;
  fromDatabase: boolean;
};

const SLUG_ORDER = DEMO_STORES.map((s) => s.slug);

/** Merge static demo config with live tenant rows so the home page always lists all demos. */
export function buildHomeStoreCards(
  tenants: Array<{
    slug: string;
    name: string;
    primaryColor: string | null;
    storeType: string;
    tagline: string | null;
  }>,
): HomeStoreCard[] {
  const bySlug = new Map(tenants.map((t) => [t.slug, t]));

  return DEMO_STORES.map((demo) => {
    const row = bySlug.get(demo.slug);
    return {
      ...demo,
      name: row?.name ?? demo.name,
      color: row?.primaryColor ?? demo.color,
      type:
        row?.storeType === "pharmacy"
          ? "pharmacy"
          : row?.storeType === "kirana"
            ? "kirana"
            : demo.type,
      tagline: row?.tagline ?? null,
      fromDatabase: Boolean(row),
    };
  });
}

export function homeStoreTypeKey(
  type: HomeStoreCard["type"],
): "home.type.kirana" | "home.type.supermarket" | "home.type.pharmacy" {
  if (type === "pharmacy") return "home.type.pharmacy";
  if (type === "supermarket") return "home.type.supermarket";
  return "home.type.kirana";
}

export function sortSlugOrder(slugs: string[]): string[] {
  return [...slugs].sort(
    (a, b) => SLUG_ORDER.indexOf(a) - SLUG_ORDER.indexOf(b) || a.localeCompare(b),
  );
}

export { normalizeStoreType };
