const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "onboard",
  "orders",
  "demo",
  "purti",
  "www",
  "_next",
]);

export function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

export function validateStoreSlug(slug: string): string | null {
  if (slug.length < 3) return "Slug must be at least 3 characters.";
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(slug)) {
    return "Slug may only contain lowercase letters, numbers, and hyphens.";
  }
  if (RESERVED_SLUGS.has(slug)) return "This slug is reserved. Choose another.";
  return null;
}

export function normalizeWhatsAppNumber(input: string): string {
  return input.replace(/\D/g, "");
}

export function validateWhatsAppNumber(digits: string): string | null {
  if (digits.length < 10 || digits.length > 15) {
    return "Enter a valid WhatsApp number with country code.";
  }
  return null;
}
