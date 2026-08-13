export type StoreBranding = {
  logoUrl: string | null;
  primaryColor: string;
  tagline: string | null;
  deliveryNote: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
};

export const DEFAULT_PRIMARY_COLOR = "#0f766e";

export function resolveStoreBranding(tenant: {
  logoUrl: string | null;
  primaryColor: string | null;
  tagline: string | null;
  deliveryNote: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
}): StoreBranding {
  return {
    logoUrl: tenant.logoUrl,
    primaryColor: tenant.primaryColor ?? DEFAULT_PRIMARY_COLOR,
    tagline: tenant.tagline,
    deliveryNote: tenant.deliveryNote,
    heroTitle: tenant.heroTitle,
    heroSubtitle: tenant.heroSubtitle,
  };
}

export function brandingStyleVars(primaryColor: string): Record<string, string> {
  return {
    "--store-primary": primaryColor,
  };
}
