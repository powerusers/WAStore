"use client";

import { useCartStore } from "@/store/cart-store";
import { formatInrFromPaise } from "@/lib/format-inr";
import { InstallPrompt } from "@/components/install-prompt";
import { useEffect, useMemo, useState, useTransition } from "react";

export type CatalogProduct = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  stock: number;
};

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

  return (
    <div className="flex min-h-0 flex-1 flex-col pb-36">
      <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[color:var(--background)]/90 px-4 py-3 backdrop-blur-md dark:border-stone-800/80">
        <div className="mx-auto flex max-w-lg flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-teal-700 dark:text-teal-400">
                Store
              </p>
              <h1 className="text-lg font-semibold leading-tight text-stone-900 dark:text-stone-50">
                {tenantName}
              </h1>
            </div>
            {mounted && totalQty > 0 && (
              <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-teal-700 px-2 text-sm font-bold text-white">
                {totalQty}
              </span>
            )}
          </div>
          <InstallPrompt />
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-4">
        <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
          Fresh prices. Tap add, then send your order on WhatsApp.
        </p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950"
            >
              <div className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-900">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl text-stone-300 dark:text-stone-700">
                    🛒
                  </div>
                )}
                {p.stock <= 5 && p.stock > 0 && (
                  <span className="absolute left-2 top-2 rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    Low stock
                  </span>
                )}
                {p.stock === 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
                    Out of stock
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3">
                <div className="flex flex-1 flex-col gap-1">
                  <h2 className="text-sm font-semibold leading-snug text-stone-900 dark:text-stone-50">
                    {p.name}
                  </h2>
                  {p.description && (
                    <p className="line-clamp-2 text-xs text-stone-600 dark:text-stone-400">
                      {p.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-base font-bold text-teal-800 dark:text-teal-300">
                    {formatInrFromPaise(p.priceCents)}
                  </p>
                  {p.stock > 0 ? (
                    <LineControls
                      mounted={mounted}
                      product={p}
                      onAdd={() =>
                        add({
                          productId: p.id,
                          name: p.name,
                          priceCents: p.priceCents,
                          quantity: 1,
                        })
                      }
                      quantity={
                        lines.find((l) => l.productId === p.id)?.quantity ?? 0
                      }
                      onSetQty={(q) => setQty(p.id, q)}
                      max={p.stock}
                    />
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-[color:var(--background)]/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-stone-800"
        role="region"
        aria-label="Cart"
      >
        <div className="mx-auto flex max-w-lg flex-col gap-2">
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800 dark:bg-red-950/50 dark:text-red-200">
              {error}
            </p>
          )}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400">Total</p>
              <p className="text-lg font-bold text-stone-900 dark:text-stone-50">
                {!mounted ? "—" : formatInrFromPaise(totalCents)}
              </p>
            </div>
            <button
              type="button"
              disabled={!mounted || totalQty === 0 || pending}
              onClick={checkout}
              className="inline-flex min-h-11 min-w-[10rem] items-center justify-center rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5b] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {pending ? "Opening…" : "WhatsApp order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LineControls(props: {
  mounted: boolean;
  product: CatalogProduct;
  quantity: number;
  max: number;
  onAdd: () => void;
  onSetQty: (q: number) => void;
}) {
  const { mounted, quantity, max, onAdd, onSetQty } = props;
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="rounded-lg bg-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-500 dark:bg-stone-800"
      >
        Add
      </button>
    );
  }
  if (quantity <= 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
      >
        Add
      </button>
    );
  }
  return (
    <div className="flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-900">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="px-2 py-1.5 text-sm font-semibold text-stone-700 dark:text-stone-200"
        onClick={() => onSetQty(quantity - 1)}
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        className="px-2 py-1.5 text-sm font-semibold text-stone-700 disabled:opacity-30 dark:text-stone-200"
        onClick={() => onSetQty(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}
