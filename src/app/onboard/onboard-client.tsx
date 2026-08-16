"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/locale-provider";
import { LocaleToggle } from "@/components/locale-toggle";
import {
  normalizeSlug,
  normalizeWhatsAppNumber,
} from "@/lib/onboard-validation";
import { useState } from "react";

export function OnboardClient() {
  const router = useRouter();
  const { t } = useI18n();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    whatsappNumber: "",
    primaryColor: "#0f766e",
    tagline: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const slugPreview = normalizeSlug(form.slug || form.name || "your-store");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          whatsappNumber: normalizeWhatsAppNumber(form.whatsappNumber),
          slug: slugPreview,
        }),
      });
      const data = (await res.json()) as { slug?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not create store");
        return;
      }
      setSuccess(t("onboard.success"));
      router.push(`/${data.slug}`);
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-12">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href="/" className="text-sm text-stone-500 hover:underline">
            ← Home
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-stone-900 dark:text-stone-50">
            {t("onboard.title")}
          </h1>
          <p className="mt-2 text-sm text-stone-500">{t("onboard.subtitle")}</p>
        </div>
        <LocaleToggle compact />
      </div>

      <form
        onSubmit={submit}
        className="space-y-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
      >
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{t("onboard.storeName")}</span>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-950"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">{t("onboard.storeSlug")}</span>
          <input
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            placeholder={slugPreview}
            className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-950"
          />
          <p className="mt-1 text-xs text-stone-500">
            {t("onboard.slugHint", { slug: slugPreview })}
          </p>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">{t("onboard.whatsapp")}</span>
          <input
            value={form.whatsappNumber}
            onChange={(e) =>
              setForm((f) => ({ ...f, whatsappNumber: e.target.value }))
            }
            placeholder="919850524303"
            className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-950"
            required
          />
          <p className="mt-1 text-xs text-stone-500">{t("onboard.whatsappHint")}</p>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">{t("onboard.color")}</span>
            <input
              type="color"
              value={form.primaryColor}
              onChange={(e) =>
                setForm((f) => ({ ...f, primaryColor: e.target.value }))
              }
              className="h-11 w-full cursor-pointer rounded-xl border border-stone-200 dark:border-stone-700"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">{t("onboard.tagline")}</span>
            <input
              value={form.tagline}
              onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
              className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm dark:border-stone-700 dark:bg-stone-950"
            />
          </label>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
        )}
        {success && (
          <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-2xl bg-teal-700 py-3 text-sm font-bold text-white disabled:opacity-50"
        >
          {pending ? t("onboard.creating") : t("onboard.submit")}
        </button>
      </form>
    </div>
  );
}
