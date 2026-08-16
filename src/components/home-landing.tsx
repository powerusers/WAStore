"use client";

import Link from "next/link";
import { InstallPrompt } from "@/components/install-prompt";
import { useI18n } from "@/components/locale-provider";
import { LocaleToggle } from "@/components/locale-toggle";
import { DEMO_STORES } from "@/lib/demo-stores";

const FEATURES = [
  { key: "home.featureCatalog" as const, icon: "🛒" },
  { key: "home.featureWhatsapp" as const, icon: "💬" },
  { key: "home.featureAdmin" as const, icon: "📦" },
  { key: "home.featureHindi" as const, icon: "🇮🇳" },
];

export function HomeLanding() {
  const { t, locale } = useI18n();

  return (
    <div className="flex flex-1 flex-col items-center gap-10 px-6 py-12 sm:py-16">
      <div className="flex w-full max-w-3xl justify-end">
        <LocaleToggle />
      </div>

      <div className="w-full max-w-lg">
        <InstallPrompt />
      </div>

      <div className="max-w-2xl space-y-4 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-700 dark:text-teal-400">
          WA Storefront
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl dark:text-stone-50">
          {t("home.title")}
        </h1>
        <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">
          {t("home.subtitle")}
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {FEATURES.map((feature) => (
          <div
            key={feature.key}
            className="rounded-2xl border border-stone-200 bg-white px-3 py-4 text-center dark:border-stone-800 dark:bg-stone-900"
          >
            <p className="text-2xl" aria-hidden>
              {feature.icon}
            </p>
            <p className="mt-2 text-xs font-medium leading-snug text-stone-700 dark:text-stone-300">
              {t(feature.key)}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl space-y-3">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-stone-500">
          {t("home.demoStores")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="font-semibold text-stone-900 dark:text-stone-50">
                  {store.name}
                </h3>
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
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-stone-200 bg-white px-6 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
        >
          {t("nav.admin")}
        </Link>
      </div>
    </div>
  );
}
