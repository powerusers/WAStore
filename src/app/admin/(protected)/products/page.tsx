"use client";

import { AdminTenantSelect } from "@/components/admin-tenant-select";
import { formatInrFromPaise } from "@/lib/format-inr";
import { useCallback, useEffect, useState } from "react";

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  sku: string | null;
  stock: number;
  active: boolean;
  tenant: { slug: string; name: string };
};

export default function AdminProductsPage() {
  const [tenantSlug, setTenantSlug] = useState("");
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    tenantSlug: "demo",
    name: "",
    description: "",
    priceRupees: "",
    sku: "",
    stock: "10",
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = tenantSlug ? `?tenantSlug=${encodeURIComponent(tenantSlug)}` : "";
      const res = await fetch(`/api/admin/products${qs}`);
      const data = (await res.json()) as { products?: ProductRow[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to load products");
      setProducts(data.products ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [tenantSlug]);

  useEffect(() => {
    load();
  }, [load]);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const priceCents = Math.round(Number(form.priceRupees) * 100);
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenantSlug: form.tenantSlug,
        name: form.name,
        description: form.description,
        priceCents,
        sku: form.sku,
        stock: Number(form.stock),
      }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error ?? "Failed to add product");
      return;
    }
    setForm((f) => ({ ...f, name: "", description: "", priceRupees: "", sku: "" }));
    await load();
  };

  const updateProduct = async (
    id: string,
    patch: Partial<Pick<ProductRow, "name" | "priceCents" | "stock" | "active">>,
  ) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Update failed");
      return;
    }
    await load();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Delete failed");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">Products</h1>
        <p className="text-sm text-stone-500">Manage catalog items across stores.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-stone-600">
          Filter store
          <span className="ml-2 inline-block">
            <AdminTenantSelect
              value={tenantSlug}
              onChange={setTenantSlug}
              includeAll
            />
          </span>
        </label>
      </div>

      <form
        onSubmit={addProduct}
        className="grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:grid-cols-2 dark:border-stone-800 dark:bg-stone-900"
      >
        <h2 className="sm:col-span-2 text-sm font-semibold text-stone-900 dark:text-stone-50">
          Add product
        </h2>
        <AdminTenantSelect
          value={form.tenantSlug}
          onChange={(slug) => setForm((f) => ({ ...f, tenantSlug: slug }))}
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
        />
        <input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
        />
        <input
          placeholder="Price (₹)"
          inputMode="decimal"
          value={form.priceRupees}
          onChange={(e) => setForm((f) => ({ ...f, priceRupees: e.target.value }))}
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
          required
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
        />
        <input
          placeholder="Stock"
          inputMode="numeric"
          value={form.stock}
          onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
        />
        <button
          type="submit"
          className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white dark:bg-stone-100 dark:text-stone-900"
        >
          Add product
        </button>
      </form>

      {error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-stone-500">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-stone-100 text-xs uppercase text-stone-500 dark:border-stone-800">
              <tr>
                <th className="px-4 py-3">Store</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-stone-50 dark:border-stone-800/80">
                  <td className="px-4 py-3">{p.tenant.name}</td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{formatInrFromPaise(p.priceCents)}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      defaultValue={p.stock}
                      className="w-20 rounded border border-stone-200 px-2 py-1 dark:border-stone-700 dark:bg-stone-950"
                      onBlur={(e) =>
                        updateProduct(p.id, { stock: Number(e.target.value) })
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      defaultChecked={p.active}
                      onChange={(e) =>
                        updateProduct(p.id, { active: e.target.checked })
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => deleteProduct(p.id)}
                      className="text-xs font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
