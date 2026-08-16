"use client";

import { useI18n } from "@/components/locale-provider";
import { LOCALES } from "@/lib/i18n/translations";

export function LocaleToggle({
  compact,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className={`inline-flex items-center gap-1.5 text-xs ${className ?? ""}`}>
      {!compact && (
        <span className="text-stone-500 dark:text-stone-400">{t("lang.toggle")}</span>
      )}
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        className="rounded-lg border border-stone-200 bg-white px-2 py-1 text-xs font-medium dark:border-stone-700 dark:bg-stone-900"
        aria-label={t("lang.toggle")}
      >
        {LOCALES.map((l) => (
          <option key={l.id} value={l.id}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
