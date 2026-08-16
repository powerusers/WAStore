"use client";

import { useEffect, useState } from "react";

type TenantOption = {
  slug: string;
  name: string;
  storeType: string;
};

export function AdminTenantSelect(props: {
  value: string;
  onChange: (slug: string) => void;
  includeAll?: boolean;
  allLabel?: string;
  className?: string;
}) {
  const {
    value,
    onChange,
    includeAll = false,
    allLabel = "All stores",
    className = "rounded-lg border border-stone-200 px-3 py-1.5 text-sm dark:border-stone-700 dark:bg-stone-900",
  } = props;

  const [tenants, setTenants] = useState<TenantOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/tenants")
      .then((res) => res.json())
      .then((data: { tenants?: TenantOption[] }) => setTenants(data.tenants ?? []))
      .catch(() => setTenants([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      disabled={loading && tenants.length === 0}
    >
      {loading && tenants.length === 0 && <option value={value || "demo"}>Loading…</option>}
      {includeAll && <option value="">{allLabel}</option>}
      {tenants.map((tenant) => (
        <option key={tenant.slug} value={tenant.slug}>
          {tenant.name}
          {tenant.storeType === "pharmacy" ? " (Pharmacy)" : ""}
        </option>
      ))}
    </select>
  );
}
