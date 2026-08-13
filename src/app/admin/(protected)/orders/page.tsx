"use client";

import { formatInrFromPaise } from "@/lib/format-inr";
import { useCallback, useEffect, useState } from "react";

type OrderRow = {
  id: string;
  status: string;
  totalCents: number;
  customerName: string | null;
  customerPhone: string | null;
  customerAddress: string | null;
  createdAt: string;
  tenant: { slug: string; name: string };
};

const STATUSES = ["intent", "confirmed", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [tenantSlug, setTenantSlug] = useState("");
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (tenantSlug) params.set("tenantSlug", tenantSlug);
      if (status) params.set("status", status);
      const qs = params.toString() ? `?${params}` : "";
      const res = await fetch(`/api/admin/orders${qs}`);
      const data = (await res.json()) as { orders?: OrderRow[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to load orders");
      setOrders(data.orders ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [tenantSlug, status]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, next: string) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setError("Failed to update status");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">Orders</h1>
        <p className="text-sm text-stone-500">View and update order status.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={tenantSlug}
          onChange={(e) => setTenantSlug(e.target.value)}
          className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm dark:border-stone-700 dark:bg-stone-900"
        >
          <option value="">All stores</option>
          <option value="demo">Demo Kirana</option>
          <option value="purti">Purti Supermarket</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm dark:border-stone-700 dark:bg-stone-900"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-stone-500">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-stone-500">No orders found.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-50">
                    {order.tenant.name} · {formatInrFromPaise(order.totalCents)}
                  </p>
                  <p className="text-xs text-stone-500">
                    ID {order.id.slice(-8).toUpperCase()} ·{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                  {order.customerName && (
                    <p className="mt-2 text-sm text-stone-700 dark:text-stone-300">
                      {order.customerName} · {order.customerPhone}
                    </p>
                  )}
                  {order.customerAddress && (
                    <p className="text-sm text-stone-500">{order.customerAddress}</p>
                  )}
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm dark:border-stone-700 dark:bg-stone-950"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
