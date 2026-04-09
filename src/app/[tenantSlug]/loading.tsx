export default function CatalogLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800"
          >
            <div className="aspect-[4/3] animate-pulse bg-stone-200 dark:bg-stone-800" />
            <div className="space-y-2 p-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
