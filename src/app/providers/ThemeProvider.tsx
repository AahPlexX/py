import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  THEME_STORAGE_KEY,
  VALID_THEMES,
  applyTheme,
  isValidTheme,
  resolveTheme,
  type ThemeValue,
} from "@/features/theme/lib/theme-tokens";
import { storageGet, storageSet } from "@/shared/lib/storage";

interface ThemeContextValue {
  theme: ThemeValue;
  resolvedTheme: "light" | "dark" | "ultradark";
  setTheme: (next: ThemeValue) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function loadStoredTheme(): ThemeValue {
  const result = storageGet(THEME_STORAGE_KEY, (raw) => {
    if (isValidTheme(raw)) return raw;
    throw new Error("invalid");
  });
  return result.ok ? result.value : "system";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeValue>(loadStoredTheme);

  const resolvedTheme = resolveTheme(theme);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(resolveTheme("system"));
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((next: ThemeValue) => {
    if (!VALID_THEMES.includes(next)) return;
    setThemeState(next);
    storageSet(THEME_STORAGE_KEY, next);
  }, []);

  return (
    <ThemeContext value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
