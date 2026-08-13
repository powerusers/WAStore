"use client";

import { createContext, useContext, useMemo } from "react";
import {
  translate,
  type Locale,
  type MessageKey,
} from "@/lib/i18n/translations";
import { useLocaleStore } from "@/store/locale-store";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, params?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: MessageKey, params?: Record<string, string | number>) =>
        translate(locale, key, params),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return ctx;
}
