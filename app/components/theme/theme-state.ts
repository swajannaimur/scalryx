export type Theme = "light" | "dark";

type ThemeRoot = {
  dataset: DOMStringMap;
  style: CSSStyleDeclaration;
};

type ThemeStorage = Pick<Storage, "getItem" | "setItem">;

export const storageKey = "scalryx-theme";
export const systemThemeQuery = "(prefers-color-scheme: dark)";

function getStoredTheme(storage: Pick<ThemeStorage, "getItem">): Theme | null {
  try {
    const saved = storage.getItem(storageKey);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

export function getAppliedTheme(root: ThemeRoot = document.documentElement): Theme {
  return root.dataset.theme === "light" ? "light" : "dark";
}

export function applyTheme(
  theme: Theme,
  root: ThemeRoot = document.documentElement,
) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function applyPersistedTheme(
  theme: Theme,
  storage: ThemeStorage = localStorage,
  root: ThemeRoot = document.documentElement,
) {
  applyTheme(theme, root);
  storage.setItem(storageKey, theme);
}

export function syncSystemTheme(
  prefersDark: boolean,
  storage: Pick<ThemeStorage, "getItem"> = localStorage,
  root: ThemeRoot = document.documentElement,
): Theme | null {
  if (getStoredTheme(storage) !== null) return null;

  const theme: Theme = prefersDark ? "dark" : "light";
  applyTheme(theme, root);
  return theme;
}

export function getThemeToggleLabel(theme: Theme) {
  return theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

export function createThemeInitializerScript() {
  return `
  (() => {
    const key = "scalryx-theme";
    let saved = null;
    try {
      saved = localStorage.getItem(key);
    } catch {}
    const theme =
      saved === "light" || saved === "dark"
        ? saved
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
`;
}
