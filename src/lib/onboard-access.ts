/** Public self-serve onboarding is off in production unless explicitly enabled. */
export function isPublicOnboardEnabled(): boolean {
  if (process.env.ALLOW_PUBLIC_ONBOARD === "true") return true;
  return process.env.NODE_ENV !== "production";
}
