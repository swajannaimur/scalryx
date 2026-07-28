"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  applyPersistedTheme,
  getAppliedTheme,
  getThemeToggleLabel,
  type Theme,
  syncSystemTheme,
  systemThemeQuery,
} from "./theme-state";

const themeChangeEvent = "scalryx-theme-change";

function subscribeToTheme(onStoreChange: () => void) {
  const media = window.matchMedia(systemThemeQuery);
  const syncTheme = (event: MediaQueryListEvent) => {
    if (syncSystemTheme(event.matches) !== null) onStoreChange();
  };

  media.addEventListener("change", syncTheme);
  window.addEventListener(themeChangeEvent, onStoreChange);
  return () => {
    media.removeEventListener("change", syncTheme);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
}

function getServerTheme(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const currentTheme = useSyncExternalStore(
    subscribeToTheme,
    getAppliedTheme,
    getServerTheme,
  );
  const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
  const label = getThemeToggleLabel(currentTheme);

  return (
    <button
      aria-label={label}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface text-content shadow-sm transition hover:border-blue-500 hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      onClick={() => {
        applyPersistedTheme(nextTheme);
        window.dispatchEvent(new Event(themeChangeEvent));
      }}
      title={label}
      type="button"
    >
      {currentTheme === "dark" ? (
        <Sun aria-hidden="true" size={19} />
      ) : (
        <Moon aria-hidden="true" size={19} />
      )}
    </button>
  );
}
