"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="rounded-lg px-3 py-1.5 font-medium text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
    >
      Logout
    </button>
  );
}
