"use client";

import { formatInrFromPaise } from "@/lib/format-inr";
import {
  getCategoryLabel,
  getProductCategoryId,
  getProductImage,
  type CatalogProduct,
} from "@/lib/catalog-utils";

export function ProductCard(props: {
  product: CatalogProduct;
  quantity: number;
  mounted: boolean;
  layout?: "grid" | "compact";
  onAdd: () => void;
  onSetQty: (q: number) => void;
}) {
  const { product, quantity, mounted, layout = "grid", onAdd, onSetQty } = props;
  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const categoryLabel = getCategoryLabel(getProductCategoryId(product));
  const image = getProductImage(product);

  if (layout === "compact") {
    return (
      <article className="group flex w-36 shrink-0 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
        <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {lowStock && (
            <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              Low
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-stone-900 dark:text-stone-50">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-teal-700 dark:text-teal-300">
            {formatInrFromPaise(product.priceCents)}
          </p>
          <AddControls
            compact
            mounted={mounted}
            outOfStock={outOfStock}
            quantity={quantity}
            max={product.stock}
            onAdd={onAdd}
            onSetQty={onSetQty}
          />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-600 backdrop-blur-sm dark:bg-stone-950/80 dark:text-stone-300">
            {categoryLabel}
          </span>
          {lowStock && (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              Low stock
            </span>
          )}
        </div>
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-950/55 backdrop-blur-[1px]">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-900">
              Sold out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-stone-900 dark:text-stone-50">
            {product.name}
          </h3>
          {product.description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between gap-2 border-t border-stone-100 pt-3 dark:border-stone-800">
          <div>
            <p className="text-lg font-bold text-stone-900 dark:text-stone-50">
              {formatInrFromPaise(product.priceCents)}
            </p>
            {product.stock > 0 && (
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {product.stock} in stock
              </p>
            )}
          </div>
          <AddControls
            mounted={mounted}
            outOfStock={outOfStock}
            quantity={quantity}
            max={product.stock}
            onAdd={onAdd}
            onSetQty={onSetQty}
          />
        </div>
      </div>
    </article>
  );
}

function AddControls(props: {
  mounted: boolean;
  outOfStock: boolean;
  quantity: number;
  max: number;
  compact?: boolean;
  onAdd: () => void;
  onSetQty: (q: number) => void;
}) {
  const { mounted, outOfStock, quantity, max, compact, onAdd, onSetQty } = props;

  if (outOfStock) {
    return (
      <span className="rounded-xl bg-stone-100 px-3 py-2 text-xs font-semibold text-stone-400 dark:bg-stone-800">
        Unavailable
      </span>
    );
  }

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className={`rounded-xl bg-stone-200 font-semibold text-stone-500 dark:bg-stone-800 ${
          compact ? "w-full px-2 py-1.5 text-xs" : "px-4 py-2 text-xs"
        }`}
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
        className={`rounded-xl bg-teal-700 font-semibold text-white shadow-sm transition hover:bg-teal-800 active:scale-95 ${
          compact ? "w-full px-2 py-1.5 text-xs" : "px-4 py-2 text-xs"
        }`}
      >
        Add to cart
      </button>
    );
  }

  return (
    <div
      className={`flex items-center rounded-xl border border-teal-200 bg-teal-50 dark:border-teal-900 dark:bg-teal-950/40 ${
        compact ? "w-full justify-between" : ""
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className="px-2.5 py-2 text-sm font-bold text-teal-800 dark:text-teal-200"
        onClick={() => onSetQty(quantity - 1)}
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-bold tabular-nums text-teal-900 dark:text-teal-100">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        className="px-2.5 py-2 text-sm font-bold text-teal-800 disabled:opacity-30 dark:text-teal-200"
        onClick={() => onSetQty(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}
