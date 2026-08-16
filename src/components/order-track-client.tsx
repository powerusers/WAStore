"use client";

import Link from "next/link";
import { useI18n } from "@/components/locale-provider";
import { LocaleToggle } from "@/components/locale-toggle";
import { formatInrFromPaise } from "@/lib/format-inr";
import { orderStatusKey } from "@/lib/i18n/translations";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type OrderRow = {
  id: string;
  status: string;
  totalCents: number;
  customerName: string | null;
  createdAt: string;
  itemsJson: Array<{ name: string; quantity: number }>;
};

export function OrderTrackClient({
  tenantSlug,
  tenantName,
}: {
  tenantSlug: string;
  tenantName: string;
}) {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState("");
  const [orderRef, setOrderRef] = useState(() => searchParams.get("ref") ?? "");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const track = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const digits = phone.replace(/\D/g, "").slice(-10);
      const ref = orderRef.replace(/[^a-z0-9]/gi, "").slice(-8);
      if (ref.length < 8) {
        setError(t("orders.orderRefRequired"));
        setOrders([]);
        return;
      }
      const params = new URLSearchParams({
        tenantSlug,
        phone: digits,
        orderRef: ref,
      });
      const res = await fetch(`/api/orders/track?${params}`);
      const data = (await res.json()) as { orders?: OrderRow[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to track orders");
      setOrders(data.orders ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to track orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href={`/${tenantSlug}`}
            className="text-sm text-stone-500 hover:underline"
          >
            ← {tenantName}
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-50">
            {t("orders.title")}
          </h1>
          <p className="mt-1 text-sm text-stone-500">{t("orders.subtitle")}</p>
        </div>
        <LocaleToggle compact />
      </div>

      <form onSubmit={track} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-stone-500">
            {t("orders.orderRef")}
          </span>
          <input
            type="text"
            value={orderRef}
            onChange={(e) => setOrderRef(e.target.value.toUpperCase())}
            placeholder={t("orders.orderRefPlaceholder")}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-mono text-sm uppercase tracking-wider dark:border-stone-700 dark:bg-stone-900"
            required
            maxLength={12}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-stone-500">
            {t("cart.phone")}
          </span>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("orders.phonePlaceholder")}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm dark:border-stone-700 dark:bg-stone-900"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-stone-900 py-3 text-sm font-semibold text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
        >
          {loading ? "…" : t("orders.track")}
        </button>
      </form>

      {error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      )}

      {searched && orders.length === 0 && !loading && !error && (
        <p className="text-center text-sm text-stone-500">{t("orders.none")}</p>
      )}

      <ul className="space-y-3">
        {orders.map((order) => {
          const items = Array.isArray(order.itemsJson) ? order.itemsJson : [];
          return (
            <li
              key={order.id}
              className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-50">
                    {formatInrFromPaise(order.totalCents)}
                  </p>
                  <p className="text-xs text-stone-500">
                    {t("orders.placed")}:{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                  <p className="font-mono text-xs text-stone-400">
                    {order.id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold dark:bg-stone-800">
                  {t(orderStatusKey(order.status))}
                </span>
              </div>
              {items.length > 0 && (
                <ul className="mt-3 space-y-1 border-t border-stone-100 pt-3 text-sm text-stone-600 dark:border-stone-800 dark:text-stone-400">
                  {items.slice(0, 5).map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
