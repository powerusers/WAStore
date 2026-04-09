"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartLine = {
  productId: string;
  name: string;
  priceCents: number;
  quantity: number;
};

type CartState = {
  tenantSlug: string | null;
  lines: CartLine[];
  setTenantSlug: (slug: string) => void;
  add: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  setQty: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantSlug: null,
      lines: [],
      setTenantSlug: (slug) => {
        const prev = get().tenantSlug;
        if (prev && prev !== slug) {
          set({ tenantSlug: slug, lines: [] });
          return;
        }
        set({ tenantSlug: slug });
      },
      add: (line) => {
        const qty = line.quantity ?? 1;
        set((s) => {
          const idx = s.lines.findIndex((l) => l.productId === line.productId);
          if (idx === -1) {
            return {
              lines: [
                ...s.lines,
                {
                  productId: line.productId,
                  name: line.name,
                  priceCents: line.priceCents,
                  quantity: qty,
                },
              ],
            };
          }
          const next = [...s.lines];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
          return { lines: next };
        });
      },
      setQty: (productId, quantity) => {
        const q = Math.max(0, Math.min(999, Math.floor(quantity)));
        set((s) => {
          if (q <= 0) {
            return { lines: s.lines.filter((l) => l.productId !== productId) };
          }
          return {
            lines: s.lines.map((l) =>
              l.productId === productId ? { ...l, quantity: q } : l,
            ),
          };
        });
      },
      remove: (productId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "wastorefront-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ tenantSlug: s.tenantSlug, lines: s.lines }),
    },
  ),
);
