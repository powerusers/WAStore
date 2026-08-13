import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [tenantCount, productCount, orderCount, recentOrders] = await Promise.all([
    prisma.tenant.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { tenant: { select: { name: true, slug: true } } },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
          Dashboard
        </h1>
        <p className="text-sm text-stone-500">Overview of stores, products, and orders.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Stores", value: tenantCount, href: "/demo" },
          { label: "Products", value: productCount, href: "/admin/products" },
          { label: "Orders", value: orderCount, href: "/admin/orders" },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
          >
            <p className="text-sm text-stone-500">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-stone-900 dark:text-stone-50">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
          Recent orders
        </h2>
        {recentOrders.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">No orders yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-stone-100 dark:divide-stone-800">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-50">
                    {order.tenant.name} · {order.customerName ?? "Guest"}
                  </p>
                  <p className="text-xs text-stone-500">
                    {order.id.slice(-8).toUpperCase()} ·{" "}
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium dark:bg-stone-800">
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/demo"
          className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
        >
          View Demo Kirana
        </Link>
        <Link
          href="/purti"
          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
        >
          View Purti Supermarket
        </Link>
      </div>
    </div>
  );
}
