"use client";

import Link from "next/link";
import { InstallPrompt } from "@/components/install-prompt";
import { useI18n } from "@/components/locale-provider";
import { LocaleToggle } from "@/components/locale-toggle";

const DEMO_STORES = [
  {
    slug: "demo",
    name: "Demo Kirana",
    descriptionEn: "Full grocery catalog with 65+ items — teal branding.",
    descriptionHi: "65+ उत्पादों के साथ पूरा किराना कैटलॉग — टील ब्रांडिंग।",
    color: "#0f766e",
  },
  {
    slug: "purti",
    name: "Purti Supermarket",
    descriptionEn: "Second demo store with 30 products — violet branding.",
    descriptionHi: "30 उत्पादों के साथ दूसरा डेमो स्टोर — बैंगनी ब्रांडिंग।",
    color: "#7c3aed",
  },
];

export function HomeLanding() {
  const { t, locale } = useI18n();

  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-6 py-16">
      <div className="flex w-full max-w-2xl justify-end">
        <LocaleToggle />
      </div>

      <div className="w-full max-w-lg">
        <InstallPrompt />
      </div>

      <div className="max-w-lg space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-700 dark:text-teal-400">
          WA Storefront
        </p>
        <h1 className="text-3xl font-semibold text-stone-900 dark:text-stone-50">
          {t("home.title")}
        </h1>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {t("home.subtitle")}
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
                {locale === "hi" ? store.descriptionHi : store.descriptionEn}
              </p>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: store.color }}
            >
              {t("home.openStore")}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/onboard"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
        >
          {t("nav.startStore")}
        </Link>
        <Link
          href="/admin"
          className="text-sm text-stone-500 underline-offset-2 hover:underline dark:text-stone-400"
        >
          {t("nav.admin")}
        </Link>
      </div>
    </div>
  );
}
