"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/locale-provider";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "wastore-install-dismissed";

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/.test(navigator.userAgent);
}

export function InstallPrompt() {
  const { t } = useI18n();
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (isStandalone()) return;
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return;

    setDismissed(false);

    if (isIos()) {
      setShowIosGuide(true);
      return;
    }

    let gotPrompt = false;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      gotPrompt = true;
      setEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    let timer: number | undefined;
    if (isAndroid()) {
      timer = window.setTimeout(() => {
        if (!gotPrompt) setShowIosGuide(true);
      }, 2500);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }, []);

  const onInstall = useCallback(async () => {
    if (!event) return;
    await event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "accepted") dismiss();
    setEvent(null);
  }, [dismiss, event]);

  if (dismissed || isStandalone()) return null;

  if (event) {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-950 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-50">
        <span className="font-medium">{t("install.title")}</span>
        <button
          type="button"
          onClick={onInstall}
          className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-800"
        >
          {t("install.addButton")}
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="text-xs text-teal-800/80 underline-offset-2 hover:underline dark:text-teal-100/80"
        >
          {t("install.notNow")}
        </button>
      </div>
    );
  }

  if (!showIosGuide) return null;

  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-3 text-sm text-teal-950 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-50">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="font-medium">{t("install.title")}</p>
          <p className="text-xs leading-relaxed text-teal-900/90 dark:text-teal-100/90">
            {isIos() ? t("install.iosSteps") : t("install.androidSteps")}
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 text-xs text-teal-800/80 underline-offset-2 hover:underline dark:text-teal-100/80"
        >
          {t("install.notNow")}
        </button>
      </div>
    </div>
  );
}
