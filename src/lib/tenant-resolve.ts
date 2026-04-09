const RESERVED_FIRST_SEGMENTS = new Set([
  "api",
  "_next",
  "favicon.ico",
  "manifest.webmanifest",
  "icons",
  "robots.txt",
  "sw.js",
]);

/**
 * Resolves tenant slug from host + pathname.
 * - If NEXT_PUBLIC_ROOT_DOMAIN is set and the host is a single subdomain of it (e.g. purti.myapp.com), returns that subdomain.
 * - Otherwise uses the first URL path segment when it is not reserved (e.g. /demo → demo).
 */
export function resolveTenantSlug(
  hostHeader: string | null,
  pathname: string,
  rootDomain: string | null | undefined,
): string | null {
  const hostOnly = (hostHeader ?? "").split(":")[0]?.toLowerCase() ?? "";
  const normalizedRoot = rootDomain?.trim().toLowerCase().replace(/^\.+/, "") || null;

  if (normalizedRoot && hostOnly.endsWith(`.${normalizedRoot}`)) {
    const sub = hostOnly.slice(0, -(normalizedRoot.length + 1));
    if (sub && sub !== "www" && !sub.includes(".")) {
      return sub;
    }
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && !RESERVED_FIRST_SEGMENTS.has(first)) {
    return first;
  }

  return null;
}
