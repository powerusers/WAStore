import Link from "next/link";
import { OnboardClient } from "@/app/onboard/onboard-client";
import { isPublicOnboardEnabled } from "@/lib/onboard-access";

export default function OnboardPage() {
  if (!isPublicOnboardEnabled()) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
          Store creation is disabled
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Public onboarding is turned off on this deployment. Contact the site operator to
          create a store.
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return <OnboardClient />;
}
