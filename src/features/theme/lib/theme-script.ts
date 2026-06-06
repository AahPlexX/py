/**
 * Serialized inline script for the <head> theme boot.
 * This string is embedded in index.html directly — it must have no imports
 * and must be valid plain JS.
 */
export const THEME_BOOT_SCRIPT = `
(function () {
  var STORAGE_KEY = "pmc-theme";
  var VALID = ["light", "dark", "ultradark", "system"];
  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
  var theme = VALID.includes(stored) ? stored : "system";
  if (theme === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
`.trim();
