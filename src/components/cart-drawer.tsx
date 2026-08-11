"use client";

import { formatInrFromPaise } from "@/lib/format-inr";
import type { CartLine } from "@/store/cart-store";

export function CartDrawer(props: {
  open: boolean;
  lines: CartLine[];
  totalCents: number;
  totalQty: number;
  pending: boolean;
  error: string | null;
  onClose: () => void;
  onSetQty: (productId: string, qty: number) => void;
  onCheckout: () => void;
}) {
  const {
    open,
    lines,
    totalCents,
    totalQty,
    pending,
    error,
    onClose,
    onSetQty,
    onCheckout,
  } = props;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="relative max-h-[85vh] overflow-hidden rounded-t-3xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-950"
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4 dark:border-stone-800">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
              Your cart
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {totalQty} {totalQty === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-300"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="text-4xl">🛒</span>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Your cart is empty. Add items from the store.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.productId}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-900/60"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-50">
                      {line.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {formatInrFromPaise(line.priceCents)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-950">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="px-2 py-1.5 text-sm font-bold"
                        onClick={() => onSetQty(line.productId, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-bold tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="px-2 py-1.5 text-sm font-bold"
                        onClick={() => onSetQty(line.productId, line.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="min-w-16 text-right text-sm font-bold text-stone-900 dark:text-stone-50">
                      {formatInrFromPaise(line.priceCents * line.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-stone-100 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-stone-800">
          {error && (
            <p className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-800 dark:bg-red-950/50 dark:text-red-200">
              {error}
            </p>
          )}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-stone-500 dark:text-stone-400">
              Subtotal
            </span>
            <span className="text-xl font-bold text-stone-900 dark:text-stone-50">
              {formatInrFromPaise(totalCents)}
            </span>
          </div>
          <button
            type="button"
            disabled={totalQty === 0 || pending}
            onClick={onCheckout}
            className="flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#25D366] text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5b] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>{pending ? "Opening WhatsApp…" : "Order on WhatsApp"}</span>
            {!pending && <span aria-hidden>→</span>}
          </button>
          <p className="mt-2 text-center text-[11px] text-stone-500 dark:text-stone-400">
            Free delivery on orders above ₹500
          </p>
        </div>
      </div>
    </div>
  );
}
