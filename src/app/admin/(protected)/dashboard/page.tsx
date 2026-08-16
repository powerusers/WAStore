import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DEMO_STORES } from "@/lib/demo-stores";

export default async function AdminDashboardPage() {
  const [tenantCount, productCount, orderCount, recentOrders, tenants] =
    await Promise.all([
      prisma.tenant.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { tenant: { select: { name: true, slug: true } } },
      }),
      prisma.tenant.findMany({
        orderBy: { name: "asc" },
        select: { slug: true, name: true, primaryColor: true, storeType: true },
      }),
    ]);

  const demoLinks = DEMO_STORES.map((demo) => {
    const tenant = tenants.find((t) => t.slug === demo.slug);
    return {
      ...demo,
      color: tenant?.primaryColor ?? demo.color,
    };
  });

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
          { label: "Stores", value: tenantCount, href: "/admin/products" },
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

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Demo storefronts
        </h2>
        <div className="flex flex-wrap gap-3">
          {demoLinks.map((store) => (
            <Link
              key={store.slug}
              href={`/${store.slug}`}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: store.color }}
            >
              {store.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
