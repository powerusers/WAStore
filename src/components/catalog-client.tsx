"use client";

import { CartDrawer } from "@/components/cart-drawer";
import { InstallPrompt } from "@/components/install-prompt";
import { ProductCard } from "@/components/product-card";
import {
  filterAndSortProducts,
  getDealProducts,
  getPopularProducts,
  PRODUCT_CATEGORIES,
  type CatalogProduct,
  type SortOption,
} from "@/lib/catalog-utils";
import { formatInrFromPaise } from "@/lib/format-inr";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useMemo, useState, useTransition } from "react";

export type { CatalogProduct };

export function CatalogClient(props: {
  tenantSlug: string;
  tenantName: string;
  products: CatalogProduct[];
}) {
  const { tenantSlug, tenantName, products } = props;
  const lines = useCartStore((s) => s.lines);
  const add = useCartStore((s) => s.add);
  const setQty = useCartStore((s) => s.setQty);
  const setTenantSlug = useCartStore((s) => s.setTenantSlug);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sort, setSort] = useState<SortOption>("popular");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTenantSlug(tenantSlug);
  }, [tenantSlug, setTenantSlug]);

  const totalQty = useMemo(
    () => lines.reduce((acc, l) => acc + l.quantity, 0),
    [lines],
  );

  const totalCents = useMemo(
    () => lines.reduce((acc, l) => acc + l.priceCents * l.quantity, 0),
    [lines],
  );

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, { query, categoryId, sort }),
    [products, query, categoryId, sort],
  );

  const popularProducts = useMemo(() => getPopularProducts(products), [products]);
  const dealProducts = useMemo(() => getDealProducts(products), [products]);

  const showSections = !query && categoryId === "all";

  const checkout = () => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout/whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenantSlug,
            lines: lines.map((l) => ({
              productId: l.productId,
              quantity: l.quantity,
            })),
          }),
        });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok) {
          setError(data.error ?? "Checkout failed");
          return;
        }
        if (data.url) {
          window.location.href = data.url;
        }
      } catch {
        setError("Network error. Try again.");
      }
    });
  };

  const getQuantity = (productId: string) =>
    lines.find((l) => l.productId === productId)?.quantity ?? 0;

  const handleAdd = (product: CatalogProduct) => {
    add({
      productId: product.id,
      name: product.name,
      priceCents: product.priceCents,
      quantity: 1,
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col pb-24">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-950/90">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 text-lg font-bold text-white shadow-sm">
              {tenantName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-stone-900 dark:text-stone-50">
                {tenantName}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Delivery in 30–45 min · Open now
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-lg dark:border-stone-700 dark:bg-stone-900"
              aria-label="Open cart"
            >
              🛒
              {mounted && totalQty > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1 text-[10px] font-bold text-white">
                  {totalQty}
                </span>
              )}
            </button>
          </div>

          <div className="mt-3">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                🔍
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search rice, dal, snacks…"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-sm text-stone-900 outline-none ring-teal-600/30 placeholder:text-stone-400 focus:border-teal-500 focus:ring-2 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50"
              />
            </label>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4">
        <InstallPrompt />

        {/* Hero banner */}
        {showSections && (
          <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 p-5 text-white shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
                  Same-day delivery
                </span>
                <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                  Fresh groceries,
                  <br />
                  delivered fast
                </h1>
                <p className="max-w-md text-sm text-teal-50/90">
                  Browse {products.length}+ items, add to cart, and place your
                  order on WhatsApp in seconds.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:max-w-xs">
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold">{products.length}+</p>
                  <p className="text-xs text-teal-50/80">Products</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold">₹500+</p>
                  <p className="text-xs text-teal-50/80">Free delivery</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category rail */}
        <section className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PRODUCT_CATEGORIES.map((cat) => {
              const active = categoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryId(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-teal-700 bg-teal-700 text-white shadow-sm"
                      : "border-stone-200 bg-white text-stone-700 hover:border-teal-200 hover:bg-teal-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-teal-900 dark:hover:bg-teal-950/40"
                  }`}
                >
                  <span aria-hidden>{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Popular picks */}
        {showSections && popularProducts.length > 0 && (
          <section className="mb-8">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                  Popular picks
                </h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Bestsellers in your neighbourhood
                </p>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {popularProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  layout="compact"
                  mounted={mounted}
                  quantity={getQuantity(p.id)}
                  onAdd={() => handleAdd(p)}
                  onSetQty={(q) => setQty(p.id, q)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Deals */}
        {showSections && dealProducts.length > 0 && (
          <section className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                Budget buys
              </span>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                Under ₹50
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {dealProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  layout="compact"
                  mounted={mounted}
                  quantity={getQuantity(p.id)}
                  onAdd={() => handleAdd(p)}
                  onSetQty={(q) => setQty(p.id, q)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Product grid header */}
        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                {categoryId === "all" ? "All products" : "Filtered products"}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "item" : "items"} found
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-stone-500 dark:text-stone-400">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-800 outline-none focus:border-teal-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              >
                <option value="popular">Popular</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-stone-200 bg-stone-50 py-16 text-center dark:border-stone-800 dark:bg-stone-900/40">
              <span className="text-4xl">🔎</span>
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                No products match your search
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategoryId("all");
                }}
                className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((p) => (
                <li key={p.id}>
                  <ProductCard
                    product={p}
                    mounted={mounted}
                    quantity={getQuantity(p.id)}
                    onAdd={() => handleAdd(p)}
                    onSetQty={(q) => setQty(p.id, q)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Sticky bottom cart bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-stone-800 dark:bg-stone-950/95"
        role="region"
        aria-label="Cart summary"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-left dark:border-stone-700 dark:bg-stone-900"
          >
            <span className="text-xl">🛒</span>
            <div className="min-w-0">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {mounted && totalQty > 0
                  ? `${totalQty} ${totalQty === 1 ? "item" : "items"} in cart`
                  : "View cart"}
              </p>
              <p className="truncate text-base font-bold text-stone-900 dark:text-stone-50">
                {!mounted ? "—" : formatInrFromPaise(totalCents)}
              </p>
            </div>
          </button>
          <button
            type="button"
            disabled={!mounted || totalQty === 0 || pending}
            onClick={() => (totalQty > 0 ? checkout() : setCartOpen(true))}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] px-5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5b] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "…" : "Checkout"}
          </button>
        </div>
      </div>

      <CartDrawer
        open={cartOpen}
        lines={lines}
        totalCents={totalCents}
        totalQty={totalQty}
        pending={pending}
        error={error}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onCheckout={checkout}
      />
    </div>
  );
}
