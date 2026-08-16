import Link from "next/link";
import { DEMO_STORES } from "@/lib/demo-stores";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="space-y-2">
        <p className="text-4xl" aria-hidden>
          🔍
        </p>
        <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
          Store not found
        </h1>
        <p className="max-w-sm text-sm text-stone-600 dark:text-stone-400">
          This store does not exist or the URL may be misspelled. Try one of the demo stores
          below.
        </p>
      </div>

      <div className="grid w-full max-w-md gap-3">
        {DEMO_STORES.map((store) => (
          <Link
            key={store.slug}
            href={`/${store.slug}`}
            className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: store.color }}
            >
              {store.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-stone-900 dark:text-stone-50">{store.name}</p>
              <p className="truncate text-xs text-stone-500">/{store.slug}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="text-sm font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
      >
        Back to home
      </Link>
    </div>
  );
}
