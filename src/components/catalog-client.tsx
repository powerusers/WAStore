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
import type { CustomerDetails } from "@/lib/customer-details";
import { brandingStyleVars, type StoreBranding } from "@/lib/store-branding";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useMemo, useState, useTransition } from "react";

export type { CatalogProduct };

export function CatalogClient(props: {
  tenantSlug: string;
  tenantName: string;
  branding: StoreBranding;
  products: CatalogProduct[];
}) {
  const { tenantSlug, tenantName, branding, products } = props;
  const lines = useCartStore((s) => s.lines);
  const add = useCartStore((s) => s.add);
  const setQty = useCartStore((s) => s.setQty);
  const clear = useCartStore((s) => s.clear);
  const setTenantSlug = useCartStore((s) => s.setTenantSlug);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sort, setSort] = useState<SortOption>("popular");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

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

  const checkout = (customer: CustomerDetails) => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout/whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenantSlug,
            customer,
            lines: lines.map((l) => ({
              productId: l.productId,
              quantity: l.quantity,
            })),
          }),
        });
        const data = (await res.json()) as {
          url?: string;
          orderId?: string;
          error?: string;
        };
        if (!res.ok) {
          setError(data.error ?? "Checkout failed");
          return;
        }
        if (data.url) {
          setWhatsappUrl(data.url);
          setOrderId(data.orderId ?? null);
          setCheckoutComplete(true);
          setCartOpen(true);
          window.open(data.url, "_blank", "noopener,noreferrer");
        }
      } catch {
        setError("Network error. Try again.");
      }
    });
  };

  const handleClearCart = () => {
    clear();
    setCheckoutComplete(false);
    setWhatsappUrl(null);
    setOrderId(null);
    setError(null);
    setCartOpen(false);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handleOpenWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
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
    <div
      className="flex min-h-0 flex-1 flex-col pb-24"
      style={brandingStyleVars(branding.primaryColor)}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-950/90">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-lg font-bold text-white shadow-sm"
              style={{ backgroundColor: "var(--store-primary)" }}
            >
              {branding.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={branding.logoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                tenantName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-stone-900 dark:text-stone-50">
                {tenantName}
              </p>
              {branding.tagline && (
                <p className="truncate text-xs text-stone-500 dark:text-stone-400">
                  {branding.tagline}
                </p>
              )}
              {branding.deliveryNote && (
                <p className="truncate text-xs text-stone-500 dark:text-stone-400">
                  {branding.deliveryNote}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-lg dark:border-stone-700 dark:bg-stone-900"
              aria-label="Open cart"
            >
              🛒
              {mounted && totalQty > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
                  style={{ backgroundColor: "var(--store-primary)" }}
                >
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
          <section
            className="mb-6 overflow-hidden rounded-3xl p-5 text-white shadow-lg"
            style={{ backgroundColor: "var(--store-primary)" }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
                  {branding.deliveryNote ?? "Same-day delivery"}
                </span>
                <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                  {branding.heroTitle ?? "Fresh groceries, delivered fast"}
                </h1>
                <p className="max-w-md text-sm text-white/90">
                  {branding.heroSubtitle ??
                    `Browse ${products.length}+ items and place your order on WhatsApp in seconds.`}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:max-w-xs">
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold">{products.length}+</p>
                  <p className="text-xs text-white/80">Products</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <p className="text-2xl font-bold">WhatsApp</p>
                  <p className="text-xs text-white/80">Easy checkout</p>
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
                      ? "border-[color:var(--store-primary)] text-white shadow-sm"
                      : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
                  }`}
                  style={
                    active
                      ? { backgroundColor: "var(--store-primary)" }
                      : undefined
                  }
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
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--store-primary)" }}
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
            disabled={!mounted || pending || (totalQty === 0 && !checkoutComplete)}
            onClick={() =>
              checkoutComplete
                ? setCartOpen(true)
                : totalQty > 0
                  ? setCartOpen(true)
                  : setCartOpen(true)
            }
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] px-5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5b] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "…" : checkoutComplete ? "View order" : "Checkout"}
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
        checkoutComplete={checkoutComplete}
        orderId={orderId}
        whatsappUrl={whatsappUrl}
        deliveryNote={branding.deliveryNote}
        onClose={handleCloseCart}
        onSetQty={setQty}
        onCheckout={checkout}
        onClearCart={handleClearCart}
        onOpenWhatsApp={handleOpenWhatsApp}
      />
    </div>
  );
}
