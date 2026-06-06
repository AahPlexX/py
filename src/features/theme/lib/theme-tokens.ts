export type ThemeValue = "light" | "dark" | "ultradark" | "system";

export const THEME_STORAGE_KEY = "pmc-theme";
export const VALID_THEMES: readonly ThemeValue[] = ["light", "dark", "ultradark", "system"];

export function isValidTheme(value: unknown): value is ThemeValue {
  return VALID_THEMES.includes(value as ThemeValue);
}

export function resolveTheme(stored: ThemeValue): "light" | "dark" | "ultradark" {
  if (stored !== "system") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(resolved: "light" | "dark" | "ultradark"): void {
  document.documentElement.setAttribute("data-theme", resolved);
}

export const THEME_LABELS: Record<ThemeValue, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
  ultradark: "Ultra Dark",
};
