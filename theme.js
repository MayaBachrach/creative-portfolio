(() => {
  // Light and dark now use the two selected multicolor palettes.
  const { themeNames, themeFamilies, palettePresets, paletteNames, typography, designTokens } = window.PORTFOLIO_CONFIG;
  document.documentElement.dataset.cards = new URLSearchParams(location.search).get("cards") === "filled" ? "filled" : window.PORTFOLIO_CONFIG.presentation.defaultCards;
  Object.entries({ ...designTokens, "--font-heading": typography.headings, "--font-body": typography.body }).forEach(([name, value]) => document.documentElement.style.setProperty(name, value));
  const storageKey = "maya-portfolio-color-mode";
  const systemScheme = matchMedia("(prefers-color-scheme: dark)");
  let preference = null;

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") preference = saved;
  } catch {
    // System preference still works when browser storage is unavailable.
  }

  function currentMode() {
    return preference || (systemScheme.matches ? "dark" : "light");
  }

  function refreshFavicon() {
    const icon = document.querySelector('link[rel="icon"]');
    icon.href = window.PORTFOLIO_CONFIG.favicons[currentMode()];
  }

  function updateTheme() {
    const mode = currentMode();
    document.documentElement.dataset.theme = themeNames[mode];
    document.documentElement.dataset.themeFamily = themeFamilies[themeNames[mode]];
    const palette = palettePresets[paletteNames[mode]];
    palette.forEach((color, index) => document.documentElement.style.setProperty("--accent-" + (index + 1), color));
    document.documentElement.style.setProperty("--accent-count", String(palette.length));
    document.documentElement.style.setProperty("--name-background", "var(--accent-2)");
    document.documentElement.style.setProperty("--outline-color", "var(--accent-" + Math.min(4, palette.length) + ")");
    document.documentElement.style.setProperty("--social-outline", "var(--accent-1)");
    const toggle = document.querySelector("#theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-checked", String(mode === "dark"));
      refreshFavicon();
      document.dispatchEvent(new Event("portfolio-theme-change"));
    }
  }

  updateTheme();
  systemScheme.addEventListener("change", () => {
    if (!preference) updateTheme();
  });
  document.addEventListener("DOMContentLoaded", () => {
    updateTheme();
    document.querySelector("#theme-toggle").addEventListener("click", (event) => {
      preference = currentMode() === "dark" ? "light" : "dark";
      try { localStorage.setItem(storageKey, preference); } catch {}
      updateTheme();
      if (event.detail > 0) event.currentTarget.blur();
    });
  });
})();
