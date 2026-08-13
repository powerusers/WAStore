"use client";

import { formatInrFromPaise } from "@/lib/format-inr";
import {
  EMPTY_CUSTOMER,
  validateCustomerDetails,
  type CustomerDetails,
} from "@/lib/customer-details";
import type { CartLine } from "@/store/cart-store";
import { useState } from "react";

export function CartDrawer(props: {
  open: boolean;
  lines: CartLine[];
  totalCents: number;
  totalQty: number;
  pending: boolean;
  error: string | null;
  checkoutComplete: boolean;
  orderId: string | null;
  whatsappUrl: string | null;
  deliveryNote: string | null;
  onClose: () => void;
  onSetQty: (productId: string, qty: number) => void;
  onCheckout: (customer: CustomerDetails) => void;
  onClearCart: () => void;
  onOpenWhatsApp: () => void;
}) {
  const {
    open,
    lines,
    totalCents,
    totalQty,
    pending,
    error,
    checkoutComplete,
    orderId,
    whatsappUrl,
    deliveryNote,
    onClose,
    onSetQty,
    onCheckout,
    onClearCart,
    onOpenWhatsApp,
  } = props;

  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY_CUSTOMER);
  const [fieldError, setFieldError] = useState<string | null>(null);

  if (!open) return null;

  const handleCheckout = () => {
    const validationError = validateCustomerDetails(customer);
    if (validationError) {
      setFieldError(validationError);
      return;
    }
    setFieldError(null);
    onCheckout(customer);
  };

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
        className="relative max-h-[90vh] overflow-hidden rounded-t-3xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-950"
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4 dark:border-stone-800">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
              {checkoutComplete ? "Order ready" : "Your cart"}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {checkoutComplete
                ? "Send your order on WhatsApp"
                : `${totalQty} ${totalQty === 1 ? "item" : "items"}`}
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

        {checkoutComplete ? (
          <div className="px-5 py-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl dark:bg-emerald-950/50">
                ✓
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-stone-900 dark:text-stone-50">
                  Checkout complete
                </p>
                {orderId && (
                  <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
                    Order ID: {orderId.slice(-8).toUpperCase()}
                  </p>
                )}
                <p className="max-w-xs text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                  Your order for {formatInrFromPaise(totalCents)} is ready. Open
                  WhatsApp to send it to the store, then clear your cart to
                  start a new order.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 pt-2">
                {whatsappUrl && (
                  <button
                    type="button"
                    onClick={onOpenWhatsApp}
                    className="flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#25D366] text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5b]"
                  >
                    Open WhatsApp again
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClearCart}
                  className="flex w-full min-h-12 items-center justify-center rounded-2xl border border-stone-200 bg-white text-sm font-semibold text-stone-800 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
                >
                  Clear cart & continue shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="max-h-[45vh] overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <span className="text-4xl">🛒</span>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Your cart is empty. Add items from the store.
                  </p>
                </div>
              ) : (
                <>
                  <ul className="mb-5 space-y-3">
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
                              onClick={() =>
                                onSetQty(line.productId, line.quantity - 1)
                              }
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
                              onClick={() =>
                                onSetQty(line.productId, line.quantity + 1)
                              }
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

                  <div className="space-y-3 rounded-2xl border border-stone-100 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900/40">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                      Delivery details
                    </p>
                    <label className="block">
                      <span className="mb-1 block text-xs text-stone-500">Name *</span>
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) =>
                          setCustomer((c) => ({ ...c, name: e.target.value }))
                        }
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-stone-500">Phone *</span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={customer.phone}
                        onChange={(e) =>
                          setCustomer((c) => ({ ...c, phone: e.target.value }))
                        }
                        placeholder="10-digit mobile number"
                        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-stone-500">Address *</span>
                      <textarea
                        value={customer.address}
                        onChange={(e) =>
                          setCustomer((c) => ({ ...c, address: e.target.value }))
                        }
                        placeholder="Flat, street, landmark, city"
                        rows={2}
                        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-stone-500">
                        Delivery notes
                      </span>
                      <input
                        type="text"
                        value={customer.notes}
                        onChange={(e) =>
                          setCustomer((c) => ({ ...c, notes: e.target.value }))
                        }
                        placeholder="Optional instructions"
                        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-950"
                      />
                    </label>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-stone-100 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-stone-800">
              {(error || fieldError) && (
                <p className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-800 dark:bg-red-950/50 dark:text-red-200">
                  {fieldError ?? error}
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
                onClick={handleCheckout}
                className="flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#25D366] text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5b] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{pending ? "Opening WhatsApp…" : "Order on WhatsApp"}</span>
                {!pending && <span aria-hidden>→</span>}
              </button>
              {deliveryNote && (
                <p className="mt-2 text-center text-[11px] text-stone-500 dark:text-stone-400">
                  {deliveryNote}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
