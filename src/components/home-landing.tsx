"use client";

import Link from "next/link";
import { InstallPrompt } from "@/components/install-prompt";
import { useI18n } from "@/components/locale-provider";
import { LocaleToggle } from "@/components/locale-toggle";
import { homeStoreTypeKey, type HomeStoreCard } from "@/lib/home-stores";

const FEATURES = [
  { key: "home.featureCatalog" as const, icon: "🛒" },
  { key: "home.featureWhatsapp" as const, icon: "💬" },
  { key: "home.featureAdmin" as const, icon: "📦" },
  { key: "home.featureHindi" as const, icon: "🇮🇳" },
];

const STORE_EMOJI: Record<HomeStoreCard["type"], string> = {
  kirana: "🏪",
  supermarket: "🛒",
  pharmacy: "💊",
};

export function HomeLanding({
  stores,
  onboardEnabled = true,
}: {
  stores: HomeStoreCard[];
  onboardEnabled?: boolean;
}) {
  const { t, locale } = useI18n();

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-800 px-6 py-12 text-white sm:py-16">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-100/90">
              WA Storefront
            </p>
            <LocaleToggle compact />
          </div>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {t("home.title")}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-teal-50/95 sm:text-lg">
              {t("home.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.key}
                className="rounded-2xl border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-sm"
              >
                <p className="text-xl" aria-hidden>
                  {feature.icon}
                </p>
                <p className="mt-1.5 text-[11px] font-medium leading-snug text-teal-50 sm:text-xs">
                  {t(feature.key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo stores — always 3 cards including HealthPlus */}
      <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-10 sm:py-12">
        <div className="mb-6 space-y-1 text-center">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
            {t("home.demoStores")}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t("home.demoStoresSub")}
          </p>
        </div>

        <div className="mb-8">
          <InstallPrompt />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <Link
              key={store.slug}
              href={`/${store.slug}`}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border-2 border-stone-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-stone-700 dark:bg-stone-900"
              style={{ borderColor: `${store.color}33` }}
            >
              {store.type === "pharmacy" && (
                <span className="absolute right-4 top-4 rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-800 dark:bg-sky-950 dark:text-sky-200">
                  {t("home.newBadge")}
                </span>
              )}

              <div className="flex items-start gap-3">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm"
                  style={{ backgroundColor: `${store.color}22` }}
                >
                  {STORE_EMOJI[store.type]}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: store.color }}
                  >
                    {t(homeStoreTypeKey(store.type))}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50">
                    {store.name}
                  </h3>
                  <p className="text-xs text-stone-400">/{store.slug}</p>
                </div>
              </div>

              <p className="flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {locale === "hi" ? store.descriptionHi : store.descriptionEn}
              </p>

              <span
                className="inline-flex items-center gap-1 text-sm font-bold"
                style={{ color: store.color }}
              >
                {t("home.openStore")}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {onboardEnabled && (
            <Link
              href="/onboard"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-700 px-8 text-sm font-semibold text-white shadow-lg hover:bg-teal-800"
            >
              {t("nav.startStore")}
            </Link>
          )}
          <Link
            href="/admin"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-200 bg-white px-8 text-sm font-semibold text-stone-700 shadow-sm hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
          >
            {t("nav.admin")}
          </Link>
        </div>
      </section>
    </div>
  );
}
