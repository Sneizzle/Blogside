const KEY = "blogside.theme" as const;
export type ThemeMode = "dark" | "light";

export function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem(KEY);
  if (saved === "dark" || saved === "light") return saved;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
}

export function applyTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem(KEY, mode);
}

export function toggleTheme(current: ThemeMode): ThemeMode {
  return current === "dark" ? "light" : "dark";
}
