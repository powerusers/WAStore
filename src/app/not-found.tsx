import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
        Store not found
      </h1>
      <p className="max-w-sm text-sm text-stone-600 dark:text-stone-400">
        This store does not exist or may have been removed. Check the subdomain or URL path.
      </p>
      <Link
        href="/"
        className="mt-2 text-sm font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
      >
        Back to home
      </Link>
    </div>
  );
}
