import { StorefrontPage } from "@/components/storefront-page";
import Link from "next/link";
import { headers } from "next/headers";

export const revalidate = 60;

const DEMO_STORES = [
  {
    slug: "demo",
    name: "Demo Kirana",
    description: "Full grocery catalog with 65+ items — teal branding.",
    color: "#0f766e",
  },
  {
    slug: "purti",
    name: "Purti Supermarket",
    description: "Second demo store with 30 products — violet branding.",
    color: "#7c3aed",
  },
];

export default async function Home() {
  const slug = (await headers()).get("x-tenant-slug");

  if (slug) {
    return <StorefrontPage tenantSlug={slug} />;
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-6 py-16">
      <div className="max-w-lg space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-700 dark:text-teal-400">
          WA Storefront
        </p>
        <h1 className="text-3xl font-semibold text-stone-900 dark:text-stone-50">
          Multi-tenant grocery storefront
        </h1>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          Each store gets its own catalog, branding, and WhatsApp checkout.
          Try the demo stores below, or visit{" "}
          <code className="rounded bg-stone-100 px-1 py-0.5 text-xs dark:bg-stone-900">
            /your-store
          </code>{" "}
          for path-based tenants on Railway.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {DEMO_STORES.map((store) => (
          <Link
            key={store.slug}
            href={`/${store.slug}`}
            className="group flex flex-col gap-3 rounded-3xl border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white"
              style={{ backgroundColor: store.color }}
            >
              {store.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-stone-900 dark:text-stone-50">
                {store.name}
              </h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {store.description}
              </p>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: store.color }}
            >
              Open store →
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/admin"
        className="text-sm text-stone-500 underline-offset-2 hover:underline dark:text-stone-400"
      >
        Store admin
      </Link>
    </div>
  );
}
