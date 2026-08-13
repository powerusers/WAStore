import type { Prisma } from "@prisma/client";

export type CheckoutLineInput = {
  productId: string;
  quantity: number;
};

export type OrderItemSnapshot = {
  productId: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
};

function formatInrPaise(cents: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function buildNumberedWhatsAppMessage(params: {
  storeName: string;
  items: OrderItemSnapshot[];
  totalCents: number;
  customer?: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
}): string {
  const body = params.items
    .map((item, i) => {
      const n = i + 1;
      return `${n}. ${item.name} × ${item.quantity} — ${formatInrPaise(item.lineTotalCents)}`;
    })
    .join("\n");

  const lines = [`*${params.storeName}*`, "", "*Order items*", body, ""];

  if (params.customer) {
    lines.push(
      "*Customer details*",
      `Name: ${params.customer.name}`,
      `Phone: ${params.customer.phone}`,
      `Address: ${params.customer.address}`,
    );
    if (params.customer.notes) {
      lines.push(`Notes: ${params.customer.notes}`);
    }
    lines.push("");
  }

  lines.push(
    `*Total:* ${formatInrPaise(params.totalCents)}`,
    "",
    "_Please confirm availability & delivery._",
  );

  return lines.join("\n");
}

export function buildWhatsAppDeepLink(phoneDigits: string, message: string): string {
  const num = phoneDigits.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function itemsToJsonValue(items: OrderItemSnapshot[]): Prisma.InputJsonValue {
  return items as unknown as Prisma.InputJsonValue;
}
