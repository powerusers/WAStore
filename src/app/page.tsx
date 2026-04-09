import { StorefrontPage } from "@/components/storefront-page";
import Link from "next/link";
import { headers } from "next/headers";

export const revalidate = 60;

export default async function Home() {
  const slug = (await headers()).get("x-tenant-slug");

  if (slug) {
    return <StorefrontPage tenantSlug={slug} />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="max-w-md space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-700 dark:text-teal-400">
          WA Storefront
        </p>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Multi-tenant grocery storefront
        </h1>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          Tenants are resolved from a subdomain when{" "}
          <code className="rounded bg-stone-100 px-1 py-0.5 text-xs dark:bg-stone-900">
            NEXT_PUBLIC_ROOT_DOMAIN
          </code>{" "}
          is set, or from the first URL segment for local and Railway URLs (for example{" "}
          <span className="whitespace-nowrap font-medium text-stone-800 dark:text-stone-200">
            /demo
          </span>
          ).
        </p>
      </div>
      <Link
        href="/demo"
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
      >
        Open demo store
      </Link>
    </div>
  );
}
